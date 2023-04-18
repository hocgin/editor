import { TextSelection, Selection } from 'prosemirror-state';
import { Node } from 'prosemirror-model';
import { NodeView, EditorView } from 'prosemirror-view';
import { exitCode } from 'prosemirror-commands';
import { undo, redo } from 'prosemirror-history';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';

import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closetag';
// import 'codemirror/addon/fold/xml-fold';
// import 'codemirror/addon/fold/foldcode';
// css
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/idea.css';

type GetPos = () => number;

class CodeBlockView implements NodeView {
  node: Node;
  view: EditorView;
  schema: any;
  cm: CodeMirror.Editor;
  dom: HTMLElement;
  getPos: GetPos;
  updating: boolean; // This flag is used to avoid an update loop between the outer and inner editor
  incomingChanges: boolean;

  constructor(node: Node, view: EditorView, getPos: GetPos, language: string) {
    this.node = node;
    this.view = view;
    this.schema = node.type.schema;
    this.getPos = getPos;
    this.updating = false;
    this.incomingChanges = false;

    this.cm = CodeMirror(null as unknown as HTMLElement, {
      value: node.textContent,
      lineNumbers: true,
      styleActiveLine: true,
      matchBrackets: true,
      autoCloseTags: true,
      mode: language,
      readOnly: !view.editable,
      // extraKeys: this.codeMirrorKeymap(),
    });
    this.dom = this.cm.getWrapperElement();
    // CodeMirror needs to be in the DOM to properly initialize, so
    // schedule it to update itself.
    setTimeout(() => this.cm.refresh(), 50);

    // Track whether changes have been made but not yet propagated.
    this.cm.on('beforeChange', () => (this.incomingChanges = true));
    // Propagate updates from the code editor to ProseMirror
    this.cm.on('cursorActivity', () => {
      if (!this.updating && !this.incomingChanges) this.forwardSelection();
      this.cm.setOption('readOnly', !this.view.editable);
    });
    this.cm.on('changes', () => {
      if (!this.updating) {
        this.valueChanged();
        this.forwardSelection();
      }
      this.incomingChanges = false;
    });
    this.cm.on('focus', () => this.forwardSelection());
  }

  // When the code editor is focused, we can keep the selection of the outer editor synchronized
  // with the inner one, so that any commands executed on the outer editor see an accurate selection.
  forwardSelection() {
    if (!this.cm.hasFocus()) return;

    console.log('this.view', this.view);
    const state = this.view.state;
    const selection = this.asProseMirrorSelection(state.doc);
    if (!selection.eq(state.selection)) {
      this.view.dispatch(state.tr.setSelection(selection));
    }
  }

  // This helper function translates from a CodeMirror selection to a ProseMirror selection.
  // Because CodeMirror uses a line/column based indexing system, indexFromPos is used to convert
  // to an actual character index.
  asProseMirrorSelection(doc: Node) {
    let offset = this.getPos() + 1;
    let anchor = this.cm.indexFromPos(this.cm.getCursor('anchor')) + offset;
    let head = this.cm.indexFromPos(this.cm.getCursor('head')) + offset;
    return TextSelection.create(doc, anchor, head);
  }

  // When the actual content of the code editor is changed, the event handler registered
  // in the node view's constructor calls this method. It'll compare the code block node's
  // current value to the value in the editor, and dispatch a transaction if there is a difference.
  valueChanged() {
    const change = computeTextChange(this.node.textContent, this.cm.getValue());
    if (!change) return;

    const start = this.getPos() + 1;
    const tr = this.view.state.tr.replaceWith(
      start + change.from,
      start + change.to,
      change.text ? this.schema.text(change.text) : [],
    );
    this.view.dispatch(tr);
  }

  // A somewhat tricky aspect of nesting editor like this is handling cursor motion across the edges of the inner editor.
  // This node view will have to take care of allowing the user to move the selection out of the code editor.
  // For that purpose, it binds the arrow keys to handlers that check if further motion would ‘escape’ the editor,
  // and if so, return the selection and focus to the outer editor.
  //
  // The keymap also binds keys for undo and redo, which the outer editor will handle, and for ctrl-enter,
  // which, in ProseMirror's base keymap, creates a new paragraph after a code block.
  codeMirrorKeymap() {
    const view = this.view;
    let platform =
      typeof window !== 'undefined' && typeof navigator !== 'undefined'
        ? navigator?.platform
        : '';
    const mod = /Mac/.test(platform) ? 'Cmd' : 'Ctrl';
    return CodeMirror.normalizeKeyMap({
      Up: () => this.maybeEscape('line', -1),
      Left: () => this.maybeEscape('char', -1),
      Down: () => this.maybeEscape('line', 1),
      Right: () => this.maybeEscape('char', 1),
      'Ctrl-Enter': () => {
        if (exitCode(view.state, view.dispatch)) view.focus();
      },
      [`${mod}-Z`]: () => undo(view.state, view.dispatch),
      [`Shift-${mod}-Z`]: () => redo(view.state, view.dispatch),
      [`${mod}-Y`]: () => redo(view.state, view.dispatch),
    });
  }

  maybeEscape(
    unit: 'line' | 'char',
    dir: 1 | -1,
  ): null | typeof CodeMirror.Pass {
    const pos = this.cm.getCursor();
    if (
      this.cm.somethingSelected() ||
      pos.line != (dir < 0 ? this.cm.firstLine() : this.cm.lastLine()) ||
      (unit == 'char' &&
        pos.ch != (dir < 0 ? 0 : this.cm.getLine(pos.line).length))
    ) {
      return CodeMirror.Pass;
    }
    this.view.focus();
    const targetPos = this.getPos() + (dir < 0 ? 0 : this.node.nodeSize);
    const selection = Selection.near(
      this.view.state.doc.resolve(targetPos),
      dir,
    );
    this.view.dispatch(
      this.view.state.tr.setSelection(selection).scrollIntoView(),
    );
    this.view.focus();
    return null;
  }

  update(node: Node) {
    if (node.type !== this.node.type) return false;
    this.node = node;

    const change = computeTextChange(this.cm.getValue(), node.textContent);
    if (change) {
      this.updating = true;
      this.cm.replaceRange(
        change.text,
        this.cm.posFromIndex(change.from),
        this.cm.posFromIndex(change.to),
      );
      this.updating = false;
    }

    return true;
  }

  /**
   * Selections are also synchronized the other way, from ProseMirror to
   * CodeMirror, using the view's `setSelection` method.
   */
  setSelection(anchor: number, head: number) {
    console.log('CodeBlockView - setSelection');
    this.cm.focus();
    this.updating = true;
    this.cm.setSelection(
      this.cm.posFromIndex(anchor),
      this.cm.posFromIndex(head),
    );
    this.updating = false;
  }

  selectNode() {
    console.log('CodeBlockView - selectNode');
    this.cm.focus();
  }

  stopEvent() {
    // All events that occur inside CodeMirror shouldn't
    // bubble up to ProseMirror.
    return true;
  }
}

/**
 * `computeTextChange` compare two strings and find the minimal change between
 * them.
 *
 * It iterates from the start and end of the strings, until it hits a
 * difference, and returns an object giving the change's start, end, and
 * replacement text, or `null` if there was no change.
 */
function computeTextChange(
  previousText: string,
  currentText: string,
): { from: number; to: number; text: string } | null {
  // Exit early if the strings are identical.
  if (previousText === currentText) {
    return null;
  }

  // Keep track of where the change starts.
  let from = 0;

  // Track the end position of relative to the original value.
  let to = previousText.length;

  // Track the end position relative the the current value.
  let currentTo = currentText.length;

  // Step forwards from the starting point until a changed value is encountered
  // and store the index of that changed value.
  while (
    from < to &&
    previousText.charCodeAt(from) === currentText.charCodeAt(from)
  ) {
    ++from;
  }

  // Step backwards from the end of the text values until a character which
  // doesn't match is encoutered. Store the index where the change happened in
  // both the `previousText` and the `currentText`.
  while (
    to > from &&
    currentTo > from &&
    previousText.charCodeAt(to - 1) === currentText.charCodeAt(currentTo - 1)
  ) {
    to--;
    currentTo--;
  }

  return { from, to, text: currentText.slice(from, currentTo) };
}

export default CodeBlockView;

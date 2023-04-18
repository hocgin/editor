import React from 'react';
import { TextSelection, Transaction } from 'prosemirror-state';
import { Extension } from '@tiptap/core';
import { LangKit } from '@hocgin/hkit';
import { isListNode } from './utils';


function setNodeIndentMarkup(tr: Transaction, pos: number, options: IndentOptions, delta: number): Transaction {
  if (!tr.doc) return tr;

  const node = tr.doc.nodeAt(pos);
  if (!node) return tr;

  const indent = LangKit.clamp(
    (node.attrs.indent || 0) + (options.stepValue * delta),
    options.minIndent,
    options.maxIndent,
  );

  if (indent === node.attrs.indent) return tr;

  const nodeAttrs = {
    ...node.attrs,
    indent,
  };

  return tr.setNodeMarkup(pos, node.type, nodeAttrs, node.marks);
}

function updateIndentLevel(tr: Transaction, options: IndentOptions, delta: number): Transaction {
  const { doc, selection } = tr;

  if (!doc || !selection) return tr;

  if (!(selection instanceof TextSelection)) {
    return tr;
  }

  const { from, to } = selection;

  doc.nodesBetween(from, to, (node, pos) => {
    const nodeType = node.type;

    if (options.types?.includes(nodeType.name)) {
      tr = setNodeIndentMarkup(tr, pos, options, delta);
      return false;
    } else if (isListNode(node)) {
      return false;
    }
    return true;
  });

  return tr;
}

export interface IndentOptions {
  types: string[];
  stepValue: number,
  minIndent: number,
  maxIndent: number,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    indent: {
      indent: () => ReturnType,
      outdent: () => ReturnType,
    };
  }
}

const Indent = Extension.create<IndentOptions>({
  name: 'indent',
  addOptions() {
    return {
      types: ['heading', 'paragraph', 'blockquote'],
      stepValue: 30,
      minIndent: 0,
      maxIndent: 210,
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: null,
            parseHTML: element => parseInt(element.style.marginLeft ?? 0),
            renderHTML: attributes => {
              if (!attributes.indent) {
                return {};
              }

              return {
                style: `margin-left: ${attributes.indent}px!important;`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      indent: () => ({ tr, state, dispatch }) => {
        const { selection } = state;
        tr = tr.setSelection(selection);
        tr = updateIndentLevel(tr, this.options, 1);

        if (tr.docChanged) {
          // eslint-disable-next-line no-unused-expressions
          dispatch && dispatch(tr);
          return true;
        }

        return false;
      },
      outdent: () => ({ tr, state, dispatch }) => {
        const { selection } = state;
        tr = tr.setSelection(selection);

        tr = updateIndentLevel(tr, this.options, -1);

        if (tr.docChanged) {
          // eslint-disable-next-line no-unused-expressions
          dispatch && dispatch(tr);
          return true;
        }

        return false;
      },
    };
  },

  addKeyboardShortcuts() {
    return ({
      'Tab': () => this.editor?.commands.indent(),
      'Shift-Tab': () => this.editor?.commands.outdent(),
    });
  },
});

export { Indent };

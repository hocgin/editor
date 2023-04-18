import React from 'react';
import {Decoration, DecorationSet} from 'prosemirror-view';
import {Node} from 'prosemirror-model';
import {Plugin, PluginKey} from 'prosemirror-state';
import {Extension} from '@tiptap/core';

function findColors(doc: Node): DecorationSet {
  const hexColor = /(#[0-9a-f]{3,6})/gi;
  const decorations: Decoration[] = [];

  doc.descendants((node, position) => {
    if (!node.text) {
      return;
    }

    Array.from(node.text.matchAll(hexColor)).forEach((match: any) => {
      const color = match[0];
      const index = match.index || 0;
      const from = position + index;
      const to = from + color.length;
      const decoration = Decoration.inline(from, to, {
        ['data-type']: 'color',
        class: 'color',
        style: `--color: ${color}`,
      });
      decorations.push(decoration);
    });
  });

  return DecorationSet.create(doc, decorations);
}

const HexColorDecorator = Extension.create({
  name: 'hexColorDecorator',
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('hexColorDecorator'),
        state: {
          init(_, {doc}) {
            return findColors(doc);
          },
          apply(transaction, oldState) {
            return transaction.docChanged
              ? findColors(transaction.doc)
              : oldState;
          },
        },
        props: {
          decorations(state) {
            // @ts-ignore
            return this.getState(state);
          },
        },
      }),
    ];
  },
});

export {HexColorDecorator};

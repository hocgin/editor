import React from 'react';
import { printView } from './utils';
import { Extension } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    print: {
      print: () => ReturnType;
    };
  }
}

const Print = Extension.create<{}>({
  name: 'print',
  addCommands() {
    return {
      print:
        () =>
        ({ view }: any) =>
          printView(view),
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-p': () => this.editor.commands.print(),
    };
  },
});

export { Print };

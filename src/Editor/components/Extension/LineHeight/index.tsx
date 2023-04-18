import React from 'react';
import { Extension } from '@tiptap/core';

export interface LineHeightOptions {
  types: string[],
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    lineHeight: {
      /**
       * Set the font size attribute
       */
      setLineHeight: (lineHeight: string) => ReturnType,
      /**
       * Unset the font size attribute
       */
      unsetLineHeight: () => ReturnType,
    };
  }
}

const LineHeight = Extension.create<LineHeightOptions>({
  name: 'lineHeight',
  addOptions() {
    return {
      types: ['paragraph'],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            parseHTML: element => element.style.lineHeight,
            renderHTML: attributes => {
              if (!attributes.lineHeight) {
                return {};
              }
              return { style: `line-height: ${attributes.lineHeight}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setLineHeight: (lineHeight: string) => ({ commands }: any) => {
        return this.options.types.every(type => commands.updateAttributes(type, { lineHeight: lineHeight }));
      },

      unsetFontSize: () => ({ commands }) => {
        return this.options.types.every(type => commands.resetAttributes(type, 'lineHeight'));
      },
    };
  },

  addKeyboardShortcuts() {
    return {};
  },
});

export { LineHeight };

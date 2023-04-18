import React from 'react';
import TipTapImage from '@tiptap/extension-image';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { Image as UiImage } from './Image';

const Image = TipTapImage.extend<any>({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: '100%',
        parseHTML: (element) => element.style.width,
        renderHTML: (attributes) => {
          if (!attributes.width) {
            return {};
          }
          return {
            style: `width: ${attributes.width}`,
          };
        },
      },
      height: {
        default: null,
        parseHTML: (element) => element.style.height,
        renderHTML: (attributes) => {
          if (!attributes.height) {
            return {};
          }
          return {
            style: `height: ${attributes.height}`,
          };
        },
      },
    };
  },

  addNodeView() {
    console.log('image', this);
    return ReactNodeViewRenderer(UiImage);
  },
});

export { Image };

import TipTapHeading from '@tiptap/extension-heading';

export const Heading = TipTapHeading.extend<any>({
  addAttributes() {
    return {
      ...this.parent?.(),
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute('id'),
        renderHTML: (attributes) => {
          if (!attributes.id) {
            return {};
          }
          return {
            id: attributes.id,
          };
        },
      },
    };
  },
});

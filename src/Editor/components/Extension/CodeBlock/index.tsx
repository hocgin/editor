import CodeBlock, { CodeBlockOptions } from '@tiptap/extension-code-block';

export interface CodeBlockLowlightOptions extends CodeBlockOptions {
  defaultLanguage: string | null | undefined;
}

export default CodeBlock.extend<CodeBlockLowlightOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      defaultLanguage: null,
    };
  },

  addNodeView() {
    return async ({ node, editor, getPos }) => {
      // 先异步处理，内部使用了 window 对象
      let { default: CodeBlockView } = await import('./CodeBlockView');

      return new CodeBlockView(
        node,
        editor.view,
        getPos as () => number,
        node?.attrs?.language ?? this.options?.defaultLanguage,
      );
    };
  },
});

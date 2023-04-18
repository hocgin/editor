import React from 'react';
import {Editor} from '@tiptap/react';
import TbButton from '@/Editor/components/Common/TbButton';
import {LinkOutlined} from '@ant-design/icons';

export const SetLink: React.FC<{ editor?: Editor | null }> = ({editor}) => (
  <TbButton
    title="链接"
    onClick={() => {
      let defValue = editor?.getAttributes('link').href;
      const href: any = window.prompt('URL', defValue);
      let unsetHref = `${href}`.trim() === '';
      let {view, state} = editor || {};
      const {from, to} = view!.state.selection;
      const text = state?.doc.textBetween(from, to, '');
      let isEmpty = !text;
      if (isEmpty && !unsetHref) {
        let defTitle = '链接';
        editor
          ?.chain()
          .focus()
          .insertContent(defTitle)
          .setTextSelection({
            from: from,
            to: from + defTitle.length,
          })
          .run();
      }

      if (unsetHref) {
        editor?.chain().focus().extendMarkRange('link')?.unsetLink().run();
        return;
      } else {
        editor
          ?.chain()
          .focus()
          .extendMarkRange('link')
          ?.setLink({href})
          .run();
      }
    }}
  >
    <LinkOutlined/>
  </TbButton>
);

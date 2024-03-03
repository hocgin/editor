import React from 'react';
import { Editor } from '@tiptap/react';
import TbButton from '@/Editor/components/Common/TbButton';
import { CodeSandboxOutlined } from '@ant-design/icons';

type Props = { editor?: Editor | null };
export const InsertCodesandbox: React.FC<Props> = ({ editor }) => (
  <TbButton
    title="codesandbox"
    onClick={() => {
      const url: any = window.prompt('URL');
      if (url) {
        let code = url;
        editor?.chain().focus()
          .setIframe({ src: `${code}` })
          .run();
      }
    }}
  >
    <CodeSandboxOutlined /> CodeSandbox
  </TbButton>
);

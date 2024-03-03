import React from 'react';
import { Editor } from '@tiptap/react';
import TbButton from '@/Editor/components/Common/TbButton';
import { CodeSandboxOutlined } from '@ant-design/icons';

type Props = { editor?: Editor | null };
export const InsertCodesandbox: React.FC<Props> = ({ editor }) => (
  <TbButton
    title="codesandbox"
    onClick={() => {
      const url: string = window.prompt('URL');
      if (url?.length) {
        editor?.chain().focus().setIframe({ src: `${url}` }).run();
      }
    }}
  >
    <CodeSandboxOutlined /> CodeSandbox
  </TbButton>
);

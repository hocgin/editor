import React from 'react';
import { Editor } from '@tiptap/react';
import TbButton from '@/Editor/components/Common/TbButton';
import { CodeOutlined } from '@ant-design/icons';

export const CodeBlock: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <TbButton
    title="代码块"
    onClick={() => {
      editor?.chain().focus().toggleCodeBlock().exitCode().run();
    }}
  >
    <CodeOutlined />
  </TbButton>
);

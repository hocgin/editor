import React from 'react';
import { Editor } from '@tiptap/react';
import TbButton from '@/Editor/components/Common/TbButton';
import { StrikethroughOutlined } from '@ant-design/icons';

export const Strike: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <TbButton
    title="删除线"
    onClick={() => editor?.chain().focus().toggleStrike().run()}
  >
    <StrikethroughOutlined />
  </TbButton>
);

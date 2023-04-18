import React from 'react';
import { Editor } from '@tiptap/react';
import TbButton from '@/Editor/components/Common/TbButton';
import { BoldOutlined } from '@ant-design/icons';

export const Bold: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <TbButton
    title="加粗"
    onClick={() => editor?.chain().focus().toggleBold().run()}
  >
    <BoldOutlined />
  </TbButton>
);

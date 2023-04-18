import React from 'react';
import { Editor } from '@tiptap/react';
import TbButton from '@/Editor/components/Common/TbButton';
import { ClearOutlined } from '@ant-design/icons';

export const ClearStyle: React.FC<{ editor?: Editor | null }> = ({
  editor,
}) => (
  <TbButton
    title="清除格式"
    onClick={() => editor?.chain().focus().unsetAllMarks().clearNodes().run()}
  >
    <ClearOutlined />
  </TbButton>
);

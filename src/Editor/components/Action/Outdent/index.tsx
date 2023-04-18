import React from 'react';
import { Editor } from '@tiptap/react';
import TbButton from '@/Editor/components/Common/TbButton';
import { MenuFoldOutlined } from '@ant-design/icons';

export const Outdent: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <TbButton title="取消缩进" onClick={() => editor?.chain().outdent().run()}>
    <MenuFoldOutlined />
  </TbButton>
);

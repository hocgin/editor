import React from 'react';
import { Editor } from '@tiptap/react';
import TbButton from '@/Editor/components/Common/TbButton';
import { MenuUnfoldOutlined } from '@ant-design/icons';

export const Indent: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <TbButton title="缩进" onClick={() => editor?.chain().indent().run()}>
    <MenuUnfoldOutlined />
  </TbButton>
);

import React from 'react';
import { Editor } from '@tiptap/react';
import TbButton from '@/Editor/components/Common/TbButton';
import { UnorderedListOutlined } from '@ant-design/icons';

export const BulletList: React.FC<{ editor?: Editor | null }>
  = ({
       editor,
     }) => (
  <TbButton
    title='无序列表'
    onClick={() => editor?.chain().focus().toggleBulletList().run()}
  >
    <UnorderedListOutlined />
  </TbButton>
);

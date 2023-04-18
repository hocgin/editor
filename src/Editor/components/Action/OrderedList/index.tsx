import React from 'react';
import { Editor } from '@tiptap/react';
import TbButton from '@/Editor/components/Common/TbButton';
import { BoldOutlined, OrderedListOutlined } from '@ant-design/icons';

export const OrderedList: React.FC<{ editor?: Editor | null }> = ({
  editor,
}) => (
  <TbButton
    title="有序列表"
    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
  >
    <OrderedListOutlined />
  </TbButton>
);

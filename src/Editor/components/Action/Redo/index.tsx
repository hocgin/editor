import React from 'react';
import { Editor } from '@tiptap/react';
import TbButton from '@/Editor/components/Common/TbButton';
import { BoldOutlined, RedoOutlined } from '@ant-design/icons';

export const Redo: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <TbButton
    title="恢复"
    disabled={!editor?.can().redo()}
    onClick={() => editor?.chain().focus().redo().run()}
  >
    <RedoOutlined />
  </TbButton>
);

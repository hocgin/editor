import React from 'react';
import { Editor } from '@tiptap/react';
import TbButton from '@/Editor/components/Common/TbButton';
import { PrinterOutlined } from '@ant-design/icons';

export const Print: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <TbButton title="打印" onClick={() => editor?.chain().print().run()}>
    <PrinterOutlined />
  </TbButton>
);

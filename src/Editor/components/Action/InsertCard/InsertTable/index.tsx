import React from 'react';
import { Editor } from '@tiptap/react';
import TbButton from '@/Editor/components/Common/TbButton';
import { TableOutlined } from '@ant-design/icons';

export const InsertTable: React.FC<{ editor?: Editor | null }> = ({
  editor,
}) => (
  <TbButton
    title="插入表格"
    onClick={() =>
      editor
        ?.chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run()
    }
  >
    <TableOutlined /> 表格
  </TbButton>
);

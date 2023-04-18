import React from 'react';
import { Editor } from '@tiptap/react';
import TbButton from '@/Editor/components/Common/TbButton';
import { DownSquareOutlined } from '@ant-design/icons';

export const TaskList: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <TbButton
    title="任务列表"
    onClick={() => editor?.chain().focus().toggleTaskList().run()}
  >
    <DownSquareOutlined />
  </TbButton>
);

import React from 'react';
import { Editor } from '@tiptap/react';
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  QuestionOutlined,
} from '@ant-design/icons';
import MeDropdown from '@/Editor/components/Common/MeDropdown';

export const TextAlign: React.FC<{ editor?: Editor | null }> = ({ editor }) => {
  let menus = [
    {
      key: 'left',
      title: <AlignLeftOutlined />,
      header: <AlignLeftOutlined />,
      onAction: () => editor?.chain().focus().setTextAlign('left').run(),
      onMatched: () => editor?.isActive({ textAlign: 'left' }),
    },
    {
      key: 'center',
      title: <AlignCenterOutlined />,
      header: <AlignCenterOutlined />,
      onAction: () => editor?.chain().focus().setTextAlign('center').run(),
      onMatched: () => editor?.isActive({ textAlign: 'center' }),
    },
    {
      key: 'right',
      title: <AlignRightOutlined />,
      header: <AlignRightOutlined />,
      onAction: () => editor?.chain().focus().setTextAlign('right').run(),
      onMatched: () => editor?.isActive({ textAlign: 'right' }),
    },
    {
      key: 'justify',
      title: <QuestionOutlined />,
      header: <QuestionOutlined />,
      onAction: () => editor?.chain().focus().setTextAlign('justify').run(),
      onMatched: () => editor?.isActive({ textAlign: 'justify' }),
    },
  ];
  return (
    <MeDropdown
      menus={menus}
      mode="horizontal"
      titleStyle={{
        width: 20,
      }}
      defaultValue={<AlignLeftOutlined />}
    />
  );
};

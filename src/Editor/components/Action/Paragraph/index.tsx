import React from 'react';
import { Editor } from '@tiptap/react';
import MeDropdown from '@/Editor/components/Common/MeDropdown';

export const Paragraph: React.FC<{
  editor?: Editor | null;
  placement?: 'top' | 'bottom';
}> = ({ editor, placement }) => {
  let menus = [
    {
      key: 'paragraph',
      title: '正文',
      header: '正文',
      onMatched: () => editor?.isActive('paragraph'),
      onAction: () => editor?.chain().focus().setParagraph().run(),
    },
    {
      key: 'h4',
      title: '标题4',
      header: <h4>标题4</h4>,
      onMatched: () => editor?.isActive('heading', { level: 4 }),
      onAction: () => editor?.chain().focus().toggleHeading({ level: 4 }).run(),
    },
    {
      key: 'h3',
      title: '标题3',
      header: <h3>标题3</h3>,
      onMatched: () => editor?.isActive('heading', { level: 3 }),
      onAction: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      key: 'h2',
      title: '标题2',
      header: <h2>标题2</h2>,
      onMatched: () => editor?.isActive('heading', { level: 2 }),
      onAction: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      key: 'h1',
      title: '标题1',
      header: <h1>标题1</h1>,
      onMatched: () => editor?.isActive('heading', { level: 1 }),
      onAction: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
    },
  ];

  return (
    <MeDropdown
      placement={placement}
      menus={menus}
      defaultValue={'正文'}
      titleStyle={{ width: 40 } as any}
    />
  );
};

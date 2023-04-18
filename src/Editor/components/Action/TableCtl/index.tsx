import React from 'react';
import { Editor } from '@tiptap/react';
import { Menu } from 'antd';

export const TableCtl: React.FC<{ editor?: Editor | null }> = ({ editor }) => {
  let menus = [
    {
      key: 'addColumnBefore',
      title: null,
      header: '向前加一列',
      onAction: () => editor?.chain().focus().addColumnBefore().run(),
      onMatched: () => false,
    },
    {
      key: 'addColumnAfter',
      title: null,
      header: '向后加一列',
      onAction: () => editor?.chain().focus().addColumnAfter().run(),
      onMatched: () => false,
    },
    {
      key: 'deleteColumn',
      title: null,
      header: '删除当前列',
      onAction: () => editor?.chain().focus().deleteColumn().run(),
      onMatched: () => false,
    },
    {
      key: 'addRowBefore',
      title: null,
      header: '向上加一行',
      onAction: () => editor?.chain().focus().addRowBefore().run(),
      onMatched: () => false,
    },
    {
      key: 'addRowAfter',
      title: null,
      header: '向下加一行',
      onAction: () => editor?.chain().focus().addRowAfter().run(),
      onMatched: () => false,
    },
    {
      key: 'deleteRow',
      title: null,
      header: '删除当前行',
      onAction: () => editor?.chain().focus().deleteRow().run(),
      onMatched: () => false,
    },
    {
      key: 'deleteTable',
      title: null,
      header: '删除表',
      onAction: () => editor?.chain().focus().deleteTable().run(),
      onMatched: () => false,
    },
    {
      key: 'mergeOrSplit',
      title: null,
      header: '合并或拆分单元格',
      onAction: () => editor?.chain().focus().mergeOrSplit().run(),
      onMatched: () => false,
    },
    {
      key: 'toggleHeaderCell',
      title: null,
      header: '切换标题行',
      onAction: () => editor?.chain().focus().toggleHeaderCell().run(),
      onMatched: () => false,
    },
  ];

  return (
    <Menu
      onClick={({ key }) => {
        let matchMenu: any = (key: string) =>
          menus?.find((item) => item.key === key);
        matchMenu(key).onAction?.();
      }}
      mode="inline"
    >
      {(menus || []).map(({ key, header }) => (
        <Menu.Item key={key}>{header}</Menu.Item>
      ))}
    </Menu>
  );
};

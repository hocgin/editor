import React from 'react';
import { Editor } from '@tiptap/react';
import MeDropdown from '@/Editor/components/Common/MeDropdown';
import { LineHeightOutlined } from '@ant-design/icons';
import { ConfigContext } from '@/ConfigProvider';

export const LineHeight: React.FC<{
  editor?: Editor | null;
  prefixCls?: string;
}> = ({ editor, ...props }) => {
  let lineHeights = ['1', '1.15', '1.5', '2', '2.5', '3'];

  let menus = lineHeights.map((lineHeight) => ({
    key: lineHeight,
    header: lineHeight,
    onAction: () =>
      editor?.chain().focus().setLineHeight(`${lineHeight}`).run(),
    onMatched: () => false,
  }));
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('editor-e-line-height', props.prefixCls);
  return (
    <MeDropdown
      menus={menus}
      titleClassName={prefixCls}
      defaultValue={<LineHeightOutlined />}
    />
  );
};

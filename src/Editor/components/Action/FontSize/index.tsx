import React from 'react';
import { Editor } from '@tiptap/react';
import MeDropdown from '@/Editor/components/Common/MeDropdown';

import { ConfigContext } from '@/ConfigProvider';

export const FontSize: React.FC<{
  editor?: Editor | null;
  prefixCls?: string;
  placement?: 'top' | 'bottom';
}> = ({ editor, placement = 'top', ...props }) => {
  let fontSizes = [
    '12px',
    '13px',
    '14px',
    '16px',
    '19px',
    '22px',
    '24px',
    '29px',
    '32px',
    '40px',
    '48px',
  ];

  let menus = fontSizes.map((fontSize) => ({
    key: fontSize,
    title: fontSize,
    header: fontSize,
    onAction: () => editor?.chain().focus().setFontSize(fontSize).run(),
    onMatched: () => {
      return editor?.isActive({ fontSize: fontSize });
    },
  }));

  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('editor-e-font-size', props.prefixCls);
  return (
    <MeDropdown
      placement={placement}
      menus={menus}
      titleClassName={prefixCls}
      defaultValue="15px"
    />
  );
};

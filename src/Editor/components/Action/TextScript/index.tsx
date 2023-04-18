import React from 'react';
import { Editor } from '@tiptap/react';
import Icon from '@ant-design/icons';
import MeDropdown from '@/Editor/components/Common/MeDropdown';

import { Moremark, Code, Subscript, Superscript } from '../Icon';
import { ConfigContext } from '@/ConfigProvider';

export const TextScript: React.FC<{
  editor?: Editor | null;
  prefixCls?: string;
}> = ({ editor, ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('editor-e-text-script', props.prefixCls);
  let menus = [
    {
      key: 'superscript',
      title: (
        <Icon
          component={Superscript.bind(this)}
          className={`${prefixCls}-icon`}
        />
      ),
      header: (
        <>
          <Icon
            component={Superscript.bind(this)}
            className={`${prefixCls}-smallIcon`}
          />{' '}
          上标
        </>
      ),
      onAction: () =>
        editor?.chain().focus().unsetSubscript().toggleSuperscript().run(),
      onMatched: () => editor?.isActive('superscript'),
    },
    {
      key: 'subscript',
      title: (
        <Icon
          component={Subscript.bind(this)}
          className={`${prefixCls}-icon`}
        />
      ),
      header: (
        <>
          <Icon
            component={Subscript.bind(this)}
            className={`${prefixCls}-smallIcon`}
          />{' '}
          下标
        </>
      ),
      onAction: () =>
        editor?.chain().focus().unsetSuperscript().setSubscript().run(),
      onMatched: () => editor?.isActive('subscript'),
    },
    {
      key: 'code',
      title: (
        <Icon component={Code.bind(this)} className={`${prefixCls}-icon`} />
      ),
      header: (
        <>
          <Icon
            component={Code.bind(this)}
            className={`${prefixCls}-smallIcon`}
          />{' '}
          行内代码
        </>
      ),
      onAction: () =>
        editor
          ?.chain()
          .focus()
          .unsetSubscript()
          .unsetSuperscript()
          .setCode()
          .run(),
      onMatched: () => editor?.isActive('code'),
    },
  ];
  return (
    <MeDropdown
      menus={menus}
      titleClassName={`${prefixCls}-content`}
      defaultValue={
        <Icon component={Moremark.bind(this)} className={`${prefixCls}-icon`} />
      }
    />
  );
};

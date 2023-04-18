import React from 'react';
import {Editor} from '@tiptap/react';
import {InsertImage} from './InsertImage';
import {InsertTable} from './InsertTable';
import {InsertVideo} from './InsertVideo';
import {InsertCodesandbox} from './InsertCodesandbox';
import {Dropdown, Menu, Button} from 'antd';
import {PlusCircleFilled} from '@ant-design/icons';
import classnames from 'classnames';
import {ConfigContext} from '@/ConfigProvider';

export const InsertCard: React.FC<{
  prefixCls?: string;
  editor?: Editor | null;
  className?: string;
  uploadImageUrl: string;
  placement?: 'top' | 'bottom';
}> = ({editor, placement = 'top', uploadImageUrl, className, ...props}) => {
  let {getPrefixCls} = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('editor--Action-InsertCard', props.prefixCls);
  const menu = (
    <Menu className={`${prefixCls}-menus`}>
      <Menu.Item key={'InsertImage'}>
        <InsertImage editor={editor} uploadUrl={uploadImageUrl}/>
      </Menu.Item>
      <Menu.Item key={'InsertTable'}>
        <InsertTable editor={editor}/>
      </Menu.Item>
      <Menu.Item key={'InsertVideo'}>
        <InsertVideo editor={editor}/>
      </Menu.Item>
      <Menu.Item key={'InsertCodesandbox'}>
        <InsertCodesandbox editor={editor}/>
      </Menu.Item>
    </Menu>
  );

  return (
    <Button
      type="text"
      title={'插入卡片'}
      className={classnames(prefixCls, className)}
    >
      <Dropdown overlay={menu} trigger={['click']} placement={placement}>
        <PlusCircleFilled className={'icon'}/>
      </Dropdown>
    </Button>
  );
};

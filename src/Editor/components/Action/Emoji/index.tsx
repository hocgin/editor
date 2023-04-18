import React from 'react';
import type {Editor} from '@tiptap/react';
import TbButton from '@/Editor/components/Common/TbButton';
import {SmileOutlined} from '@ant-design/icons';
import {Popover} from 'antd';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

export const Emoji: React.FC<{
  editor?: Editor | null;
  placement?: 'top' | 'bottom';
}> = ({editor, placement = 'top'}) => (
  <TbButton>
    <Popover
      placement={placement}
      trigger="click"
      content={<Picker data={data} onEmojiSelect={(emoji: any) =>
        editor?.chain().insertContent(emoji.native).run()
      }/>}>
      <SmileOutlined/>
    </Popover>
  </TbButton>
);

import React from 'react';
import type { Editor } from '@tiptap/react';
import TbButton from '@/Editor/components/Common/TbButton';
import { SmileOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

type EmojiProps = {
  editor?: Editor | null;
  placement?: 'top' | 'bottom';
};
export const Emoji: React.FC<EmojiProps> = ({ editor, placement = 'top' }) => (
  <TbButton>
    <Popover placement={placement}
             trigger="click"
             content={<Picker data={data} onEmojiSelect={(emoji) =>
               editor?.chain().insertContent(emoji.native).run()
             } />}>
      <SmileOutlined />
    </Popover>
  </TbButton>
);

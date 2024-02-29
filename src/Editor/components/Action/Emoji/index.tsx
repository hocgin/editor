import React from 'react';
import type { Editor } from '@tiptap/react';
import TbButton from '@/Editor/components/Common/TbButton';
import { SmileOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import data from '@emoji-mart/data';
import EmojiPicker from 'emoji-picker-react';

type EmojiProps = {
  editor?: Editor | null;
  placement?: 'top' | 'bottom';
};
export const Emoji: React.FC<EmojiProps> = ({ editor, placement = 'top' }) => (
  <TbButton>
    <Popover placement={placement}
             trigger="click"
             content={<EmojiPicker onEmojiClick={(emoji) =>
               editor?.chain().insertContent(emoji.emoji).run()
             } />}>
      <SmileOutlined />
    </Popover>
  </TbButton>
);

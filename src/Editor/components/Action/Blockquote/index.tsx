import React from 'react';
import { Editor } from '@tiptap/react';
import TbButton from '@/Editor/components/Common/TbButton';
import Icon from '@ant-design/icons';
import { Quote } from '@/Editor/components/Action/Icon';

export const Blockquote: React.FC<{ editor?: Editor | null }> = ({
  editor,
}) => (
  <TbButton
    title="插入引用"
    onClick={() => editor?.chain().focus().toggleBlockquote().run()}
  >
    <Icon
      component={Quote.bind(this)}
      style={
        {
          display: 'flex',
          justifyContent: 'center',
          width: 16,
          height: 16,
        } as any
      }
    />
  </TbButton>
);

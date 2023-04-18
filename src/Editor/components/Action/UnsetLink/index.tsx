import React from 'react';
import {Editor} from '@tiptap/react';
import TbButton from '@/Editor/components/Common/TbButton';
import {DisconnectOutlined} from '@ant-design/icons';

export const UnsetLink: React.FC<{ editor?: Editor | null }> = ({editor}) => (
  <TbButton
    title="取消链接"
    disabled={!editor?.isActive('link')}
    onClick={() =>
      editor?.chain().focus().extendMarkRange('link')?.unsetLink().run()
    }
  >
    <DisconnectOutlined/>
  </TbButton>
);

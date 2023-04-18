import React from 'react';
import {Editor} from '@tiptap/react';
import {FillBackground} from '../Icon';
import ColorDropdown from '@/Editor/components/Common/ColorDropdown';

export const FillTableBackground: React.FC<{
  editor?: Editor | null
}> = ({editor,}) => {
  return (
    <ColorDropdown
      onClick={(color: string) =>
        editor?.chain().focus().setCellAttribute('backgroundColor', color).run()
      }
      renderIcon={FillBackground}
    />
  );
};

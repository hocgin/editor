import React from 'react';
import { Editor } from '@tiptap/react';
import { HighlightColor } from '../Icon';
import ColorDropdown from '@/Editor/components/Common/ColorDropdown';

export const Highlight: React.FC<{ editor?: Editor | null }> = ({ editor }) => {
  // editor?.getAttributes('textStyle').backgroundColor
  return (
    <ColorDropdown
      onClick={(color: string) =>
        editor?.chain().focus().toggleHighlight({ color }).run()
      }
      renderIcon={HighlightColor}
    />
  );
};

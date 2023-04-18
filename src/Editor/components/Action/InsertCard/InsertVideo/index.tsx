import React from 'react';
import { Editor } from '@tiptap/react';
import TbButton from '@/Editor/components/Common/TbButton';
import { YoutubeOutlined } from '@ant-design/icons';

export const InsertVideo: React.FC<{ editor?: Editor | null }> = ({
  editor,
}) => (
  <TbButton
    title="视频"
    onClick={() => {
      const url: any = window.prompt('URL');
      if (url) {
        let code = url;
        if (`${url}`.includes('youtube')) {
          code = getYouTubeCode(url);
        }
        editor
          ?.chain()
          .focus()
          .setIframe({ src: `https://www.youtube.com/embed/${code}` })
          .run();
      }
    }}
  >
    <YoutubeOutlined /> YouTube
  </TbButton>
);

function getYouTubeCode(url: string) {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
}

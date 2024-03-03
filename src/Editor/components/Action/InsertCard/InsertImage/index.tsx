import React from 'react';
import { Editor } from '@tiptap/react';
import TbButton from '@/Editor/components/Common/TbButton';
import { Upload } from 'antd';
import { PictureOutlined, YoutubeOutlined } from '@ant-design/icons';

type Props = {
  editor?: Editor | null;
  uploadUrl: string;
};
export const InsertImage: React.FC<Props> = ({ editor, uploadUrl }) => {
  if (!uploadUrl) {
    return <InsertImageInput editor={editor} />;
  }

  let handleChange = ({ file, fileList }: any) => {
    fileList = fileList.map((file: any) => {
      let result = file.response;
      if (result) {
        // Component will show file.url as link
        if (result?.success) {
          file.url = result?.data;
        } else {
          file.status = 'error';
        }
      }
      return file;
    });
    if (fileList.length >= 1 && fileList[0]?.url) {
      let uploadFile = fileList[0];
      editor?.chain().focus().setImage({
        src: uploadFile?.url,
        alt: uploadFile?.title,
        title: uploadFile?.title,
      }).run();
    }
  };
  return (
    <TbButton title="插入图片">
      <Upload
        accept={'image/*'}
        withCredentials
        name="file"
        maxCount={1}
        action={uploadUrl}
        onChange={handleChange}
      >
        <PictureOutlined /> 图片
      </Upload>
    </TbButton>
  );
};

export const InsertImageInput: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <TbButton title="图片" onClick={(e) => {
    const url: string = window.prompt('URL');
    if (url?.length) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }}>
    <PictureOutlined /> 图片
  </TbButton>
);

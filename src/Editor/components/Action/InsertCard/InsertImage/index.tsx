import React from 'react';
import {Editor} from '@tiptap/react';
import TbButton from '@/Editor/components/Common/TbButton';
import {Upload} from 'antd';
import {PictureOutlined} from '@ant-design/icons';

export const InsertImage: React.FC<{
  editor?: Editor | null;
  uploadUrl: string;
}> = ({editor, uploadUrl}) => {
  let handleChange = ({file, fileList}: any) => {
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
      editor
        ?.chain()
        .focus()
        .setImage({
          src: uploadFile?.url,
          alt: uploadFile?.title,
          title: uploadFile?.title,
        })
        .run();
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
        <PictureOutlined/> 图片
      </Upload>
    </TbButton>
  );
};

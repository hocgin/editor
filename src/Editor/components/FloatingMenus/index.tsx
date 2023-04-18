import React from 'react';

import {SetLink, UnsetLink} from '@/Editor/components/Action';
import {Editor, FloatingMenu} from '@tiptap/react';
import {ConfigContext} from '@/ConfigProvider';
import {Space} from "antd";

const shouldShowLink = ({editor, view, state, oldState}: any) => {
  let editable = view?.editable;
  const {from, to} = view.state.selection;
  const text = state.doc.textBetween(from, to, '');
  let isLink = editor.isActive('link');
  let isEmpty = !text;
  // link or select text
  return editable && (!isEmpty || isLink) && !editor.isActive('codeBlock');
};

const Index: React.FC<{
  editor: Editor;
  defaultParams?: any;
  prefixCls?: string;
}> = ({editor, ...props}) => {
  let {getPrefixCls} = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('editor-e-floatingMenu', props.prefixCls);
  return (
    // @ts-ignore
    <FloatingMenu
      editor={editor}
      pluginKey={'floatingMenu'}
      className={prefixCls}
      tippyOptions={
        {
          placement: 'top',
          duration: 100,
          theme: 'light',
        } as any
      }
      shouldShow={(props: any) => {
        return shouldShowLink(props);
      }}
    >
      <Space.Compact>
        <SetLink editor={editor}/>
        <UnsetLink editor={editor}/>
      </Space.Compact>
    </FloatingMenu>
  );
};

export default Index;

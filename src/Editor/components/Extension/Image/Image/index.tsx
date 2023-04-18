import React, { useState } from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import { NodeSelection } from 'prosemirror-state';
import classnames from 'classnames';
import { useMount } from 'ahooks';
import { LangKit } from '@hocgin/hkit';
import { resolveImg } from './image';
import { ConfigContext } from '@/ConfigProvider';

const MIN_SIZE = 20;
const MAX_SIZE = 100000;

const Image: React.FC<{
  prefixCls?: string;
  node: any;
  getPos: any;
  editor: any;
  updateAttributes: any;
  selected: boolean;
}> = ({ node, selected, updateAttributes, editor, getPos, ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('editor--Extension-Image', props.prefixCls);

  let view = editor.view;
  let attrs = node.attrs || {};
  let editable = view.editable;
  let [originalSize, setOriginalSize] = useState({
    width: 0,
    height: 0,
  });

  if (editable) {
    let maxSize = {
      width: MAX_SIZE,
      height: MAX_SIZE,
    };
    let resizing = false;
    let resizerState = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      dir: '',
    };
    useMount(async () => {
      if (originalSize.width && originalSize.height) {
        return;
      }
      const result = await resolveImg(attrs?.src);
      if (!result.complete) {
        result.width = MIN_SIZE;
        result.height = MIN_SIZE;
      }
      setOriginalSize({
        width: result.width,
        height: result.height,
      });
    });
    let onEvents = () => {
      document.addEventListener('mousemove', onMouseMove.bind(this), true);
      document.addEventListener('mouseup', onMouseUp.bind(this), true);
    };
    let offEvents = () => {
      document.removeEventListener('mousemove', onMouseMove.bind(this), true);
      document.removeEventListener('mouseup', onMouseUp.bind(this), true);
    };
    let onMouseDown = (dir: string, e: any) => {
      e.preventDefault();
      e.stopPropagation();
      resizerState.x = e.clientX;
      resizerState.y = e.clientY;
      const originalWidth = originalSize.width;
      const originalHeight = originalSize.height;
      const aspectRatio = originalWidth / originalHeight || 1;
      let { width, height } = node.attrs;
      width = !width ? originalWidth : width;
      height = !height ? originalHeight : height;

      const maxWidth = maxSize.width;
      if (width && !height) {
        width = width > maxWidth ? maxWidth : width;
        height = Math.round(width / aspectRatio);
      } else if (height && !width) {
        width = Math.round(height * aspectRatio);
        width = width > maxWidth ? maxWidth : width;
      } else if (!width && !height) {
        width = originalWidth > maxWidth ? maxWidth : originalWidth;
        height = Math.round(width / aspectRatio);
      } else {
        width = width > maxWidth ? maxWidth : width;
      }

      resizerState.w = width;
      resizerState.h = height;
      resizerState.dir = dir;
      resizing = true;
      onEvents();
    };
    // https://github.com/scrumpy/tiptap/issues/361#issuecomment-540299541
    let onSelectImage = () => {
      const { state } = view;
      let { tr } = state;
      const selection = NodeSelection.create(state.doc, getPos());
      tr = tr.setSelection(selection);
      view.dispatch(tr);
    };
    let onMouseMove = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      if (!resizing) return;
      const { x, y, w, h, dir } = resizerState;
      const dx = (e.clientX - x) * (/l/.test(dir) ? -1 : 1);
      const dy = (e.clientY - y) * (/t/.test(dir) ? -1 : 1);
      let width = LangKit.clamp(w + dx, MIN_SIZE, maxSize.width);
      let height = Math.max(h + dy, MIN_SIZE);
      updateAttributes({
        width: width,
        height: height,
      });
    };
    let onMouseUp = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      if (!resizing) return;
      resizing = false;
      resizerState = {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        dir: '',
      };
      offEvents();
      onSelectImage();
    };

    return (
      <NodeViewWrapper>
        <div
          className={classnames(prefixCls, {
            [`${prefixCls}-imageViewSelected`]: selected,
          })}
          style={{ display: 'inline-flex' } as any}
        >
          <img
            className={classnames({
              [`${prefixCls}-imageSelected`]: selected,
            })}
            title={attrs?.title}
            src={attrs?.src}
            alt={attrs?.alt}
            width={node.attrs?.width}
            height={node.attrs?.height}
            onClick={onSelectImage}
          />
          {editable && selected ? (
            <div className={`${prefixCls}-imageResizer`}>
              <span
                className={classnames(
                  `${prefixCls}-imageResizerHandle`,
                  `${prefixCls}-imageResizerHandleTl`,
                )}
                onMouseDown={onMouseDown.bind(this, 'tl')}
              />
              <span
                className={classnames(
                  `${prefixCls}-imageResizerHandle`,
                  `${prefixCls}-imageResizerHandleTr`,
                )}
                onMouseDown={onMouseDown.bind(this, 'tr')}
              />
              <span
                className={classnames(
                  `${prefixCls}-imageResizerHandle`,
                  `${prefixCls}-imageResizerHandleBl`,
                )}
                onMouseDown={onMouseDown.bind(this, 'bl')}
              />
              <span
                className={classnames(
                  `${prefixCls}-imageResizerHandle`,
                  `${prefixCls}-imageResizerHandleBr`,
                )}
                onMouseDown={onMouseDown.bind(this, 'br')}
              />
            </div>
          ) : null}
        </div>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper>
      <img
        title={attrs?.title}
        src={attrs?.src}
        alt={attrs?.alt}
        width={attrs?.width}
        height={attrs?.height}
      />
    </NodeViewWrapper>
  );
};

export { Image };

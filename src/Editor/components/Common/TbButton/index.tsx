import React from 'react';
import { Button, Tooltip } from 'antd';
import classnames from 'classnames';
import { ConfigContext } from '@/ConfigProvider';

type TbButtonProps = {
  className?: string;
  onClick?: (e) => void;
  children?: any;
  title?: string;
  prefixCls?: string;
  disabled?: boolean;
  block?: boolean;
};
const Index: React.FC<TbButtonProps> = ({ className, disabled = false, title, children, onClick, ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('editor-e-tb-button', props.prefixCls);
  return (
    <div className={classnames(prefixCls, className)} onMouseDown={(e) => {
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopPropagation();
      e.nativeEvent.preventDefault();
      e.nativeEvent.stopImmediatePropagation();
      return false;
    }} onClick={onClick}>
      <Tooltip placement="bottom" title={title}>
        <Button disabled={disabled} block>
          <div onTouchStart={(e) => e.preventDefault()}>{children}</div>
        </Button>
      </Tooltip>
    </div>
  );
};

export default Index;

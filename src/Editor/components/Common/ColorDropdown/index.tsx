import React from 'react';
import { Popover, Button } from 'antd';
import { SketchPicker } from 'react-color';
import { useState } from 'react';

import Icon, { CaretDownOutlined } from '@ant-design/icons';
import { ConfigContext } from '@/ConfigProvider';

const Index: React.FC<{
  renderIcon?: (color: string) => any;
  onClick?: (color: string) => void;
  prefixCls?: string;
}> = ({ renderIcon, onClick, ...props }) => {
  let [color, setColor] = useState<string>('#000');
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('editor-e-color-dropdown', props.prefixCls);
  return (
    <div className={`${prefixCls}-colorDropdown`}>
      <Button
        type="text"
        onClick={onClick?.bind(this, color)}
        className={`${prefixCls}-leftBtn`}
      >
        <Icon component={renderIcon?.bind(this, color)} />
      </Button>
      <Popover
        content={
          <SketchPicker
            color={color}
            onChangeComplete={(color: any) => setColor(color.hex)}
          />
        }
        trigger="click"
      >
        <Button type="text" className={`${prefixCls}-rightBtn`}>
          <CaretDownOutlined />
        </Button>
      </Popover>
    </div>
  );
};

export default Index;

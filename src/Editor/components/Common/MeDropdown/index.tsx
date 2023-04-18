import React from 'react';

import { Button, Dropdown, Menu } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useInterval } from 'ahooks';
import classnames from 'classnames';
import { ConfigContext } from '@/ConfigProvider';

interface MenuInfo {
  key: string;
  title?: any;
  header?: any;
  onAction: () => any | undefined;
  onMatched?: () => boolean | undefined;
}

const Index: React.FC<{
  className?: string;
  prefixCls?: string;
  titleStyle?: any;
  titleClassName?: string;
  menus?: MenuInfo[];
  defaultValue?: any;
  placement?: any;
  onClick?: (key: string) => void;
  mode?: 'vertical' | 'horizontal' | 'inline';
  disabled?: boolean;
}> = ({
  className,
  placement,
  disabled = false,
  titleClassName,
  onClick,
  titleStyle,
  menus = [],
  defaultValue,
  mode,
  ...props
}) => {
  let [key, setKey] = useState<string>('none');
  let matchMenu = (key: string) => menus?.find((item) => item.key === key);

  let menuTitle = matchMenu(key)?.title ?? defaultValue;
  let onAction = (key: string) => matchMenu(key)?.onAction();
  useInterval(() => {
    let matchedMenu: MenuInfo = menus?.filter(
      ({ onMatched }) => onMatched?.() || false,
    )?.[0];
    if (matchedMenu?.key !== key) {
      setKey(matchedMenu?.key);
    }
  }, 1000);
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('editor-e-me-dropdown', props.prefixCls);
  return (
    <Button
      type="text"
      disabled={disabled}
      className={classnames(prefixCls, className)}
      onTouchStart={(e) => e.preventDefault()}
    >
      <Dropdown
        placement={placement}
        overlayClassName={classnames({
          [`${prefixCls}-horizontal`]: mode === 'horizontal',
        })}
        overlay={
          <Menu
            selectedKeys={[key]}
            onClick={({ key }) => {
              setKey(key);
              onAction(key);
              onClick?.(key);
            }}
          >
            {(menus || []).map(({ key, header }) => (
              <Menu.Item className={classnames(`${prefixCls}-menu`)} key={key}>
                {header}
              </Menu.Item>
            ))}
          </Menu>
        }
        trigger={['click']}
      >
        <span className={classnames(`${prefixCls}-selectedValue`)}>
          <span className={classnames(titleClassName)} style={titleStyle}>
            {menuTitle}
          </span>{' '}
          <CaretDownOutlined className={classnames(`${prefixCls}-caretDown`)} />
        </span>
      </Dropdown>
    </Button>
  );
};

export default Index;

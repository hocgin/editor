import React from 'react';
import classnames from 'classnames';
import {default as Icon} from '@/Icon';

import {ConfigContext} from '@/ConfigProvider';
import {Avatar} from 'antd';
import {useToggle} from 'ahooks';

export const HeartFilled: React.FC<{
  prefixCls?: string;
  className?: any;
  style?: any;
  href?: string;
}> = ({className, style, href = 'https://www.hocgin.top', ...props}) => {
  let {getPrefixCls} = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('logo-heart', props.prefixCls);
  return (
    <a
      className={classnames(`${prefixCls}`, className)}
      href={href}
      target='_blank'
    >
      <div className={classnames(`${prefixCls}-heart`)} style={style}>
        <Icon.HeartFilled/>
      </div>
    </a>
  );
};

const Index: React.FC<{
  prefixCls?: string;
  href?: string;
  imageUrl?: string;
  text?: boolean;
}> = ({
        href = 'https://hocg.in/',
        text = 'hocgin',
        imageUrl = 'https://cdn.hocgin.top/uPic/favicon.ico',
        ...props
      }) => {
  let {getPrefixCls} = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('logo', props.prefixCls);
  let [use, {toggle}] = useToggle(false);

  return (
    <div className={`${prefixCls}`}>
      <span className={`${prefixCls}-prefix`} onClick={toggle}>Crafted by</span>
      <a
        className={`${prefixCls}-text`}
        href={href}
        target='_blank'
        rel='noopener noreferrer'
      >
        <div className={`${prefixCls}-box`}>
          {use ? <HeartFilled href='https://uptime.hocgin.top/status/ping'/> :
            <Avatar className={`${prefixCls}-image`} size={22} src={imageUrl}/>}
        </div>
        <span>{text}</span>
      </a>
    </div>
  );
};
// <HeartFilled href='https://uptime.hocgin.top/status/ping' /> {text}

export default Index;

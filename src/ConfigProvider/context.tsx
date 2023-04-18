import React from 'react';

const defaultGetPrefixCls = (
  suffixCls?: string,
  customizePrefixCls?: string,
) => {
  if (customizePrefixCls) return customizePrefixCls;
  return suffixCls ? `hui-${suffixCls}` : 'hui';
};

export const ConfigContext = React.createContext<{ getPrefixCls: any }>({
  getPrefixCls: defaultGetPrefixCls,
});

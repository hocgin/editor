import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { SuggestionKeyDownProps } from '@tiptap/suggestion/dist/packages/suggestion/src/suggestion';
import classnames from 'classnames';
import { Mention } from '@/Editor/components/Extension/Suggestion/Mention/Suggestion';
import { ConfigContext } from '@/ConfigProvider';

export default forwardRef((props: any, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('editor--extension-mention');

  let items = props.items;
  const selectItem = (index: number) => {
    const item = items[index] as Mention;

    if (item) {
      props?.command({ id: item });
    }
  };

  const upHandler = () => {
    setSelectedIndex((selectedIndex + items.length - 1) % items.length);
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: SuggestionKeyDownProps) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }

      if (event.key === 'Enter') {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return (
    items && (
      <div className={prefixCls}>
        {items.length ? (
          items.map((item: Mention, index: number) => (
            <button
              className={classnames(`${prefixCls}-item`, {
                [`${prefixCls}-isSelected`]: index === selectedIndex,
              })}
              key={index}
              onClick={() => selectItem(index)}
            >
              {item}
            </button>
          ))
        ) : (
          <div className={`${prefixCls}-item`}>No result</div>
        )}
      </div>
    )
  );
});

import { ReactRenderer } from '@tiptap/react';
import tippy, { Instance } from 'tippy.js';
import MentionList from './MentionList';
import {
  SuggestionOptions,
  SuggestionKeyDownProps,
  SuggestionProps,
} from '@tiptap/suggestion';

export type Mention = string;

export type onSearchMention = (keyword: string) => Mention[] | undefined;

export let MentionSuggestion = (search?: onSearchMention) => {
  let MentionSuggestion: Omit<SuggestionOptions, 'editor'> = {
    items: ({ query }: any): Mention[] | any => {
      return search?.(query) ?? undefined;
    },

    render: () => {
      let component: ReactRenderer<any, Mention[]>;
      let popup: Instance<any>[];

      return {
        onStart: (props: SuggestionProps) => {
          component = new ReactRenderer(MentionList, {
            props,
            editor: props.editor,
          });

          popup = tippy('body', {
            theme: 'light',
            getReferenceClientRect: props.clientRect,
            appendTo: () => document.body,
            content: component.element,
            showOnCreate: true,
            interactive: true,
            trigger: 'manual',
            placement: 'bottom-start',
          } as any);
        },

        onUpdate(props: SuggestionProps) {
          component.updateProps(props);

          popup[0].setProps({
            getReferenceClientRect: props.clientRect,
          });
        },

        onKeyDown(props: SuggestionKeyDownProps) {
          if (props.event.key === 'Escape') {
            popup[0].hide();

            return true;
          }

          return component.ref?.onKeyDown(props);
        },

        onExit() {
          popup[0].destroy();
          component.destroy();
        },
      };
    },
  };
  return MentionSuggestion;
};

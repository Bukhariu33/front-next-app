import { Tabs } from '@mantine/core';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { cn } from '@/utils/cn';

import type {
  Namespace,
  TranslationKey,
  WithTranslation,
} from '../../types/utils/withTranslation';
import classes from './styles.module.css';

const style = {
  side: {
    tab: cn(
      'min-h-[40px] sm:min-h-[50px] 2xl:min-h-[60px] p-6 rounded-[8px] transition-all ease-in duration-100',
    ),
    list: cn(classes.tab_list, 'gap-10'),
    tabLabel: cn('text-lg leading-[1.33333] w-full text-center'),
    root: cn('gap-10 py-4'),
    activeTab: 'border-none bg-brand-primary-500 font-bold text-white',
    inactiveTab:
      'border border-solid border-brand-primary-500 bg-[#FFFDF5] text-brand-primary-500 hover:bg-[#FFFBE0] ',
  },
  top: {
    tab: cn(
      `flex-1 min-w-fit border-b-[5px] max-w-[25%] border-b-[3px] py-6 text-lg hover:bg-transparent  hover:border-black/80 transition-all ease-in duration-100 `,
    ),
    activeTab: 'border-black/80 font-bold text-black',
    inactiveTab: 'border-gray-300 font-normal text-black/60',
    list: cn(classes.tab_list, 'mb-10 justify-center'),
  },
};

interface Props<T extends Namespace, Tabs extends TranslationKey<T>[]>
  extends WithTranslation<T> {
  tabs: Tabs;
  defaultTab?: Tabs[number];
  panels: Record<Tabs[number], React.ReactNode | (() => void)>;
  type?: 'side' | 'top';
}

const useTabsView = <T extends Namespace, Tabs extends TranslationKey<T>[]>({
  tabs,
  defaultTab,
  type = 'top',
  namespace,
  panels,
}: Props<T, Tabs>): React.ReactNode => {
  const router = useRouter();
  const { t } = useTranslation([namespace]);

  const key = `tab-${type}`;

  const setTab = (tab: string) => {
    const panel = panels[tab as Tabs[number]];
    if (typeof panel === 'function') {
      return panel();
    }
    return router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, [key]: tab },
      },
      undefined,
      { shallow: true },
    );
  };

  const activeTab =
    (router.query[key] as string) in panels ? router.query[key] : defaultTab;

  const views = Object.keys(panels).map(panel => {
    if (typeof panels[panel as Tabs[number]] !== 'function') {
      return (
        <Tabs.Panel key={panel.toString()} value={panel.toString()}>
          {panels[panel as Tabs[number]] as React.ReactNode}
        </Tabs.Panel>
      );
    }
    return null;
  });

  return (
    <Tabs
      className="w-full  transition-all duration-100 ease-in"
      defaultValue={defaultTab?.toString()}
      keepMounted={false}
      value={activeTab?.toString()}
      onChange={value => value && setTab(value)}
      color="black"
      orientation={type === 'side' ? 'vertical' : 'horizontal'}
      placement="right"
      classNames={style[type]}
    >
      {type === 'side' ? views : null}
      <Tabs.List data-test-id="tabs">
        {tabs.map(tab => (
          <Tabs.Tab
            key={tab.toString()}
            value={tab.toString()}
            className={cn(
              {
                [style[type].activeTab]: activeTab === tab,
                [style[type].inactiveTab]: activeTab !== tab,
              },
              'min-w-[100px] sm:min-w-[200px] 2xl:min-w-[250px]',
            )}
          >
            {t(tab as any)}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {type === 'top' ? views : null}
    </Tabs>
  );
};

export default useTabsView;

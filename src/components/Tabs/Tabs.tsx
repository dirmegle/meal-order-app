import classNames from 'classnames/bind';
import { ReactNode } from 'react';
import styles from './tabs.module.css';

const cx = classNames.bind(styles);
export interface TabsData {
  label: string;
  isDisabled: boolean;
  key: string;
}

interface TabsProps {
  isUppercase?: boolean;
  tabsData: TabsData[];
  selectedTab: string;
  setSelectedTab: (selectedTab: string) => void;
  children: ReactNode;
}

export default function Tabs({
  isUppercase = false,
  tabsData,
  selectedTab,
  setSelectedTab,
  children,
}: TabsProps) {
  const handleClick = (tabKey: string) => {
    setSelectedTab(tabKey);
  };

  return (
    <>
      <ul className={cx('container')}>
        {tabsData &&
          tabsData.map(({ label, isDisabled, key }) => (
            <li key={key} className={styles.tabBox}>
              <button
                className={cx('tab', { uppercase: isUppercase }, { selected: selectedTab === key })}
                onClick={() => handleClick(key)}
                disabled={isDisabled}
                type="button">
                {label}
              </button>
            </li>
          ))}
      </ul>
      {children}
    </>
  );
}

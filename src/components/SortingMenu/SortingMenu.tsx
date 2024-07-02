import classNames from 'classnames/bind';
import Button from '../Button/Button';
import Arrow from '../../assets/icons/buttons/arrowDownwardFilled.svg?react';
import styles from './sortingMenu.module.css';

const cx = classNames.bind(styles);

export interface SortingMenuData {
  label: string;
  sortingKey: string | number;
}

interface SortingMenuProps {
  sortOptions: SortingMenuData[];
  selectedOption: SortingMenuData;
  isSortDescending: boolean;
  setIsSortDescending: (boolean: boolean) => void;
  setData: (selectedOption: SortingMenuData) => void;
}

export default function SortingMenu({
  sortOptions,
  selectedOption,
  isSortDescending,
  setIsSortDescending,
  setData,
}: SortingMenuProps) {
  const handleClick = (selected: SortingMenuData) => {
    if (selectedOption?.sortingKey === selected.sortingKey) {
      setIsSortDescending(!isSortDescending);
    } else {
      setData(selected);
      setIsSortDescending(false);
    }
  };

  return (
    <div className={styles.container}>
      <span>Sort by</span>
      <ul className={styles.sort}>
        {sortOptions.map(({ label, sortingKey }) => (
          <li
            className={cx('option', { selected: selectedOption?.sortingKey === sortingKey })}
            key={sortingKey}>
            <Button
              focusColor="orange"
              type="button"
              category="tertiary"
              size="xsmall"
              isUppercase
              onClick={() => handleClick({ label, sortingKey })}>
              <span className={cx('arrow', 'hidden')}>
                <Arrow />
              </span>
              {label}
              <span
                role="img"
                aria-label={isSortDescending ? `descending sorting` : `ascending sorting`}
                className={cx(
                  'arrow',
                  { selected: isSortDescending },
                  { hidden: selectedOption?.sortingKey !== sortingKey }
                )}>
                <Arrow />
              </span>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

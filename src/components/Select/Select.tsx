import classNames from 'classnames/bind';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import useHandleOutsideClick from '../../hooks/useHandleOutsideClick';
import styles from './select.module.css';

const cx = classNames.bind(styles);

export interface SelectData {
  id: number;
  name: string;
}
export interface SelectProps {
  options: SelectData[];
  label: string;
  placeholder: string;
  isReset?: boolean;
  setData: (selected: SelectData) => void;
}

export default function Select({
  label,
  placeholder,
  options,
  isReset = false,
  setData,
}: SelectProps) {
  const [selected, setSelected] = useState(placeholder);
  const [isSelectOptionsOpen, setIsSelectOptionsOpen] = useState(false);
  const dropDownRef = useRef(null);

  useEffect(() => {
    if (isReset) {
      setSelected(placeholder);
      setData(options[0]);
    }
  }, [isReset, setData, options, placeholder]);

  const handleOptionClick = (e: MouseEvent<HTMLButtonElement>, selectedItem: SelectData) => {
    e.preventDefault();
    setData(selectedItem);
    setSelected(selectedItem.name);
    setIsSelectOptionsOpen(false);
  };

  const handleClick = () => {
    setIsSelectOptionsOpen((prev) => !prev);
  };

  const handleKeyDown = (key: string, selectedItem: SelectData) => {
    if (key === 'Enter') {
      setData(selectedItem);
      setSelected(selectedItem.name);
      setIsSelectOptionsOpen(false);
    } else if (key === 'Escape') {
      setIsSelectOptionsOpen(false);
    }
  };

  const renderOptions = () => (
    <ul className={styles.dropDown}>
      {options?.map(({ id, name }) => (
        <li key={id}>
          <button
            type="button"
            className={cx('options', { selected: selected === name })}
            onKeyDown={(e) => handleKeyDown(e.key, { id, name })}
            onClick={(e) => handleOptionClick(e, { id, name })}>
            {name}
          </button>
        </li>
      ))}
    </ul>
  );

  useHandleOutsideClick(dropDownRef.current, () => setIsSelectOptionsOpen(false));

  return (
    <label className={styles.container} htmlFor={label} ref={dropDownRef}>
      {label}
      <input
        readOnly
        type="text"
        className={cx('selectField', { optionsOpen: isSelectOptionsOpen })}
        id={label.trim().split(' ').join('')}
        placeholder={selected}
        onClick={handleClick}
        onKeyDown={handleClick}
      />
      {isSelectOptionsOpen && renderOptions()}
    </label>
  );
}

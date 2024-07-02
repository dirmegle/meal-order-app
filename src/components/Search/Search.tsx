import classNames from 'classnames/bind';
import { MouseEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import useHandleOutsideClick from '../../hooks/useHandleOutsideClick';
import IconButton from '../IconButton/IconButton';
import ClearSearchField from '../../assets/icons/buttons/closeFilled.svg?react';
import Autocomplete from '../Autocomplete/Autocomplete';
import styles from './search.module.css';

const cx = classNames.bind(styles);

export interface SearchProps {
  autocompleteData: string[];
  label: string;
  placeholder: string;
  isLoading?: boolean;
  isReset?: boolean;
  searchValue: string;
  setData: (selected: string) => void;
}

export default function Search({
  autocompleteData,
  label,
  placeholder,
  isLoading = false,
  isReset = false,
  searchValue,
  setData,
}: SearchProps) {
  const autocompleteRef = useRef(null);
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);

  useEffect(() => {
    if (isReset) {
      setData('');
    }
  }, [isReset, setData]);

  const handleSelect = (e: MouseEvent<HTMLButtonElement>, selected: string) => {
    e.preventDefault();
    setIsAutocompleteOpen(false);
    setData(selected);
  };

  const filteredAutocomplete = useMemo(
    () =>
      autocompleteData
        ?.filter((data) => data.toLowerCase().includes(searchValue.trim().toLowerCase()))
        .sort((a, b) => a.localeCompare(b)),
    [autocompleteData, searchValue]
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, selected: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setData(selected);
      setIsAutocompleteOpen(false);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsAutocompleteOpen(false);
    }
  };

  const renderNoActionElement = (text: string) => (
    <span className={cx('loadingNoResults')}>{text}</span>
  );

  const renderClearButton = () => (
    <div className={styles.iconWrapper}>
      <IconButton
        onClick={() => {
          setIsAutocompleteOpen(false);
          setData('');
        }}
        size="small"
        category="tertiary"
        ariaLabel="Clear search field">
        <ClearSearchField />
      </IconButton>
    </div>
  );

  useHandleOutsideClick(autocompleteRef.current, () => setIsAutocompleteOpen(false));

  return (
    <label className={styles.container} htmlFor={label} ref={autocompleteRef}>
      {label}
      <input
        autoComplete="off"
        type="text"
        className={cx('searchField', { iconClear: searchValue })}
        id={label.trim().split(' ').join('')}
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => {
          setData(e.target.value);
          setIsAutocompleteOpen(true);
        }}
      />
      {searchValue && renderClearButton()}
      {isAutocompleteOpen &&
        (isLoading ? (
          renderNoActionElement('Loading...')
        ) : (
          <>
            {filteredAutocomplete.length !== 0 && (
              <Autocomplete
                options={filteredAutocomplete}
                onClick={handleSelect}
                onKeyDown={handleKeyDown}
              />
            )}
            {filteredAutocomplete.length === 0 && renderNoActionElement('No results')}
          </>
        ))}
    </label>
  );
}

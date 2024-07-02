import { MouseEvent, KeyboardEvent } from 'react';
import styles from './autocomplete.module.css';

interface AutocompleteProps {
  options: string[];
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>, selected: string) => void;
  onClick: (e: MouseEvent<HTMLButtonElement>, selected: string) => void;
}

export default function Autocomplete({ options, onKeyDown, onClick }: AutocompleteProps) {
  return (
    <ul className={styles.autocomplete}>
      {options.map((option) => (
        <li key={option}>
          <button
            type="button"
            className={styles.options}
            onKeyDown={(e) => onKeyDown(e, option)}
            onClick={(e) => onClick(e, option)}>
            {option}
          </button>
        </li>
      ))}
    </ul>
  );
}

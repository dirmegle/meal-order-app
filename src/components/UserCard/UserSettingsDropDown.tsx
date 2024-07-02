import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../utils/authorizeUser';
import styles from './userSettingsDropDown.module.css';

interface UserSettingsDropDownProps {
  onClose: () => void;
  isVisible: boolean;
}

export default function UserSettingsDropDown({ isVisible, onClose }: UserSettingsDropDownProps) {
  const navigate = useNavigate();
  const dropDownRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (dropDownRef.current && target.getAttribute('data-button') === 'settingDropDown') {
        return;
      }
      if (dropDownRef.current && !(dropDownRef.current as HTMLElement).contains(target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div
      role="menu"
      aria-label="settings menu"
      onClick={onClose}
      onKeyDown={onClose}
      tabIndex={0}
      className={styles.dropDownCotainer}>
      {isVisible && (
        <button
          ref={dropDownRef}
          className={styles.button}
          type="button"
          aria-label="log out"
          role="menuitem"
          onClick={() => {
            logout();
            navigate('/login');
          }}>
          <span className={styles.logOutIcon} />
          Log Out
        </button>
      )}
    </div>
  );
}

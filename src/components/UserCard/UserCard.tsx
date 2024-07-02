import { useState } from 'react';
import UserSettingsDropDown from './UserSettingsDropDown';
import userDefaultPicture from '../../assets/icons/defaultUserAvatar.svg';
import IconButton from '../IconButton/IconButton';
import CartIcon from '../../assets/icons/cart.svg?react';
import styles from './userCard.module.css';

interface UserCardProps {
  name: string;
  lastName: string;
  imgSrc: string;
  cartCount: number;
  balance: number;
  isCartOpen: boolean;
  onClick: () => void;
}

export default function UserCard({
  name,
  lastName,
  cartCount,
  balance,
  imgSrc,
  isCartOpen,
  onClick,
}: UserCardProps) {
  const [isUserSettingOpen, setIsUserSettingOpen] = useState(false);
  const handlesUserSettingOpen = () => {
    setIsUserSettingOpen(!isUserSettingOpen);
  };

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <div className={styles.imgWrapper}>
          <img
            className={styles.userImage}
            src={imgSrc}
            alt="user avatar"
            onError={(e) => {
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src = userDefaultPicture;
            }}
          />
          <button
            className={styles.accSettingsButton}
            onClick={handlesUserSettingOpen}
            aria-label={isUserSettingOpen ? 'Close user settings' : 'Open user settings'}
            aria-expanded={isUserSettingOpen}
            type="button"
            data-button="settingDropDown"
          />
          <UserSettingsDropDown onClose={handlesUserSettingOpen} isVisible={isUserSettingOpen} />
        </div>
        <p className={styles.userName}>
          {name} {lastName}
        </p>
      </div>
      <div className={styles.details}>
        <div className={styles.balance}>
          <p>Balance</p>
          <p>€{balance.toFixed(2)}</p>
        </div>
        <div data-cart-count={cartCount} className={styles.cartIconWrapper}>
          <IconButton
            ariaExpanded={isCartOpen}
            ariaLabel={isCartOpen ? 'Close cart' : 'Open cart'}
            category="outlined"
            size="medium"
            onClick={onClick}>
            <CartIcon className={styles.cartIcon} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

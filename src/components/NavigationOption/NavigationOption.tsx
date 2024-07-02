import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './navigationOption.module.css';

interface NavigationOptionProps {
  isExpanded: boolean;
  pageIconUrl: string;
  desktopLinkText: string;
  mobileLinkText: string;
  link: string;
}

export default function NavigationOption({
  isExpanded,
  pageIconUrl,
  desktopLinkText,
  mobileLinkText,
  link,
}: NavigationOptionProps) {
  const navigationOptionClasses = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.navigationOption, {
      [styles.collapse]: !isExpanded,
      [styles.optionActive]: isActive,
    });

  return (
    <NavLink className={navigationOptionClasses} to={link}>
      <img src={pageIconUrl} alt={desktopLinkText} />
      <span className={styles.pageTitleDesktop}>{desktopLinkText}</span>
      <span className={styles.pageTitleMobile}>{mobileLinkText}</span>
    </NavLink>
  );
}

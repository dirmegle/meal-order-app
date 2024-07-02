import { useEffect, useState } from 'react';
import classNames from 'classnames';
import NavigationOption from '../NavigationOption/NavigationOption';
import LogoHorizontal from '../../assets/icons/logo/logoHorizontal.svg?react';
import LogoVertical from '../../assets/icons/logo/logoVertical.svg?react';
import IconButton from '../IconButton/IconButton';
import ArrowLeft from '../../assets/icons/buttons/arrowLeftFilled.svg?react';
import ArrowRight from '../../assets/icons/buttons/arrowRightFilled.svg?react';
import { getNavLinks } from '../../router/PagesConfig';
import styles from './navigation.module.css';

export default function Navigation() {
  const [isExpanded, setIsExpanded] = useState(() => {
    const savedExpansionSetting = localStorage.getItem('isExpanded');
    return savedExpansionSetting !== null ? JSON.parse(savedExpansionSetting) : true;
  });

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    localStorage.setItem('isExpanded', JSON.stringify(isExpanded));
  }, [isExpanded]);

  const navClassNames = classNames(
    styles.navigationContainer,
    isExpanded ? styles.navExpanded : styles.navCollapsed
  );

  const navLinksToDisplay = getNavLinks().map(
    ({ path, pageIconUrl, desktopLinkText, mobileLinkText }) => (
      <NavigationOption
        key={path}
        isExpanded={isExpanded}
        pageIconUrl={pageIconUrl}
        desktopLinkText={desktopLinkText}
        mobileLinkText={mobileLinkText}
        link={path}
      />
    )
  );

  return (
    <div className={navClassNames}>
      <div className={styles.imageContainer}>
        <span>{isExpanded ? <LogoHorizontal /> : <LogoVertical />}</span>
      </div>
      <nav className={styles.navigationLinks}>{navLinksToDisplay}</nav>
      <div className={styles.buttonContainer}>
        <IconButton
          onClick={handleClick}
          size="small"
          category="accent"
          ariaLabel={isExpanded ? 'collapse menu' : 'expand menu'}>
          {isExpanded ? <ArrowLeft /> : <ArrowRight />}
        </IconButton>
      </div>
    </div>
  );
}

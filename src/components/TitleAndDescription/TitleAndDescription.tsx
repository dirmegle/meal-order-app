import React from 'react';
import styles from './TitleAndDescription.module.css';

interface Data {
  title: string;
  description: string;
  descriptionHtmlTag?: string;
}

export default function TitleAndDescription({
  title,
  description,
  descriptionHtmlTag = 'h2',
}: Data) {
  // if weekRangeFormat prop won't be used - will render title and description only
  const descriptionStyle =
    descriptionHtmlTag === 'h2' ? styles.descriptionHeading : styles.descriptionParagraph;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.headline}>{title}</h1>
      {React.createElement(descriptionHtmlTag, { className: descriptionStyle }, description)}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import bookTableOfContents from './resources/table-of-contents';

export default function Home() {
  const [completedTopics, setCompletedTopics] = useState(
    JSON.parse(localStorage.getItem('completedTopics')) || [],
  );

  const tableOfContents = bookTableOfContents.map(element => {
    const elementId = element.split(' ').join('-');
    return (
      <li key={elementId}>
        <label className={styles.container} for={elementId}>
          <input
            className={styles.checkbox}
            type='checkbox'
            id={elementId}
            checked={completedTopics.includes(elementId)}
            onChange={() => {
              if (completedTopics.includes(elementId)) {
                setCompletedTopics(
                  completedTopics.filter(topic => topic !== elementId),
                );
              } else {
                setCompletedTopics([...completedTopics, elementId]);
              }
            }}
          />
          {element}
          <span className={styles.checkmark}></span>
        </label>
      </li>
    );
  });

  useEffect(() => {
    // Store completed topics in local storage
    localStorage.setItem('completedTopics', JSON.stringify(completedTopics));
  }, [completedTopics]);

  return (
    <main className={styles.mainContainer}>
      <header className={styles.header}>
        <h1 className={styles.mainHeader}>
          Studying{' '}
          <span className={styles.mainHeaderDetail}>
            JavaScrip: The Definitive Guide
          </span>
        </h1>
        <div className={styles.subHeaderContainer}>
          <div>
            <p>Started on 29/04/2024</p>
            <p>Projected end on 29/07/2024</p>
          </div>
          <div className={styles.verticalLine}></div>
          <div className={styles.goal}>
            <p>
              <b>Goal:</b> to become highly proficient in JavaScript
            </p>
          </div>
        </div>
      </header>
      <div className={styles.mainSection}>
        <aside className={styles.aside}>{tableOfContents}</aside>
        <section>
          <progress
            className={styles.progress}
            id='file'
            max={bookTableOfContents.length}
            value={completedTopics.length}>
            {(
              (completedTopics.length * 100) /
              bookTableOfContents.length
            ).toFixed(2)}
            %
          </progress>
          {(
            (completedTopics.length * 100) /
            bookTableOfContents.length
          ).toFixed(2)}
          %
        </section>
      </div>
    </main>
  );
}

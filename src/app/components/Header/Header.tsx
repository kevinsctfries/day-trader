import React from "react";
import styles from "./Header.module.scss";

interface HeaderProps {
  currentDay: number;
  onNextDay: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentDay, onNextDay }) => {
  return (
    <header className={styles.header}>
      <div className={styles.metric}>
        <span className={styles.label}>Cash Available:</span>
        <span className={styles.value}>$25,000</span>
      </div>
      <div className={styles.metric}>
        <span className={styles.label}>Net Worth:</span>
        <span className={styles.value}>$25,000</span>
      </div>
      <button onClick={onNextDay}>Next Day</button>
      <span>Day: {currentDay}</span>
    </header>
  );
};

export default Header;

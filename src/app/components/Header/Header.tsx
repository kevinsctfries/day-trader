import React from "react";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.metric}>
        <span className={styles.label}>Cash Available:</span>
        <span className={styles.value}>$50,000</span>
      </div>
      <div className={styles.metric}>
        <span className={styles.label}>Net Worth:</span>
        <span className={styles.value}>$500,000</span>
      </div>
    </header>
  );
};

export default Header;

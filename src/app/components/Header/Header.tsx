import React from "react";
import styles from "./Header.module.scss";

interface HeaderProps {
  currentDay: number;
  onNextDay: () => void;
  cash: number;
  netWorth: number;
}

export default function Header({
  currentDay,
  onNextDay,
  cash,
  netWorth,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.metric}>
        <span className={styles.label}>Cash Available:</span>
        <span className={styles.value}>
          {cash.toLocaleString("en-US", { style: "currency", currency: "USD" })}
        </span>
      </div>
      <div className={styles.metric}>
        <span className={styles.label}>Net Worth:</span>
        <span className={styles.value}>
          {netWorth.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      </div>
      <button onClick={onNextDay}>Next Day</button>
      <span>Day: {currentDay}</span>
    </header>
  );
}

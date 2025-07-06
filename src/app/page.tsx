import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1>DayTrader</h1>
          <p>
            Test your instincts and strategy in this stock market simulation.
            Buy low, sell high, and try to build your fortune in just 100 days.
          </p>
          <p>
            <strong>Disclaimer:</strong> This is a fictional game using
            simulated data. It is <em>not</em> financial advice and does
            <em> not</em> reflect real-world stock trading or investments.
          </p>
          <Link href="/dashboard">
            <button className={styles.cta}>Play DayTrader</button>
          </Link>
        </div>
      </main>
    </div>
  );
}

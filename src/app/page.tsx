import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          <h1>DayTrader</h1>
          <input type="text" placeholder="Username" required />
          <input type="text" placeholder="Password" required />
          <Link href="/dashboard">
            <button>Login</button>
          </Link>
        </div>
      </main>
    </div>
  );
}

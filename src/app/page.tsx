import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          <input type="text" placeholder="Username" required />
          <input type="text" placeholder="Password" required />
          <button>Login</button>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}

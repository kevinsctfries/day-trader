import React from "react";
import styles from "./page.module.scss";
import StockTable from "../components/StockTable/StockTable";

const Dashboard = () => {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.top}>
          <div className={styles.left}>
            <StockTable />
          </div>
          <div className={styles.right}></div>
        </div>
        <div className={styles.bottom}></div>
      </main>
    </div>
  );
};

export default Dashboard;

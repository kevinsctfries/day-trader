import React from "react";
import styles from "./page.module.scss";
import StockTable from "../components/StockTable/StockTable";
import StockChart from "../components/StockChart/StockChart";
import Portfolio from "../components/Portfolio/Portfolio";
import Header from "../components/Header/Header";

const Dashboard = () => {
  return (
    <div className={styles.page}>
      <header>
        <Header />
      </header>
      <main className={styles.main}>
        <div className={styles.top}>
          <div className={styles.left}>
            <StockTable />
          </div>
          <div className={styles.right}>
            <StockChart />
          </div>
        </div>
        <div className={styles.bottom}>
          <Portfolio />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

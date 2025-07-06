"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import StockTable from "../components/StockTable/StockTable";
import StockChart from "../components/StockChart/StockChart";
import Portfolio from "../components/Portfolio/Portfolio";
import Header from "../components/Header/Header";
import { BaseStock } from "@/app/types";

export default function Dashboard() {
  const [baseStocks, setBaseStocks] = useState<BaseStock[]>([]);
  const [selectedStock, setSelectedStock] = useState<BaseStock | null>(null);
  const [currentDay, setCurrentDay] = useState(0);

  useEffect(() => {
    fetch("/baseStocks.json")
      .then(res => res.json())
      .then(data => setBaseStocks(data))
      .catch(err => console.error("Failed to load baseStocks:", err));
  }, []);

  const nextDay = () => setCurrentDay(prev => prev + 1);

  return (
    <div className={styles.page}>
      <header>
        <Header currentDay={currentDay} onNextDay={nextDay} />
      </header>
      <main className={styles.main}>
        <div className={styles.top}>
          <div className={styles.left}>
            <StockTable
              day={currentDay}
              baseStocks={baseStocks}
              onSelectStock={setSelectedStock}
            />
          </div>
          <div className={styles.right}>
            <StockChart stock={selectedStock} currentDay={currentDay} />
          </div>
        </div>
        <div className={styles.bottom}>
          <Portfolio />
        </div>
      </main>
    </div>
  );
}

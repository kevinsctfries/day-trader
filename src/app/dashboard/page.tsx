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
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    fetch("/baseStocks.json")
      .then(res => res.json())
      .then(data => setBaseStocks(data))
      .catch(err => console.error("Failed to load baseStocks:", err));
  }, []);

  const nextDay = () => setCurrentDay(prev => prev + 1);

  useEffect(() => {
    if (currentDay === 1) {
      setGameOver(true);
    }
  }, [currentDay]);

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

      {gameOver && (
        <div className={styles.gameOver}>
          <span className={styles.overMessage}>YOU DID IT!</span>
          <span className={styles.gameStats}>You made: $1,000,000</span>
          <button onClick={() => window.location.reload()}>Play Again</button>
        </div>
      )}
    </div>
  );
}

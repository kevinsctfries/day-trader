"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import StockTable from "../components/StockTable/StockTable";
import StockChart from "../components/StockChart/StockChart";
import Portfolio from "../components/Portfolio/Portfolio";
import Header from "../components/Header/Header";
import Orders from "../components/Orders/Orders";
import { stockPrice } from "../utils/priceGenerator";
import { netWorth } from "../utils/portfolio";
import { BaseStock, PortfolioState } from "@/app/types";
import News from "../components/News/News";
import Upgrades from "../components/Upgrades/Upgrades";

export default function Dashboard() {
  const [baseStocks, setBaseStocks] = useState<BaseStock[]>([]);
  const [selectedStock, setSelectedStock] = useState<BaseStock | null>(null);
  const [currentDay, setCurrentDay] = useState(0);
  const [portfolio, setPortfolio] = useState<PortfolioState>({
    cash: 25000,
    holdings: [],
  });
  const [gameOver, setGameOver] = useState(false);

  const Tabs = {
    PORTFOLIO: "Portfolio",
    ORDERS: "Orders",
    NEWS: "News",
    UPGRADES: "Upgrades",
  };

  const [activeTab, setActiveTab] = useState(Tabs.ORDERS);

  useEffect(() => {
    fetch("/baseStocks.json")
      .then(res => res.json())
      .then(data => setBaseStocks(data))
      .catch(err => console.error("Failed to load baseStocks:", err));
  }, []);

  const nextDay = () => setCurrentDay(prev => prev + 1);

  useEffect(() => {
    if (currentDay === 100) {
      setGameOver(true);
    }
  }, [currentDay]);

  const calculatedStocks = stockPrice(baseStocks, currentDay);

  const currentPrices: Record<string, number> = {};
  calculatedStocks.forEach(s => {
    currentPrices[s.symbol] = s.price;
  });

  return (
    <div className={styles.page}>
      <header>
        <Header
          currentDay={currentDay}
          onNextDay={nextDay}
          cash={portfolio.cash}
          netWorth={netWorth(portfolio, currentPrices)}
        />
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
          <div className={styles.tabButtons}>
            <button onClick={() => setActiveTab(Tabs.ORDERS)}>Orders</button>
            <button onClick={() => setActiveTab(Tabs.PORTFOLIO)}>
              Portfolio
            </button>
            <button onClick={() => setActiveTab(Tabs.NEWS)}>News</button>
            <button onClick={() => setActiveTab(Tabs.UPGRADES)}>
              Upgrades
            </button>
          </div>
          <div className={styles.tabContent}>
            {activeTab === Tabs.ORDERS && (
              <Orders
                baseStocks={baseStocks}
                day={currentDay}
                cash={portfolio.cash}
                holdings={portfolio.holdings}
                onUpdatePortfolio={setPortfolio}
              />
            )}
            {activeTab === Tabs.PORTFOLIO && <Portfolio />}
            {activeTab === Tabs.NEWS && <News />}
            {activeTab === Tabs.UPGRADES && <Upgrades />}
          </div>
        </div>
      </main>

      {gameOver && (
        <div className={styles.gameOver}>
          <span className={styles.overMessage}>YOU DID IT!</span>
          <span className={styles.gameStats}>
            Your Net Worth: $
            {netWorth(portfolio, currentPrices).toLocaleString()}
          </span>
          <button onClick={() => window.location.reload()}>Play Again</button>
        </div>
      )}
    </div>
  );
}

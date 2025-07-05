"use client";

import { useState, useEffect } from "react";
import styles from "./StockTable.module.scss";

interface Stock {
  symbol: string;
  name: string;
  price: number;
}

export default function StockTable() {
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    fetch("/stocks.json")
      .then(res => res.json())
      .then(data => setStocks(data))
      .catch(err => console.error("Error fetching stocks:", err));
  }, []);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map(stock => (
          <tr key={stock.symbol}>
            <td>{stock.symbol}</td>
            <td>{stock.name}</td>
            <td>${stock.price.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

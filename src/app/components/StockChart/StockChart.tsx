"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./StockChart.module.scss";
import { getStockPrice } from "@/app/utils/priceGenerator";
import { BaseStock } from "@/app/types";
import { useState } from "react";

interface Props {
  stock: BaseStock | null;
  currentDay: number;
}

export default function StockChart({ stock, currentDay }: Props) {
  const [days, setDays] = useState("7");

  if (!stock) {
    return (
      <div className={styles.selectMessage}>
        Select a stock to view its chart
      </div>
    );
  }

  const visibleDays =
    days === "YTD" ? currentDay + 1 : Math.min(currentDay + 1, parseInt(days));
  const startDay = currentDay - visibleDays + 1;

  const chartData = Array.from({ length: visibleDays }, (_, i) => {
    const actualDay = startDay + i;
    return {
      name: `Day ${actualDay}`,
      price: getStockPrice(
        stock.symbol,
        actualDay,
        stock.basePrice,
        stock.beta
      ),
    };
  });

  return (
    <div className={styles.main}>
      <div className={styles.rangeSelector}>
        <label htmlFor="range">Range:</label>
        <select id="range" value={days} onChange={e => setDays(e.target.value)}>
          <option value="7">7 Days</option>
          <option value="30">1 Month</option>
          <option value="YTD">YTD</option>
        </select>
      </div>

      <div className={styles.responsiveContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

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
import { getStockPriceHistory } from "@/app/utils/priceGenerator";
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
  const startDay = Math.max(0, currentDay - visibleDays + 1);

  const priceHistory = getStockPriceHistory(
    stock.symbol,
    currentDay,
    stock.basePrice,
    stock.beta
  );

  const chartData = Array.from({ length: visibleDays }, (_, i) => {
    const actualDay = startDay + i;
    return {
      name: `Day ${actualDay}`,
      price: priceHistory[actualDay],
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
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={2}
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={["auto", "auto"]}
              tickLine={false}
              axisLine={false}
              tickMargin={2}
              tick={{ fontSize: 12 }}
              width={40}
            />
            <Tooltip />
            <Line
              type="linear"
              dataKey="price"
              stroke="#8884d8"
              isAnimationActive={false}
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

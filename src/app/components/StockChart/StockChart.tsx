"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./StockChart.module.scss";
import { getStockPrice } from "@/app/utils/priceGenerator";
import { BaseStock } from "@/app/types";

interface Props {
  stock: BaseStock | null;
  currentDay: number;
}

export default function StockChart({ stock, currentDay }: Props) {
  if (!stock) {
    return (
      <div className={styles.selectMessage}>
        Select a stock to view its chart
      </div>
    );
  }

  const chartData = Array.from({ length: currentDay + 1 }, (_, i) => ({
    name: `Day ${i}`,
    price: getStockPrice(stock.symbol, i, stock.basePrice, stock.beta),
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={["auto", "auto"]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}

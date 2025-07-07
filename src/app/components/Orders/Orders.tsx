"use client";

import { BaseStock } from "@/app/types";
import { stockPrice } from "@/app/utils/stocks";
import styles from "./Orders.module.scss";

interface Props {
  day: number;
  baseStocks: BaseStock[];
}

export default function Orders({ day, baseStocks }: Props) {
  const calculatedStocks = stockPrice(baseStocks, day);

  return (
    <div className={styles.main}>
      <table>
        <thead>
          <tr>
            <th scope="col">Symbol</th>
            <th scope="col">Name</th>
            <th scope="col">Shares Owned</th>
            <th scope="col">Buy</th>
            <th scope="col">Sell</th>
          </tr>
        </thead>
        <tbody>
          {calculatedStocks.map(stock => (
            <tr key={stock.symbol}>
              <td>{stock.symbol}</td>
              <td>{stock.name}</td>
              <td>${stock.price.toFixed(2)}</td>
              <td>
                <button>Buy</button>
              </td>
              <td>
                <button>Sell</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

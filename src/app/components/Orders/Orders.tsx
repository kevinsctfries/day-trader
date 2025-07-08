"use client";

import { BaseStock } from "@/app/types";
import { stockPrice } from "@/app/utils/stocks";
import PurchaseModal from "../PurchaseModal/PurchaseModal";
import styles from "./Orders.module.scss";
import { useState } from "react";
import SellModal from "../SellModal/SellModal";
import { getStockPrice } from "@/app/utils/priceGenerator";
import { buyShares, sellShares } from "@/app/utils/portfolio";
import { PortfolioState, Holding } from "@/app/types";

interface Props {
  day: number;
  baseStocks: BaseStock[];
  cash: number;
  holdings: Holding[];
  onUpdatePortfolio: (
    updater: (prev: PortfolioState) => PortfolioState
  ) => void;
}

export default function Orders({
  day,
  baseStocks,
  onUpdatePortfolio,
  cash,
  holdings,
}: Props) {
  const [showPurchase, setShowPurchase] = useState(false);
  const [showSell, setShowSell] = useState(false);
  const calculatedStocks = stockPrice(baseStocks, day);
  const [stock, setStock] = useState<BaseStock | null>(null);

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
          {calculatedStocks.map(stock => {
            const owned =
              holdings.find(h => h.symbol === stock.symbol)?.shares ?? 0;
            return (
              <tr key={stock.symbol}>
                <td>{stock.symbol}</td>
                <td>{stock.name}</td>
                <td>{owned}</td>
                <td>
                  <button
                    onClick={() => {
                      setShowPurchase(true);
                      setStock(stock);
                    }}>
                    Buy
                  </button>
                </td>
                <td>
                  <button onClick={() => setShowSell(true)}>Sell</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showPurchase && stock && (
        <PurchaseModal
          stockSymbol={stock.symbol}
          onClose={() => setShowPurchase(false)}
          onConfirm={qty => {
            const price = getStockPrice(
              stock.symbol,
              day,
              stock.basePrice,
              stock.beta
            );

            const cost = price * qty;
            if (cost > cash) {
              alert("Not enough cash!");
              return;
            }

            onUpdatePortfolio(prev =>
              buyShares(prev, stock.symbol, price, qty)
            );
            setShowPurchase(false);
          }}
        />
      )}
      {showSell && stock && (
        <SellModal
          stockSymbol={stock.symbol}
          onClose={() => setShowSell(false)}
          onConfirm={qty => {
            const price = getStockPrice(
              stock.symbol,
              day,
              stock.basePrice,
              stock.beta
            );

            onUpdatePortfolio(prev =>
              sellShares(prev, stock.symbol, price, qty)
            );
            setShowSell(false);
          }}
        />
      )}
    </div>
  );
}

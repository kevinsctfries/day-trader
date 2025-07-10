"use client";

import { BaseStock } from "@/app/types";
import { stockPrice } from "@/app/utils/priceGenerator";
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
  const [selectedPrice, setSelectedPrice] = useState<number>(0);

  return (
    <div className={styles.main}>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th scope="col">Symbol</th>
              <th scope="col">Company</th>
              <th scope="col">Owned</th>
              <th scope="col">Buy</th>
              <th scope="col">Sell</th>
            </tr>
          </thead>
          <tbody>
            {calculatedStocks.map(stock => {
              const owned =
                holdings.find(h => h.symbol === stock.symbol)?.shares ?? 0;
              const currentPrice = getStockPrice(
                stock.symbol,
                day,
                stock.basePrice,
                stock.beta
              );

              return (
                <tr key={stock.symbol}>
                  <td>
                    <div>
                      <strong>{stock.symbol}</strong>
                      <div>${currentPrice.toFixed(2)}</div>
                    </div>
                  </td>
                  <td>{stock.name}</td>
                  <td>{owned}</td>
                  <td>
                    <button
                      onClick={() => {
                        setSelectedPrice(currentPrice);
                        setShowPurchase(true);
                        setStock(stock);
                      }}>
                      Buy
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setSelectedPrice(currentPrice);
                        setStock(stock);
                        setShowSell(true);
                      }}>
                      Sell
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showPurchase && stock && (
        <PurchaseModal
          stockSymbol={stock.symbol}
          price={selectedPrice}
          cash={cash}
          onClose={() => setShowPurchase(false)}
          onConfirm={qty => {
            const cost = selectedPrice * qty;
            if (cost > cash) {
              alert("Not enough cash!");
              return;
            }

            onUpdatePortfolio(prev =>
              buyShares(prev, stock.symbol, selectedPrice, qty)
            );
            setShowPurchase(false);
          }}
        />
      )}
      {showSell && stock && (
        <SellModal
          stockSymbol={stock.symbol}
          owned={holdings.find(h => h.symbol === stock.symbol)?.shares ?? 0}
          onClose={() => setShowSell(false)}
          onConfirm={qty => {
            const owned =
              holdings.find(h => h.symbol === stock.symbol)?.shares ?? 0;

            if (owned === 0) {
              alert(`You don't own any shares of ${stock.symbol}`);
              return;
            } else if (qty > owned) {
              alert(`You only own ${owned} shares of ${stock.symbol}`);
              return;
            }

            onUpdatePortfolio(prev =>
              sellShares(prev, stock.symbol, selectedPrice, qty)
            );
            setShowSell(false);
          }}
        />
      )}
    </div>
  );
}

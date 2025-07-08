"use client";

import React, { useState } from "react";
import styles from "./PurchaseModal.module.scss";

interface PurchaseModalProps {
  stockSymbol: string;
  price: number;
  cash: number;
  onConfirm: (quantity: number) => void;
  onClose: () => void;
}

export default function PurchaseModal({
  stockSymbol,
  price,
  cash,
  onConfirm,
  onClose,
}: PurchaseModalProps) {
  const [quantity, setQuantity] = useState(1);
  const maxQuantity = Math.floor(cash / price);

  const handleMax = () => {
    setQuantity(maxQuantity);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(quantity);
  };

  return (
    <form className={styles.main} onSubmit={handleSubmit}>
      <div>
        <span>Buy {stockSymbol}</span>
        <div>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            placeholder="Shares"
          />
          <button onClick={() => onConfirm(quantity)}>Buy</button>
        </div>
        <button onClick={handleMax}>Buy Max</button>
        <button onClick={onClose}>Close</button>
      </div>
    </form>
  );
}

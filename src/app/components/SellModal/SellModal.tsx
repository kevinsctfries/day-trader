"use client";

import React, { useState } from "react";
import styles from "./SellModal.module.scss";

interface SellModalProps {
  stockSymbol: string;
  onConfirm: (quantity: number) => void;
  onClose: () => void;
}

export default function SellModal({
  stockSymbol,
  onConfirm,
  onClose,
}: SellModalProps) {
  const [quantity, setQuantity] = useState(1);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(quantity);
  };

  return (
    <form className={styles.main} onSubmit={handleSubmit}>
      <div>
        <span>Sell {stockSymbol}</span>
        <div>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            placeholder="Shares"
          />
          <button onClick={() => onConfirm(quantity)}>Sell</button>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </form>
  );
}

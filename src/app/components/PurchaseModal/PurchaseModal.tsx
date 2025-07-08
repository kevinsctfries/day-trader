"use client";

import React, { useState } from "react";
import styles from "./PurchaseModal.module.scss";

interface PurchaseModalProps {
  stockSymbol: string;
  onConfirm: (quantity: number) => void;
  onClose: () => void;
}

export default function PurchaseModal({
  stockSymbol,
  onConfirm,
  onClose,
}: PurchaseModalProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className={styles.main}>
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
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

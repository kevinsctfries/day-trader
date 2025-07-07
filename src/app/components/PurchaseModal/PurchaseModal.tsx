"use client";

import styles from "./PurchaseModal.module.scss";

interface PurchaseModalProps {
  onClose: () => void;
}

export default function PurchaseModal({ onClose }: PurchaseModalProps) {
  return (
    <div className={styles.main}>
      <div>
        <span>Hello World</span>
        <div>
          <input type="number" placeholder="number" />
          <button>Buy</button>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

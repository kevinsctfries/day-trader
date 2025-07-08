"use client";

import styles from "./SellModal.module.scss";

interface SellModalProps {
  onClose: () => void;
}

export default function SellModal({ onClose }: SellModalProps) {
  return (
    <div className={styles.main}>
      <div>
        <span>Hello World</span>
        <div>
          <input type="number" placeholder="number" />
          <button>Sell</button>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

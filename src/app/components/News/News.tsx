"use client";

import { BaseStock } from "@/app/types";
import { generateNewsArticles } from "@/app/utils/newsGenerator";
import styles from "./News.module.scss";
import { TrendingDown, TrendingUp } from "lucide-react";

interface NewsProps {
  baseStocks: BaseStock[];
  currentDay: number;
}

export default function News({ baseStocks, currentDay }: NewsProps) {
  const newsArticles = generateNewsArticles(baseStocks, currentDay);

  return (
    <div className={styles.main}>
      <h2>Market News</h2>
      {newsArticles.map(article => (
        <article key={article.id} className={styles.newsArticle}>
          <div className={styles.newsHeader}>
            <span
              className={`${styles.trendIndicator} ${
                styles[article.stock.trend]
              }`}>
              {article.stock.trend === "upward" ? (
                <TrendingUp />
              ) : article.stock.trend === "downward" ? (
                <TrendingDown />
              ) : (
                "→"
              )}
            </span>
            <span className={styles.stockSymbol}>{article.stock.symbol}</span>
            <span className={styles.newsDate}>{article.timestamp}</span>
          </div>
          <h3 className={styles.newsHeadline}>{article.headline}</h3>
          {article.summary && (
            <p className={styles.newsSummary}>{article.summary}</p>
          )}

          {/* TODO: maybe work on market categories idk */}
          {/* <div className={styles.newsCategory}>
            <span
              className={`${styles.categoryTag} ${styles[article.category]}`}>
              {article.category.charAt(0).toUpperCase() +
                article.category.slice(1)}
            </span>
          </div> */}
        </article>
      ))}
    </div>
  );
}

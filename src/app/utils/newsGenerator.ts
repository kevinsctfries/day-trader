import { BaseStock } from "@/app/types";

export interface NewsArticle {
  id: string;
  stock: BaseStock;
  headline: string;
  summary: string;
  timestamp: string;
  category: string;
}

export const newsTemplates = {
  upward: {
    market: {
      headlines: ["{company} has an upward trend"],
    },
  },
  downward: {
    market: {
      headlines: ["{company} has a downward trend"],
    },
  },
  neutral: {
    market: {
      headlines: ["{company} has a neutral trend"],
    },
  },
};

export function generateNewsArticles(
  baseStocks: BaseStock[],
  currentDay: number
): NewsArticle[] {
  const date = new Date();
  date.setDate(date.getDate() + (currentDay - 1));
  const timestamp = date.toISOString().split("T")[0];

  return baseStocks.flatMap(stock => {
    if (Math.random() < 0.5) {
      const template = newsTemplates[stock.trend].market;
      const headline = template.headlines[0].replace("{company}", stock.name);
      return [
        {
          id: `${stock.symbol}-${Date.now()}`,
          stock,
          headline,
          summary: "",
          timestamp,
          category: "market",
        },
      ];
    }
    return [];
  });
}

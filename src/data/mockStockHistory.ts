export interface StockHistoryData {
  date: string;
  price: number;
  volume: number;
}

// Generate mock historical data for the last 30 days
const generateMockHistory = (
  startPrice: number,
  volatility: number = 0.02
): StockHistoryData[] => {
  const data: StockHistoryData[] = [];
  const today = new Date();
  let currentPrice = startPrice;

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Random price movement
    const change = (Math.random() - 0.5) * 2 * volatility * currentPrice;
    currentPrice = Math.max(currentPrice + change, startPrice * 0.8); // Don't drop below 80% of start

    data.push({
      date: date.toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
      price: parseFloat(currentPrice.toFixed(2)),
      volume: Math.floor(Math.random() * 10000000) + 1000000,
    });
  }

  return data;
};

export const mockStockHistories = {
  "Infosys Ltd": generateMockHistory(1450, 0.025),
  "TCS Ltd": generateMockHistory(3250, 0.02),
  "HDFC Bank Ltd": generateMockHistory(1625, 0.018),
  "Reliance Industries": generateMockHistory(2450, 0.03),
};

// Portfolio overall history (weighted average)
export const portfolioHistory = generateMockHistory(500000, 0.015);

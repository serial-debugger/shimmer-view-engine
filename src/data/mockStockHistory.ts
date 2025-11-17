export interface StockHistoryData {
  date: string;
  price: number;
  volume: number;
}

// Generate mock historical data for specified number of days
const generateMockHistory = (
  startPrice: number,
  days: number = 30,
  volatility: number = 0.02
): StockHistoryData[] => {
  const data: StockHistoryData[] = [];
  const today = new Date();
  let currentPrice = startPrice;

  for (let i = days - 1; i >= 0; i--) {
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

// Generate extended historical data (5 years)
export const mockStockHistories = {
  "Infosys Ltd": generateMockHistory(1450, 1825, 0.025),
  "TCS Ltd": generateMockHistory(3250, 1825, 0.02),
  "HDFC Bank Ltd": generateMockHistory(1625, 1825, 0.018),
  "Reliance Industries": generateMockHistory(2450, 1825, 0.03),
};

// Portfolio overall history (weighted average)
export const portfolioHistory = generateMockHistory(500000, 1825, 0.015);

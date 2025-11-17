import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { mockStockHistories } from "@/data/mockStockHistory";

const STOCK_COLORS = {
  "Infosys Ltd": "hsl(var(--chart-1))",
  "TCS Ltd": "hsl(var(--chart-2))",
  "HDFC Bank Ltd": "hsl(var(--chart-3))",
  "Reliance Industries": "hsl(var(--chart-4))",
};

export const StockComparisonChart = () => {
  const [selectedStocks, setSelectedStocks] = useState<string[]>(["Infosys Ltd", "TCS Ltd"]);

  const toggleStock = (stock: string) => {
    setSelectedStocks((prev) =>
      prev.includes(stock) ? prev.filter((s) => s !== stock) : [...prev, stock]
    );
  };

  // Normalize data to percentage change from start
  const normalizeData = () => {
    if (selectedStocks.length === 0) return [];

    const allDates = mockStockHistories[selectedStocks[0] as keyof typeof mockStockHistories].map(
      (d) => d.date
    );

    return allDates.map((date, index) => {
      const dataPoint: any = { date };

      selectedStocks.forEach((stock) => {
        const stockData = mockStockHistories[stock as keyof typeof mockStockHistories];
        const startPrice = stockData[0].price;
        const currentPrice = stockData[index].price;
        const percentChange = ((currentPrice - startPrice) / startPrice) * 100;
        dataPoint[stock] = parseFloat(percentChange.toFixed(2));
      });

      return dataPoint;
    });
  };

  const data = normalizeData();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-xs text-muted-foreground mb-2">{payload[0].payload.date}</p>
          {payload.map((entry: any) => (
            <p
              key={entry.dataKey}
              className="text-sm font-semibold"
              style={{ color: entry.color }}
            >
              {entry.dataKey}: {entry.value > 0 ? "+" : ""}
              {entry.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      whileHover={{ y: -4 }}
    >
      <Card className="border-border hover:border-primary/20 transition-colors">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-lg font-light tracking-wide text-foreground mb-1">
                Stock Comparison
              </h3>
              <p className="text-xs text-muted-foreground font-light">
                Percentage change from start (Last 30 days)
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              {Object.keys(mockStockHistories).map((stock) => (
                <motion.div
                  key={stock}
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Checkbox
                    id={stock}
                    checked={selectedStocks.includes(stock)}
                    onCheckedChange={() => toggleStock(stock)}
                    className="border-border"
                  />
                  <Label
                    htmlFor={stock}
                    className="text-sm font-light cursor-pointer flex items-center gap-2"
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: STOCK_COLORS[stock as keyof typeof STOCK_COLORS],
                      }}
                    />
                    {stock}
                  </Label>
                </motion.div>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 pb-4">
          <AnimatePresence mode="wait">
            {selectedStocks.length > 0 ? (
              <motion.div
                key="chart"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                      tickLine={false}
                      axisLine={false}
                      interval="preserveStartEnd"
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}%`}
                      width={50}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }}
                      iconType="line"
                    />
                    {selectedStocks.map((stock) => (
                      <Line
                        key={stock}
                        type="monotone"
                        dataKey={stock}
                        stroke={STOCK_COLORS[stock as keyof typeof STOCK_COLORS]}
                        strokeWidth={2}
                        dot={false}
                        animationDuration={1000}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-[400px] flex items-center justify-center"
              >
                <p className="text-muted-foreground font-light">
                  Select stocks to compare
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

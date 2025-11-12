import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SectorSummary } from "@/types/portfolio";
import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

interface SectorGroupProps {
  sectorSummary: SectorSummary;
  index: number;
}

export const SectorGroup = ({ sectorSummary, index }: SectorGroupProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value);
  };

  const isProfit = sectorSummary.totalGainLoss >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
    >
      <Card className="border-border hover:border-primary/20 transition-colors mb-6 overflow-hidden">
        <CardHeader className="border-b border-border pb-4">
          <div className="flex items-center justify-between">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="text-xl font-light tracking-wide text-foreground"
            >
              {sectorSummary.sector}
            </motion.h3>
            <div className="flex items-center gap-6 text-sm font-light">
              <div className="text-right">
                <div className="text-xs text-muted-foreground mb-1">Investment</div>
                <div className="font-normal">{formatCurrency(sectorSummary.totalInvestment)}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground mb-1">Value</div>
                <div className="font-normal">{formatCurrency(sectorSummary.totalPresentValue)}</div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center gap-2 text-right"
              >
                <div>
                  <div className="text-xs text-muted-foreground mb-1">P&L</div>
                  <div className={`font-normal flex items-center gap-1 ${isProfit ? "text-success" : "text-destructive"}`}>
                    {formatCurrency(sectorSummary.totalGainLoss)}
                    {isProfit ? (
                      <TrendingUp className="h-3.5 w-3.5" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5" />
                    )}
                    <span className="text-xs">
                      ({isProfit ? "+" : ""}{sectorSummary.gainLossPercentage.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border">
                  <TableHead className="font-normal text-xs">Particulars</TableHead>
                  <TableHead className="text-right font-normal text-xs">Purchase Price</TableHead>
                  <TableHead className="text-right font-normal text-xs">Qty</TableHead>
                  <TableHead className="text-right font-normal text-xs">Investment</TableHead>
                  <TableHead className="text-right font-normal text-xs">Portfolio %</TableHead>
                  <TableHead className="text-center font-normal text-xs">Exchange</TableHead>
                  <TableHead className="text-right font-normal text-xs">CMP</TableHead>
                  <TableHead className="text-right font-normal text-xs">Present Value</TableHead>
                  <TableHead className="text-right font-normal text-xs">Gain/Loss</TableHead>
                  <TableHead className="text-right font-normal text-xs">P/E</TableHead>
                  <TableHead className="font-normal text-xs">Latest Earnings</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sectorSummary.stocks.map((stock, stockIndex) => {
                  const isStockProfit = stock.gainLoss >= 0;
                  return (
                    <motion.tr
                      key={stock.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 + stockIndex * 0.05 }}
                      className="border-border hover:bg-secondary/30 transition-colors"
                    >
                      <TableCell className="font-normal text-sm">{stock.particulars}</TableCell>
                      <TableCell className="text-right text-sm font-light">{formatCurrency(stock.purchasePrice)}</TableCell>
                      <TableCell className="text-right text-sm font-light">{stock.quantity}</TableCell>
                      <TableCell className="text-right text-sm font-light">{formatCurrency(stock.investment)}</TableCell>
                      <TableCell className="text-right text-sm font-light">{stock.portfolioPercentage.toFixed(1)}%</TableCell>
                      <TableCell className="text-center">
                        <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-xs font-light">
                          {stock.exchange}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-normal text-sm">{formatCurrency(stock.cmp)}</TableCell>
                      <TableCell className="text-right font-normal text-sm">{formatCurrency(stock.presentValue)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col items-end gap-0.5">
                          <span className={`font-normal text-sm ${isStockProfit ? "text-success" : "text-destructive"}`}>
                            {formatCurrency(stock.gainLoss)}
                          </span>
                          <span className={`text-xs font-light ${isStockProfit ? "text-success" : "text-destructive"}`}>
                            {isStockProfit ? "+" : ""}{stock.gainLossPercentage.toFixed(2)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-sm font-light">{stock.peRatio.toFixed(1)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground font-light">{stock.latestEarnings}</TableCell>
                    </motion.tr>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

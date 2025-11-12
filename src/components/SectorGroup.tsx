import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

interface SectorGroupProps {
  sectorSummary: SectorSummary;
}

export const SectorGroup = ({ sectorSummary }: SectorGroupProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value);
  };

  const isProfit = sectorSummary.totalGainLoss >= 0;

  return (
    <Card className="border-border mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">{sectorSummary.sector}</CardTitle>
          <div className="flex items-center gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Investment: </span>
              <span className="font-semibold">{formatCurrency(sectorSummary.totalInvestment)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Value: </span>
              <span className="font-semibold">{formatCurrency(sectorSummary.totalPresentValue)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">P&L: </span>
              <span className={`font-bold ${isProfit ? "text-success" : "text-destructive"}`}>
                {formatCurrency(sectorSummary.totalGainLoss)}
              </span>
              {isProfit ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span className={`font-bold ${isProfit ? "text-success" : "text-destructive"}`}>
                ({isProfit ? "+" : ""}{sectorSummary.gainLossPercentage.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary hover:bg-secondary">
                <TableHead className="font-semibold">Particulars</TableHead>
                <TableHead className="text-right font-semibold">Purchase Price</TableHead>
                <TableHead className="text-right font-semibold">Qty</TableHead>
                <TableHead className="text-right font-semibold">Investment</TableHead>
                <TableHead className="text-right font-semibold">Portfolio %</TableHead>
                <TableHead className="text-center font-semibold">Exchange</TableHead>
                <TableHead className="text-right font-semibold">CMP</TableHead>
                <TableHead className="text-right font-semibold">Present Value</TableHead>
                <TableHead className="text-right font-semibold">Gain/Loss</TableHead>
                <TableHead className="text-right font-semibold">P/E Ratio</TableHead>
                <TableHead className="font-semibold">Latest Earnings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sectorSummary.stocks.map((stock) => {
                const isStockProfit = stock.gainLoss >= 0;
                return (
                  <TableRow key={stock.id} className="hover:bg-secondary/50">
                    <TableCell className="font-medium">{stock.particulars}</TableCell>
                    <TableCell className="text-right">{formatCurrency(stock.purchasePrice)}</TableCell>
                    <TableCell className="text-right">{stock.quantity}</TableCell>
                    <TableCell className="text-right">{formatCurrency(stock.investment)}</TableCell>
                    <TableCell className="text-right">{stock.portfolioPercentage.toFixed(1)}%</TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold">
                        {stock.exchange}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-semibold">{formatCurrency(stock.cmp)}</TableCell>
                    <TableCell className="text-right font-semibold">{formatCurrency(stock.presentValue)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col items-end">
                        <span className={`font-bold ${isStockProfit ? "text-success" : "text-destructive"}`}>
                          {formatCurrency(stock.gainLoss)}
                        </span>
                        <span className={`text-xs ${isStockProfit ? "text-success" : "text-destructive"}`}>
                          ({isStockProfit ? "+" : ""}{stock.gainLossPercentage.toFixed(2)}%)
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{stock.peRatio.toFixed(1)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{stock.latestEarnings}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

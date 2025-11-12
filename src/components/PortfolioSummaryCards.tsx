import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet, DollarSign } from "lucide-react";
import { PortfolioSummary } from "@/types/portfolio";

interface PortfolioSummaryCardsProps {
  summary: PortfolioSummary;
}

export const PortfolioSummaryCards = ({ summary }: PortfolioSummaryCardsProps) => {
  const isProfit = summary.totalGainLoss >= 0;
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <Card className="border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(summary.totalInvestment)}</div>
          <p className="text-xs text-muted-foreground mt-1">Initial capital invested</p>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Present Value</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(summary.totalPresentValue)}</div>
          <p className="text-xs text-muted-foreground mt-1">Current portfolio value</p>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Gain/Loss</CardTitle>
          {isProfit ? (
            <TrendingUp className="h-4 w-4 text-success" />
          ) : (
            <TrendingDown className="h-4 w-4 text-destructive" />
          )}
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${isProfit ? "text-success" : "text-destructive"}`}>
            {formatCurrency(summary.totalGainLoss)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Absolute change</p>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Return (%)</CardTitle>
          {isProfit ? (
            <TrendingUp className="h-4 w-4 text-success" />
          ) : (
            <TrendingDown className="h-4 w-4 text-destructive" />
          )}
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${isProfit ? "text-success" : "text-destructive"}`}>
            {isProfit ? "+" : ""}{summary.gainLossPercentage.toFixed(2)}%
          </div>
          <p className="text-xs text-muted-foreground mt-1">Percentage return</p>
        </CardContent>
      </Card>
    </div>
  );
};

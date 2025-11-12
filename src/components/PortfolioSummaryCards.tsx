import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { PortfolioSummary } from "@/types/portfolio";
import { motion } from "framer-motion";

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

  const cards = [
    {
      label: "Total Investment",
      value: formatCurrency(summary.totalInvestment),
      subtitle: "Initial capital",
      delay: 0.1,
    },
    {
      label: "Present Value",
      value: formatCurrency(summary.totalPresentValue),
      subtitle: "Current portfolio",
      delay: 0.2,
    },
    {
      label: "Total Gain/Loss",
      value: formatCurrency(summary.totalGainLoss),
      subtitle: "Absolute change",
      isColored: true,
      delay: 0.3,
    },
    {
      label: "Return",
      value: `${isProfit ? "+" : ""}${summary.gainLossPercentage.toFixed(2)}%`,
      subtitle: "Percentage return",
      isColored: true,
      delay: 0.4,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      {cards.map((card, index) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: card.delay }}
          whileHover={{ y: -4 }}
        >
          <Card className="border-border hover:border-primary/20 transition-colors overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="text-xs font-light text-muted-foreground uppercase tracking-wider">
                  {card.label}
                </div>
                {card.isColored && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: card.delay + 0.2, type: "spring" }}
                  >
                    {isProfit ? (
                      <TrendingUp className="h-4 w-4 text-success" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    )}
                  </motion.div>
                )}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: card.delay + 0.1 }}
                className={`text-3xl font-light mb-1 ${
                  card.isColored
                    ? isProfit
                      ? "text-success"
                      : "text-destructive"
                    : "text-foreground"
                }`}
              >
                {card.value}
              </motion.div>
              <div className="text-xs text-muted-foreground font-light">
                {card.subtitle}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

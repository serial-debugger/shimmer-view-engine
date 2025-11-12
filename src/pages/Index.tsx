import { useState, useEffect } from "react";
import { PortfolioSummaryCards } from "@/components/PortfolioSummaryCards";
import { SectorGroup } from "@/components/SectorGroup";
import { mockStocks } from "@/data/mockPortfolio";
import { SectorSummary, PortfolioSummary } from "@/types/portfolio";
import { RefreshCw } from "lucide-react";

const Index = () => {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Group stocks by sector
  const groupBySector = (): SectorSummary[] => {
    const sectorMap = new Map<string, SectorSummary>();

    mockStocks.forEach((stock) => {
      if (!sectorMap.has(stock.sector)) {
        sectorMap.set(stock.sector, {
          sector: stock.sector,
          totalInvestment: 0,
          totalPresentValue: 0,
          totalGainLoss: 0,
          gainLossPercentage: 0,
          stocks: [],
        });
      }

      const sector = sectorMap.get(stock.sector)!;
      sector.stocks.push(stock);
      sector.totalInvestment += stock.investment;
      sector.totalPresentValue += stock.presentValue;
      sector.totalGainLoss += stock.gainLoss;
    });

    // Calculate gain/loss percentage for each sector
    sectorMap.forEach((sector) => {
      sector.gainLossPercentage = (sector.totalGainLoss / sector.totalInvestment) * 100;
    });

    return Array.from(sectorMap.values());
  };

  const calculatePortfolioSummary = (): PortfolioSummary => {
    const totalInvestment = mockStocks.reduce((sum, stock) => sum + stock.investment, 0);
    const totalPresentValue = mockStocks.reduce((sum, stock) => sum + stock.presentValue, 0);
    const totalGainLoss = totalPresentValue - totalInvestment;
    const gainLossPercentage = (totalGainLoss / totalInvestment) * 100;

    return {
      totalInvestment,
      totalPresentValue,
      totalGainLoss,
      gainLossPercentage,
    };
  };

  const sectorSummaries = groupBySector();
  const portfolioSummary = calculatePortfolioSummary();

  // Simulate real-time updates every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsRefreshing(true);
      setLastUpdate(new Date());
      setTimeout(() => setIsRefreshing(false), 500);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-foreground">Portfolio Dashboard</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              <span>Last updated: {formatTime(lastUpdate)}</span>
            </div>
          </div>
          <p className="text-muted-foreground">
            Real-time portfolio tracking with live market data
          </p>
        </div>

        {/* Summary Cards */}
        <PortfolioSummaryCards summary={portfolioSummary} />

        {/* Sector Groups */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-foreground">Holdings by Sector</h2>
          {sectorSummaries.map((sectorSummary) => (
            <SectorGroup key={sectorSummary.sector} sectorSummary={sectorSummary} />
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-8 p-4 rounded-lg bg-secondary border border-border">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Market data updates automatically every 15 seconds. 
            Current Market Price (CMP) is fetched from Yahoo Finance. 
            P/E Ratio and Latest Earnings are fetched from Google Finance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;

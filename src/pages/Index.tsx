import { useState, useEffect } from "react";
import { PortfolioHeader } from "@/components/PortfolioHeader";
import { PortfolioSummaryCards } from "@/components/PortfolioSummaryCards";
import { SectorGroup } from "@/components/SectorGroup";
import { mockStocks } from "@/data/mockPortfolio";
import { SectorSummary, PortfolioSummary } from "@/types/portfolio";
import { motion } from "framer-motion";

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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <PortfolioHeader lastUpdate={lastUpdate} isRefreshing={isRefreshing} />

        <PortfolioSummaryCards summary={portfolioSummary} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-2xl font-light tracking-wide mb-6 text-foreground">
            Holdings by Sector
          </h2>
          {sectorSummaries.map((sectorSummary, index) => (
            <SectorGroup key={sectorSummary.sector} sectorSummary={sectorSummary} index={index} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-8 p-6 rounded-xl bg-secondary/30 border border-border"
        >
          <p className="text-sm text-muted-foreground font-light leading-relaxed">
            <span className="font-normal text-foreground">Market Data:</span> Updates automatically every 15 seconds. 
            CMP from Yahoo Finance • P/E Ratio and Earnings from Google Finance
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;

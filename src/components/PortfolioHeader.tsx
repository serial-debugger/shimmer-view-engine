import { ThemeToggle } from "@/components/ThemeToggle";
import { RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

interface PortfolioHeaderProps {
  lastUpdate: Date;
  isRefreshing: boolean;
}

export const PortfolioHeader = ({ lastUpdate, isRefreshing }: PortfolioHeaderProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-5xl font-light tracking-tight text-foreground mb-2">
            Portfolio
          </h1>
          <p className="text-sm text-muted-foreground font-light">
            Real-time market insights at your fingertips
          </p>
        </div>
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 text-xs text-muted-foreground font-light"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`}
            />
            <span>{formatTime(lastUpdate)}</span>
          </motion.div>
          <ThemeToggle />
        </div>
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="h-[1px] bg-gradient-to-r from-border via-primary/20 to-border origin-left"
      />
    </motion.div>
  );
};

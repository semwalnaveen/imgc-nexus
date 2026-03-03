import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconClassName?: string;
  className?: string;
}

export function KPICard({ title, value, change, changeType = "neutral", icon: Icon, iconClassName, className }: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "rounded-lg border bg-card p-5 enterprise-shadow hover:enterprise-shadow-md transition-shadow duration-200",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {change && (
            <p className={cn("text-xs font-medium", {
              "text-success": changeType === "positive",
              "text-destructive": changeType === "negative",
              "text-muted-foreground": changeType === "neutral",
            })}>
              {change}
            </p>
          )}
        </div>
        <div className={cn("rounded-lg p-2.5", iconClassName || "bg-primary/10")}>
          <Icon className={cn("h-5 w-5", iconClassName ? "" : "text-primary")} />
        </div>
      </div>
    </motion.div>
  );
}

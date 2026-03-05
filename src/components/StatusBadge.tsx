import { cn } from "@/lib/utils";

type StatusType = "approved" | "rejected" | "pending" | "deviation" | "in-review" | "draft" | "processing" | "active" | "in-uw" | "low" | "medium" | "high";

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  approved: { label: "Approved", className: "bg-success/10 text-success border-success/20" },
  rejected: { label: "Rejected", className: "bg-destructive/10 text-destructive border-destructive/20" },
  pending: { label: "Pending", className: "bg-warning/10 text-warning border-warning/20" },
  deviation: { label: "Deviation", className: "bg-info/10 text-info border-info/20" },
  "in-review": { label: "In Review", className: "bg-primary/10 text-primary border-primary/20" },
  "in-uw": { label: "In UW", className: "bg-primary/10 text-primary border-primary/20" },
  draft: { label: "Draft", className: "bg-muted text-muted-foreground border-border" },
  processing: { label: "Processing", className: "bg-info/10 text-info border-info/20 animate-pulse-soft" },
  active: { label: "Active", className: "bg-success/10 text-success border-success/20" },
  low: { label: "Low Risk", className: "bg-success/10 text-success border-success/20" },
  medium: { label: "Medium Risk", className: "bg-warning/10 text-warning border-warning/20" },
  high: { label: "High Risk", className: "bg-destructive/10 text-destructive border-destructive/20" },
};

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={cn(
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
      config.className,
      className
    )}>
      <span className={cn("mr-1.5 h-1.5 w-1.5 rounded-full", {
        "bg-success": status === "approved" || status === "active" || status === "low",
        "bg-destructive": status === "rejected" || status === "high",
        "bg-warning": status === "pending" || status === "medium",
        "bg-info": status === "deviation" || status === "processing",
        "bg-primary": status === "in-review" || status === "in-uw",
        "bg-muted-foreground": status === "draft",
      })} />
      {config.label}
    </span>
  );
}

import { cn } from "@/lib/utils";

type StatusType = "approved" | "rejected" | "pending" | "deviation" | "in-review" | "draft" | "processing";

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  approved: { label: "Approved", className: "bg-success/10 text-success border-success/20" },
  rejected: { label: "Rejected", className: "bg-destructive/10 text-destructive border-destructive/20" },
  pending: { label: "Pending", className: "bg-warning/10 text-warning border-warning/20" },
  deviation: { label: "Deviation", className: "bg-info/10 text-info border-info/20" },
  "in-review": { label: "In Review", className: "bg-primary/10 text-primary border-primary/20" },
  draft: { label: "Draft", className: "bg-muted text-muted-foreground border-border" },
  processing: { label: "Processing", className: "bg-info/10 text-info border-info/20 animate-pulse-soft" },
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
        "bg-success": status === "approved",
        "bg-destructive": status === "rejected",
        "bg-warning": status === "pending",
        "bg-info": status === "deviation" || status === "processing",
        "bg-primary": status === "in-review",
        "bg-muted-foreground": status === "draft",
      })} />
      {config.label}
    </span>
  );
}

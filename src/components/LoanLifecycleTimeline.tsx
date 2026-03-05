import { cn } from "@/lib/utils";
import { Check, Clock, Circle, X } from "lucide-react";

interface LifecycleStage {
  label: string;
  status: "completed" | "current" | "pending" | "rejected";
  timestamp?: string;
  user?: string;
}

interface LoanLifecycleTimelineProps {
  stages: LifecycleStage[];
  className?: string;
}

const statusConfig = {
  completed: { icon: Check, color: "bg-success text-success-foreground", line: "bg-success", text: "text-success" },
  current: { icon: Clock, color: "bg-primary text-primary-foreground", line: "bg-primary/30", text: "text-primary" },
  pending: { icon: Circle, color: "bg-muted text-muted-foreground", line: "bg-border", text: "text-muted-foreground" },
  rejected: { icon: X, color: "bg-destructive text-destructive-foreground", line: "bg-destructive/30", text: "text-destructive" },
};

export function LoanLifecycleTimeline({ stages, className }: LoanLifecycleTimelineProps) {
  return (
    <div className={cn("space-y-0", className)}>
      {stages.map((stage, i) => {
        const config = statusConfig[stage.status];
        const Icon = config.icon;
        return (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={cn("flex h-7 w-7 items-center justify-center rounded-full shrink-0", config.color)}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              {i < stages.length - 1 && <div className={cn("w-0.5 flex-1 min-h-[32px]", config.line)} />}
            </div>
            <div className="pb-6">
              <p className={cn("text-sm font-medium", config.text)}>{stage.label}</p>
              {stage.timestamp && <p className="text-xs text-muted-foreground">{stage.timestamp}</p>}
              {stage.user && <p className="text-xs text-muted-foreground">by {stage.user}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

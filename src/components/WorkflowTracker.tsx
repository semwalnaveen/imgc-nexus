import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface WorkflowStep {
  label: string;
  status: "completed" | "current" | "upcoming";
}

interface WorkflowTrackerProps {
  steps: WorkflowStep[];
  className?: string;
}

export function WorkflowTracker({ steps, className }: WorkflowTrackerProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all",
                {
                  "border-success bg-success text-success-foreground": step.status === "completed",
                  "border-primary bg-primary text-primary-foreground ring-4 ring-primary/20": step.status === "current",
                  "border-border bg-muted text-muted-foreground": step.status === "upcoming",
                }
              )}>
                {step.status === "completed" ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={cn("mt-2 text-xs font-medium text-center max-w-[80px]", {
                "text-success": step.status === "completed",
                "text-primary": step.status === "current",
                "text-muted-foreground": step.status === "upcoming",
              })}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn("h-0.5 flex-1 mx-2 mt-[-1.25rem]", {
                "bg-success": step.status === "completed",
                "bg-primary/30": step.status === "current",
                "bg-border": step.status === "upcoming",
              })} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
import { FileText, Upload, Brain, AlertTriangle, CheckCircle, Receipt, CreditCard, Circle } from "lucide-react";

interface ActivityEvent {
  action: string;
  user: string;
  role: string;
  timestamp: string;
  type?: "create" | "upload" | "review" | "deviation" | "approve" | "invoice" | "payment" | "default";
}

const iconMap = {
  create: FileText,
  upload: Upload,
  review: Brain,
  deviation: AlertTriangle,
  approve: CheckCircle,
  invoice: Receipt,
  payment: CreditCard,
  default: Circle,
};

export function CaseActivityTimeline({ events, className }: { events: ActivityEvent[]; className?: string }) {
  return (
    <div className={cn("space-y-0", className)}>
      {events.map((e, i) => {
        const Icon = iconMap[e.type || "default"];
        return (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted shrink-0">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              {i < events.length - 1 && <div className="w-0.5 flex-1 min-h-[24px] bg-border" />}
            </div>
            <div className="pb-5">
              <p className="text-sm font-medium text-foreground">{e.action}</p>
              <p className="text-xs text-muted-foreground">{e.user} · {e.role} · {e.timestamp}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Circle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChecklistItem {
  label: string;
  completed: boolean;
  required: boolean;
}

interface OnboardingChecklistProps {
  currentStage: number;
  className?: string;
}

export function OnboardingChecklist({ currentStage, className }: OnboardingChecklistProps) {
  const items: ChecklistItem[] = [
    { label: "Lender KYC verified", completed: currentStage > 1, required: true },
    { label: "Deal configured", completed: currentStage > 2, required: true },
    { label: "Scheme mapped", completed: currentStage > 4, required: true },
    { label: "Pricing uploaded", completed: currentStage > 5, required: true },
    { label: "Templates uploaded", completed: currentStage > 6, required: true },
    { label: "Templates approved", completed: currentStage > 8, required: true },
  ];

  const completedCount = items.filter((i) => i.completed).length;
  const allComplete = completedCount === items.length;

  return (
    <Card className={cn(className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Onboarding Checklist</CardTitle>
          <span className="text-xs text-muted-foreground">{completedCount}/{items.length}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2.5">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2.5">
              {item.completed ? (
                <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
              ) : (
                <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
              )}
              <span className={cn("text-sm", item.completed ? "text-foreground" : "text-muted-foreground")}>{item.label}</span>
              {item.required && !item.completed && <AlertCircle className="h-3 w-3 text-amber-500 shrink-0" />}
            </div>
          ))}
        </div>
        {!allComplete && (
          <p className="text-xs text-amber-600 mt-3 bg-amber-50 dark:bg-amber-950/30 rounded-md px-2.5 py-1.5">
            Lender cannot be activated until all checklist items are completed.
          </p>
        )}
        {allComplete && (
          <p className="text-xs text-emerald-600 mt-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-md px-2.5 py-1.5">
            ✓ All requirements met. Lender is eligible for activation.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

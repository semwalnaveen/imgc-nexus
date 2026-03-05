import { cn } from "@/lib/utils";

interface RiskParam {
  label: string;
  score: number; // 0-100
}

interface RiskHeatmapProps {
  parameters: RiskParam[];
  overallScore: number;
  className?: string;
}

function getRiskColor(score: number) {
  if (score >= 70) return "bg-success/20 text-success border-success/30";
  if (score >= 40) return "bg-warning/20 text-warning border-warning/30";
  return "bg-destructive/20 text-destructive border-destructive/30";
}

function getRiskLabel(score: number) {
  if (score >= 70) return "Low";
  if (score >= 40) return "Medium";
  return "High";
}

export function RiskHeatmap({ parameters, overallScore, className }: RiskHeatmapProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-foreground">Risk Assessment</h4>
        <div className={cn("flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-bold", getRiskColor(overallScore))}>
          Risk Score: {overallScore}/100 — {getRiskLabel(overallScore)} Risk
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {parameters.map((p) => (
          <div key={p.label} className={cn("rounded-lg border p-3 text-center", getRiskColor(p.score))}>
            <div className="text-2xl font-bold">{p.score}</div>
            <div className="text-xs font-medium mt-1 opacity-80">{p.label}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-success" /> Low (70-100)</span>
        <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-warning" /> Medium (40-69)</span>
        <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-destructive" /> High (0-39)</span>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Bot, Send, AlertTriangle, FileX, TrendingUp, Lightbulb, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Insight {
  type: "risk" | "missing" | "deviation" | "suggestion";
  message: string;
}

const insightIcons = {
  risk: TrendingUp,
  missing: FileX,
  deviation: AlertTriangle,
  suggestion: Lightbulb,
};

const insightColors = {
  risk: "text-destructive bg-destructive/10",
  missing: "text-warning bg-warning/10",
  deviation: "text-warning bg-warning/10",
  suggestion: "text-info bg-info/10",
};

const defaultInsights: Insight[] = [
  { type: "risk", message: "High FOIR detected at 62%. Exceeds policy norm of 55%." },
  { type: "missing", message: "Bank statement for last 3 months is missing." },
  { type: "deviation", message: "Income mismatch: declared ₹8.5L vs ITR ₹6.2L." },
  { type: "suggestion", message: "Consider requesting co-applicant to improve eligibility." },
];

interface AICopilotProps {
  open: boolean;
  onClose: () => void;
  insights?: Insight[];
}

export function AICopilot({ open, onClose, insights = defaultInsights }: AICopilotProps) {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([]);

  const handleSend = () => {
    if (!query.trim()) return;
    setMessages((m) => [...m, { role: "user", text: query }]);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "ai", text: "Based on the case data, the borrower's credit profile shows moderate risk. The LTV ratio of 78% is within acceptable limits, but the FOIR at 62% needs attention. I'd recommend requesting additional income proof or a co-applicant." }]);
    }, 600);
    setQuery("");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 h-full w-96 z-50 border-l bg-card shadow-xl flex flex-col"
        >
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">AI Underwriting Copilot</h3>
                <p className="text-xs text-muted-foreground">Intelligent case analysis</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}><X className="h-4 w-4" /></Button>
          </div>

          <div className="flex-1 overflow-auto p-4 space-y-3">
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Auto-Detected Insights</h4>
              {insights.map((insight, i) => {
                const Icon = insightIcons[insight.type];
                return (
                  <div key={i} className={cn("flex items-start gap-2 p-3 rounded-lg text-sm", insightColors[insight.type])}>
                    <Icon className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{insight.message}</span>
                  </div>
                );
              })}
            </div>

            {messages.length > 0 && (
              <div className="space-y-2 pt-3 border-t">
                {messages.map((m, i) => (
                  <div key={i} className={cn("p-3 rounded-lg text-sm", m.role === "user" ? "bg-primary/10 text-foreground ml-6" : "bg-muted text-foreground mr-6")}>
                    {m.text}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about this case..."
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button size="icon" onClick={handleSend}><Send className="h-4 w-4" /></Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

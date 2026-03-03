import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { WorkflowTracker } from "@/components/WorkflowTracker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Brain, ShieldCheck, TrendingUp, AlertTriangle, CheckCircle, XCircle,
  Clock, FileText, MessageSquare, Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const workflowSteps = [
  { label: "QDE", status: "completed" as const },
  { label: "DDE", status: "completed" as const },
  { label: "Underwriting", status: "current" as const },
  { label: "Decision", status: "upcoming" as const },
  { label: "Issuance", status: "upcoming" as const },
];

export default function Underwriting() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <h1>Underwriting Workspace</h1>
            <StatusBadge status="in-review" />
          </div>
          <p className="text-muted-foreground text-sm">LN-2026-001245 | Amit Sharma | ₹45,00,000</p>
        </div>
      </div>

      <Card className="enterprise-shadow"><CardContent className="pt-6"><WorkflowTracker steps={workflowSteps} /></CardContent></Card>

      {/* Risk Header */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Risk Grade", value: "B+", color: "bg-warning/10 text-warning border-warning/20" },
          { label: "LTV", value: "72.6%", color: "bg-success/10 text-success border-success/20" },
          { label: "FOIR", value: "38%", color: "bg-warning/10 text-warning border-warning/20" },
          { label: "CIBIL", value: "745", color: "bg-success/10 text-success border-success/20" },
          { label: "Loan Amt", value: "₹45L", color: "bg-info/10 text-info border-info/20" },
          { label: "Status", value: "In Review", color: "bg-primary/10 text-primary border-primary/20" },
        ].map((item) => (
          <div key={item.label} className={`rounded-lg border p-3 text-center ${item.color}`}>
            <p className="text-[10px] uppercase tracking-wider opacity-70">{item.label}</p>
            <p className="text-lg font-bold mt-0.5">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          <Tabs defaultValue="summary">
            <TabsList className="bg-muted/50 p-1">
              <TabsTrigger value="summary" className="text-xs">Summary</TabsTrigger>
              <TabsTrigger value="ratios" className="text-xs">Ratios</TabsTrigger>
              <TabsTrigger value="cibil" className="text-xs">CIBIL</TabsTrigger>
              <TabsTrigger value="banking" className="text-xs">Banking</TabsTrigger>
              <TabsTrigger value="deviations" className="text-xs">Deviations</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="mt-4 space-y-4">
              {/* AI Recommendation */}
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> AI Recommendation</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p className="font-medium">Recommendation: <span className="text-success">Conditional Approve</span></p>
                    <p className="text-muted-foreground">Based on analysis of 12 risk factors, this application shows low-medium risk profile. CIBIL score is above threshold. FOIR is within acceptable limits. Property valuation aligns with market rates. Recommend approval with standard conditions.</p>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline" className="text-xs">Confidence: 87%</Badge>
                      <Badge variant="outline" className="text-xs">12 factors analyzed</Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Loan Summary */}
              <Card className="enterprise-shadow">
                <CardHeader className="pb-2"><CardTitle className="text-sm">Loan Summary</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6 text-sm">
                    {[
                      ["Product", "Home Loan"], ["Lender", "HDFC Limited"], ["Tenure", "20 Years"],
                      ["Property", "Apartment - Mumbai"], ["Builder", "Lodha Group"], ["ROI", "8.75%"],
                      ["Loan Amount", "₹45,00,000"], ["Property Value", "₹62,00,000"], ["EMI", "₹42,000"],
                    ].map(([label, value]) => (
                      <div key={label}><p className="text-muted-foreground text-xs">{label}</p><p className="font-medium">{value}</p></div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ratios" className="mt-4">
              <Card className="enterprise-shadow">
                <CardHeader><CardTitle className="text-sm">Ratio Analysis</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "LTV Ratio", value: 72.6, max: 80, status: "ok" },
                      { name: "FOIR", value: 38, max: 50, status: "warning" },
                      { name: "EMI/NMI", value: 28, max: 40, status: "ok" },
                      { name: "Debt Service Coverage", value: 1.8, max: 2.5, status: "ok" },
                    ].map((ratio) => (
                      <div key={ratio.name} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{ratio.name}</span>
                          <span className="font-semibold">{ratio.value}{typeof ratio.value === "number" && ratio.value < 10 ? "x" : "%"}</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${ratio.status === "ok" ? "bg-success" : "bg-warning"}`}
                            style={{ width: `${(ratio.value / ratio.max) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">Threshold: {ratio.max}{typeof ratio.value === "number" && ratio.value < 10 ? "x" : "%"}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {["cibil", "banking", "deviations"].map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-4">
                <Card className="enterprise-shadow">
                  <CardHeader><CardTitle className="text-sm capitalize">{tab} Analysis</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Detailed {tab} analysis panel content here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          <Card className="enterprise-shadow">
            <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><MessageSquare className="h-4 w-4" /> Internal Notes</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <Textarea placeholder="Add underwriting notes..." className="min-h-[80px] text-sm" />
              <Button size="sm" className="w-full">Add Note</Button>
              <div className="space-y-2">
                <div className="rounded border p-2 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Rajesh Kumar</span>
                    <span className="text-muted-foreground">2h ago</span>
                  </div>
                  <p className="text-muted-foreground">CIBIL check completed. Score within acceptable range. Property valuation report pending.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="enterprise-shadow">
            <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Clock className="h-4 w-4" /> Timeline</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { time: "Mar 3, 10:30 AM", action: "Assigned to UW", user: "System", icon: Brain },
                  { time: "Mar 2, 4:15 PM", action: "DDE Completed", user: "Suresh P.", icon: FileText },
                  { time: "Mar 1, 11:00 AM", action: "QDE Submitted", user: "Priya M.", icon: CheckCircle },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 text-xs">
                    <div className="flex flex-col items-center">
                      <div className="rounded-full bg-muted p-1"><item.icon className="h-3 w-3 text-muted-foreground" /></div>
                      {i < 2 && <div className="w-px flex-1 bg-border" />}
                    </div>
                    <div className="pb-3">
                      <p className="font-medium">{item.action}</p>
                      <p className="text-muted-foreground">{item.user} · {item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sticky Action Bar */}
      <div className="sticky bottom-0 z-20 -mx-4 md:-mx-6 px-4 md:px-6 py-3 bg-card/95 backdrop-blur border-t enterprise-shadow flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Send Back</Button>
          <Button variant="outline" size="sm">Raise Deviation</Button>
          <Button variant="outline" size="sm">Defer</Button>
        </div>
        <div className="flex gap-2">
          <Button variant="destructive" size="sm"><XCircle className="h-4 w-4 mr-1" /> Reject</Button>
          <Button variant="success" size="sm"><ShieldCheck className="h-4 w-4 mr-1" /> Approve</Button>
        </div>
      </div>
    </div>
  );
}

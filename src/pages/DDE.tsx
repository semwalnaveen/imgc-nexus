import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { WorkflowTracker } from "@/components/WorkflowTracker";
import { Save, FileText, Calculator, AlertTriangle, CheckCircle } from "lucide-react";

const workflowSteps = [
  { label: "QDE", status: "completed" as const },
  { label: "DDE", status: "current" as const },
  { label: "Underwriting", status: "upcoming" as const },
  { label: "Decision", status: "upcoming" as const },
  { label: "Issuance", status: "upcoming" as const },
];

export default function DDE() {
  const [activeTab, setActiveTab] = useState("loan");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <h1>Detailed Data Entry</h1>
            <StatusBadge status="in-review" />
          </div>
          <p className="text-muted-foreground text-sm">LN-2026-001245 | Amit Sharma | HDFC Limited</p>
        </div>
      </div>

      <Card className="enterprise-shadow">
        <CardContent className="pt-6">
          <WorkflowTracker steps={workflowSteps} />
        </CardContent>
      </Card>

      {/* Auto-calculated highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "LTV", value: "72.6%", ok: true },
          { label: "FOIR", value: "38.0%", ok: true },
          { label: "CIBIL", value: "745", ok: true },
          { label: "EMI/NMI", value: "28%", ok: true },
        ].map((m) => (
          <div key={m.label} className="rounded-lg border bg-card p-3 flex items-center justify-between enterprise-shadow">
            <div>
              <p className="text-xs text-muted-foreground">{m.label}</p>
              <p className="text-lg font-bold">{m.value}</p>
            </div>
            {m.ok ? <CheckCircle className="h-5 w-5 text-success" /> : <AlertTriangle className="h-5 w-5 text-warning" />}
          </div>
        ))}
      </div>

      <div className="flex gap-4 flex-col lg:flex-row">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start flex-wrap h-auto gap-1 bg-muted/50 p-1">
              {["Loan Chars", "General", "Employment", "Income", "Banking", "Obligations"].map((tab) => (
                <TabsTrigger key={tab} value={tab.toLowerCase().replace(" ", "-")} className="text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="loan" className="mt-4">
              <Card>
                <CardHeader><CardTitle className="text-base">Loan Characteristics</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2"><Label>Loan Amount (₹)</Label><Input defaultValue="45,00,000" /></div>
                    <div className="space-y-2"><Label>Property Value (₹)</Label><Input defaultValue="62,00,000" /></div>
                    <div className="space-y-2"><Label>Tenure (Months)</Label><Input defaultValue="240" /></div>
                    <div className="space-y-2"><Label>Interest Rate (%)</Label><Input defaultValue="8.75" /></div>
                    <div className="space-y-2">
                      <Label>Rate Type</Label>
                      <Select defaultValue="floating"><SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="floating">Floating</SelectItem><SelectItem value="fixed">Fixed</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2"><Label>EMI (₹)</Label><Input defaultValue="42,000" readOnly className="bg-muted/50" /></div>
                    <div className="space-y-2">
                      <Label>Purpose</Label>
                      <Select defaultValue="purchase"><SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="purchase">Purchase</SelectItem><SelectItem value="construction">Construction</SelectItem><SelectItem value="bt">Balance Transfer</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2"><Label>Guarantee Fee (%)</Label><Input defaultValue="1.25" /></div>
                    <div className="space-y-2"><Label>Guarantee Amount (₹)</Label><Input defaultValue="5,62,500" readOnly className="bg-muted/50" /></div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {["general", "employment", "income", "banking", "obligations"].map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-4">
                <Card>
                  <CardHeader><CardTitle className="text-base capitalize">{tab} Details</CardTitle></CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-2"><Label>Field 1</Label><Input placeholder="Enter value" /></div>
                      <div className="space-y-2"><Label>Field 2</Label><Input placeholder="Enter value" /></div>
                      <div className="space-y-2"><Label>Field 3</Label><Input placeholder="Enter value" /></div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Side panel */}
        <div className="w-full lg:w-72 shrink-0 space-y-4">
          <Card className="enterprise-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2"><FileText className="h-4 w-4" /> Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {["Aadhaar Card", "PAN Card", "Salary Slips", "Bank Statements", "Property Docs"].map((doc) => (
                <div key={doc} className="flex items-center justify-between text-sm p-2 rounded border hover:bg-muted/50 cursor-pointer">
                  <span>{doc}</span>
                  <StatusBadge status={doc === "Property Docs" ? "pending" : "approved"} />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="enterprise-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2"><Calculator className="h-4 w-4" /> Eligibility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Max Eligible</span><span className="font-semibold">₹52,00,000</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Applied</span><span className="font-semibold">₹45,00,000</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Buffer</span><span className="font-semibold text-success">₹7,00,000</span></div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sticky Action Bar */}
      <div className="sticky bottom-0 z-20 -mx-4 md:-mx-6 px-4 md:px-6 py-3 bg-card/95 backdrop-blur border-t enterprise-shadow flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Last modified by Rajesh Kumar · 5 min ago</span>
        <div className="flex gap-2">
          <Button variant="outline"><Save className="h-4 w-4 mr-1" /> Save</Button>
          <Button>Submit to Underwriting</Button>
        </div>
      </div>
    </div>
  );
}

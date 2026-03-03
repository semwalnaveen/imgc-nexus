import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkflowTracker } from "@/components/WorkflowTracker";
import { StatusBadge } from "@/components/StatusBadge";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Send, ChevronLeft, ChevronRight, AlertTriangle, CheckCircle } from "lucide-react";

const steps = [
  { label: "Loan Basic", status: "completed" as const },
  { label: "Applicant", status: "current" as const },
  { label: "Loan Chars", status: "upcoming" as const },
  { label: "Obligations", status: "upcoming" as const },
  { label: "Verification", status: "upcoming" as const },
];

export default function ServiceDesk() {
  const [currentStep, setCurrentStep] = useState(1);

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Lender Name</Label>
              <Select defaultValue="hdfc"><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="hdfc">HDFC Limited</SelectItem><SelectItem value="sbi">SBI Home Loans</SelectItem><SelectItem value="icici">ICICI Home Finance</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Branch</Label><Input defaultValue="Mumbai - Andheri" /></div>
            <div className="space-y-2"><Label>Loan Reference No.</Label><Input defaultValue="LRN-2026-004521" /></div>
            <div className="space-y-2">
              <Label>Product Type</Label>
              <Select defaultValue="hl"><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="hl">Home Loan</SelectItem><SelectItem value="lap">LAP</SelectItem><SelectItem value="bt">Balance Transfer</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Loan Amount (₹)</Label><Input type="text" defaultValue="45,00,000" /></div>
            <div className="space-y-2"><Label>Property Value (₹)</Label><Input type="text" defaultValue="62,00,000" /></div>
            <div className="space-y-2"><Label>Tenure (Months)</Label><Input type="number" defaultValue="240" /></div>
            <div className="space-y-2"><Label>Rate of Interest (%)</Label><Input type="text" defaultValue="8.75" /></div>
            <div className="space-y-2"><Label>Login Date</Label><Input type="date" defaultValue="2026-03-01" /></div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2"><Label>First Name</Label><Input defaultValue="Amit" /></div>
              <div className="space-y-2"><Label>Last Name</Label><Input defaultValue="Sharma" /></div>
              <div className="space-y-2"><Label>Date of Birth</Label><Input type="date" defaultValue="1988-05-15" /></div>
              <div className="space-y-2"><Label>PAN Number</Label><Input defaultValue="ABCPS1234K" /></div>
              <div className="space-y-2"><Label>Aadhaar (last 4)</Label><Input defaultValue="7890" maxLength={4} /></div>
              <div className="space-y-2"><Label>Mobile Number</Label><Input defaultValue="+91 98765 43210" /></div>
              <div className="space-y-2"><Label>Email</Label><Input type="email" defaultValue="amit.sharma@email.com" /></div>
              <div className="space-y-2">
                <Label>Applicant Type</Label>
                <Select defaultValue="primary"><SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="primary">Primary</SelectItem><SelectItem value="co">Co-Applicant</SelectItem><SelectItem value="guarantor">Guarantor</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Employment Type</Label>
                <Select defaultValue="salaried"><SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="salaried">Salaried</SelectItem><SelectItem value="self">Self Employed</SelectItem><SelectItem value="professional">Professional</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Property Type</Label>
              <Select defaultValue="apartment"><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="apartment">Apartment</SelectItem><SelectItem value="villa">Independent Villa</SelectItem><SelectItem value="plot">Plot + Construction</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Property Location</Label><Input defaultValue="Mumbai, Maharashtra" /></div>
            <div className="space-y-2"><Label>Builder Name</Label><Input defaultValue="Lodha Group" /></div>
            <div className="space-y-2"><Label>Project Name</Label><Input defaultValue="Lodha Park" /></div>
            <div className="space-y-2"><Label>Carpet Area (sq ft)</Label><Input defaultValue="1,250" /></div>
            <div className="space-y-2"><Label>Agreement Value (₹)</Label><Input defaultValue="62,00,000" /></div>
            <div className="col-span-full">
              <div className="rounded-lg border border-info/20 bg-info/5 p-4 flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-info shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Auto-Calculated LTV: 72.6%</p>
                  <p className="text-xs text-muted-foreground mt-1">Within acceptable range (max 80%)</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2"><Label>Monthly Income (₹)</Label><Input defaultValue="1,50,000" /></div>
              <div className="space-y-2"><Label>Existing EMI (₹)</Label><Input defaultValue="15,000" /></div>
              <div className="space-y-2"><Label>Proposed EMI (₹)</Label><Input defaultValue="42,000" readOnly className="bg-muted/50" /></div>
              <div className="space-y-2"><Label>Credit Card Outstanding (₹)</Label><Input defaultValue="50,000" /></div>
              <div className="space-y-2"><Label>Other Loans</Label><Input defaultValue="0" /></div>
            </div>
            <div className="rounded-lg border border-warning/20 bg-warning/5 p-4 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">FOIR: 38% – Moderate Risk</p>
                <p className="text-xs text-muted-foreground mt-1">Fixed Obligation to Income Ratio is within acceptable limits but on the higher side.</p>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "KYC Verification", status: "Verified" },
                { label: "CIBIL Score Check", status: "Score: 745" },
                { label: "Property Valuation", status: "Pending" },
                { label: "Income Documents", status: "Verified" },
                { label: "Employment Verification", status: "Verified" },
                { label: "Legal Opinion", status: "Pending" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-lg border p-3">
                  <span className="text-sm font-medium">{item.label}</span>
                  <StatusBadge status={item.status === "Pending" ? "pending" : "approved"} />
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-success/20 bg-success/5 p-4">
              <p className="font-medium text-sm text-success">Risk Summary: Low-Medium Risk</p>
              <p className="text-xs text-muted-foreground mt-1">CIBIL: 745 | LTV: 72.6% | FOIR: 38% | Employment: Stable</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const stepTitles = ["Loan Basic Details", "Applicant Details", "Loan Characteristics", "Obligations", "Verification"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1>Service Desk – Quick Data Entry</h1>
          <p className="text-muted-foreground text-sm">Create new loan guarantee application</p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status="draft" />
          <span className="text-xs text-muted-foreground">Auto-saved 2m ago</span>
        </div>
      </div>

      <Card className="enterprise-shadow">
        <CardContent className="pt-6">
          <WorkflowTracker steps={steps.map((s, i) => ({
            ...s,
            status: i < currentStep ? "completed" : i === currentStep ? "current" : "upcoming",
          }))} />
        </CardContent>
      </Card>

      <Card className="enterprise-shadow">
        <CardHeader>
          <CardTitle className="text-lg">Step {currentStep + 1}: {stepTitles[currentStep]}</CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Sticky Action Bar */}
      <div className="sticky bottom-0 z-20 -mx-4 md:-mx-6 px-4 md:px-6 py-3 bg-card/95 backdrop-blur border-t enterprise-shadow flex items-center justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0}>
          <ChevronLeft className="h-4 w-4 mr-1" /> Previous
        </Button>
        <div className="flex gap-2">
          <Button variant="outline"><Save className="h-4 w-4 mr-1" /> Save Draft</Button>
          {currentStep < 4 ? (
            <Button onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}>
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button><Send className="h-4 w-4 mr-1" /> Submit Application</Button>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { StatusBadge } from "@/components/StatusBadge";
import { Plus, Save, SendHorizonal } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Deal {
  dealCode: string;
  dealName: string;
  dealType: string;
  effectiveDate: string;
  expiryDate: string;
  coveragePct: string;
  riskSharePct: string;
  maxLoanAmount: string;
  loanProducts: string;
  status: string;
  version: number;
}

const existingDeals: Deal[] = [
  { dealCode: "DL-SBI-001", dealName: "SBI Home Loan MG", dealType: "Standard", effectiveDate: "2025-04-01", expiryDate: "2026-03-31", coveragePct: "25", riskSharePct: "75", maxLoanAmount: "100", loanProducts: "Home Loan, LAP", status: "Active", version: 3 },
  { dealCode: "DL-HDFC-001", dealName: "HDFC Prime Cover", dealType: "Premium", effectiveDate: "2025-06-01", expiryDate: "2026-05-31", coveragePct: "20", riskSharePct: "80", maxLoanAmount: "200", loanProducts: "Home Loan", status: "Active", version: 2 },
  { dealCode: "DL-BAJAJ-001", dealName: "Bajaj Affordable MG", dealType: "Affordable", effectiveDate: "2025-07-01", expiryDate: "2026-06-30", coveragePct: "30", riskSharePct: "70", maxLoanAmount: "50", loanProducts: "Affordable Housing", status: "In Review", version: 1 },
];

const emptyDeal: Omit<Deal, "status" | "version"> = {
  dealCode: "", dealName: "", dealType: "", effectiveDate: "", expiryDate: "",
  coveragePct: "", riskSharePct: "", maxLoanAmount: "", loanProducts: "",
};

interface DealSetupFormProps {
  onComplete: () => void;
}

export function DealSetupForm({ onComplete }: DealSetupFormProps) {
  const [deals, setDeals] = useState<Deal[]>(existingDeals);
  const [newDeal, setNewDeal] = useState(emptyDeal);
  const [dialogOpen, setDialogOpen] = useState(false);

  const update = (field: keyof typeof emptyDeal, value: string) => setNewDeal((prev) => ({ ...prev, [field]: value }));

  const handleCreate = () => {
    if (!newDeal.dealCode || !newDeal.dealName || !newDeal.dealType) {
      toast({ title: "Validation error", description: "Deal Code, Name, and Type are required.", variant: "destructive" });
      return;
    }
    setDeals((prev) => [...prev, { ...newDeal, status: "In Review", version: 1 }]);
    setNewDeal(emptyDeal);
    setDialogOpen(false);
    toast({ title: "Deal created", description: `${newDeal.dealName} submitted for approval.` });
  };

  const handleApprove = (code: string) => {
    setDeals((prev) => prev.map((d) => d.dealCode === code ? { ...d, status: "Active", version: d.version + 1 } : d));
    toast({ title: "Deal approved", description: `Deal ${code} is now active.` });
    onComplete();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Configure deal structures with coverage terms, risk sharing, and loan product eligibility.</p>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-2" /> New Deal</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader><DialogTitle>Create New Deal</DialogTitle></DialogHeader>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-2"><Label>Deal Code <span className="text-destructive">*</span></Label><Input placeholder="DL-XXX-001" value={newDeal.dealCode} onChange={(e) => update("dealCode", e.target.value)} /></div>
              <div className="space-y-2"><Label>Deal Name <span className="text-destructive">*</span></Label><Input placeholder="Deal name" value={newDeal.dealName} onChange={(e) => update("dealName", e.target.value)} /></div>
              <div className="space-y-2">
                <Label>Deal Type <span className="text-destructive">*</span></Label>
                <Select value={newDeal.dealType} onValueChange={(v) => update("dealType", v)}>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                    <SelectItem value="Affordable">Affordable Housing</SelectItem>
                    <SelectItem value="Custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Effective Date</Label><Input type="date" value={newDeal.effectiveDate} onChange={(e) => update("effectiveDate", e.target.value)} /></div>
              <div className="space-y-2"><Label>Expiry Date</Label><Input type="date" value={newDeal.expiryDate} onChange={(e) => update("expiryDate", e.target.value)} /></div>
              <div className="space-y-2"><Label>Guarantee Coverage %</Label><Input type="number" placeholder="e.g. 25" value={newDeal.coveragePct} onChange={(e) => update("coveragePct", e.target.value)} /></div>
              <div className="space-y-2"><Label>Risk Sharing %</Label><Input type="number" placeholder="e.g. 75" value={newDeal.riskSharePct} onChange={(e) => update("riskSharePct", e.target.value)} /></div>
              <div className="space-y-2"><Label>Max Loan Amount (₹ Lakhs)</Label><Input type="number" placeholder="e.g. 100" value={newDeal.maxLoanAmount} onChange={(e) => update("maxLoanAmount", e.target.value)} /></div>
              <div className="col-span-2 space-y-2"><Label>Allowed Loan Products</Label><Input placeholder="Home Loan, LAP, Affordable Housing" value={newDeal.loanProducts} onChange={(e) => update("loanProducts", e.target.value)} /></div>
              <div className="col-span-2 flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => { setNewDeal(emptyDeal); toast({ title: "Draft saved" }); }}><Save className="h-4 w-4 mr-2" /> Save Draft</Button>
                <Button onClick={handleCreate}><SendHorizonal className="h-4 w-4 mr-2" /> Submit for Approval</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deal Code</TableHead>
                <TableHead>Deal Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Coverage</TableHead>
                <TableHead>Risk Share</TableHead>
                <TableHead>Max Loan</TableHead>
                <TableHead>Effective</TableHead>
                <TableHead>Ver</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deals.map((d) => (
                <TableRow key={d.dealCode}>
                  <TableCell className="font-mono text-xs">{d.dealCode}</TableCell>
                  <TableCell className="font-medium text-sm">{d.dealName}</TableCell>
                  <TableCell><Badge variant="outline">{d.dealType}</Badge></TableCell>
                  <TableCell>{d.coveragePct}%</TableCell>
                  <TableCell>{d.riskSharePct}%</TableCell>
                  <TableCell>₹{d.maxLoanAmount}L</TableCell>
                  <TableCell className="text-xs">{d.effectiveDate}</TableCell>
                  <TableCell><Badge variant="secondary" className="text-xs">v{d.version}</Badge></TableCell>
                  <TableCell><StatusBadge status={d.status === "Active" ? "active" : "in-review"} /></TableCell>
                  <TableCell>
                    {d.status === "In Review" && (
                      <Button variant="outline" size="sm" onClick={() => handleApprove(d.dealCode)}>Approve</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

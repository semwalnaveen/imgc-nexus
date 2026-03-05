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
import { Plus, Save, SendHorizonal, Link2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Scheme {
  id: string;
  schemeName: string;
  borrowerCategory: string;
  loanType: string;
  incomeCategory: string;
  tenureRange: string;
  maxLTV: string;
  maxFOIR: string;
  propertyCategory: string;
  linkedDeal: string;
  status: string;
}

const existingSchemes: Scheme[] = [
  { id: "SCH-001", schemeName: "Prime Home Loan", borrowerCategory: "Salaried", loanType: "Home Loan", incomeCategory: "> ₹10L p.a.", tenureRange: "10-30 yrs", maxLTV: "80", maxFOIR: "50", propertyCategory: "Residential", linkedDeal: "DL-SBI-001", status: "Active" },
  { id: "SCH-002", schemeName: "Affordable Housing MG", borrowerCategory: "EWS/LIG", loanType: "Affordable Housing", incomeCategory: "< ₹6L p.a.", tenureRange: "10-20 yrs", maxLTV: "90", maxFOIR: "65", propertyCategory: "Affordable", linkedDeal: "DL-BAJAJ-001", status: "Active" },
  { id: "SCH-003", schemeName: "Self-Employed Cover", borrowerCategory: "Self-Employed", loanType: "Home Loan", incomeCategory: "> ₹8L p.a.", tenureRange: "5-20 yrs", maxLTV: "75", maxFOIR: "55", propertyCategory: "Residential", linkedDeal: "DL-HDFC-001", status: "In Review" },
];

const emptyScheme = {
  schemeName: "", borrowerCategory: "", loanType: "", incomeCategory: "",
  tenureMin: "", tenureMax: "", maxLTV: "", maxFOIR: "", propertyCategory: "", linkedDeal: "",
};

interface SchemeSetupFormProps {
  onComplete: () => void;
}

export function SchemeSetupForm({ onComplete }: SchemeSetupFormProps) {
  const [schemes, setSchemes] = useState(existingSchemes);
  const [form, setForm] = useState(emptyScheme);
  const [dialogOpen, setDialogOpen] = useState(false);

  const update = (field: keyof typeof emptyScheme, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleCreate = () => {
    if (!form.schemeName || !form.borrowerCategory || !form.loanType) {
      toast({ title: "Validation error", description: "Scheme Name, Borrower Category, and Loan Type are required.", variant: "destructive" });
      return;
    }
    const newScheme: Scheme = {
      id: `SCH-${String(schemes.length + 1).padStart(3, "0")}`,
      schemeName: form.schemeName,
      borrowerCategory: form.borrowerCategory,
      loanType: form.loanType,
      incomeCategory: form.incomeCategory,
      tenureRange: form.tenureMin && form.tenureMax ? `${form.tenureMin}-${form.tenureMax} yrs` : "",
      maxLTV: form.maxLTV,
      maxFOIR: form.maxFOIR,
      propertyCategory: form.propertyCategory,
      linkedDeal: form.linkedDeal,
      status: "In Review",
    };
    setSchemes((prev) => [...prev, newScheme]);
    setForm(emptyScheme);
    setDialogOpen(false);
    toast({ title: "Scheme created", description: `${form.schemeName} submitted for review.` });
  };

  const handleApprove = (id: string) => {
    setSchemes((prev) => prev.map((s) => s.id === id ? { ...s, status: "Active" } : s));
    toast({ title: "Scheme approved" });
    onComplete();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Configure loan guarantee schemes with borrower eligibility, LTV, FOIR limits, and deal linking.</p>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-2" /> New Scheme</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader><DialogTitle>Create Guarantee Scheme</DialogTitle></DialogHeader>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-2"><Label>Scheme Name <span className="text-destructive">*</span></Label><Input placeholder="Scheme name" value={form.schemeName} onChange={(e) => update("schemeName", e.target.value)} /></div>
              <div className="space-y-2">
                <Label>Borrower Category <span className="text-destructive">*</span></Label>
                <Select value={form.borrowerCategory} onValueChange={(v) => update("borrowerCategory", v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Salaried">Salaried</SelectItem>
                    <SelectItem value="Self-Employed">Self-Employed</SelectItem>
                    <SelectItem value="EWS/LIG">EWS / LIG</SelectItem>
                    <SelectItem value="Professional">Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Loan Type <span className="text-destructive">*</span></Label>
                <Select value={form.loanType} onValueChange={(v) => update("loanType", v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Home Loan">Home Loan</SelectItem>
                    <SelectItem value="LAP">Loan Against Property</SelectItem>
                    <SelectItem value="Affordable Housing">Affordable Housing</SelectItem>
                    <SelectItem value="Plot + Construction">Plot + Construction</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Income Category</Label>
                <Select value={form.incomeCategory} onValueChange={(v) => update("incomeCategory", v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="< ₹3L p.a.">{"< ₹3L p.a."}</SelectItem>
                    <SelectItem value="₹3L-₹6L p.a.">₹3L - ₹6L p.a.</SelectItem>
                    <SelectItem value="₹6L-₹10L p.a.">₹6L - ₹10L p.a.</SelectItem>
                    <SelectItem value="> ₹10L p.a.">{"> ₹10L p.a."}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Min Tenure (yrs)</Label><Input type="number" placeholder="e.g. 5" value={form.tenureMin} onChange={(e) => update("tenureMin", e.target.value)} /></div>
              <div className="space-y-2"><Label>Max Tenure (yrs)</Label><Input type="number" placeholder="e.g. 30" value={form.tenureMax} onChange={(e) => update("tenureMax", e.target.value)} /></div>
              <div className="space-y-2"><Label>Maximum LTV %</Label><Input type="number" placeholder="e.g. 80" value={form.maxLTV} onChange={(e) => update("maxLTV", e.target.value)} /></div>
              <div className="space-y-2"><Label>Maximum FOIR %</Label><Input type="number" placeholder="e.g. 50" value={form.maxFOIR} onChange={(e) => update("maxFOIR", e.target.value)} /></div>
              <div className="space-y-2">
                <Label>Property Category</Label>
                <Select value={form.propertyCategory} onValueChange={(v) => update("propertyCategory", v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Residential">Residential</SelectItem>
                    <SelectItem value="Affordable">Affordable</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Plot">Plot</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Link to Deal</Label>
                <Select value={form.linkedDeal} onValueChange={(v) => update("linkedDeal", v)}>
                  <SelectTrigger><SelectValue placeholder="Select deal" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DL-SBI-001">DL-SBI-001 — SBI Home Loan MG</SelectItem>
                    <SelectItem value="DL-HDFC-001">DL-HDFC-001 — HDFC Prime Cover</SelectItem>
                    <SelectItem value="DL-BAJAJ-001">DL-BAJAJ-001 — Bajaj Affordable MG</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 flex justify-end gap-2 pt-2">
                <Button variant="outline"><Save className="h-4 w-4 mr-2" /> Save Draft</Button>
                <Button onClick={handleCreate}><SendHorizonal className="h-4 w-4 mr-2" /> Submit</Button>
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
                <TableHead>ID</TableHead>
                <TableHead>Scheme Name</TableHead>
                <TableHead>Borrower</TableHead>
                <TableHead>Loan Type</TableHead>
                <TableHead>LTV</TableHead>
                <TableHead>FOIR</TableHead>
                <TableHead>Tenure</TableHead>
                <TableHead>Linked Deal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schemes.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-mono text-xs">{s.id}</TableCell>
                  <TableCell className="font-medium text-sm">{s.schemeName}</TableCell>
                  <TableCell><Badge variant="outline">{s.borrowerCategory}</Badge></TableCell>
                  <TableCell className="text-sm">{s.loanType}</TableCell>
                  <TableCell>{s.maxLTV}%</TableCell>
                  <TableCell>{s.maxFOIR}%</TableCell>
                  <TableCell className="text-xs">{s.tenureRange}</TableCell>
                  <TableCell><span className="flex items-center gap-1 text-xs"><Link2 className="h-3 w-3" />{s.linkedDeal}</span></TableCell>
                  <TableCell><StatusBadge status={s.status === "Active" ? "active" : "in-review"} /></TableCell>
                  <TableCell>
                    {s.status === "In Review" && <Button variant="outline" size="sm" onClick={() => handleApprove(s.id)}>Approve</Button>}
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

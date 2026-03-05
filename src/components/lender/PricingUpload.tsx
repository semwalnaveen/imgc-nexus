import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { Upload, Plus, Trash2, Save, SendHorizonal, Download, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PricingRow {
  loanSlab: string;
  premiumPct: string;
  riskCoverage: string;
  processingFee: string;
  tax: string;
}

interface PricingVersion {
  version: number;
  effectiveDate: string;
  status: string;
  rows: PricingRow[];
  uploadedBy: string;
  approvedBy: string;
}

const mockVersions: PricingVersion[] = [
  {
    version: 2, effectiveDate: "2025-10-01", status: "Active", uploadedBy: "Priya Sharma", approvedBy: "Rajesh Kumar",
    rows: [
      { loanSlab: "Up to ₹25L", premiumPct: "1.20", riskCoverage: "25", processingFee: "2,500", tax: "18% GST" },
      { loanSlab: "₹25L - ₹50L", premiumPct: "1.00", riskCoverage: "20", processingFee: "3,500", tax: "18% GST" },
      { loanSlab: "₹50L - ₹1Cr", premiumPct: "0.85", riskCoverage: "15", processingFee: "5,000", tax: "18% GST" },
      { loanSlab: "₹1Cr - ₹2Cr", premiumPct: "0.70", riskCoverage: "12", processingFee: "7,500", tax: "18% GST" },
      { loanSlab: "> ₹2Cr", premiumPct: "0.60", riskCoverage: "10", processingFee: "10,000", tax: "18% GST" },
    ],
  },
  {
    version: 1, effectiveDate: "2025-04-01", status: "Superseded", uploadedBy: "Amit Verma", approvedBy: "Rajesh Kumar",
    rows: [
      { loanSlab: "Up to ₹25L", premiumPct: "1.35", riskCoverage: "25", processingFee: "2,000", tax: "18% GST" },
      { loanSlab: "₹25L - ₹50L", premiumPct: "1.10", riskCoverage: "20", processingFee: "3,000", tax: "18% GST" },
      { loanSlab: "₹50L - ₹1Cr", premiumPct: "0.95", riskCoverage: "15", processingFee: "4,500", tax: "18% GST" },
    ],
  },
];

interface PricingUploadProps {
  onComplete: () => void;
}

export function PricingUpload({ onComplete }: PricingUploadProps) {
  const [versions, setVersions] = useState(mockVersions);
  const [selectedVersion, setSelectedVersion] = useState(0);
  const [showNewUpload, setShowNewUpload] = useState(false);
  const [effectiveDate, setEffectiveDate] = useState("");
  const [newRows, setNewRows] = useState<PricingRow[]>([
    { loanSlab: "", premiumPct: "", riskCoverage: "", processingFee: "", tax: "18% GST" },
  ]);

  const updateRow = (idx: number, field: keyof PricingRow, value: string) => {
    setNewRows((prev) => prev.map((r, i) => i === idx ? { ...r, [field]: value } : r));
  };

  const addRow = () => setNewRows((prev) => [...prev, { loanSlab: "", premiumPct: "", riskCoverage: "", processingFee: "", tax: "18% GST" }]);
  const removeRow = (idx: number) => setNewRows((prev) => prev.filter((_, i) => i !== idx));

  const handleUploadExcel = () => {
    setNewRows([
      { loanSlab: "Up to ₹25L", premiumPct: "1.15", riskCoverage: "25", processingFee: "2,500", tax: "18% GST" },
      { loanSlab: "₹25L - ₹50L", premiumPct: "0.95", riskCoverage: "20", processingFee: "3,500", tax: "18% GST" },
      { loanSlab: "₹50L - ₹1Cr", premiumPct: "0.80", riskCoverage: "15", processingFee: "5,000", tax: "18% GST" },
      { loanSlab: "₹1Cr - ₹2Cr", premiumPct: "0.65", riskCoverage: "12", processingFee: "7,500", tax: "18% GST" },
      { loanSlab: "> ₹2Cr", premiumPct: "0.55", riskCoverage: "10", processingFee: "10,000", tax: "18% GST" },
    ]);
    toast({ title: "Excel parsed", description: "5 pricing rows extracted from uploaded file." });
  };

  const handleSubmit = () => {
    if (!effectiveDate || newRows.some((r) => !r.loanSlab || !r.premiumPct)) {
      toast({ title: "Validation error", description: "Effective date and all slab/premium fields are required.", variant: "destructive" });
      return;
    }
    const newVersion: PricingVersion = {
      version: versions.length + 1,
      effectiveDate,
      status: "Pending Approval",
      rows: newRows,
      uploadedBy: "Current User",
      approvedBy: "",
    };
    setVersions((prev) => [newVersion, ...prev]);
    setShowNewUpload(false);
    setSelectedVersion(0);
    toast({ title: "Pricing submitted", description: "Pricing sheet submitted for Maker-Checker approval." });
  };

  const handleApprove = () => {
    setVersions((prev) => prev.map((v, i) => i === 0 && v.status === "Pending Approval" ? { ...v, status: "Active", approvedBy: "Rajesh Kumar" } : i === 1 && v.status === "Active" ? { ...v, status: "Superseded" } : v));
    toast({ title: "Pricing approved", description: "New pricing version is now active." });
    onComplete();
  };

  const current = versions[selectedVersion];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Manage pricing matrices with version control and Maker-Checker approval.</p>
        {!showNewUpload && <Button size="sm" onClick={() => setShowNewUpload(true)}><Upload className="h-4 w-4 mr-2" /> Upload New Pricing</Button>}
      </div>

      {showNewUpload && (
        <Card className="border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">New Pricing Upload</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowNewUpload(false)}>Cancel</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 items-end">
              <div className="space-y-2">
                <Label>Effective Date <span className="text-destructive">*</span></Label>
                <Input type="date" value={effectiveDate} onChange={(e) => setEffectiveDate(e.target.value)} />
              </div>
              <div className="border-2 border-dashed rounded-lg px-6 py-3 text-center flex-1 cursor-pointer hover:border-primary/50 transition-colors" onClick={handleUploadExcel}>
                <div className="flex items-center justify-center gap-2">
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Click to upload Excel file or add rows manually</span>
                </div>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Loan Slab</TableHead>
                  <TableHead>Premium %</TableHead>
                  <TableHead>Risk Coverage %</TableHead>
                  <TableHead>Processing Fee (₹)</TableHead>
                  <TableHead>Tax</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newRows.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell><Input className="h-8 text-sm" placeholder="e.g. Up to ₹25L" value={row.loanSlab} onChange={(e) => updateRow(i, "loanSlab", e.target.value)} /></TableCell>
                    <TableCell><Input className="h-8 text-sm w-20" type="number" step="0.01" value={row.premiumPct} onChange={(e) => updateRow(i, "premiumPct", e.target.value)} /></TableCell>
                    <TableCell><Input className="h-8 text-sm w-20" type="number" value={row.riskCoverage} onChange={(e) => updateRow(i, "riskCoverage", e.target.value)} /></TableCell>
                    <TableCell><Input className="h-8 text-sm w-24" value={row.processingFee} onChange={(e) => updateRow(i, "processingFee", e.target.value)} /></TableCell>
                    <TableCell><Input className="h-8 text-sm w-24" value={row.tax} onChange={(e) => updateRow(i, "tax", e.target.value)} /></TableCell>
                    <TableCell>
                      {newRows.length > 1 && <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeRow(i)}><Trash2 className="h-3 w-3" /></Button>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-between">
              <Button variant="outline" size="sm" onClick={addRow}><Plus className="h-4 w-4 mr-1" /> Add Row</Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => toast({ title: "Draft saved" })}><Save className="h-4 w-4 mr-2" /> Save Draft</Button>
                <Button onClick={handleSubmit}><SendHorizonal className="h-4 w-4 mr-2" /> Submit for Approval</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-3 items-center">
        <Label className="text-sm">Version:</Label>
        <Select value={String(selectedVersion)} onValueChange={(v) => setSelectedVersion(Number(v))}>
          <SelectTrigger className="w-[280px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {versions.map((v, i) => (
              <SelectItem key={i} value={String(i)}>v{v.version} — {v.effectiveDate} ({v.status})</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {current?.status === "Pending Approval" && (
          <Button size="sm" variant="default" onClick={handleApprove}>Approve Pricing</Button>
        )}
      </div>

      {current && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Pricing Sheet v{current.version}</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3 inline mr-1" />Effective: {current.effectiveDate} · Uploaded by: {current.uploadedBy}
                  {current.approvedBy && ` · Approved by: ${current.approvedBy}`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={current.status === "Active" ? "active" : current.status === "Pending Approval" ? "pending" : "draft"} />
                <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" /> Export</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Loan Slab</TableHead>
                  <TableHead>Premium %</TableHead>
                  <TableHead>Risk Coverage %</TableHead>
                  <TableHead>Processing Fee (₹)</TableHead>
                  <TableHead>Tax</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {current.rows.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{row.loanSlab}</TableCell>
                    <TableCell>{row.premiumPct}%</TableCell>
                    <TableCell>{row.riskCoverage}%</TableCell>
                    <TableCell>₹{row.processingFee}</TableCell>
                    <TableCell>{row.tax}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

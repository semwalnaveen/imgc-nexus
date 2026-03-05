import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/StatusBadge";
import { Upload, FileText, Download, Eye, CheckCircle, XCircle, RotateCcw, GripVertical } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Template {
  id: string;
  name: string;
  category: "Legal" | "Finance";
  type: string;
  fileType: string;
  version: number;
  status: string;
  uploadedBy: string;
  uploadedOn: string;
  mappedFields: number;
}

const mockTemplates: Template[] = [
  { id: "TPL-001", name: "MG Offer Letter", category: "Legal", type: "MG Offer", fileType: "DOCX", version: 3, status: "Approved", uploadedBy: "Priya Sharma", uploadedOn: "2025-11-01", mappedFields: 12 },
  { id: "TPL-002", name: "Denial Letter", category: "Legal", type: "Denial", fileType: "DOCX", version: 2, status: "Approved", uploadedBy: "Priya Sharma", uploadedOn: "2025-10-15", mappedFields: 8 },
  { id: "TPL-003", name: "RFI Template", category: "Legal", type: "Request for Information", fileType: "PDF", version: 1, status: "In Review", uploadedBy: "Amit Verma", uploadedOn: "2026-01-10", mappedFields: 6 },
  { id: "TPL-004", name: "Pre-Offer Letter", category: "Legal", type: "Pre Offer", fileType: "DOCX", version: 1, status: "In Review", uploadedBy: "Amit Verma", uploadedOn: "2026-02-01", mappedFields: 0 },
  { id: "TPL-005", name: "Deed of Mortgage Guarantee", category: "Legal", type: "Deed", fileType: "PDF", version: 2, status: "Approved", uploadedBy: "Rajesh Kumar", uploadedOn: "2025-09-20", mappedFields: 15 },
  { id: "TPL-006", name: "Single Invoice Template", category: "Finance", type: "Single Invoice", fileType: "DOCX", version: 2, status: "Approved", uploadedBy: "Neha Gupta", uploadedOn: "2025-08-10", mappedFields: 10 },
  { id: "TPL-007", name: "Invoice Upfront", category: "Finance", type: "Upfront Invoice", fileType: "DOCX", version: 1, status: "Pending", uploadedBy: "Neha Gupta", uploadedOn: "2026-01-25", mappedFields: 0 },
  { id: "TPL-008", name: "Installment Invoice", category: "Finance", type: "Installment", fileType: "PDF", version: 1, status: "Approved", uploadedBy: "Neha Gupta", uploadedOn: "2025-12-05", mappedFields: 9 },
];

const fieldMappings = [
  { placeholder: "{CustomerName}", systemField: "borrower.full_name", mapped: true },
  { placeholder: "{LoanAmount}", systemField: "loan.sanctioned_amount", mapped: true },
  { placeholder: "{PropertyAddress}", systemField: "property.full_address", mapped: true },
  { placeholder: "{LoanID}", systemField: "loan.application_id", mapped: true },
  { placeholder: "{InterestRate}", systemField: "loan.interest_rate", mapped: true },
  { placeholder: "{LenderName}", systemField: "lender.name", mapped: true },
  { placeholder: "{GuaranteeCoverage}", systemField: "deal.coverage_percentage", mapped: false },
  { placeholder: "{PremiumAmount}", systemField: "pricing.premium_amount", mapped: false },
  { placeholder: "{TenureMonths}", systemField: "loan.tenure_months", mapped: true },
  { placeholder: "{DisbursementDate}", systemField: "", mapped: false },
];

export function TemplateManagement() {
  const [templates, setTemplates] = useState(mockTemplates);
  const [subTab, setSubTab] = useState("upload");

  const handleApprove = (id: string) => {
    setTemplates((prev) => prev.map((t) => t.id === id ? { ...t, status: "Approved" } : t));
    toast({ title: "Template approved" });
  };

  const handleReject = (id: string) => {
    setTemplates((prev) => prev.map((t) => t.id === id ? { ...t, status: "Rejected" } : t));
    toast({ title: "Template rejected", description: "Sent back to uploader for changes." });
  };

  const legalTemplates = templates.filter((t) => t.category === "Legal");
  const financeTemplates = templates.filter((t) => t.category === "Finance");

  return (
    <Tabs value={subTab} onValueChange={setSubTab}>
      <TabsList className="mb-4">
        <TabsTrigger value="upload">Template Upload</TabsTrigger>
        <TabsTrigger value="mapping">Field Mapping</TabsTrigger>
        <TabsTrigger value="approval">Approval</TabsTrigger>
        <TabsTrigger value="download">Download / View</TabsTrigger>
      </TabsList>

      <TabsContent value="upload" className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Upload Templates</CardTitle>
              <Button size="sm"><Upload className="h-4 w-4 mr-2" /> Upload Template</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed rounded-lg p-6 text-center mb-6">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Drag & drop DOCX or PDF templates</p>
              <p className="text-xs text-muted-foreground mt-1">Legal: MG Offer, Denial, RFI, Pre-Offer, Deed · Finance: Invoice, Upfront, Installment</p>
            </div>

            <h4 className="text-sm font-semibold mb-2">Legal Templates</h4>
            <TemplateTable templates={legalTemplates} onApprove={handleApprove} onReject={handleReject} />

            <h4 className="text-sm font-semibold mb-2 mt-6">Finance Templates</h4>
            <TemplateTable templates={financeTemplates} onApprove={handleApprove} onReject={handleReject} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="mapping" className="space-y-4">
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Template Field Mapping</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Map template placeholders to system fields. Drag fields to reorder priority.</p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8"></TableHead>
                  <TableHead>Template Placeholder</TableHead>
                  <TableHead>System Field</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fieldMappings.map((fm, i) => (
                  <TableRow key={i}>
                    <TableCell><GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" /></TableCell>
                    <TableCell><code className="bg-muted px-2 py-0.5 rounded text-xs">{fm.placeholder}</code></TableCell>
                    <TableCell>{fm.systemField ? <code className="text-xs text-primary">{fm.systemField}</code> : <span className="text-xs text-muted-foreground italic">Not mapped</span>}</TableCell>
                    <TableCell>{fm.mapped ? <Badge variant="default" className="text-xs">Mapped</Badge> : <Badge variant="secondary" className="text-xs">Unmapped</Badge>}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" size="sm">Generate Sample</Button>
              <Button size="sm">Preview Mapped Document</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="approval" className="space-y-4">
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Template Approval Queue</CardTitle></CardHeader>
          <CardContent>
            {templates.filter((t) => t.status === "In Review" || t.status === "Pending").map((t) => (
              <div key={t.id} className="flex items-center justify-between border rounded-lg p-4 mb-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.category} · {t.type} · v{t.version} · Uploaded by {t.uploadedBy} on {t.uploadedOn}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm"><Eye className="h-4 w-4 mr-1" /> Preview</Button>
                  <Button variant="outline" size="sm" onClick={() => handleReject(t.id)}><RotateCcw className="h-4 w-4 mr-1" /> Send Back</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleReject(t.id)}><XCircle className="h-4 w-4 mr-1" /> Reject</Button>
                  <Button size="sm" onClick={() => handleApprove(t.id)}><CheckCircle className="h-4 w-4 mr-1" /> Approve</Button>
                </div>
              </div>
            ))}
            {templates.filter((t) => t.status === "In Review" || t.status === "Pending").length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">No templates pending approval.</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="download" className="space-y-4">
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Template Library</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Template</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Format</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {templates.filter((t) => t.status === "Approved").map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-medium text-sm">{t.name}</TableCell>
                    <TableCell><Badge variant="outline">{t.category}</Badge></TableCell>
                    <TableCell className="text-sm">{t.type}</TableCell>
                    <TableCell><Badge variant="secondary">{t.fileType}</Badge></TableCell>
                    <TableCell>v{t.version}</TableCell>
                    <TableCell><StatusBadge status="approved" /></TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

function TemplateTable({ templates, onApprove, onReject }: { templates: Template[]; onApprove: (id: string) => void; onReject: (id: string) => void }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Format</TableHead>
          <TableHead>Version</TableHead>
          <TableHead>Fields</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {templates.map((t) => (
          <TableRow key={t.id}>
            <TableCell className="font-mono text-xs">{t.id}</TableCell>
            <TableCell className="font-medium text-sm">{t.name}</TableCell>
            <TableCell className="text-sm">{t.type}</TableCell>
            <TableCell><Badge variant="secondary">{t.fileType}</Badge></TableCell>
            <TableCell>v{t.version}</TableCell>
            <TableCell>{t.mappedFields > 0 ? <span className="text-xs text-primary">{t.mappedFields} mapped</span> : <span className="text-xs text-muted-foreground">—</span>}</TableCell>
            <TableCell><StatusBadge status={t.status === "Approved" ? "approved" : t.status === "Rejected" ? "rejected" : "in-review"} /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

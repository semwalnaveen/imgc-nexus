import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, Save, SendHorizonal, FileText, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface LenderFormData {
  lenderName: string;
  lenderType: string;
  registrationNumber: string;
  headOfficeAddress: string;
  contactPerson: string;
  contactEmail: string;
  phone: string;
  operationalRegion: string;
  riskCategory: string;
  regulatoryLicense: string;
}

const initialForm: LenderFormData = {
  lenderName: "", lenderType: "", registrationNumber: "", headOfficeAddress: "",
  contactPerson: "", contactEmail: "", phone: "", operationalRegion: "",
  riskCategory: "", regulatoryLicense: "",
};

interface LenderSetupFormProps {
  onComplete: () => void;
}

export function LenderSetupForm({ onComplete }: LenderSetupFormProps) {
  const [form, setForm] = useState<LenderFormData>(initialForm);
  const [documents, setDocuments] = useState<string[]>([]);
  const [status, setStatus] = useState<"draft" | "submitted">("draft");

  const update = (field: keyof LenderFormData, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleAddDocument = () => {
    const names = ["PAN Card.pdf", "GST Certificate.pdf", "Registration Certificate.pdf", "Board Resolution.pdf", "KYC Form.pdf"];
    const available = names.filter((n) => !documents.includes(n));
    if (available.length > 0) {
      setDocuments((prev) => [...prev, available[0]]);
      toast({ title: "Document uploaded", description: `${available[0]} attached successfully.` });
    }
  };

  const handleSaveDraft = () => {
    setStatus("draft");
    toast({ title: "Draft saved", description: "Lender setup saved as draft." });
  };

  const handleSubmit = () => {
    if (!form.lenderName || !form.lenderType || !form.registrationNumber || !form.contactEmail) {
      toast({ title: "Validation error", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }
    setStatus("submitted");
    toast({ title: "Submitted for approval", description: "Lender setup submitted via Maker-Checker workflow." });
    onComplete();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Lender Registration Details</CardTitle>
            <Badge variant={status === "draft" ? "secondary" : "default"}>{status === "draft" ? "Draft" : "Submitted"}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Lender Name <span className="text-destructive">*</span></Label>
              <Input placeholder="Enter lender name" value={form.lenderName} onChange={(e) => update("lenderName", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Lender Type <span className="text-destructive">*</span></Label>
              <Select value={form.lenderType} onValueChange={(v) => update("lenderType", v)}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bank">Bank</SelectItem>
                  <SelectItem value="NBFC">NBFC</SelectItem>
                  <SelectItem value="HFC">Housing Finance Company</SelectItem>
                  <SelectItem value="Direct Vendor">Direct Vendor</SelectItem>
                  <SelectItem value="Indirect Vendor">Indirect Vendor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Registration Number <span className="text-destructive">*</span></Label>
              <Input placeholder="CIN / Registration #" value={form.registrationNumber} onChange={(e) => update("registrationNumber", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Primary Contact Person</Label>
              <Input placeholder="Full name" value={form.contactPerson} onChange={(e) => update("contactPerson", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Contact Email <span className="text-destructive">*</span></Label>
              <Input type="email" placeholder="email@lender.com" value={form.contactEmail} onChange={(e) => update("contactEmail", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Operational Region</Label>
              <Select value={form.operationalRegion} onValueChange={(v) => update("operationalRegion", v)}>
                <SelectTrigger><SelectValue placeholder="Select region" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pan India">Pan India</SelectItem>
                  <SelectItem value="North">North</SelectItem>
                  <SelectItem value="South">South</SelectItem>
                  <SelectItem value="East">East</SelectItem>
                  <SelectItem value="West">West</SelectItem>
                  <SelectItem value="West & South">West & South</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Risk Category</Label>
              <Select value={form.riskCategory} onValueChange={(v) => update("riskCategory", v)}>
                <SelectTrigger><SelectValue placeholder="Select risk" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Regulatory License Number</Label>
              <Input placeholder="License #" value={form.regulatoryLicense} onChange={(e) => update("regulatoryLicense", e.target.value)} />
            </div>
            <div className="md:col-span-2 lg:col-span-3 space-y-2">
              <Label>Head Office Address</Label>
              <Textarea placeholder="Complete head office address" value={form.headOfficeAddress} onChange={(e) => update("headOfficeAddress", e.target.value)} rows={2} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">KYC Document Upload</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed rounded-lg p-6 text-center mb-4">
            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Drag & drop KYC documents or click to browse</p>
            <p className="text-xs text-muted-foreground mt-1">PAN, GST Certificate, Registration Certificate, Board Resolution</p>
            <Button variant="outline" size="sm" className="mt-3" onClick={handleAddDocument}>Browse Files</Button>
          </div>
          {documents.length > 0 && (
            <div className="space-y-2">
              {documents.map((doc) => (
                <div key={doc} className="flex items-center justify-between bg-muted/50 rounded-md px-3 py-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-sm">{doc}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setDocuments((prev) => prev.filter((d) => d !== doc))}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={handleSaveDraft}><Save className="h-4 w-4 mr-2" /> Save Draft</Button>
        <Button onClick={handleSubmit}><SendHorizonal className="h-4 w-4 mr-2" /> Submit for Approval</Button>
      </div>
    </div>
  );
}

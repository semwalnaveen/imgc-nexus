import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RiskHeatmap } from "@/components/RiskHeatmap";
import { LoanLifecycleTimeline } from "@/components/LoanLifecycleTimeline";
import { CaseActivityTimeline } from "@/components/CaseActivityTimeline";
import { StatusBadge } from "@/components/StatusBadge";
import { User, Building2, MapPin, Phone, FileText, IndianRupee, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const riskParams = [
  { label: "Credit Score", score: 72 },
  { label: "LTV", score: 65 },
  { label: "FOIR", score: 38 },
  { label: "Income Stability", score: 80 },
  { label: "Employment Type", score: 75 },
  { label: "Property Type", score: 85 },
  { label: "Location Risk", score: 60 },
  { label: "Banking Behaviour", score: 70 },
];

const lifecycleStages = [
  { label: "Loan Created", status: "completed" as const, timestamp: "01 Feb 2026, 10:30 AM", user: "System" },
  { label: "Detailed Data Entry", status: "completed" as const, timestamp: "02 Feb 2026, 02:15 PM", user: "Priya S." },
  { label: "Documents Uploaded", status: "completed" as const, timestamp: "03 Feb 2026, 11:00 AM", user: "Priya S." },
  { label: "Underwriting Assessment", status: "completed" as const, timestamp: "05 Feb 2026, 04:30 PM", user: "Rajesh K." },
  { label: "Deviation Review", status: "completed" as const, timestamp: "06 Feb 2026, 10:00 AM", user: "Sunil M." },
  { label: "Approval", status: "completed" as const, timestamp: "06 Feb 2026, 03:00 PM", user: "Sunil M." },
  { label: "MG Offer Generated", status: "current" as const, timestamp: "07 Feb 2026, 09:00 AM", user: "System" },
  { label: "Loan Disbursed", status: "pending" as const },
  { label: "Invoice Generated", status: "pending" as const },
  { label: "Invoice Shared with Lender", status: "pending" as const },
  { label: "Invoice Amount Received", status: "pending" as const },
  { label: "Loan Active", status: "pending" as const },
];

const activityEvents = [
  { action: "Loan application created", user: "System", role: "Auto", timestamp: "01 Feb 2026, 10:30 AM", type: "create" as const },
  { action: "KYC documents uploaded (PAN, Aadhaar)", user: "Priya Sharma", role: "CPA", timestamp: "02 Feb 2026, 02:15 PM", type: "upload" as const },
  { action: "Underwriting review initiated", user: "Rajesh Kumar", role: "Underwriter", timestamp: "05 Feb 2026, 04:30 PM", type: "review" as const },
  { action: "Deviation raised — FOIR exceeds 55%", user: "Rajesh Kumar", role: "Underwriter", timestamp: "05 Feb 2026, 05:00 PM", type: "deviation" as const },
  { action: "Deviation approved with conditions", user: "Sunil Mehta", role: "Sr. Manager", timestamp: "06 Feb 2026, 10:00 AM", type: "approve" as const },
  { action: "MG Offer letter generated", user: "System", role: "Auto", timestamp: "07 Feb 2026, 09:00 AM", type: "invoice" as const },
];

export default function Loan360() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Loan 360° — Command Center</h1>
            <StatusBadge status="in-uw" />
          </div>
          <p className="text-sm text-muted-foreground mt-1">LAN: <span className="font-mono">IMGC-2026-00456</span> · SBI Home Loan · ₹45,00,000</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><FileText className="h-4 w-4 mr-1" /> Export</Button>
          <Button size="sm"><ExternalLink className="h-4 w-4 mr-1" /> Open in UW</Button>
        </div>
      </div>

      {/* Loan Summary Strip */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {[
          { label: "Loan Amount", value: "₹45,00,000" },
          { label: "LTV", value: "78%" },
          { label: "FOIR", value: "62%" },
          { label: "CIBIL", value: "721" },
          { label: "Tenure", value: "20 yrs" },
          { label: "Risk Grade", value: "B+" },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="p-3 text-center">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="text-lg font-bold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="borrower">Borrower</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="lifecycle">Lifecycle</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="lender">Lender</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><User className="h-4 w-4" /> Borrower Summary</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div><span className="text-muted-foreground">Name:</span> Amit Patel</div>
                  <div><span className="text-muted-foreground">PAN:</span> ABCPD1234E</div>
                  <div><span className="text-muted-foreground">Mobile:</span> 98765 43210</div>
                  <div><span className="text-muted-foreground">Age:</span> 34 years</div>
                  <div><span className="text-muted-foreground">Employer:</span> TCS Ltd</div>
                  <div><span className="text-muted-foreground">Income:</span> ₹1,20,000/mo</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><Building2 className="h-4 w-4" /> Property Details</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div><span className="text-muted-foreground">Type:</span> Flat / Apartment</div>
                  <div><span className="text-muted-foreground">Area:</span> 1,250 sq ft</div>
                  <div><span className="text-muted-foreground">Value:</span> ₹58,00,000</div>
                  <div><span className="text-muted-foreground">Builder:</span> Godrej Properties</div>
                  <div className="col-span-2"><span className="text-muted-foreground">Location:</span> Thane West, Mumbai</div>
                </div>
              </CardContent>
            </Card>
          </div>
          <RiskHeatmap parameters={riskParams} overallScore={72} />
        </TabsContent>

        <TabsContent value="borrower">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2"><User className="h-4 w-4" /> Personal</h4>
                  <div><span className="text-muted-foreground">Full Name:</span> Amit Rajesh Patel</div>
                  <div><span className="text-muted-foreground">DOB:</span> 15 Jun 1991</div>
                  <div><span className="text-muted-foreground">Gender:</span> Male</div>
                  <div><span className="text-muted-foreground">Marital Status:</span> Married</div>
                  <div><span className="text-muted-foreground">Education:</span> Post Graduate</div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2"><MapPin className="h-4 w-4" /> Address</h4>
                  <div><span className="text-muted-foreground">Current:</span> 402, Sai Krupa Apts, Andheri West, Mumbai 400053</div>
                  <div><span className="text-muted-foreground">Permanent:</span> Same as current</div>
                  <div><span className="text-muted-foreground">Residence Type:</span> Rented</div>
                  <div><span className="text-muted-foreground">Years at Current:</span> 4 years</div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2"><Phone className="h-4 w-4" /> Contact & ID</h4>
                  <div><span className="text-muted-foreground">Mobile:</span> +91 98765 43210</div>
                  <div><span className="text-muted-foreground">Email:</span> amit.patel@email.com</div>
                  <div><span className="text-muted-foreground">PAN:</span> ABCPD1234E</div>
                  <div><span className="text-muted-foreground">Aadhaar:</span> XXXX XXXX 5678</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk"><RiskHeatmap parameters={riskParams} overallScore={72} /></TabsContent>

        <TabsContent value="lifecycle">
          <Card>
            <CardHeader><CardTitle className="text-base">Loan Lifecycle</CardTitle></CardHeader>
            <CardContent><LoanLifecycleTimeline stages={lifecycleStages} /></CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial">
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2"><IndianRupee className="h-4 w-4" /> Loan Financials</h4>
                  <div><span className="text-muted-foreground">Sanctioned:</span> ₹45,00,000</div>
                  <div><span className="text-muted-foreground">Disbursed:</span> ₹0</div>
                  <div><span className="text-muted-foreground">EMI:</span> ₹39,200/mo</div>
                  <div><span className="text-muted-foreground">ROI:</span> 8.75%</div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">MG Fee Details</h4>
                  <div><span className="text-muted-foreground">Premium:</span> ₹54,000</div>
                  <div><span className="text-muted-foreground">GST:</span> ₹9,720</div>
                  <div><span className="text-muted-foreground">Total:</span> ₹63,720</div>
                  <div><span className="text-muted-foreground">Payment:</span> Pending</div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Invoice</h4>
                  <div><span className="text-muted-foreground">Invoice #:</span> —</div>
                  <div><span className="text-muted-foreground">Status:</span> Not Generated</div>
                  <div className="pt-2"><Button variant="outline" size="sm">Generate Invoice</Button></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-4">
                {["PAN Card", "Aadhaar Card", "Salary Slips (3 months)", "Bank Statement (6 months)", "ITR (2 years)", "Property Agreement", "Title Search Report", "Valuation Report"].map((doc, i) => (
                  <div key={doc} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{doc}</span>
                    </div>
                    <Badge variant={i < 5 ? "default" : "outline"}>{i < 5 ? "Uploaded" : "Pending"}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader><CardTitle className="text-base">Case Activity Timeline</CardTitle></CardHeader>
            <CardContent><CaseActivityTimeline events={activityEvents} /></CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lender">
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2"><Building2 className="h-4 w-4" /> Lender Details</h4>
                  <div><span className="text-muted-foreground">Lender:</span> State Bank of India</div>
                  <div><span className="text-muted-foreground">Branch:</span> Andheri West, Mumbai</div>
                  <div><span className="text-muted-foreground">Deal:</span> SBI-IMGC-2024-01</div>
                  <div><span className="text-muted-foreground">Scheme:</span> Standard MG Cover</div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Contact</h4>
                  <div><span className="text-muted-foreground">RM Name:</span> Deepak Verma</div>
                  <div><span className="text-muted-foreground">Phone:</span> +91 99876 54321</div>
                  <div><span className="text-muted-foreground">Email:</span> deepak.verma@sbi.co.in</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

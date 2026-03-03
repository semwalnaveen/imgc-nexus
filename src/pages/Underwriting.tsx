import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { WorkflowTracker } from "@/components/WorkflowTracker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Brain, ShieldCheck, TrendingUp, AlertTriangle, CheckCircle, XCircle,
  Clock, FileText, MessageSquare, Sparkles, Calculator, Scale,
  Eye, Flag, Mail, Gavel,
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
  const [activeTab, setActiveTab] = useState("summary");

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

      {/* Loan Header */}
      <Card className="enterprise-shadow">
        <CardContent className="p-3">
          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2 text-xs">
            <div><span className="text-muted-foreground">Loan Number</span><p className="font-semibold">LN-2026-001245</p></div>
            <div><span className="text-muted-foreground">Lender</span><p className="font-semibold">LIC HFL</p></div>
            <div><span className="text-muted-foreground">Borrower</span><p className="font-semibold">Amit Sharma</p></div>
            <div><span className="text-muted-foreground">Employment</span><p className="font-semibold">SE Business</p></div>
            <div><span className="text-muted-foreground">Receipt Date</span><p className="font-semibold">03-Mar-2026</p></div>
            <div><span className="text-muted-foreground">Property Type</span><p className="font-semibold">Apartment</p></div>
            <div><span className="text-muted-foreground">Mapped Scheme</span><p className="font-semibold">LICH0014</p></div>
            <div><span className="text-muted-foreground">Risk Grade</span><p className="font-semibold text-warning">38.6</p></div>
            <div><span className="text-muted-foreground">IMGC Score</span><p className="font-semibold">745</p></div>
            <div><span className="text-muted-foreground">Decision Status</span><p className="font-semibold text-primary">Full UW</p></div>
          </div>
        </CardContent>
      </Card>

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
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start flex-wrap h-auto gap-1 bg-muted/50 p-1">
              {[
                "Summary", "Loan Chars", "General Data", "Employment", "Income",
                "CIBIL", "Obligations", "Banking", "Appraisal",
                "Legal & Tech", "Internal Data", "Resolution", "Letters", "Smart View",
                "Eligibility", "Ratios", "Policy Norms"
              ].map((tab) => (
                <TabsTrigger key={tab} value={tab.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")} className="text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="summary" className="mt-4 space-y-4">
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> AI Recommendation</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p className="font-medium">Recommendation: <span className="text-success">Conditional Approve</span></p>
                    <p className="text-muted-foreground">Based on analysis of 12 risk factors, this application shows low-medium risk profile. CIBIL score is above threshold. FOIR within acceptable limits. Property valuation aligns with market rates.</p>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline" className="text-xs">Confidence: 87%</Badge>
                      <Badge variant="outline" className="text-xs">12 factors analyzed</Badge>
                      <Badge variant="outline" className="text-xs">BRE: Passed</Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <Card className="enterprise-shadow">
                <CardHeader className="pb-2"><CardTitle className="text-sm">Loan Summary</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6 text-sm">
                    {[
                      ["Product", "Home Loan"], ["Lender", "LIC Housing Finance"], ["Tenure", "20 Years"],
                      ["Property", "Apartment - Mumbai"], ["Builder", "Lodha Group"], ["ROI", "8.75%"],
                      ["Loan Amount", "₹45,00,000"], ["Property Value", "₹62,00,000"], ["EMI", "₹42,000"],
                      ["PMAY", "Category Not Specified"], ["Loan Purpose", "Purchase + Extension"], ["End Use", "Investment"],
                    ].map(([label, value]) => (
                      <div key={label}><p className="text-muted-foreground text-xs">{label}</p><p className="font-medium">{value}</p></div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Comment History / Action Log */}
              <Card className="enterprise-shadow">
                <CardHeader className="pb-2"><CardTitle className="text-sm">Comment History / Action Log</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { user: "Abhilash Jha", date: "23-JAN-2026 12:59:44", status: "Analysis", stage: "Analysis" },
                      { user: "ITOPSSIT", date: "22-JAN-2026 12:40:33", status: "Transferred", stage: "Transfer" },
                      { user: "Mithun", date: "31-JAN-2025 11:21:44", status: "Analysis", stage: "Analysis" },
                    ].map((entry, i) => (
                      <div key={i} className="flex items-center justify-between text-xs p-2 rounded border">
                        <span className="font-medium">{entry.user}</span>
                        <span className="text-muted-foreground">{entry.date}</span>
                        <StatusBadge status={entry.status === "Analysis" ? "in-review" : "pending"} />
                        <span className="text-muted-foreground">{entry.stage}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="loan-chars" className="mt-4">
              <Card className="enterprise-shadow">
                <CardHeader><CardTitle className="text-sm">Loan Characteristics</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    {[
                      ["Loan Number", "LN-2026-001245"], ["Unique ID 2", ""],
                      ["Distance from Location (OGL - km)", ""], ["IMGC Classification (Location)", ""],
                      ["Sourcing Region", "West"], ["Sourcing City", "Mumbai"],
                      ["Branch Name", "Andheri"], ["Sourcing Channel", "DIRECT"],
                      ["DST Code", "INT"], ["Application Date", "03-Mar-2026"],
                      ["Sanctioned Loan Pre-approval", "₹45,00,000"], ["Final Sanctioned Amount", "₹45,00,000"],
                      ["Sanction Date", ""], ["Total Disbursement", "₹45,00,000"],
                      ["Sanctioned Loan Period", "240"], ["Repayment Structure", "EMI"],
                      ["First Disbursement Date", ""], ["Sanctioned Interest Rate %", "8.75"],
                      ["EMI Amount", "₹42,000"], ["EMI Date", ""],
                      ["EMI Cycle", "Monthly"], ["Loan Type", "Home Loan"],
                      ["Loan Purpose", "Purchase + Extension"],
                    ].map(([label, value]) => (
                      <div key={label} className="space-y-1">
                        <Label className="text-xs">{label}</Label>
                        <Input defaultValue={value} className="h-8 text-sm" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="general-data" className="mt-4">
              <Card className="enterprise-shadow">
                <CardHeader><CardTitle className="text-sm">General Data</CardTitle></CardHeader>
                <CardContent>
                  <div className="overflow-auto mb-4">
                    <table className="w-full text-xs border">
                      <thead><tr className="border-b bg-muted/30">
                        <th className="p-2 text-left">Description</th>
                        <th className="p-2 text-left">Borrower</th>
                        <th className="p-2 text-left">CoBorrower1</th>
                        <th className="p-2 text-left">CoBorrower2</th>
                        <th className="p-2 text-left">CoBorrower3</th>
                        <th className="p-2 text-left">CoBorrower4</th>
                      </tr></thead>
                      <tbody>
                        {[
                          { desc: "Borrower Full Name", vals: ["Amit Sharma", "", "", "", ""] },
                          { desc: "Type of Employment", vals: ["SE Business", "", "", "", ""] },
                          { desc: "ID Type / ID Number", vals: ["PAN / ABCPS1234K", "", "", "", ""] },
                          { desc: "Property Ownership", vals: ["Not Available", "Yes", "Yes", "", ""] },
                          { desc: "No. of Owned Homes", vals: ["1", "0", "0", "", ""] },
                          { desc: "Borrower Age at Maturity", vals: ["58", "", "", "", ""] },
                          { desc: "Sole Child", vals: ["No", "No", "No", "No", "No"] },
                          { desc: "Residence OGL", vals: ["No", "No", "No", "No", "No"] },
                        ].map((row) => (
                          <tr key={row.desc} className="border-b">
                            <td className="p-2 font-medium">{row.desc}</td>
                            {row.vals.map((v, i) => <td key={i} className="p-2">{v}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="employment" className="mt-4">
              <Card className="enterprise-shadow">
                <CardHeader><CardTitle className="text-sm">Employment</CardTitle></CardHeader>
                <CardContent>
                  <div className="overflow-auto">
                    <table className="w-full text-xs border">
                      <thead><tr className="border-b bg-muted/30">
                        <th className="p-2 text-left">Description</th><th className="p-2">Borrower</th><th className="p-2">CoBorrower1</th><th className="p-2">CoBorrower2</th><th className="p-2">CoBorrower3</th>
                      </tr></thead>
                      <tbody>
                        {[
                          ["IMGC Program", "Griha Sugan - ABP", "Griha Sugan - ABP", "Griha Sugan - ABP", "Griha Sugan - ABP"],
                          ["Employer/Entity Name", "", "", "", ""],
                          ["Employer/Entity Type", "Private Limited Co.", "Public Limited Co.", "Individual", "Partnership Firm"],
                          ["Paid Up Capital (Lakhs)", "", "", "", ""],
                          ["Vintage Since Incorporation", "", "", "", ""],
                          ["SE Type", "Professional", "Service Provider", "Professional", "Manufacturer"],
                          ["Occupation Code", "", "", "", ""],
                          ["Work Details", "", "", "", ""],
                          ["Profile Type", "Not Applicable", "", "", ""],
                          ["Caution Profile", "", "", "", ""],
                          ["Specific Profile", "", "", "", ""],
                        ].map(([desc, ...vals]) => (
                          <tr key={desc} className="border-b">
                            <td className="p-2 font-medium">{desc}</td>
                            {vals.map((v, i) => <td key={i} className="p-2">{v}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cibil" className="mt-4">
              <Card className="enterprise-shadow">
                <CardHeader><CardTitle className="text-sm">View / Generate CIBIL</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Amit Sharma (Primary)", date: "03-MAR-2026 10:35:53", score: "745" },
                    { name: "Priya Sharma (Co-Borrower 1)", date: "03-MAR-2026 10:33:43", score: "712" },
                  ].map((member) => (
                    <div key={member.name} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">Last Generated: {member.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold">{member.score}</span>
                        <Button variant="outline" size="sm">Generate</Button>
                        <Button variant="outline" size="sm"><Eye className="h-3 w-3 mr-1" /> View</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="obligations" className="mt-4">
              <Card className="enterprise-shadow">
                <CardHeader><CardTitle className="text-sm">Obligation Details</CardTitle></CardHeader>
                <CardContent>
                  <div className="overflow-auto">
                    <table className="w-full text-xs border">
                      <thead><tr className="border-b bg-muted/30">
                        <th className="p-2">B.No</th><th className="p-2 text-left">Borrower Name</th><th className="p-2 text-left">Obligation Type</th>
                        <th className="p-2 text-right">Sanctioned (₹)</th><th className="p-2 text-right">Outstanding (₹)</th>
                        <th className="p-2 text-right">EMI (₹)</th><th className="p-2 text-left">Status</th><th className="p-2">CIBIL Date/Time</th>
                      </tr></thead>
                      <tbody>
                        {["Amit Sharma", "Priya Sharma"].map((name, i) => (
                          <tr key={i} className="border-b">
                            <td className="p-2 text-center">{i + 1}</td><td className="p-2 font-medium">{name}</td>
                            <td className="p-2"><Input className="h-7 text-xs" /></td>
                            <td className="p-2"><Input className="h-7 text-right text-xs" /></td>
                            <td className="p-2"><Input className="h-7 text-right text-xs" /></td>
                            <td className="p-2"><Input className="h-7 text-right text-xs" /></td>
                            <td className="p-2"><Select><SelectTrigger className="h-7 text-xs"><SelectValue placeholder="Select" /></SelectTrigger>
                              <SelectContent><SelectItem value="active">Active</SelectItem><SelectItem value="closed">Closed</SelectItem></SelectContent>
                            </Select></td>
                            <td className="p-2 text-muted-foreground text-center">Auto</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">+ Add</Button>
                  <div className="flex justify-between items-center rounded-lg border p-2 bg-muted/30 mt-2 text-sm">
                    <span className="font-medium">Sum of Obligations:</span><span className="font-bold">₹0</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="banking" className="mt-4">
              <Card className="enterprise-shadow">
                <CardHeader><CardTitle className="text-sm">Banking Analysis</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
                    <div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">Employment Type</p><p className="font-semibold">SE Business</p></div>
                    <div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">ABB (Manual/Auto)</p><p className="font-semibold">Manual</p></div>
                    <div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">Final ABB</p><p className="font-semibold">₹10,08,547</p></div>
                    <div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">EMI to ABB Ratio</p><p className="font-semibold">4.57</p></div>
                  </div>
                  <p className="text-xs text-muted-foreground">Detailed banking analysis with monthly breakdown available.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appraisal" className="mt-4">
              <Card className="enterprise-shadow">
                <CardHeader><CardTitle className="text-sm">Appraisal / Property Details</CardTitle></CardHeader>
                <CardContent>
                  <div className="overflow-auto">
                    <table className="w-full text-xs border">
                      <thead><tr className="border-b bg-muted/30">
                        <th className="p-2 text-left">Description</th><th className="p-2">Actual</th><th className="p-2">Extracted</th><th className="p-2">Hyperlink</th><th className="p-2">In Loan File</th>
                      </tr></thead>
                      <tbody>
                        {[
                          ["Property Insurance", "Yes", "", "", ""],
                          ["Type of Property", "Apartment", "", "", ""],
                          ["Property Address 1", "", "", "", ""],
                          ["Property Address 2", "", "", "", ""],
                          ["Property SubCity or City", "Mumbai", "", "", ""],
                          ["Property State", "Maharashtra", "", "", ""],
                          ["Property PIN", "400053", "", "", ""],
                          ["% Completion", "88%", "", "", ""],
                          ["BUA / Rate per sq ft", "1250 / @ 4960", "", "", ""],
                          ["Market Value (₹)", "62,00,000", "", "", ""],
                          ["APF Tag", "Y", "", "", ""],
                          ["Construction Type", "Developer", "", "", ""],
                        ].map(([desc, ...vals]) => (
                          <tr key={desc} className="border-b">
                            <td className="p-2 font-medium">{desc}</td>
                            {vals.map((v, i) => <td key={i} className="p-2 text-center"><Input className="h-7 text-xs text-center" defaultValue={v} /></td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="legal-tech" className="mt-4">
              <Card className="enterprise-shadow">
                <CardHeader><CardTitle className="text-sm">Legal & Technical Details</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">Legal & Technical verification panel. Geo-tagging integration for property coordinates.</p></CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="internal-data" className="mt-4">
              <Card className="enterprise-shadow">
                <CardHeader><CardTitle className="text-sm">Internal Data Capture at IMGC</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>MG Fees (Exclusive of Taxes) ₹</Label><Input defaultValue="18,80,000" /></div>
                    <div className="space-y-2"><Label>Mortgage Guarantee Fees %</Label><Input defaultValue="50.00" /></div>
                    <div className="space-y-2"><Label>MG Fees (Inclusive of Taxes) ₹</Label><Input defaultValue="18,09,000" readOnly className="bg-muted/50" /></div>
                    <div className="space-y-2"><Label>Allow Duplicate</Label>
                      <Select defaultValue="n"><SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="y">Yes</SelectItem><SelectItem value="n">No</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2"><Label>Allow Duplicate Reason</Label><Input /></div>
                    <div className="space-y-2"><Label>Allow Duplicate Selected By</Label><Input readOnly className="bg-muted/50" /></div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resolution" className="mt-4">
              <Card className="enterprise-shadow">
                <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Gavel className="h-4 w-4" /> Resolution & Deviation Details</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex gap-3 mb-4 flex-wrap">
                    <Button variant="outline" size="sm">Manual Deviation Selection</Button>
                    <Button variant="outline" size="sm">Loan Level</Button>
                    <Button variant="outline" size="sm">Borrower Level</Button>
                    <Button size="sm">+ Add New Deviation</Button>
                  </div>
                  <div className="overflow-auto">
                    <table className="w-full text-xs border">
                      <thead><tr className="border-b bg-muted/30">
                        <th className="p-2 text-left">Deviation Type</th><th className="p-2 text-left">Deviation</th><th className="p-2 text-left">Description</th>
                        <th className="p-2 text-left">Actual Value</th><th className="p-2 text-left">Applicable Policy</th><th className="p-2 text-left">Mitigants</th>
                        <th className="p-2">Level</th><th className="p-2">Date</th><th className="p-2">Action</th>
                      </tr></thead>
                      <tbody>
                        {[
                          ["Loan Level", "Checked Duplicate", "More than 1 MG on same property", "", "", "", "L2", "03/03/2026"],
                          ["Loan Level", "Technical Exception", "Low maturity group deviation", "No", "Yes", "Technical", "L3", "03/03/2026"],
                          ["Loan Level", "Loan Characteristics", "Loan Type Other Than Home Loan", "", "", "Not Allowed", "L2", "03/03/2026"],
                        ].map(([type, dev, desc, actual, policy, mitigant, level, date], i) => (
                          <tr key={i} className="border-b">
                            <td className="p-2">{type}</td><td className="p-2 font-medium">{dev}</td><td className="p-2">{desc}</td>
                            <td className="p-2">{actual}</td><td className="p-2">{policy}</td><td className="p-2">{mitigant}</td>
                            <td className="p-2 text-center"><Badge variant="outline">{level}</Badge></td>
                            <td className="p-2 text-muted-foreground">{date}</td>
                            <td className="p-2"><Button variant="ghost" size="sm" className="text-destructive h-6 px-1">Remove</Button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="letters" className="mt-4">
              <Card className="enterprise-shadow">
                <CardHeader><CardTitle className="text-sm">Letters Details</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">Note Type: STO</p><p className="text-sm">Standard conditions as per policy guidelines.</p></div>
                  </div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Generated Letters</h4>
                  <div className="space-y-2">
                    {[
                      { date: "03-MAR-2026 10:10:23", detail: "General Mortgage Guarantee Offer" },
                      { date: "02-MAR-2026 18:08:09", detail: "Pre-approval Mortgage Guarantee Offer" },
                    ].map((letter, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded border text-sm">
                        <div><p className="font-medium">{letter.detail}</p><p className="text-xs text-muted-foreground">{letter.date}</p></div>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm"><Eye className="h-3 w-3 mr-1" /> View</Button>
                          <Button variant="outline" size="sm"><Mail className="h-3 w-3 mr-1" /> Send</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Label>Reason for Change / Revision</Label>
                    <Textarea placeholder="Enter reason for revision..." className="mt-1" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="smart-view" className="mt-4">
              <Card className="enterprise-shadow">
                <CardHeader><CardTitle className="text-sm">Smart View / Case Recommendation</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div><p className="text-xs text-muted-foreground">Loan No.</p><p className="font-semibold">LN-2026-001245</p></div>
                    <div><p className="text-xs text-muted-foreground">Lender Name</p><p className="font-semibold">LICH</p></div>
                    <div><p className="text-xs text-muted-foreground">Application Form No.</p><p className="font-semibold">-</p></div>
                    <div><p className="text-xs text-muted-foreground">Login Date</p><p className="font-semibold">03-Mar-2026</p></div>
                  </div>

                  <div className="rounded-lg border p-3">
                    <h5 className="text-xs font-semibold text-muted-foreground mb-2">LOAN STRUCTURE (Summary)</h5>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                      <div><span className="text-muted-foreground">Employment</span><p className="font-medium">SE Business</p></div>
                      <div><span className="text-muted-foreground">Income Segment</span><p className="font-medium">Informal</p></div>
                      <div><span className="text-muted-foreground">LTV</span><p className="font-medium">72.6%</p></div>
                      <div><span className="text-muted-foreground">ABB/EMI Ratio</span><p className="font-medium">4.57</p></div>
                      <div><span className="text-muted-foreground">PMAY</span><p className="font-medium">Category Not Specified</p></div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-3">
                    <h5 className="text-xs font-semibold text-muted-foreground mb-2">BORROWER PROFILE</h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                      <div><span className="text-muted-foreground">Gender</span><p className="font-medium">Male</p></div>
                      <div><span className="text-muted-foreground">Age</span><p className="font-medium">38</p></div>
                      <div><span className="text-muted-foreground">Age at Maturity</span><p className="font-medium">58</p></div>
                      <div><span className="text-muted-foreground">CIBIL</span><p className="font-medium">745</p></div>
                      <div><span className="text-muted-foreground">Income Considered</span><p className="font-medium">Yes</p></div>
                      <div><span className="text-muted-foreground">Income Contributor</span><p className="font-medium">100%</p></div>
                      <div><span className="text-muted-foreground">Property Ownership</span><p className="font-medium">Not Available</p></div>
                      <div><span className="text-muted-foreground">Formal/Informal</span><p className="font-medium">Informal</p></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="eligibility" className="mt-4">
              <Card className="enterprise-shadow">
                <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Calculator className="h-4 w-4" /> Eligibility Calculator</CardTitle></CardHeader>
                <CardContent>
                  <h5 className="text-xs font-semibold text-muted-foreground mb-2">Borrower Level</h5>
                  <div className="overflow-auto mb-4">
                    <table className="w-full text-xs border">
                      <thead><tr className="border-b bg-muted/30">
                        <th className="p-2 text-left">Income Source</th><th className="p-2 text-right">Primary Borrower</th><th className="p-2 text-right">Co-Borrower 1</th><th className="p-2 text-right">Total</th>
                      </tr></thead>
                      <tbody>
                        <tr className="border-b"><td className="p-2">Gross Income</td><td className="p-2 text-right">₹1,50,000</td><td className="p-2 text-right">₹0</td><td className="p-2 text-right font-semibold">₹1,50,000</td></tr>
                        <tr className="border-b"><td className="p-2">Net Income</td><td className="p-2 text-right">₹1,20,000</td><td className="p-2 text-right">₹0</td><td className="p-2 text-right font-semibold">₹1,20,000</td></tr>
                        <tr className="border-b"><td className="p-2">FOIR %</td><td className="p-2 text-right">38%</td><td className="p-2 text-right">-</td><td className="p-2 text-right font-semibold">38%</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <h5 className="text-xs font-semibold text-muted-foreground mb-2">Loan Level</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1"><Label className="text-xs">Tap Down - Loan Amount</Label><Input className="h-8 text-sm" /></div>
                    <div className="space-y-1"><Label className="text-xs">Flip/Step Down - Applicable FOIR</Label><Input className="h-8 text-sm" /></div>
                    <div className="space-y-1"><Label className="text-xs">Flip/Step Down - Calculated FOIR</Label><Input className="h-8 text-sm" /></div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ratios" className="mt-4">
              <Card className="enterprise-shadow">
                <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Scale className="h-4 w-4" /> Ratio Analysis</CardTitle></CardHeader>
                <CardContent>
                  <div className="overflow-auto mb-4">
                    <table className="w-full text-xs border">
                      <thead><tr className="border-b bg-muted/30">
                        <th className="p-2 text-left">Publish on Smart View</th><th className="p-2 text-right">Current Year</th><th className="p-2 text-right">Previous Year</th>
                        <th className="p-2 text-right">Automated</th><th className="p-2 text-right">Manual</th><th className="p-2 text-right">Final Ratio</th>
                      </tr></thead>
                      <tbody>
                        {[
                          "Interest Paid on Loans", "Turnover", "Closing Stock", "PAT",
                          "Gross Profit", "Current Liabilities & Provisions",
                          "Loans from Banks", "Capital Employed",
                        ].map((item) => (
                          <tr key={item} className="border-b">
                            <td className="p-2 font-medium">{item}</td>
                            <td className="p-2"><Input className="h-7 text-right text-xs" /></td>
                            <td className="p-2"><Input className="h-7 text-right text-xs" /></td>
                            <td className="p-2"><Input className="h-7 text-right text-xs bg-muted/50" readOnly /></td>
                            <td className="p-2"><Input className="h-7 text-right text-xs" /></td>
                            <td className="p-2"><Input className="h-7 text-right text-xs bg-muted/50" readOnly /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { name: "Debtors Turnover Ratio", value: "0" },
                      { name: "Stock Turnover Ratio", value: "0" },
                      { name: "Growth in Turnover %", value: "0" },
                      { name: "Net Profit Margin %", value: "0" },
                    ].map((r) => (
                      <div key={r.name} className="rounded-lg border p-2 text-center">
                        <p className="text-[10px] text-muted-foreground">{r.name}</p>
                        <p className="font-bold">{r.value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="policy-norms" className="mt-4">
              <Card className="enterprise-shadow">
                <CardHeader><CardTitle className="text-sm">Policy Norms (Checklist)</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      "LTV within policy limit", "FOIR within acceptable range",
                      "CIBIL score above threshold", "Property in approved location",
                      "Builder APF verified", "Income documents verified",
                      "Banking analysis completed", "All deviations resolved",
                    ].map((norm) => (
                      <div key={norm} className="flex items-center justify-between p-2 rounded border text-sm">
                        <span>{norm}</span>
                        <Select><SelectTrigger className="w-[100px] h-8 text-xs"><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent><SelectItem value="met">Met</SelectItem><SelectItem value="not-met">Not Met</SelectItem><SelectItem value="na">N/A</SelectItem></SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Fallback for income tab */}
            <TabsContent value="income" className="mt-4">
              <Card className="enterprise-shadow">
                <CardHeader><CardTitle className="text-sm">Income Details</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">Salaried / Self Employed income details with auto-calculations.</p></CardContent>
              </Card>
            </TabsContent>
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
                  <div className="flex items-center justify-between"><span className="font-medium">Rajesh Kumar</span><span className="text-muted-foreground">2h ago</span></div>
                  <p className="text-muted-foreground">CIBIL check completed. Score within acceptable range. Property valuation report pending.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="enterprise-shadow">
            <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Flag className="h-4 w-4" /> Flag Case</CardTitle></CardHeader>
            <CardContent>
              <Select><SelectTrigger><SelectValue placeholder="Select flag type" /></SelectTrigger>
                <SelectContent><SelectItem value="par">PAR</SelectItem><SelectItem value="claims">Claims</SelectItem><SelectItem value="big-ticket">Big Ticket</SelectItem><SelectItem value="monitoring">Monitoring</SelectItem></SelectContent>
              </Select>
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
                    <div className="pb-3"><p className="font-medium">{item.action}</p><p className="text-muted-foreground">{item.user} · {item.time}</p></div>
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
          <Button variant="outline" size="sm"><Mail className="h-4 w-4 mr-1" /> Query to Lender</Button>
        </div>
        <div className="flex gap-2">
          <Button variant="destructive" size="sm"><XCircle className="h-4 w-4 mr-1" /> Reject</Button>
          <Button variant="success" size="sm"><ShieldCheck className="h-4 w-4 mr-1" /> Approve</Button>
        </div>
      </div>
    </div>
  );
}

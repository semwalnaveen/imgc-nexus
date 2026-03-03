import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/StatusBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Upload, ArrowRight, FileText, CheckSquare, Clock, Mail, Download } from "lucide-react";

const claims = [
  { id: "CLM-2026-0045", loan: "458070004831", customer: "Sunil Verma", amount: "₹12,50,000", status: "in-review" as const, date: "Feb 28, 2026", dpd: "180", npa: "Y", claimType: "Initial" },
  { id: "CLM-2026-0044", loan: "LN-2025-004521", customer: "Meena Agarwal", amount: "₹8,75,000", status: "approved" as const, date: "Feb 25, 2026", dpd: "210", npa: "Y", claimType: "Subsequent" },
  { id: "CLM-2026-0043", loan: "LN-2025-003892", customer: "Ravi Shankar", amount: "₹22,00,000", status: "pending" as const, date: "Feb 22, 2026", dpd: "90", npa: "Y", claimType: "Initial" },
  { id: "CLM-2026-0042", loan: "LN-2025-002156", customer: "Deepa Nair", amount: "₹15,00,000", status: "rejected" as const, date: "Feb 20, 2026", dpd: "270", npa: "Y", claimType: "Crystallization" },
];

const batchLotData = [
  { lan: "1101020047", location: "LUCKNOW", claimAmt: "₹19,43,182", emisPaid: 28, totalOverdue: "₹3,89,493", interest: "₹50,768", dpd: 2718 },
  { lan: "1101020302", location: "LUCKNOW", claimAmt: "₹45,00,441", emisPaid: 10, totalOverdue: "₹9,62,507", interest: "₹4,18,307", dpd: 73671 },
  { lan: "1102027655", location: "LUCKNOW", claimAmt: "₹18,75,837", emisPaid: 27, totalOverdue: "₹3,75,508", interest: "₹1,62,962", dpd: 36592 },
];

export default function Claims() {
  const [activeTab, setActiveTab] = useState("search");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div><h1>Claims Management</h1><p className="text-muted-foreground text-sm">Process and track guarantee claims – End-to-end workflow</p></div>
        <Button>New Claim</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start flex-wrap h-auto gap-1 bg-muted/50 p-1">
          {["Search", "Documentation", "Verification", "Servicing Analysis", "Recommendation", "Claim Template", "Payment Update", "Case Trail", "Batch Approval", "Letters"].map((tab) => (
            <TabsTrigger key={tab} value={tab.toLowerCase().replace(/ /g, "-")} className="text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">{tab}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="search" className="mt-4 space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by Claim ID, Loan ID, Customer..." className="pl-9" />
            </div>
            <Button variant="outline">Filters</Button>
          </div>

          <Card className="enterprise-shadow hidden md:block">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead><tr className="border-b bg-muted/30">
                  <th className="text-left p-3 font-medium text-muted-foreground">Claim ID</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Loan ID</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Customer</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Claim Type</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Amount</th>
                  <th className="text-center p-3 font-medium text-muted-foreground">DPD</th>
                  <th className="text-center p-3 font-medium text-muted-foreground">NPA</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
                  <th className="p-3"></th>
                </tr></thead>
                <tbody>
                  {claims.map((c) => (
                    <tr key={c.id} className="border-b last:border-0 hover:bg-muted/30 cursor-pointer">
                      <td className="p-3 font-medium text-primary">{c.id}</td>
                      <td className="p-3 text-muted-foreground">{c.loan}</td>
                      <td className="p-3">{c.customer}</td>
                      <td className="p-3"><span className="rounded bg-muted px-2 py-0.5 text-xs">{c.claimType}</span></td>
                      <td className="p-3 text-right font-medium">{c.amount}</td>
                      <td className="p-3 text-center">{c.dpd}</td>
                      <td className="p-3 text-center"><span className="text-destructive font-medium">{c.npa}</span></td>
                      <td className="p-3"><StatusBadge status={c.status} /></td>
                      <td className="p-3 text-muted-foreground">{c.date}</td>
                      <td className="p-3"><ArrowRight className="h-4 w-4 text-muted-foreground" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <div className="md:hidden space-y-3">
            {claims.map((c) => (
              <Card key={c.id} className="enterprise-shadow">
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-primary text-sm">{c.id}</span>
                    <StatusBadge status={c.status} />
                  </div>
                  <p className="font-medium">{c.customer}</p>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{c.amount}</span><span>DPD: {c.dpd}</span><span>{c.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documentation" className="mt-4">
          <Card className="enterprise-shadow">
            <CardHeader><CardTitle className="text-base">Claims Documentation</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <table className="w-full text-sm border">
                  <thead><tr className="border-b bg-muted/30">
                    <th className="text-left p-2 font-medium text-muted-foreground">Type of Document</th>
                    <th className="text-left p-2 font-medium text-muted-foreground">Date Required</th>
                    <th className="text-left p-2 font-medium text-muted-foreground">Date Received</th>
                    <th className="text-center p-2 font-medium text-muted-foreground">TAT</th>
                    <th className="text-center p-2 font-medium text-muted-foreground">Status</th>
                  </tr></thead>
                  <tbody>
                    {[
                      "NPA Certificate / SOA Annexure", "Statement of Account (SOA)", "Collection Feedback",
                      "Copy of Field Visit Report", "Copy of Legal/Recall Notice (SARFAESI)",
                      "Duly Filled Application Form with Photograph", "Identity Proof", "Signature Proof", "Address Proof",
                    ].map((doc) => (
                      <tr key={doc} className="border-b">
                        <td className="p-2 font-medium text-sm">{doc}</td>
                        <td className="p-2"><Input type="date" className="h-8 text-xs" /></td>
                        <td className="p-2"><Input type="date" className="h-8 text-xs" /></td>
                        <td className="p-2 text-center text-xs">0</td>
                        <td className="p-2 text-center"><StatusBadge status="pending" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h4 className="text-sm font-semibold text-muted-foreground mt-6 mb-3">Mortgage Guarantee Offer Conditions</h4>
              <div className="overflow-auto">
                <table className="w-full text-sm border">
                  <thead><tr className="border-b bg-muted/30">
                    <th className="p-2 text-center font-medium text-muted-foreground">#</th>
                    <th className="text-left p-2 font-medium text-muted-foreground">Sanction Condition</th>
                    <th className="text-left p-2 font-medium text-muted-foreground">Met or Not</th>
                    <th className="text-left p-2 font-medium text-muted-foreground">Remarks</th>
                  </tr></thead>
                  <tbody>
                    {[
                      "Property to be in lender's approved location and LTV to be restricted to 80% of IVV.",
                      "Lender to ensure closure proof of PL before disbursement.",
                      "Lender to ensure positive verification prior to disbursement.",
                    ].map((cond, i) => (
                      <tr key={i} className="border-b">
                        <td className="p-2 text-center">{i + 1}</td>
                        <td className="p-2 text-sm">{cond}</td>
                        <td className="p-2"><Select><SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent><SelectItem value="met">Met</SelectItem><SelectItem value="not-met">Not Met</SelectItem></SelectContent>
                        </Select></td>
                        <td className="p-2"><Input className="h-8 text-xs" placeholder="Remarks" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm"><Mail className="h-3 w-3 mr-1" /> Send Mail</Button>
                <Button variant="outline" size="sm"><Download className="h-3 w-3 mr-1" /> Export to Excel</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="mt-4">
          <Card className="enterprise-shadow">
            <CardHeader><CardTitle className="text-base">Claim Verification</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <table className="w-full text-sm border">
                  <thead><tr className="border-b bg-muted/30">
                    <th className="text-left p-2 font-medium text-muted-foreground">Description</th>
                    <th className="p-2 font-medium text-muted-foreground">Initiate Date</th>
                    <th className="p-2 font-medium text-muted-foreground">Re-initiate Date</th>
                    <th className="p-2 font-medium text-muted-foreground">Vendor Name</th>
                    <th className="p-2 font-medium text-muted-foreground">Received Date</th>
                    <th className="p-2 font-medium text-muted-foreground">Remarks</th>
                    <th className="p-2 font-medium text-muted-foreground">Status</th>
                  </tr></thead>
                  <tbody>
                    {["RESI", "Office", "OC", "Banking", "CERSAI", "Property Classification"].map((v) => (
                      <tr key={v} className="border-b">
                        <td className="p-2 font-medium">{v}</td>
                        <td className="p-2"><Input type="date" className="h-7 text-xs" /></td>
                        <td className="p-2"><Input type="date" className="h-7 text-xs" /></td>
                        <td className="p-2"><Input className="h-7 text-xs" /></td>
                        <td className="p-2"><Input type="date" className="h-7 text-xs" /></td>
                        <td className="p-2"><Input className="h-7 text-xs" placeholder="Remarks" /></td>
                        <td className="p-2"><Select><SelectTrigger className="h-7 text-xs"><SelectValue placeholder="Status" /></SelectTrigger>
                          <SelectContent><SelectItem value="pending">Pending</SelectItem><SelectItem value="completed">Completed</SelectItem></SelectContent>
                        </Select></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="servicing-analysis" className="mt-4">
          <Card className="enterprise-shadow">
            <CardHeader><CardTitle className="text-base">Servicing Analysis</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-muted-foreground">Servicing data analysis for NPA tagging and POS freeze management.</p></CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendation" className="mt-4">
          <Card className="enterprise-shadow">
            <CardHeader><CardTitle className="text-base">Claim Recommendation / Approval</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Files to Upload</Label>
                <div className="flex gap-2">
                  <Input type="file" className="text-sm" />
                  <Button variant="outline" size="sm"><Upload className="h-3 w-3 mr-1" /> Upload</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Approving Authority</Label>
                <Input placeholder="Enter approving authority email" />
              </div>
              <div className="space-y-2">
                <Label>Mark CC</Label>
                <Input placeholder="CC email addresses" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Approved/Rejected By</Label><Input readOnly className="bg-muted/50" /></div>
                <div className="space-y-2"><Label>Approved/Rejected On</Label><Input readOnly className="bg-muted/50" /></div>
              </div>
              <div className="space-y-2">
                <Label>Recommendation Notes</Label>
                <Textarea placeholder="Enter recommendation notes..." className="min-h-[80px]" />
              </div>
              <div className="flex gap-2">
                <Button variant="success" size="sm">Approve Claim</Button>
                <Button variant="destructive" size="sm">Reject Claim</Button>
                <Button variant="outline" size="sm">Send Back</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="claim-template" className="mt-4">
          <Card className="enterprise-shadow">
            <CardHeader><CardTitle className="text-base">Claim Template</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <h4 className="text-sm font-semibold mb-3">Loan Details</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div><span className="text-xs text-muted-foreground">Updated Sanction Amount</span><p className="font-medium">₹0</p></div>
                  <div><span className="text-xs text-muted-foreground">Final Sanction Amount</span><p className="font-medium">₹13,00,000</p></div>
                  <div><span className="text-xs text-muted-foreground">Total Amt Overdue</span><p className="font-medium">₹0</p></div>
                  <div><span className="text-xs text-muted-foreground">Loan Term (Years)</span><p className="font-medium">20</p></div>
                  <div><span className="text-xs text-muted-foreground">EMI Amount</span><p className="font-medium">₹16,166</p></div>
                  <div><span className="text-xs text-muted-foreground">ROI (%)</span><p className="font-medium">14%</p></div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="text-sm font-semibold mb-3">Moratorium Details</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="space-y-1"><Label className="text-xs">Moratorium Flag</Label>
                    <Select><SelectTrigger className="h-8"><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent><SelectItem value="yes">Yes</SelectItem><SelectItem value="no">No</SelectItem></SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1"><Label className="text-xs">No. of EMIs Paid</Label><Input className="h-8" /></div>
                  <div className="space-y-1"><Label className="text-xs">Moratorium Start</Label><Input type="date" className="h-8" /></div>
                  <div className="space-y-1"><Label className="text-xs">Moratorium End</Label><Input type="date" className="h-8" /></div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="text-sm font-semibold mb-3">Property Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1"><Label className="text-xs">Property Address</Label><Input className="h-8" defaultValue="Plot No.133, East Side, Mumbai 400053" /></div>
                  <div className="space-y-1"><Label className="text-xs">% Completion</Label><Input className="h-8" defaultValue="88%" /></div>
                  <div className="space-y-1"><Label className="text-xs">BUA / Rate per sq ft</Label><Input className="h-8" defaultValue="750 / @ 2850" /></div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Profile (Max 3500 characters)</Label>
                <Textarea className="min-h-[60px]" placeholder="Enter borrower profile summary..." />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment-update" className="mt-4">
          <Card className="enterprise-shadow">
            <CardHeader><CardTitle className="text-base">Payment Update</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2"><Label>UTRN Number</Label><Input /></div>
                <div className="space-y-2"><Label>Payment Amount (₹)</Label><Input /></div>
                <div className="space-y-2"><Label>Payment Date</Label><Input type="date" /></div>
                <div className="space-y-2"><Label>Payment Mode</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent><SelectItem value="neft">NEFT</SelectItem><SelectItem value="rtgs">RTGS</SelectItem><SelectItem value="cheque">Cheque</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Bank Details</Label><Input /></div>
              </div>
              <Button className="mt-4">Update Payment</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="case-trail" className="mt-4">
          <Card className="enterprise-shadow">
            <CardHeader><CardTitle className="text-base">Case Trail</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { time: "Mar 3, 10:30 AM", action: "Claim initiated", user: "System" },
                  { time: "Mar 2, 4:15 PM", action: "NPA Tagged in Servicing", user: "Auto" },
                  { time: "Mar 1, 11:00 AM", action: "DPD crossed 90", user: "System" },
                  { time: "Feb 15, 2:00 PM", action: "Servicing file uploaded", user: "Rajesh K." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 text-xs">
                    <div className="flex flex-col items-center">
                      <div className="rounded-full bg-muted p-1"><Clock className="h-3 w-3 text-muted-foreground" /></div>
                      {i < 3 && <div className="w-px flex-1 bg-border" />}
                    </div>
                    <div className="pb-3"><p className="font-medium">{item.action}</p><p className="text-muted-foreground">{item.user} · {item.time}</p></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="batch-approval" className="mt-4">
          <Card className="enterprise-shadow">
            <CardHeader><CardTitle className="text-base">Subsequent Approval Lot</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b bg-muted/30">
                    <th className="text-left p-2 font-medium text-muted-foreground">LAN No.</th>
                    <th className="text-left p-2 font-medium text-muted-foreground">Property Location</th>
                    <th className="text-right p-2 font-medium text-muted-foreground">Claim Amount (₹)</th>
                    <th className="text-right p-2 font-medium text-muted-foreground">EMIs Paid</th>
                    <th className="text-right p-2 font-medium text-muted-foreground">Total Overdue (₹)</th>
                    <th className="text-right p-2 font-medium text-muted-foreground">Interest Overdue (₹)</th>
                    <th className="text-right p-2 font-medium text-muted-foreground">DPD</th>
                  </tr></thead>
                  <tbody>
                    {batchLotData.map((row) => (
                      <tr key={row.lan} className="border-b hover:bg-muted/30 cursor-pointer">
                        <td className="p-2 font-medium text-primary">{row.lan}</td>
                        <td className="p-2">{row.location}</td>
                        <td className="p-2 text-right font-medium">{row.claimAmt}</td>
                        <td className="p-2 text-right">{row.emisPaid}</td>
                        <td className="p-2 text-right">{row.totalOverdue}</td>
                        <td className="p-2 text-right">{row.interest}</td>
                        <td className="p-2 text-right">{row.dpd}</td>
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
            <CardHeader><CardTitle className="text-base">Claim Letters</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["Initial Claim Letter", "Subsequent Claim Letter", "Settlement/Auction Letter", "Closure Letter", "NOC"].map((letter) => (
                  <div key={letter} className="flex items-center justify-between p-3 rounded border">
                    <span className="text-sm font-medium">{letter}</span>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">Generate</Button>
                      <Button variant="outline" size="sm"><Download className="h-3 w-3 mr-1" /> Download</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

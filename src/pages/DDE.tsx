import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/StatusBadge";
import { WorkflowTracker } from "@/components/WorkflowTracker";
import { Save, FileText, Calculator, AlertTriangle, CheckCircle, Upload } from "lucide-react";

const workflowSteps = [
  { label: "QDE", status: "completed" as const },
  { label: "DDE", status: "current" as const },
  { label: "Underwriting", status: "upcoming" as const },
  { label: "Decision", status: "upcoming" as const },
  { label: "Issuance", status: "upcoming" as const },
];

export default function DDE() {
  const [activeTab, setActiveTab] = useState("loan-chars");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <h1>Detailed Data Entry</h1>
            <StatusBadge status="in-review" />
          </div>
          <p className="text-muted-foreground text-sm">LN-2026-001245 | Amit Sharma | LIC Housing Finance Limited</p>
        </div>
      </div>

      {/* Loan Header Bar */}
      <Card className="enterprise-shadow">
        <CardContent className="p-3">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
            <div><span className="text-muted-foreground text-xs">Loan ID</span><p className="font-semibold">LN-2026-001245</p></div>
            <div><span className="text-muted-foreground text-xs">Lender</span><p className="font-semibold">LIC Housing Finance Limited</p></div>
            <div><span className="text-muted-foreground text-xs">Deal ID</span><p className="font-semibold">LICH0102191221</p></div>
            <div><span className="text-muted-foreground text-xs">Employment Type</span><p className="font-semibold">Self Employed Business</p></div>
            <div><span className="text-muted-foreground text-xs">Principal Outstanding</span><p className="font-semibold">₹45,00,000</p></div>
          </div>
        </CardContent>
      </Card>

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
              {["Loan Chars", "General Data", "Employment", "Income Details", "Banking", "Obligations"].map((tab) => (
                <TabsTrigger key={tab} value={tab.toLowerCase().replace(/ /g, "-")} className="text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="loan-chars" className="mt-4">
              <Card>
                <CardHeader><CardTitle className="text-base">Loan Characteristics</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2"><Label>Loan Number</Label><Input defaultValue="LN-2026-001245" readOnly className="bg-muted/50" /></div>
                    <div className="space-y-2"><Label>Unique ID 2 (for eg. Form No.)</Label><Input /></div>
                    <div className="space-y-2"><Label>Distance from Location (OGL - km)</Label><Input /></div>
                    <div className="space-y-2"><Label>Sourcing Region</Label><Input defaultValue="West" /></div>
                    <div className="space-y-2"><Label>Sourcing City Name</Label><Input defaultValue="Mumbai" /></div>
                    <div className="space-y-2"><Label>Branch Name</Label><Input defaultValue="Andheri West" /></div>
                    <div className="space-y-2"><Label>Sourcing Channel</Label>
                      <Select defaultValue="direct"><SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="direct">DIRECT</SelectItem><SelectItem value="dsa">DSA</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2"><Label>DST Code</Label><Input defaultValue="INT" /></div>
                    <div className="space-y-2"><Label>Application Date</Label><Input type="date" defaultValue="2026-02-23" /></div>
                    <div className="space-y-2"><Label>Sanctioned Loan at Pre-approval (₹)</Label><Input defaultValue="45,00,000" /></div>
                    <div className="space-y-2"><Label>Final Sanctioned Amount (₹)</Label><Input defaultValue="45,00,000" /></div>
                    <div className="space-y-2"><Label>Sanction Date</Label><Input type="date" /></div>
                    <div className="space-y-2"><Label>Total Disbursement (₹)</Label><Input defaultValue="45,00,000" /></div>
                    <div className="space-y-2"><Label>Sanctioned Loan Period (Months)</Label><Input defaultValue="240" /></div>
                    <div className="space-y-2"><Label>Repayment Structure</Label>
                      <Select defaultValue="emi"><SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="emi">EMI</SelectItem><SelectItem value="step-up">Step Up</SelectItem><SelectItem value="step-down">Step Down</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2"><Label>First Disbursement Date</Label><Input type="date" /></div>
                    <div className="space-y-2"><Label>Sanctioned Interest Rate (%)</Label><Input defaultValue="8.75" /></div>
                    <div className="space-y-2"><Label>EMI Amount (₹)</Label><Input defaultValue="42,000" readOnly className="bg-muted/50" /></div>
                    <div className="space-y-2"><Label>EMI Date</Label><Input type="date" /></div>
                    <div className="space-y-2"><Label>EMI Cycle</Label>
                      <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent><SelectItem value="monthly">Monthly</SelectItem><SelectItem value="quarterly">Quarterly</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2"><Label>Loan Type</Label>
                      <Select defaultValue="hl"><SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="hl">Home Loan</SelectItem><SelectItem value="lap">LAP</SelectItem><SelectItem value="plot">Plot Loan</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2"><Label>Loan Purpose</Label>
                      <Select defaultValue="purchase"><SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="purchase">Purchase</SelectItem><SelectItem value="construction">Construction</SelectItem><SelectItem value="extension">Purchase + Extension</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2"><Label>Guarantee Fee (%)</Label><Input defaultValue="1.25" /></div>
                    <div className="space-y-2"><Label>Guarantee Amount (₹)</Label><Input defaultValue="5,62,500" readOnly className="bg-muted/50" /></div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="general-data" className="mt-4">
              <Card>
                <CardHeader><CardTitle className="text-base">General Data</CardTitle></CardHeader>
                <CardContent>
                  {/* Multi-borrower header */}
                  <div className="overflow-auto mb-4">
                    <table className="w-full text-sm border">
                      <thead><tr className="border-b bg-muted/30">
                        <th className="text-left p-2 font-medium text-muted-foreground">Description</th>
                        <th className="text-left p-2 font-medium text-muted-foreground">Borrower</th>
                        <th className="text-left p-2 font-medium text-muted-foreground">CoBorrower1</th>
                        <th className="text-left p-2 font-medium text-muted-foreground">CoBorrower2</th>
                        <th className="text-left p-2 font-medium text-muted-foreground">CoBorrower3</th>
                      </tr></thead>
                      <tbody>
                        <tr className="border-b"><td className="p-2 font-medium">Borrower Full Name</td><td className="p-2">Amit Sharma</td><td className="p-2"></td><td className="p-2"></td><td className="p-2"></td></tr>
                        <tr className="border-b"><td className="p-2 font-medium">Type of Employment</td><td className="p-2">Self Employed Business</td>
                          <td className="p-2"><Select><SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="salaried">Salaried</SelectItem><SelectItem value="se">Self Employed</SelectItem></SelectContent></Select></td>
                          <td className="p-2"><Select><SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="salaried">Salaried</SelectItem><SelectItem value="se">Self Employed</SelectItem></SelectContent></Select></td>
                          <td className="p-2"><Select><SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="salaried">Salaried</SelectItem><SelectItem value="se">Self Employed</SelectItem></SelectContent></Select></td>
                        </tr>
                        <tr className="border-b"><td className="p-2 font-medium">Income Contributor</td>
                          <td className="p-2"><Select defaultValue="yes"><SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="yes">Income Considered</SelectItem><SelectItem value="no">Not Considered</SelectItem></SelectContent></Select></td>
                          <td className="p-2"><Select><SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="yes">Income Considered</SelectItem><SelectItem value="no">Not Considered</SelectItem></SelectContent></Select></td>
                          <td className="p-2"><Select><SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="yes">Income Considered</SelectItem><SelectItem value="no">Not Considered</SelectItem></SelectContent></Select></td>
                          <td className="p-2"><Select><SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="yes">Income Considered</SelectItem><SelectItem value="no">Not Considered</SelectItem></SelectContent></Select></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 className="text-sm font-semibold text-muted-foreground mb-3">Borrower General Data</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2"><Label>Borrower First Name</Label><Input defaultValue="Amit" /></div>
                    <div className="space-y-2"><Label>Borrower Middle Name</Label><Input /></div>
                    <div className="space-y-2"><Label>Borrower Surname</Label><Input defaultValue="Sharma" /></div>
                    <div className="space-y-2"><Label>Borrower Entity Type</Label>
                      <Select defaultValue="individual"><SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="individual">Individual</SelectItem><SelectItem value="non-individual">Non-Individual</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2"><Label>Gender</Label>
                      <Select defaultValue="male"><SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2"><Label>Date of Birth of the Borrower</Label><Input type="date" defaultValue="1988-05-15" /></div>
                    <div className="space-y-2"><Label>Borrower Current Address (Address 1)</Label><Input /></div>
                    <div className="space-y-2"><Label>Borrower Current Address (Address 2)</Label><Input /></div>
                    <div className="space-y-2"><Label>Borrower Current Address (Address 3)</Label><Input /></div>
                    <div className="space-y-2"><Label>Borrower Address (City)</Label><Input defaultValue="Mumbai" /></div>
                    <div className="space-y-2"><Label>Borrower Address (State)</Label>
                      <Select defaultValue="maharashtra"><SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="maharashtra">Maharashtra</SelectItem><SelectItem value="gujarat">Gujarat</SelectItem><SelectItem value="delhi">Delhi</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2"><Label>Borrower Address (PIN)</Label><Input defaultValue="400053" /></div>
                    <div className="space-y-2"><Label>Borrower Telephone</Label><Input /></div>
                    <div className="space-y-2"><Label>Borrower Mobile No</Label><Input defaultValue="9876543210" /></div>
                    <div className="space-y-2"><Label>Borrower Email Address</Label><Input type="email" defaultValue="amit.sharma@email.com" /></div>
                    <div className="space-y-2"><Label>Property Ownership Status</Label>
                      <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent><SelectItem value="yes">Yes</SelectItem><SelectItem value="no">Not Available</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2"><Label>No. of Owned Homes</Label><Input defaultValue="1" /></div>
                    <div className="space-y-2"><Label>No. of Running MG</Label><Input defaultValue="0" /></div>
                    <div className="space-y-2"><Label>Borrower Age at Loan Maturity</Label><Input defaultValue="58" readOnly className="bg-muted/50" /></div>
                    <div className="space-y-2"><Label>Sole Child</Label>
                      <Select defaultValue="no"><SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="yes">Yes</SelectItem><SelectItem value="no">No</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2"><Label>Residence OGL</Label>
                      <Select defaultValue="no"><SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="yes">Yes</SelectItem><SelectItem value="no">No</SelectItem></SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="employment" className="mt-4">
              <Card>
                <CardHeader><CardTitle className="text-base">Employment Details</CardTitle></CardHeader>
                <CardContent>
                  <div className="overflow-auto mb-4">
                    <table className="w-full text-sm border">
                      <thead><tr className="border-b bg-muted/30">
                        <th className="text-left p-2 font-medium text-muted-foreground">Description</th>
                        <th className="text-left p-2 font-medium text-muted-foreground">Borrower</th>
                        <th className="text-left p-2 font-medium text-muted-foreground">CoBorrower1</th>
                        <th className="text-left p-2 font-medium text-muted-foreground">CoBorrower2</th>
                      </tr></thead>
                      <tbody>
                        <tr className="border-b"><td className="p-2 font-medium">Borrower Full Name</td><td className="p-2">Amit Sharma</td><td className="p-2"></td><td className="p-2"></td></tr>
                        <tr className="border-b"><td className="p-2 font-medium">Type of Employment</td><td className="p-2">Self Employed Business</td><td className="p-2"><Select><SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="salaried">Salaried</SelectItem><SelectItem value="se">Self Employed</SelectItem></SelectContent></Select></td><td className="p-2"><Select><SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="salaried">Salaried</SelectItem><SelectItem value="se">Self Employed</SelectItem></SelectContent></Select></td></tr>
                        <tr className="border-b"><td className="p-2 font-medium">IMGC Program</td><td className="p-2">Griha Sugan - ABP</td><td className="p-2">Griha Sugan - ABP</td><td className="p-2">Griha Sugan - ABP</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 className="text-sm font-semibold text-muted-foreground mb-3">Employment</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2"><Label>Employer/Entity Name</Label><Input /></div>
                    <div className="space-y-2"><Label>Employer/Entity Type</Label>
                      <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent><SelectItem value="pvt">Private Limited Company</SelectItem><SelectItem value="pub">Public Limited Company</SelectItem><SelectItem value="individual">Individual</SelectItem><SelectItem value="partnership">Partnership Firm</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2"><Label>Borrower Employee Designation</Label><Input /></div>
                    <div className="space-y-2"><Label>Years in Current Employment</Label><Input type="number" /></div>
                    <div className="space-y-2"><Label>Years in Total Employment</Label><Input type="number" /></div>
                    <div className="space-y-2"><Label>Informal / Formal</Label>
                      <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent><SelectItem value="formal">Formal</SelectItem><SelectItem value="informal">Informal</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2"><Label>Contractual/Part Time Employment</Label>
                      <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent><SelectItem value="no">No</SelectItem><SelectItem value="yes">Yes</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2"><Label>Pensionable Borrower</Label>
                      <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent><SelectItem value="no">No</SelectItem><SelectItem value="yes">Yes</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2"><Label>Paid Up Capital (in Lakhs)</Label><Input /></div>
                    <div className="space-y-2"><Label>Vintage Since Incorporation (Years)</Label><Input /></div>
                    <div className="space-y-2"><Label>SE Type</Label>
                      <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent><SelectItem value="professional">Professional</SelectItem><SelectItem value="service">Service Provider</SelectItem><SelectItem value="manufacturer">Manufacturer</SelectItem><SelectItem value="trader">Trader</SelectItem><SelectItem value="wholesaler">Wholesaler</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2"><Label>Occupation Code</Label><Input /></div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="income-details" className="mt-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-base">Income Details</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Open Salaried Fields Section</Button>
                      <Button variant="outline" size="sm">Open SE Fields Section</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-3">Income Calculations - Salaried</h4>
                  <div className="overflow-auto mb-6">
                    <table className="w-full text-sm border">
                      <thead><tr className="border-b bg-muted/30">
                        <th className="text-left p-2 font-medium text-muted-foreground">Component</th>
                        <th className="text-right p-2 font-medium text-muted-foreground">Borrower</th>
                        <th className="text-right p-2 font-medium text-muted-foreground">CoBorrower1</th>
                        <th className="text-right p-2 font-medium text-muted-foreground">CoBorrower2</th>
                      </tr></thead>
                      <tbody>
                        {["Basic Salary", "DA+DP", "HRA", "CCA", "Fixed Component 1 - Any Other", "Fixed Component 2 - Any Other", "Gross Salary", "Net Salary"].map((comp) => (
                          <tr key={comp} className="border-b">
                            <td className="p-2 font-medium text-sm">{comp}</td>
                            <td className="p-2"><Input className="h-8 text-right text-xs" /></td>
                            <td className="p-2"><Input className="h-8 text-right text-xs" /></td>
                            <td className="p-2"><Input className="h-8 text-right text-xs" /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <h4 className="text-sm font-semibold text-muted-foreground mb-3">Income Calculations - Self Employed</h4>
                  <div className="overflow-auto">
                    <table className="w-full text-sm border">
                      <thead><tr className="border-b bg-muted/30">
                        <th className="text-left p-2 font-medium text-muted-foreground">Component</th>
                        <th className="text-right p-2 font-medium text-muted-foreground">Previous Year</th>
                        <th className="text-right p-2 font-medium text-muted-foreground">Latest Year</th>
                      </tr></thead>
                      <tbody>
                        {[
                          "Financial Statements",
                          "Gross Turnover", "Gross Margin", "Net Profit",
                          "Depreciation", "Interest on Loans", "Tax Paid",
                          "Total Income Considered"
                        ].map((comp) => (
                          <tr key={comp} className="border-b">
                            <td className="p-2 font-medium text-sm">{comp}</td>
                            <td className="p-2">{comp === "Financial Statements" ?
                              <Select><SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Select" /></SelectTrigger>
                                <SelectContent><SelectItem value="audited">Audited</SelectItem><SelectItem value="unaudited">Unaudited</SelectItem></SelectContent>
                              </Select> :
                              <Input className="h-8 text-right text-xs" />}
                            </td>
                            <td className="p-2">{comp === "Financial Statements" ?
                              <Select><SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Select" /></SelectTrigger>
                                <SelectContent><SelectItem value="audited">Audited</SelectItem><SelectItem value="unaudited">Unaudited</SelectItem></SelectContent>
                              </Select> :
                              <Input className="h-8 text-right text-xs" />}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="banking" className="mt-4">
              <Card>
                <CardHeader><CardTitle className="text-base">Banking Details</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <div className="space-y-2"><Label>Type of Bank Statement</Label>
                      <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent><SelectItem value="savings">Savings A/c</SelectItem><SelectItem value="current">Current A/c</SelectItem><SelectItem value="od">OD A/c</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2"><Label>Bank Name</Label><Input /></div>
                    <div className="space-y-2"><Label>Bank Account No.</Label><Input /></div>
                    <div className="space-y-2"><Label>No. of Salary Credits</Label><Input type="number" /></div>
                    <div className="space-y-2"><Label>Total Credits Inflow Sum (₹)</Label><Input /></div>
                    <div className="space-y-2"><Label>ABB (Manual/Auto)</Label>
                      <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent><SelectItem value="manual">Manual Calculation of ABB</SelectItem><SelectItem value="auto">Auto Calculation</SelectItem></SelectContent>
                      </Select>
                    </div>
                  </div>

                  <h4 className="text-sm font-semibold text-muted-foreground mb-3">Monthly Banking Summary</h4>
                  <div className="overflow-auto">
                    <table className="w-full text-sm border">
                      <thead><tr className="border-b bg-muted/30">
                        <th className="text-left p-2 font-medium text-muted-foreground">Month & Year</th>
                        <th className="text-right p-2 font-medium text-muted-foreground">Debit Entries</th>
                        <th className="text-right p-2 font-medium text-muted-foreground">Credit Entries</th>
                        <th className="text-right p-2 font-medium text-muted-foreground">10th Balance</th>
                        <th className="text-right p-2 font-medium text-muted-foreground">15th Balance</th>
                        <th className="text-right p-2 font-medium text-muted-foreground">25th Balance</th>
                        <th className="text-right p-2 font-medium text-muted-foreground">Avg Balance (₹)</th>
                      </tr></thead>
                      <tbody>
                        {["Jan-2026", "Feb-2026", "Mar-2026", "Apr-2026", "May-2026", "Jun-2026"].map((month) => (
                          <tr key={month} className="border-b">
                            <td className="p-2 font-medium">{month}</td>
                            <td className="p-2"><Input className="h-7 text-right text-xs" /></td>
                            <td className="p-2"><Input className="h-7 text-right text-xs" /></td>
                            <td className="p-2"><Input className="h-7 text-right text-xs" /></td>
                            <td className="p-2"><Input className="h-7 text-right text-xs" /></td>
                            <td className="p-2"><Input className="h-7 text-right text-xs" /></td>
                            <td className="p-2"><Input className="h-7 text-right text-xs bg-muted/50" readOnly /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                    <div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">Total Inward Bounces</p><p className="font-semibold">0</p></div>
                    <div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">Inward % - Actual</p><p className="font-semibold">0%</p></div>
                    <div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">Inward % - Policy</p><p className="font-semibold">5%</p></div>
                    <div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">Condition</p><p className="font-semibold text-success">Met</p></div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="obligations" className="mt-4">
              <Card>
                <CardHeader><CardTitle className="text-base">Obligation Details</CardTitle></CardHeader>
                <CardContent>
                  <div className="overflow-auto">
                    <table className="w-full text-sm border">
                      <thead><tr className="border-b bg-muted/30">
                        <th className="text-left p-2 font-medium text-muted-foreground">B.No</th>
                        <th className="text-left p-2 font-medium text-muted-foreground">Borrower Name</th>
                        <th className="text-left p-2 font-medium text-muted-foreground">Obligation Type</th>
                        <th className="text-right p-2 font-medium text-muted-foreground">Sanctioned Amount (₹)</th>
                        <th className="text-right p-2 font-medium text-muted-foreground">Outstanding Amount (₹)</th>
                        <th className="text-right p-2 font-medium text-muted-foreground">EMI Amount (₹)</th>
                        <th className="text-left p-2 font-medium text-muted-foreground">Status</th>
                        <th className="text-left p-2 font-medium text-muted-foreground">CIBIL Date/Time</th>
                      </tr></thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2">1</td>
                          <td className="p-2 font-medium">Amit Sharma</td>
                          <td className="p-2"><Select><SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent><SelectItem value="hl">Home Loan</SelectItem><SelectItem value="pl">Personal Loan</SelectItem><SelectItem value="cc">Credit Card</SelectItem><SelectItem value="al">Auto Loan</SelectItem><SelectItem value="consumer">Consumer Loan</SelectItem><SelectItem value="mudra">Mudra Loan</SelectItem></SelectContent>
                          </Select></td>
                          <td className="p-2"><Input className="h-8 text-right text-xs" /></td>
                          <td className="p-2"><Input className="h-8 text-right text-xs" /></td>
                          <td className="p-2"><Input className="h-8 text-right text-xs" /></td>
                          <td className="p-2"><Select><SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent><SelectItem value="active">Active</SelectItem><SelectItem value="closed">Closed</SelectItem></SelectContent>
                          </Select></td>
                          <td className="p-2 text-xs text-muted-foreground">Auto</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">+ Add Obligation</Button>
                  </div>
                  <div className="flex justify-between items-center rounded-lg border p-3 bg-muted/30 mt-3">
                    <span className="text-sm font-medium">Sum of Obligations:</span>
                    <span className="text-sm font-bold">₹0</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Side panel */}
        <div className="w-full lg:w-72 shrink-0 space-y-4">
          <Card className="enterprise-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2"><FileText className="h-4 w-4" /> Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {["Aadhaar Card", "PAN Card", "Salary Slips", "Bank Statements", "Property Docs", "ITR Documents", "Form 26AS"].map((doc) => (
                <div key={doc} className="flex items-center justify-between text-sm p-2 rounded border hover:bg-muted/50 cursor-pointer">
                  <span>{doc}</span>
                  <StatusBadge status={["Property Docs", "ITR Documents"].includes(doc) ? "pending" : "approved"} />
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full mt-2"><Upload className="h-3 w-3 mr-1" /> Upload Document</Button>
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
          <Card className="enterprise-shadow">
            <CardHeader className="pb-2"><CardTitle className="text-sm">Remarks / Case Notes</CardTitle></CardHeader>
            <CardContent>
              <Textarea placeholder="Enter remarks for Underwriting..." className="min-h-[60px] text-sm" />
              <Button size="sm" className="w-full mt-2">Save Remarks</Button>
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

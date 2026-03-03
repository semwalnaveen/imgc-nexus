import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WorkflowTracker } from "@/components/WorkflowTracker";
import { StatusBadge } from "@/components/StatusBadge";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Send, ChevronLeft, ChevronRight, AlertTriangle, CheckCircle, Search, Users, Clock, Trash2 } from "lucide-react";

const steps = [
  { label: "Loan Basic", status: "completed" as const },
  { label: "Applicant", status: "current" as const },
  { label: "Loan Chars", status: "upcoming" as const },
  { label: "Obligations", status: "upcoming" as const },
  { label: "Verification", status: "upcoming" as const },
];

const qdeSearchData = [
  { client: "LICH", deal: "LICH0102191221", loanId: "006_LIC_TEST", dateTime: "08-Jan-2026 14:08:42", user: "QASIT" },
  { client: "LICH", deal: "LICH0102191221", loanId: "CR497_LIC", dateTime: "11-Nov-2025 12:12:13", user: "Mithun" },
  { client: "LICH", deal: "LICH0102191221", loanId: "7a_LIC_02", dateTime: "17-Oct-2025 13:40:42", user: "QASIT" },
  { client: "HDFC", deal: "HDFC0201251224", loanId: "TB_HDFC_01", dateTime: "10-Oct-2025 18:28:38", user: "Rajesh" },
  { client: "SBI", deal: "SBI0305181223", loanId: "OR_510_SBI", dateTime: "08-Oct-2025 17:08:23", user: "Mithun" },
  { client: "LICH", deal: "LICH0102191221", loanId: "1002060001832", dateTime: "10-Sep-2025 15:52:47", user: "TESTUSER" },
];

export default function ServiceDesk() {
  const [currentStep, setCurrentStep] = useState(1);
  const [activeView, setActiveView] = useState("new-loan");

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Lender Name <span className="text-destructive">*</span></Label>
              <Select defaultValue="lich"><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="lich">LIC Housing Finance Limited</SelectItem>
                  <SelectItem value="hdfc">HDFC Limited</SelectItem>
                  <SelectItem value="sbi">SBI Home Loans</SelectItem>
                  <SelectItem value="icici">ICICI Home Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Deal ID <span className="text-destructive">*</span></Label>
              <Select defaultValue="lich01"><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="lich01">LICH0102191221</SelectItem><SelectItem value="hdfc01">HDFC0201251224</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Loan ID <span className="text-destructive">*</span></Label><Input defaultValue="LN-2026-001245" /></div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent><SelectItem value="individual">Individual</SelectItem><SelectItem value="non-individual">Non-Individual</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Type of Employment</Label>
              <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent><SelectItem value="salaried">Salaried</SelectItem><SelectItem value="se-business">Self Employed Business</SelectItem><SelectItem value="se-professional">Self Employed Professional</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Loan Amount (₹)</Label><Input type="text" defaultValue="45,00,000" /></div>
            <div className="space-y-2"><Label>Sourcing City</Label>
              <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent><SelectItem value="mumbai">Mumbai</SelectItem><SelectItem value="delhi">Delhi</SelectItem><SelectItem value="bangalore">Bangalore</SelectItem><SelectItem value="chennai">Chennai</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Date of Notification</Label><Input type="date" defaultValue="2026-03-01" /></div>
            <div className="space-y-2"><Label>Time of Notification</Label><Input type="time" defaultValue="10:30" /></div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <h4 className="text-sm font-semibold text-muted-foreground">Borrower Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2"><Label>Borrower First Name <span className="text-destructive">*</span></Label><Input defaultValue="Amit" /></div>
              <div className="space-y-2"><Label>Borrower Middle Name</Label><Input /></div>
              <div className="space-y-2"><Label>Borrower Surname</Label><Input defaultValue="Sharma" /></div>
              <div className="space-y-2"><Label>Borrower Entity Type</Label>
                <Select defaultValue="individual"><SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="individual">Individual</SelectItem><SelectItem value="non-individual">Non-Individual</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Gender</Label>
                <Select defaultValue="male"><SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Date of Birth <span className="text-destructive">*</span></Label><Input type="date" defaultValue="1988-05-15" /></div>
              <div className="space-y-2"><Label>Relationship of Co-Borrower</Label>
                <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent><SelectItem value="spouse">Spouse</SelectItem><SelectItem value="father">Father</SelectItem><SelectItem value="mother">Mother</SelectItem><SelectItem value="son">Son</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Resident Status</Label>
                <Select defaultValue="resident"><SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="resident">Resident Indian</SelectItem><SelectItem value="nri">NRI</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>ID Proof Type <span className="text-destructive">*</span></Label>
                <Select defaultValue="aadhaar"><SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="aadhaar">Aadhaar</SelectItem><SelectItem value="pan">PAN</SelectItem><SelectItem value="passport">Passport</SelectItem><SelectItem value="dl">Driving License</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>ID Number</Label><Input defaultValue="XXXX-XXXX-7890" /></div>
              <div className="space-y-2"><Label>ID Type 2</Label>
                <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent><SelectItem value="pan">PAN</SelectItem><SelectItem value="voter">Voter ID</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>ID Number 2</Label><Input defaultValue="ABCPS1234K" /></div>
            </div>

            <h4 className="text-sm font-semibold text-muted-foreground">Address Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2"><Label>Borrower Current Address (Address 1)</Label><Input /></div>
              <div className="space-y-2"><Label>Borrower Current Address (Address 2)</Label><Input /></div>
              <div className="space-y-2"><Label>Borrower Current Address (Address 3)</Label><Input /></div>
              <div className="space-y-2"><Label>Borrower Address (City) <span className="text-destructive">*</span></Label><Input defaultValue="Mumbai" /></div>
              <div className="space-y-2"><Label>Borrower Address (State)</Label>
                <Select defaultValue="maharashtra"><SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="maharashtra">Maharashtra</SelectItem><SelectItem value="delhi">Delhi</SelectItem><SelectItem value="karnataka">Karnataka</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Borrower Address (PIN)</Label><Input defaultValue="400053" /></div>
              <div className="space-y-2"><Label>Borrower Mobile No</Label><Input defaultValue="9876543210" /></div>
              <div className="space-y-2"><Label>Borrower Email</Label><Input type="email" defaultValue="amit.sharma@email.com" /></div>
            </div>

            <h4 className="text-sm font-semibold text-muted-foreground">IMGC Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2"><Label>IMGC Region</Label>
                <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent><SelectItem value="west">West</SelectItem><SelectItem value="north">North</SelectItem><SelectItem value="south">South</SelectItem><SelectItem value="east">East</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>IMGC Sales Manager</Label><Input /></div>
              <div className="space-y-2"><Label>Channel Code</Label>
                <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent><SelectItem value="direct">DIRECT</SelectItem><SelectItem value="dsa">DSA</SelectItem><SelectItem value="connector">CONNECTOR</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2"><Label>Loan Number</Label><Input defaultValue="LN-2026-001245" readOnly className="bg-muted/50" /></div>
            <div className="space-y-2"><Label>Unique ID 2 (for eg. Form No.)</Label><Input /></div>
            <div className="space-y-2"><Label>Distance from Location (OGL - km)</Label><Input /></div>
            <div className="space-y-2"><Label>Sourcing Region</Label>
              <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent><SelectItem value="west">West</SelectItem><SelectItem value="north">North</SelectItem><SelectItem value="south">South</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Sourcing City Name</Label><Input defaultValue="Mumbai" /></div>
            <div className="space-y-2"><Label>Branch Name</Label><Input defaultValue="Andheri West" /></div>
            <div className="space-y-2"><Label>Sourcing Channel</Label>
              <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent><SelectItem value="direct">DIRECT</SelectItem><SelectItem value="dsa">DSA</SelectItem><SelectItem value="connector">CONNECTOR</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>DST Code</Label><Input /></div>
            <div className="space-y-2"><Label>Application Date</Label><Input type="date" defaultValue="2026-03-01" /></div>
            <div className="space-y-2"><Label>Sanctioned Loan Amount (₹)</Label><Input defaultValue="45,00,000" /></div>
            <div className="space-y-2"><Label>Property Value (₹)</Label><Input type="text" defaultValue="62,00,000" /></div>
            <div className="space-y-2"><Label>Tenure (Months)</Label><Input type="number" defaultValue="240" /></div>
            <div className="space-y-2"><Label>Rate of Interest (%)</Label><Input type="text" defaultValue="8.75" /></div>
            <div className="space-y-2">
              <Label>Loan Type</Label>
              <Select defaultValue="hl"><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="hl">Home Loan</SelectItem><SelectItem value="lap">LAP</SelectItem><SelectItem value="bt">Balance Transfer</SelectItem><SelectItem value="plot">Plot Loan</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Loan Purpose</Label>
              <Select defaultValue="purchase"><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="purchase">Purchase</SelectItem><SelectItem value="construction">Construction</SelectItem><SelectItem value="extension">Purchase + Extension</SelectItem><SelectItem value="bt">Balance Transfer</SelectItem></SelectContent>
              </Select>
            </div>
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
            <div className="overflow-auto">
              <table className="w-full text-sm border">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left p-3 font-medium text-muted-foreground">Borrower No</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Borrower Name</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Existing Obligation Type</th>
                    <th className="text-right p-3 font-medium text-muted-foreground">Obligation Amount (₹)</th>
                    <th className="text-right p-3 font-medium text-muted-foreground">Sanctioned Amount (₹)</th>
                    <th className="text-right p-3 font-medium text-muted-foreground">EMI (₹)</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3">1</td>
                    <td className="p-3 font-medium">Amit Sharma</td>
                    <td className="p-3">
                      <Select><SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent><SelectItem value="hl">Home Loan</SelectItem><SelectItem value="pl">Personal Loan</SelectItem><SelectItem value="cc">Credit Card</SelectItem><SelectItem value="al">Auto Loan</SelectItem></SelectContent>
                      </Select>
                    </td>
                    <td className="p-3"><Input className="h-8 text-right text-xs" defaultValue="50,000" /></td>
                    <td className="p-3"><Input className="h-8 text-right text-xs" defaultValue="2,00,000" /></td>
                    <td className="p-3"><Input className="h-8 text-right text-xs" defaultValue="15,000" /></td>
                    <td className="p-3">
                      <Select><SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent><SelectItem value="active">Active</SelectItem><SelectItem value="closed">Closed</SelectItem></SelectContent>
                      </Select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Button variant="outline" size="sm">+ Add Obligation</Button>
            <div className="flex justify-between items-center rounded-lg border p-3 bg-muted/30">
              <span className="text-sm font-medium">Sum of Obligations:</span>
              <span className="text-sm font-bold">₹15,000</span>
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
            <div className="overflow-auto">
              <table className="w-full text-sm border">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left p-3 font-medium text-muted-foreground">Verification Type</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Borrower</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">CoBorrower1</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">CoBorrower2</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">CoBorrower3</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    "Bureau Check", "CPV - Resi", "CPV - Office", "Residence - Negative Area",
                    "Dedupe (Includes local CPCS etc)", "RCU/FCU", "Caution Profile", "Any Other Check"
                  ].map((check) => (
                    <tr key={check} className="border-b">
                      <td className="p-3 font-medium text-sm">{check}</td>
                      {[1, 2, 3, 4].map((i) => (
                        <td key={i} className="p-3">
                          <Select><SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="clear">Clear</SelectItem>
                              <SelectItem value="not-clear">Not Clear</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="na">N/A</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
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

  const stepTitles = ["Loan Basic Details", "Applicant Details", "Loan Characteristics", "Obligation Details", "Other Verifications"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1>Service Desk</h1>
          <p className="text-muted-foreground text-sm">Quick Data Entry & Auto Allocation</p>
        </div>
      </div>

      <Tabs value={activeView} onValueChange={setActiveView}>
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="new-loan" className="text-xs">Add New Loan</TabsTrigger>
          <TabsTrigger value="auto-allocation" className="text-xs">Auto Allocation</TabsTrigger>
          <TabsTrigger value="qde-search" className="text-xs">QDE Search</TabsTrigger>
          <TabsTrigger value="user-dashboard" className="text-xs">User Dashboard</TabsTrigger>
        </TabsList>

        {/* Auto Allocation Tab */}
        <TabsContent value="auto-allocation" className="mt-4 space-y-4">
          <Card className="enterprise-shadow">
            <CardHeader><CardTitle className="text-base">Auto Allocation</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Case Priority</Label>
                  <Select defaultValue="fresh"><SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="fresh">Fresh</SelectItem><SelectItem value="priority">Priority</SelectItem><SelectItem value="urgent">Urgent</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Loan ID <span className="text-destructive">*</span></Label><Input /></div>
                <div className="space-y-2"><Label>Applicant Name</Label><Input /></div>
                <div className="space-y-2"><Label>Category</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent><SelectItem value="individual">Individual</SelectItem><SelectItem value="non-individual">Non-Individual</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Type of Employment</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent><SelectItem value="salaried">Salaried</SelectItem><SelectItem value="se-business">Self Employed Business</SelectItem><SelectItem value="se-professional">Self Employed Professional</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Lender</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent><SelectItem value="lich">LIC Housing Finance</SelectItem><SelectItem value="hdfc">HDFC</SelectItem><SelectItem value="sbi">SBI</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Loan Amount (₹)</Label><Input /></div>
                <div className="space-y-2"><Label>Deal ID</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent><SelectItem value="lich01">LICH0102191221</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Sourcing City</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent><SelectItem value="mumbai">Mumbai</SelectItem><SelectItem value="delhi">Delhi</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Date of Notification</Label><Input type="date" /></div>
                <div className="space-y-2"><Label>Time of Notification</Label><Input type="time" /></div>
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                <Button variant="outline"><Users className="h-4 w-4 mr-1" /> Allocate to Underwriter</Button>
                <Button variant="outline"><Users className="h-4 w-4 mr-1" /> Allocate to CPA</Button>
                <Button>Save New Request</Button>
                <Button variant="ghost">Reset</Button>
              </div>
            </CardContent>
          </Card>

          {/* User Dashboard Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="enterprise-shadow">
              <CardHeader className="pb-2"><CardTitle className="text-sm">Underwriter Dashboard</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Status</span><StatusBadge status="approved" /></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Total Login Hours Today</span><span className="font-semibold">02:26:59 hrs</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Break Hours Today</span><span className="font-semibold">00:00:00 hrs</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Work Hours Today</span><span className="font-semibold">02:26:59 hrs</span></div>
              </CardContent>
            </Card>
            <Card className="enterprise-shadow">
              <CardHeader className="pb-2"><CardTitle className="text-sm">CPA Dashboard</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Status</span><StatusBadge status="approved" /></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Total Login Hours Today</span><span className="font-semibold">03:15:22 hrs</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Break Hours Today</span><span className="font-semibold">00:30:00 hrs</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Work Hours Today</span><span className="font-semibold">02:45:22 hrs</span></div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* QDE Search Tab */}
        <TabsContent value="qde-search" className="mt-4 space-y-4">
          <Card className="enterprise-shadow">
            <CardHeader><CardTitle className="text-base">Quick Data Entry Search</CardTitle></CardHeader>
            <CardContent>
              <div className="flex gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search by Loan ID, Client, Deal..." className="pl-9" />
                </div>
                <Button variant="outline">Filters</Button>
              </div>
              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b bg-muted/30">
                    <th className="text-left p-3 font-medium text-muted-foreground">Client</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Deal</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Loan ID</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Date & Time</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">User</th>
                    <th className="p-3 font-medium text-muted-foreground">Action</th>
                  </tr></thead>
                  <tbody>
                    {qdeSearchData.map((row) => (
                      <tr key={row.loanId} className="border-b last:border-0 hover:bg-muted/30 cursor-pointer">
                        <td className="p-3">{row.client}</td>
                        <td className="p-3 text-muted-foreground text-xs">{row.deal}</td>
                        <td className="p-3 font-medium text-primary">{row.loanId}</td>
                        <td className="p-3 text-muted-foreground text-xs">{row.dateTime}</td>
                        <td className="p-3">{row.user}</td>
                        <td className="p-3"><Button variant="ghost" size="sm" className="text-destructive h-7 px-2"><Trash2 className="h-3 w-3" /></Button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Dashboard Tab */}
        <TabsContent value="user-dashboard" className="mt-4 space-y-4">
          <Card className="enterprise-shadow">
            <CardHeader><CardTitle className="text-base">Dashboard for Today – {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3 mb-4">
                <Select><SelectTrigger className="w-[140px]"><SelectValue placeholder="Lender" /></SelectTrigger>
                  <SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="lich">LICH</SelectItem><SelectItem value="hdfc">HDFC</SelectItem></SelectContent>
                </Select>
                <Select><SelectTrigger className="w-[140px]"><SelectValue placeholder="Deal" /></SelectTrigger>
                  <SelectContent><SelectItem value="all">All</SelectItem></SelectContent>
                </Select>
                <Select><SelectTrigger className="w-[140px]"><SelectValue placeholder="Team Leader" /></SelectTrigger>
                  <SelectContent><SelectItem value="all">All</SelectItem></SelectContent>
                </Select>
                <Select><SelectTrigger className="w-[140px]"><SelectValue placeholder="Case Priority" /></SelectTrigger>
                  <SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="fresh">Fresh</SelectItem><SelectItem value="priority">Priority</SelectItem></SelectContent>
                </Select>
                <Button variant="outline" size="sm">Filter</Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="rounded-lg border p-3 text-center bg-primary/5">
                  <p className="text-xs text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-primary">12</p>
                </div>
                <div className="rounded-lg border p-3 text-center bg-warning/5">
                  <p className="text-xs text-muted-foreground">In Process</p>
                  <p className="text-2xl font-bold text-warning">5</p>
                </div>
                <div className="rounded-lg border p-3 text-center bg-success/5">
                  <p className="text-xs text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-success">28</p>
                </div>
                <div className="rounded-lg border p-3 text-center bg-destructive/5">
                  <p className="text-xs text-muted-foreground">Query Raised</p>
                  <p className="text-2xl font-bold text-destructive">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* New Loan - QDE Wizard */}
        <TabsContent value="new-loan" className="mt-4 space-y-4">
          <div className="flex items-center gap-2">
            <StatusBadge status="draft" />
            <span className="text-xs text-muted-foreground">Auto-saved 2m ago</span>
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
                <Button><Send className="h-4 w-4 mr-1" /> Submit to DDE</Button>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

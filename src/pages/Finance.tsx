import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KPICard } from "@/components/KPICard";
import { StatusBadge } from "@/components/StatusBadge";
import { Wallet, Receipt, RefreshCw, Download, IndianRupee, TrendingUp, CheckCircle, FileText } from "lucide-react";

const invoices = [
  { id: "INV-2026-0892", lender: "HDFC", deal: "HDFC0201251224", amount: "₹5,62,500", status: "pending" as const, date: "Mar 1, 2026", type: "Single" },
  { id: "INV-2026-0891", lender: "SBI", deal: "SBI0305181223", amount: "₹3,25,000", status: "approved" as const, date: "Feb 28, 2026", type: "Installment" },
  { id: "INV-2026-0890", lender: "ICICI", deal: "ICICI0501221224", amount: "₹8,10,000", status: "approved" as const, date: "Feb 25, 2026", type: "Consolidated" },
  { id: "INV-2026-0889", lender: "LIC HFL", deal: "LICH0102191221", amount: "₹12,50,000", status: "pending" as const, date: "Feb 22, 2026", type: "Single" },
];

const reportTypes = [
  "Policy Maintenance Report", "Pending Invoice", "Credit Note Report",
  "Cash Application Report", "Suspense Clearing Report", "Flow Invoice Loan Level Report",
  "Cash Application Report (Flow)", "Refund Report (Flow)", "Credit Note Accounting Report (Flow)",
];

export default function Finance() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div><h1>Finance</h1><p className="text-muted-foreground text-sm">Invoice, payments, cash application, and reconciliation</p></div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" /> Export</Button>
          <Button size="sm">Generate Invoice</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Revenue" value="₹4.2Cr" change="+18% YoY" changeType="positive" icon={IndianRupee} />
        <KPICard title="Outstanding" value="₹82L" change="12 invoices" changeType="neutral" icon={Receipt} iconClassName="bg-warning/10 text-warning" />
        <KPICard title="Collected" value="₹3.38Cr" change="This quarter" changeType="positive" icon={TrendingUp} iconClassName="bg-success/10 text-success" />
        <KPICard title="Reconciled" value="96.2%" change="+1.4%" changeType="positive" icon={CheckCircle} iconClassName="bg-info/10 text-info" />
      </div>

      <Tabs defaultValue="invoices">
        <TabsList className="w-full justify-start flex-wrap h-auto gap-1 bg-muted/50 p-1">
          {["Invoices", "Cash Application", "Payments", "Refunds", "Credit Notes", "Reconciliation", "MG Deed", "Reports"].map((tab) => (
            <TabsTrigger key={tab} value={tab.toLowerCase().replace(/ /g, "-")} className="text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">{tab}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="invoices" className="mt-4">
          <Card className="enterprise-shadow">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead><tr className="border-b bg-muted/30">
                  <th className="text-left p-3 font-medium text-muted-foreground">Invoice ID</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Lender</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Deal</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Type</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Amount</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
                </tr></thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="border-b last:border-0 hover:bg-muted/30 cursor-pointer">
                      <td className="p-3 font-medium text-primary">{inv.id}</td>
                      <td className="p-3">{inv.lender}</td>
                      <td className="p-3 text-xs text-muted-foreground">{inv.deal}</td>
                      <td className="p-3"><span className="rounded bg-muted px-2 py-0.5 text-xs">{inv.type}</span></td>
                      <td className="p-3 text-right font-medium">{inv.amount}</td>
                      <td className="p-3"><StatusBadge status={inv.status} /></td>
                      <td className="p-3 text-muted-foreground">{inv.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cash-application" className="mt-4">
          <Card className="enterprise-shadow">
            <CardHeader><CardTitle className="text-base">Cash Application</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2"><Label>Client ID</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select Lender" /></SelectTrigger>
                    <SelectContent><SelectItem value="lich">LICH</SelectItem><SelectItem value="hdfc">HDFC</SelectItem><SelectItem value="sbi">SBI</SelectItem><SelectItem value="abhl">ABHL</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Invoice</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select Invoice" /></SelectTrigger>
                    <SelectContent><SelectItem value="inv1">INV-2026-0892</SelectItem><SelectItem value="inv2">INV-2026-0891</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Deposit Date</Label><Input type="date" defaultValue="2026-03-03" /></div>
                <div className="space-y-2"><Label>Expected Amount (₹)</Label><Input defaultValue="0.00" readOnly className="bg-muted/50" /></div>
                <div className="space-y-2"><Label>TDS Rate (%)</Label><Input /></div>
                <div className="space-y-2"><Label>TDS Deducted Amount (₹)</Label><Input /></div>
                <div className="space-y-2"><Label>Revised Expected Amount (₹)</Label><Input defaultValue="0.00" readOnly className="bg-muted/50" /></div>
                <div className="space-y-2"><Label>Amount Available in Suspense (₹)</Label><Input defaultValue="0.00" readOnly className="bg-muted/50" /></div>
                <div className="space-y-2"><Label>Amount to Apply from Suspense (₹)</Label><Input /></div>
                <div className="space-y-2"><Label>Received Amount (₹)</Label><Input /></div>
                <div className="space-y-2"><Label>Total Received Amount (₹)</Label><Input defaultValue="0.00" readOnly className="bg-muted/50" /></div>
                <div className="space-y-2"><Label>Cheque Number</Label><Input /></div>
                <div className="space-y-2"><Label>Bank Details</Label><Input /></div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button>Apply Cash</Button>
                <Button variant="outline">Reset</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="mt-4">
          <Card className="enterprise-shadow">
            <CardHeader><CardTitle className="text-base">Payment Allocation</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-muted-foreground">Track receivables and payables to guarantee providers. Payment allocation and reconciliation.</p></CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="refunds" className="mt-4">
          <Card className="enterprise-shadow">
            <CardHeader><CardTitle className="text-base">Refund Processing</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-muted-foreground">Process refunds for regularized cases post claim payout. Ageing reports for pending refunds.</p></CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credit-notes" className="mt-4">
          <Card className="enterprise-shadow">
            <CardHeader><CardTitle className="text-base">Credit Notes</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-muted-foreground">Issue credit notes against specific cases with reference number, amount, reason, and date tracking.</p></CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reconciliation" className="mt-4">
          <Card className="enterprise-shadow">
            <CardHeader><CardTitle className="text-base">Reconciliation</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-muted-foreground">Compare system data with lender's raw disbursal batch data. Flag discrepancies automatically.</p></CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mg-deed" className="mt-4">
          <Card className="enterprise-shadow">
            <CardHeader><CardTitle className="text-base">MG Deed Generation</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-muted-foreground">Generate MG deed after invoicing - Individual, Batch, or Bulk. Integration with E-Sign/E-Stamp vendor.</p></CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="mt-4">
          <Card className="enterprise-shadow">
            <CardHeader><CardTitle className="text-base">Finance Reports</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {reportTypes.map((report) => (
                  <div key={report} className="flex items-center justify-between p-3 rounded border hover:bg-muted/30 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">{report}</span>
                    </div>
                    <Button variant="outline" size="sm"><Download className="h-3 w-3 mr-1" /> Generate</Button>
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

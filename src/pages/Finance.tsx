import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KPICard } from "@/components/KPICard";
import { StatusBadge } from "@/components/StatusBadge";
import { Wallet, Receipt, RefreshCw, Download, IndianRupee, TrendingUp, CheckCircle } from "lucide-react";

const invoices = [
  { id: "INV-2026-0892", lender: "HDFC", amount: "₹5,62,500", status: "pending" as const, date: "Mar 1, 2026" },
  { id: "INV-2026-0891", lender: "SBI", amount: "₹3,25,000", status: "approved" as const, date: "Feb 28, 2026" },
  { id: "INV-2026-0890", lender: "ICICI", amount: "₹8,10,000", status: "approved" as const, date: "Feb 25, 2026" },
];

export default function Finance() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div><h1>Finance</h1><p className="text-muted-foreground text-sm">Invoice, payments, and reconciliation</p></div>
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
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="invoices" className="text-xs">Invoices</TabsTrigger>
          <TabsTrigger value="payments" className="text-xs">Payments</TabsTrigger>
          <TabsTrigger value="refunds" className="text-xs">Refunds</TabsTrigger>
          <TabsTrigger value="reconciliation" className="text-xs">Reconciliation</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="mt-4">
          <Card className="enterprise-shadow">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead><tr className="border-b bg-muted/30">
                  <th className="text-left p-3 font-medium text-muted-foreground">Invoice ID</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Lender</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Amount</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
                </tr></thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="border-b last:border-0 hover:bg-muted/30 cursor-pointer">
                      <td className="p-3 font-medium text-primary">{inv.id}</td>
                      <td className="p-3">{inv.lender}</td>
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

        {["payments", "refunds", "reconciliation"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-4">
            <Card className="enterprise-shadow"><CardContent className="py-12 text-center text-muted-foreground"><p className="text-sm capitalize">{tab} module content</p></CardContent></Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

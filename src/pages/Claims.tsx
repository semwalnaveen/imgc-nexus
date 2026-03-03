import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/StatusBadge";
import { Search, Upload, CheckSquare, FileText, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const claims = [
  { id: "CLM-2026-0045", loan: "LN-2026-000892", customer: "Sunil Verma", amount: "₹12,50,000", status: "in-review" as const, date: "Feb 28, 2026" },
  { id: "CLM-2026-0044", loan: "LN-2025-004521", customer: "Meena Agarwal", amount: "₹8,75,000", status: "approved" as const, date: "Feb 25, 2026" },
  { id: "CLM-2026-0043", loan: "LN-2025-003892", customer: "Ravi Shankar", amount: "₹22,00,000", status: "pending" as const, date: "Feb 22, 2026" },
  { id: "CLM-2026-0042", loan: "LN-2025-002156", customer: "Deepa Nair", amount: "₹15,00,000", status: "rejected" as const, date: "Feb 20, 2026" },
];

export default function Claims() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div><h1>Claims Management</h1><p className="text-muted-foreground text-sm">Process and track guarantee claims</p></div>
        <Button>New Claim</Button>
      </div>

      <Tabs defaultValue="search">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="search" className="text-xs">Claim Search</TabsTrigger>
          <TabsTrigger value="documentation" className="text-xs">Documentation</TabsTrigger>
          <TabsTrigger value="verification" className="text-xs">Verification</TabsTrigger>
          <TabsTrigger value="batch" className="text-xs">Batch Approval</TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="mt-4 space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by Claim ID, Loan ID, Customer..." className="pl-9" />
            </div>
            <Button variant="outline">Filters</Button>
          </div>

          {/* Desktop */}
          <Card className="enterprise-shadow hidden md:block">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead><tr className="border-b bg-muted/30">
                  <th className="text-left p-3 font-medium text-muted-foreground">Claim ID</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Loan ID</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Customer</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Amount</th>
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
                      <td className="p-3 text-right font-medium">{c.amount}</td>
                      <td className="p-3"><StatusBadge status={c.status} /></td>
                      <td className="p-3 text-muted-foreground">{c.date}</td>
                      <td className="p-3"><ArrowRight className="h-4 w-4 text-muted-foreground" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Mobile cards */}
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
                    <span>{c.amount}</span><span>{c.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {["documentation", "verification", "batch"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-4">
            <Card className="enterprise-shadow">
              <CardContent className="py-12 text-center text-muted-foreground">
                <p className="text-sm capitalize">{tab} module content</p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

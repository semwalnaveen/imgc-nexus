import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { Download, Search, Filter, ArrowLeftRight } from "lucide-react";

const logs = [
  { timestamp: "Mar 3, 2026 10:45 AM", user: "Rajesh Kumar", module: "Underwriting", action: "Modified", field: "Risk Grade", oldValue: "B", newValue: "B+", loanId: "LN-2026-001245" },
  { timestamp: "Mar 3, 2026 10:30 AM", user: "System", module: "Workflow", action: "Assigned", field: "Stage", oldValue: "DDE", newValue: "Underwriting", loanId: "LN-2026-001245" },
  { timestamp: "Mar 2, 2026 4:15 PM", user: "Suresh P.", module: "DDE", action: "Modified", field: "Income Amount", oldValue: "₹1,20,000", newValue: "₹1,50,000", loanId: "LN-2026-001245" },
  { timestamp: "Mar 2, 2026 2:00 PM", user: "Priya M.", module: "QDE", action: "Created", field: "Application", oldValue: "–", newValue: "New", loanId: "LN-2026-001245" },
];

export default function AuditLogs() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div><h1>Audit Logs</h1><p className="text-muted-foreground text-sm">Track all system changes and user actions</p></div>
        <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" /> Export Logs</Button>
      </div>

      {/* Filters */}
      <Card className="enterprise-shadow">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by user, loan ID..." className="pl-9" />
            </div>
            <Select defaultValue="all"><SelectTrigger className="w-[150px]"><SelectValue placeholder="Module" /></SelectTrigger>
              <SelectContent><SelectItem value="all">All Modules</SelectItem><SelectItem value="uw">Underwriting</SelectItem><SelectItem value="dde">DDE</SelectItem><SelectItem value="qde">QDE</SelectItem></SelectContent>
            </Select>
            <Input type="date" className="w-[160px]" />
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card className="enterprise-shadow">
        <CardContent className="p-0">
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-muted/30">
                <th className="text-left p-3 font-medium text-muted-foreground">Timestamp</th>
                <th className="text-left p-3 font-medium text-muted-foreground">User</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Module</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Field</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Change</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Loan ID</th>
              </tr></thead>
              <tbody>
                {logs.map((log, i) => (
                  <tr key={i} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="p-3 text-muted-foreground whitespace-nowrap">{log.timestamp}</td>
                    <td className="p-3 font-medium">{log.user}</td>
                    <td className="p-3"><span className="rounded bg-muted px-2 py-0.5 text-xs">{log.module}</span></td>
                    <td className="p-3">{log.field}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="rounded bg-destructive/10 px-2 py-0.5 text-destructive line-through">{log.oldValue}</span>
                        <ArrowLeftRight className="h-3 w-3 text-muted-foreground" />
                        <span className="rounded bg-success/10 px-2 py-0.5 text-success font-medium">{log.newValue}</span>
                      </div>
                    </td>
                    <td className="p-3 text-primary font-medium">{log.loanId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

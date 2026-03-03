import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Filter, BarChart3, PieChart, TrendingUp, Clock } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line,
} from "recharts";

const monthlyData = [
  { month: "Oct", loans: 180, claims: 12 },
  { month: "Nov", loans: 210, claims: 15 },
  { month: "Dec", loans: 195, claims: 10 },
  { month: "Jan", loans: 230, claims: 18 },
  { month: "Feb", loans: 245, claims: 14 },
  { month: "Mar", loans: 187, claims: 8 },
];

const templates = [
  { name: "Monthly Portfolio Report", type: "Scheduled", lastRun: "Mar 1, 2026" },
  { name: "Lender-wise Disbursement", type: "On-demand", lastRun: "Feb 28, 2026" },
  { name: "Claim TAT Analysis", type: "Scheduled", lastRun: "Mar 1, 2026" },
  { name: "Risk Distribution Report", type: "On-demand", lastRun: "Feb 25, 2026" },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div><h1>MIS & Reports</h1><p className="text-muted-foreground text-sm">Analytics, reports, and business intelligence</p></div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-1" /> Filters</Button>
          <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" /> Export</Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Portfolio", value: "₹856 Cr", icon: BarChart3 },
          { label: "Active Guarantees", value: "3,247", icon: PieChart },
          { label: "Avg TAT", value: "4.2 Days", icon: Clock },
          { label: "Growth Rate", value: "+12.4%", icon: TrendingUp },
        ].map((s) => (
          <Card key={s.label} className="enterprise-shadow">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2"><s.icon className="h-4 w-4 text-primary" /></div>
              <div><p className="text-xs text-muted-foreground">{s.label}</p><p className="text-lg font-bold">{s.value}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="enterprise-shadow">
          <CardHeader className="pb-2"><CardTitle className="text-base">Loan Origination Trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="loans" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="enterprise-shadow">
          <CardHeader className="pb-2"><CardTitle className="text-base">Claims Trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="claims" stroke="hsl(var(--destructive))" strokeWidth={2} dot={{ fill: "hsl(var(--destructive))" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Saved Templates */}
      <Card className="enterprise-shadow">
        <CardHeader className="pb-2"><CardTitle className="text-base">Report Templates</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {templates.map((t) => (
              <div key={t.name} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 cursor-pointer">
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.type} · Last: {t.lastRun}</p>
                </div>
                <Button variant="outline" size="sm"><Download className="h-3 w-3 mr-1" /> Run</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

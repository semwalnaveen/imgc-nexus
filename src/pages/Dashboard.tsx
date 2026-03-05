import { KPICard } from "@/components/KPICard";
import { StatusBadge } from "@/components/StatusBadge";
import {
  FileText, Clock, ShieldAlert, TrendingUp, CheckCircle, AlertTriangle,
  ArrowRight, BarChart3, Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

const pipelineData = [
  { stage: "DDE", count: 89 },
  { stage: "UW", count: 67 },
  { stage: "Approved", count: 45 },
  { stage: "Queried", count: 28 },
  { stage: "Rejected", count: 12 },
];

const stageData = [
  { name: "Pending", value: 35, color: "hsl(38, 92%, 50%)" },
  { name: "In Review", value: 28, color: "hsl(20, 89%, 54%)" },
  { name: "Approved", value: 22, color: "hsl(142, 72%, 37%)" },
  { name: "Rejected", value: 10, color: "hsl(0, 72%, 51%)" },
  { name: "Deferred", value: 5, color: "hsl(217, 91%, 53%)" },
];

const recentLoans = [
  { id: "LN-2026-001245", customer: "Amit Sharma", amount: "₹45,00,000", status: "in-review" as const, date: "Mar 2, 2026" },
  { id: "LN-2026-001244", customer: "Priya Patel", amount: "₹32,50,000", status: "approved" as const, date: "Mar 2, 2026" },
  { id: "LN-2026-001243", customer: "Vikram Singh", amount: "₹78,00,000", status: "deviation" as const, date: "Mar 1, 2026" },
  { id: "LN-2026-001242", customer: "Neha Gupta", amount: "₹25,00,000", status: "pending" as const, date: "Mar 1, 2026" },
  { id: "LN-2026-001241", customer: "Rahul Mehta", amount: "₹55,00,000", status: "approved" as const, date: "Feb 28, 2026" },
];

const alerts = [
  { type: "danger", message: "3 loans breaching SLA – Immediate action required", icon: AlertTriangle },
  { type: "warning", message: "5 high-risk loans pending UW review", icon: ShieldAlert },
  { type: "info", message: "Batch #B-2026-089 processing complete", icon: CheckCircle },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

export default function Dashboard() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1>Dashboard</h1>
          <p className="text-muted-foreground text-sm">Overview of mortgage guarantee operations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Export</Button>
          <Button size="sm">New Application</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard title="Total Loans" value="1,247" change="+12% from last month" changeType="positive" icon={FileText} />
        <KPICard title="UW Queue" value="67" change="8 critical" changeType="negative" icon={Layers} iconClassName="bg-warning/10 text-warning" />
        <KPICard title="Pending Claims" value="23" change="-5% from last month" changeType="positive" icon={ShieldAlert} iconClassName="bg-destructive/10 text-destructive" />
        <KPICard title="Avg TAT" value="4.2d" change="-0.3d improvement" changeType="positive" icon={Clock} iconClassName="bg-info/10 text-info" />
        <KPICard title="Approval Ratio" value="72.4%" change="+2.1% this month" changeType="positive" icon={TrendingUp} iconClassName="bg-success/10 text-success" />
        <KPICard title="Batch Status" value="3/5" change="2 in progress" changeType="neutral" icon={BarChart3} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="enterprise-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Loan Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={pipelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="stage" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="enterprise-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Stage Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width="50%" height={200}>
                <PieChart>
                  <Pie data={stageData} dataKey="value" cx="50%" cy="50%" outerRadius={80} innerRadius={50}>
                    {stageData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {stageData.map((entry) => (
                  <div key={entry.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: entry.color }} />
                      <span className="text-muted-foreground">{entry.name}</span>
                    </div>
                    <span className="font-semibold">{entry.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Alerts */}
        <Card className="enterprise-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Alerts & Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert, i) => (
              <div key={i} className={`flex items-start gap-3 rounded-lg border p-3 text-sm ${
                alert.type === "danger" ? "border-destructive/20 bg-destructive/5" :
                alert.type === "warning" ? "border-warning/20 bg-warning/5" :
                "border-success/20 bg-success/5"
              }`}>
                <alert.icon className={`h-4 w-4 mt-0.5 shrink-0 ${
                  alert.type === "danger" ? "text-destructive" :
                  alert.type === "warning" ? "text-warning" : "text-success"
                }`} />
                <p className="text-foreground/80">{alert.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Loans */}
        <Card className="lg:col-span-2 enterprise-shadow">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">Recent Applications</CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">
              View All <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            {/* Desktop table */}
            <div className="hidden md:block overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="text-left py-2 font-medium">Loan ID</th>
                    <th className="text-left py-2 font-medium">Customer</th>
                    <th className="text-right py-2 font-medium">Amount</th>
                    <th className="text-left py-2 font-medium">Status</th>
                    <th className="text-left py-2 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLoans.map((loan) => (
                    <tr key={loan.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors cursor-pointer">
                      <td className="py-2.5 font-medium text-primary">{loan.id}</td>
                      <td className="py-2.5">{loan.customer}</td>
                      <td className="py-2.5 text-right font-medium">{loan.amount}</td>
                      <td className="py-2.5"><StatusBadge status={loan.status} /></td>
                      <td className="py-2.5 text-muted-foreground">{loan.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {recentLoans.map((loan) => (
                <div key={loan.id} className="rounded-lg border p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-primary text-sm">{loan.id}</span>
                    <StatusBadge status={loan.status} />
                  </div>
                  <p className="text-sm font-medium">{loan.customer}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{loan.amount}</span>
                    <span>{loan.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

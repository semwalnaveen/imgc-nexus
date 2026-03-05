import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Server, Database, Shield, Globe, Cpu, Bell, FileText, BarChart3, CreditCard, Users } from "lucide-react";
import { motion } from "framer-motion";

const layers = [
  {
    name: "UI Layer",
    icon: Globe,
    tech: "React 18 · TypeScript · Tailwind CSS · shadcn/ui",
    status: "healthy",
  },
  {
    name: "API Gateway",
    icon: Server,
    tech: "REST / GraphQL · Rate Limiting · Auth Middleware",
    status: "healthy",
  },
  {
    name: "Microservices",
    icon: Cpu,
    tech: "Serverless Functions · Event-driven",
    status: "healthy",
  },
  {
    name: "Event Streaming",
    icon: Bell,
    tech: "Webhooks · Real-time Subscriptions",
    status: "warning",
  },
  {
    name: "Data Layer",
    icon: Database,
    tech: "PostgreSQL · Row Level Security",
    status: "healthy",
  },
  {
    name: "Infrastructure",
    icon: Shield,
    tech: "Cloud-native · Auto-scaling · CDN",
    status: "healthy",
  },
];

const services = [
  { name: "Loan Onboarding", icon: FileText, status: "healthy", latency: "45ms", uptime: "99.98%" },
  { name: "Underwriting Engine", icon: Cpu, status: "healthy", latency: "120ms", uptime: "99.95%" },
  { name: "Claims Service", icon: AlertTriangle, status: "warning", latency: "230ms", uptime: "99.80%" },
  { name: "Finance Service", icon: CreditCard, status: "healthy", latency: "55ms", uptime: "99.99%" },
  { name: "Notification Service", icon: Bell, status: "healthy", latency: "30ms", uptime: "99.99%" },
  { name: "Document Service", icon: FileText, status: "healthy", latency: "85ms", uptime: "99.97%" },
  { name: "Auth Service", icon: Shield, status: "healthy", latency: "25ms", uptime: "100%" },
  { name: "Analytics Service", icon: BarChart3, status: "healthy", latency: "150ms", uptime: "99.90%" },
];

const statusConfig = {
  healthy: { icon: CheckCircle, color: "text-success", bg: "bg-success/10", label: "Healthy" },
  warning: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10", label: "Degraded" },
  error: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10", label: "Down" },
};

export default function ArchitectureDashboard() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Platform Architecture</h1>
        <p className="text-sm text-muted-foreground">System health, service topology, and infrastructure overview</p>
      </div>

      {/* Health Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Overall Health", value: "98.5%", status: "healthy" },
          { label: "Active Services", value: "8/8", status: "healthy" },
          { label: "Avg Latency", value: "92ms", status: "healthy" },
          { label: "Incidents (24h)", value: "1", status: "warning" },
        ].map((m) => {
          const cfg = statusConfig[m.status as keyof typeof statusConfig];
          return (
            <Card key={m.label}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${cfg.bg}`}>
                  <cfg.icon className={`h-5 w-5 ${cfg.color}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{m.label}</p>
                  <p className="text-lg font-bold">{m.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Architecture Layers */}
      <Card>
        <CardHeader><CardTitle className="text-base">Architecture Layers</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {layers.map((layer, i) => {
              const cfg = statusConfig[layer.status as keyof typeof statusConfig];
              return (
                <div key={layer.name} className="flex items-center gap-4 p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <layer.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{layer.name}</span>
                      <Badge variant="outline" className="text-[10px]">Layer {i + 1}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{layer.tech}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <cfg.icon className={`h-4 w-4 ${cfg.color}`} />
                    <span className={`text-xs font-medium ${cfg.color}`}>{cfg.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Microservices Grid */}
      <Card>
        <CardHeader><CardTitle className="text-base">Service Health Matrix</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {services.map((s) => {
              const cfg = statusConfig[s.status as keyof typeof statusConfig];
              return (
                <div key={s.name} className="rounded-lg border p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <s.icon className="h-5 w-5 text-muted-foreground" />
                    <cfg.icon className={`h-4 w-4 ${cfg.color}`} />
                  </div>
                  <h4 className="text-sm font-medium">{s.name}</h4>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Latency: {s.latency}</span>
                    <span>Uptime: {s.uptime}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

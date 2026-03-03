import { Card, CardContent } from "@/components/ui/card";
import { Users, Shield, Eye, Workflow, Settings, Layout } from "lucide-react";

const sections = [
  { title: "User Management", desc: "Manage users, roles, and access control", icon: Users },
  { title: "Role Configuration", desc: "Define roles and permission matrices", icon: Shield },
  { title: "Field Visibility", desc: "Control field-level visibility by role", icon: Eye },
  { title: "Workflow Rules", desc: "Configure business workflow rules", icon: Workflow },
  { title: "Layout Management", desc: "Customize form layouts and views", icon: Layout },
  { title: "System Config", desc: "Application-wide settings", icon: Settings },
];

export default function Admin() {
  return (
    <div className="space-y-6">
      <div><h1>Administration</h1><p className="text-muted-foreground text-sm">System administration and configuration</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => (
          <Card key={s.title} className="enterprise-shadow hover:enterprise-shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-5 flex items-start gap-3">
              <div className="rounded-lg bg-secondary/10 p-2.5 group-hover:bg-secondary/20 transition-colors">
                <s.icon className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">{s.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

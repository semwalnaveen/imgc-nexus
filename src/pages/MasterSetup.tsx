import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2, FileText, Shield, Settings, Upload, Users, Layers, Workflow,
  MapPin, Database, Globe, Tag, Landmark, BookOpen,
} from "lucide-react";

const modules = [
  { title: "Lender Setup", desc: "Configure lender profiles (Maker/Checker)", icon: Building2, count: 24 },
  { title: "Deal Setup", desc: "Manage deal structures and terms", icon: FileText, count: 12 },
  { title: "Scheme Setup", desc: "Configure guarantee schemes & programs", icon: Shield, count: 8 },
  { title: "Pricing Upload", desc: "Upload and manage pricing matrices (MG fees)", icon: Upload, count: 5 },
  { title: "Template Management", desc: "Upload & map document templates (MG letters, CAM)", icon: Layers, count: 15 },
  { title: "Role Management", desc: "Configure user roles and permissions (RBAC)", icon: Users, count: 6 },
  { title: "Workflow Config", desc: "Define workflow stages, approval matrix, and routing rules", icon: Workflow, count: 3 },
  { title: "Builder / Project Master", desc: "State, City, SubCity, Builder Name, Project mapping", icon: Landmark, count: 42 },
  { title: "City Classification", desc: "IMGC city classification master & negative area mapping", icon: MapPin, count: 180 },
  { title: "Vendor Mapping", desc: "Vendor mapping for verifications & third-party services", icon: Globe, count: 15 },
  { title: "Deviation Master", desc: "Standard deviations, mitigants & sanction conditions", icon: Tag, count: 35 },
  { title: "Collateral Master", desc: "Collateral types, classification & NS tagging", icon: Database, count: 20 },
  { title: "Regulatory Compliance", desc: "RBI register, DPDPA, Aadhaar masking rules", icon: BookOpen, count: null },
  { title: "System Settings", desc: "Global system configuration & field-level visibility", icon: Settings, count: null },
];

export default function MasterSetup() {
  return (
    <div className="space-y-6">
      <div><h1>Master Setup</h1><p className="text-muted-foreground text-sm">System configuration, master data management, and policy setup</p></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {modules.map((m) => (
          <Card key={m.title} className="enterprise-shadow hover:enterprise-shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2.5 group-hover:bg-primary/20 transition-colors">
                  <m.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold">{m.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{m.desc}</p>
                  {m.count && <p className="text-xs text-primary font-medium mt-2">{m.count} records</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

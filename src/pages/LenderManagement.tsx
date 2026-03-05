import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { KPICard } from "@/components/KPICard";
import { WorkflowTracker } from "@/components/WorkflowTracker";
import { OnboardingChecklist } from "@/components/lender/OnboardingChecklist";
import { LenderDirectory, type Lender } from "@/components/lender/LenderDirectory";
import { LenderSetupForm } from "@/components/lender/LenderSetupForm";
import { DealSetupForm } from "@/components/lender/DealSetupForm";
import { SchemeSetupForm } from "@/components/lender/SchemeSetupForm";
import { PricingUpload } from "@/components/lender/PricingUpload";
import { DealSchemeMapping } from "@/components/lender/DealSchemeMapping";
import { TemplateManagement } from "@/components/lender/TemplateManagement";
import { Building2, FileText, Settings, CheckCircle, Plus, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";

const onboardingSteps = [
  { label: "Lender Setup", status: "completed" as const },
  { label: "Deal Setup", status: "completed" as const },
  { label: "Scheme Setup", status: "completed" as const },
  { label: "Deal Mapping", status: "current" as const },
  { label: "Pricing Upload", status: "upcoming" as const },
  { label: "Template Upload", status: "upcoming" as const },
  { label: "Field Mapping", status: "upcoming" as const },
  { label: "Approval", status: "upcoming" as const },
  { label: "Download", status: "upcoming" as const },
];

export default function LenderManagement() {
  const [activeTab, setActiveTab] = useState("directory");
  const [onboardDialogOpen, setOnboardDialogOpen] = useState(false);

  const handleSelectLender = (_lender: Lender) => {
    setActiveTab("onboarding");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Lender Onboarding & Management</h1>
          <p className="text-sm text-muted-foreground">Onboard, configure, and manage lender partnerships for mortgage guarantee operations</p>
        </div>
        <Dialog open={onboardDialogOpen} onOpenChange={setOnboardDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" /> Onboard New Lender</Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Onboard New Lender</DialogTitle></DialogHeader>
            <LenderSetupForm onComplete={() => { setOnboardDialogOpen(false); setActiveTab("deals"); }} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <KPICard title="Total Lenders" value="28" change="+3 this quarter" changeType="positive" icon={Building2} />
        <KPICard title="Active Lenders" value="22" change="6 pending" changeType="positive" icon={CheckCircle} />
        <KPICard title="Pending Onboarding" value="4" change="2 in approval" changeType="negative" icon={Settings} />
        <KPICard title="Pricing Pending" value="2" change="Awaiting checker" changeType="negative" icon={FileText} />
        <KPICard title="Template Pending" value="3" change="1 legal, 2 finance" changeType="negative" icon={ClipboardList} />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="directory">Lender Directory</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding Workflow</TabsTrigger>
          <TabsTrigger value="lender-setup">Lender Setup</TabsTrigger>
          <TabsTrigger value="deals">Deal Setup</TabsTrigger>
          <TabsTrigger value="schemes">Scheme Setup</TabsTrigger>
          <TabsTrigger value="mapping">Deal-Scheme Mapping</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Upload</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="directory">
          <LenderDirectory onSelectLender={handleSelectLender} />
        </TabsContent>

        <TabsContent value="onboarding" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-card rounded-lg border p-5">
                <h3 className="text-sm font-semibold mb-1">Onboarding Pipeline — PNB Housing (LND-004)</h3>
                <p className="text-xs text-muted-foreground mb-4">Current Stage: Deal & Scheme Mapping · Assigned to: Priya Sharma · Due: 12 Mar 2026</p>
                <WorkflowTracker steps={onboardingSteps} />
              </div>
              <div className="bg-card rounded-lg border p-5 space-y-3">
                <h4 className="text-sm font-semibold">Stage Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div><span className="text-muted-foreground">Lender Type:</span> <span className="font-medium">HFC</span></div>
                  <div><span className="text-muted-foreground">Region:</span> <span className="font-medium">North</span></div>
                  <div><span className="text-muted-foreground">Risk Category:</span> <span className="font-medium">Medium</span></div>
                  <div><span className="text-muted-foreground">Deals Created:</span> <span className="font-medium">1</span></div>
                  <div><span className="text-muted-foreground">Schemes Created:</span> <span className="font-medium">2</span></div>
                  <div><span className="text-muted-foreground">Templates:</span> <span className="font-medium">0 / 4 required</span></div>
                </div>
              </div>
            </div>
            <OnboardingChecklist currentStage={4} />
          </div>
        </TabsContent>

        <TabsContent value="lender-setup">
          <LenderSetupForm onComplete={() => setActiveTab("deals")} />
        </TabsContent>

        <TabsContent value="deals">
          <DealSetupForm onComplete={() => setActiveTab("schemes")} />
        </TabsContent>

        <TabsContent value="schemes">
          <SchemeSetupForm onComplete={() => setActiveTab("mapping")} />
        </TabsContent>

        <TabsContent value="mapping">
          <DealSchemeMapping />
        </TabsContent>

        <TabsContent value="pricing">
          <PricingUpload onComplete={() => setActiveTab("templates")} />
        </TabsContent>

        <TabsContent value="templates">
          <TemplateManagement />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

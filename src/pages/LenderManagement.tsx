import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { WorkflowTracker } from "@/components/WorkflowTracker";
import { StatusBadge } from "@/components/StatusBadge";
import { KPICard } from "@/components/KPICard";
import { Building2, Plus, Search, Upload, FileText, Download, CheckCircle, Settings } from "lucide-react";
import { motion } from "framer-motion";

const lenders = [
  { id: "LND-001", name: "State Bank of India", type: "Bank", region: "Pan India", status: "Active", deals: 12, riskCategory: "Low" },
  { id: "LND-002", name: "HDFC Ltd", type: "HFC", region: "Pan India", status: "Active", deals: 8, riskCategory: "Low" },
  { id: "LND-003", name: "Bajaj Housing Finance", type: "NBFC", region: "West & South", status: "Active", deals: 5, riskCategory: "Medium" },
  { id: "LND-004", name: "PNB Housing", type: "HFC", region: "North", status: "Pending", deals: 0, riskCategory: "Medium" },
  { id: "LND-005", name: "Tata Capital Housing", type: "NBFC", region: "Pan India", status: "Active", deals: 3, riskCategory: "Low" },
];

const onboardingSteps = [
  { label: "Lender Setup", status: "completed" as const },
  { label: "Deal Setup", status: "completed" as const },
  { label: "Scheme Setup", status: "current" as const },
  { label: "Deal Mapping", status: "upcoming" as const },
  { label: "Pricing Upload", status: "upcoming" as const },
  { label: "Template Upload", status: "upcoming" as const },
  { label: "Template Mapping", status: "upcoming" as const },
  { label: "Template Approval", status: "upcoming" as const },
  { label: "Download", status: "upcoming" as const },
];

export default function LenderManagement() {
  const [activeTab, setActiveTab] = useState("lenders");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Lender Management</h1>
          <p className="text-sm text-muted-foreground">Onboard and manage lender partnerships</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" /> Onboard Lender</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader><DialogTitle>Onboard New Lender</DialogTitle></DialogHeader>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="space-y-2"><Label>Lender Name</Label><Input placeholder="Enter lender name" /></div>
              <div className="space-y-2"><Label>Lender Type</Label>
                <Select><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank</SelectItem>
                    <SelectItem value="nbfc">NBFC</SelectItem>
                    <SelectItem value="hfc">Housing Finance Company</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Registration Number</Label><Input placeholder="CIN / Registration #" /></div>
              <div className="space-y-2"><Label>Contact Person</Label><Input placeholder="Name" /></div>
              <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="email@lender.com" /></div>
              <div className="space-y-2"><Label>Phone</Label><Input placeholder="+91 XXXXX XXXXX" /></div>
              <div className="col-span-2 space-y-2"><Label>Address</Label><Input placeholder="Full address" /></div>
              <div className="space-y-2"><Label>Operational Region</Label>
                <Select><SelectTrigger><SelectValue placeholder="Select region" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pan-india">Pan India</SelectItem>
                    <SelectItem value="north">North</SelectItem>
                    <SelectItem value="south">South</SelectItem>
                    <SelectItem value="west">West</SelectItem>
                    <SelectItem value="east">East</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Risk Category</Label>
                <Select><SelectTrigger><SelectValue placeholder="Select risk" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 flex justify-end gap-2 pt-4">
                <Button variant="outline">Save as Draft</Button>
                <Button>Submit for Approval</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Total Lenders" value="24" change="+3 this quarter" changeType="positive" icon={Building2} />
        <KPICard title="Active Deals" value="28" change="12 schemes mapped" changeType="positive" icon={FileText} />
        <KPICard title="Pending Onboarding" value="3" change="2 in approval" changeType="negative" icon={Settings} />
        <KPICard title="Templates" value="56" change="All approved" changeType="positive" icon={CheckCircle} />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="lenders">Lender Directory</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding Workflow</TabsTrigger>
          <TabsTrigger value="deals">Deals & Schemes</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Upload</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="lenders" className="space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search lenders..." className="pl-9" />
            </div>
            <Select><SelectTrigger className="w-[150px]"><SelectValue placeholder="All Types" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="bank">Bank</SelectItem>
                <SelectItem value="nbfc">NBFC</SelectItem>
                <SelectItem value="hfc">HFC</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lender ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead>Deals</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lenders.map((l) => (
                    <TableRow key={l.id}>
                      <TableCell className="font-mono text-xs">{l.id}</TableCell>
                      <TableCell className="font-medium">{l.name}</TableCell>
                      <TableCell><Badge variant="outline">{l.type}</Badge></TableCell>
                      <TableCell>{l.region}</TableCell>
                      <TableCell><StatusBadge status={l.riskCategory === "Low" ? "low" : "medium"} /></TableCell>
                      <TableCell>{l.deals}</TableCell>
                      <TableCell><StatusBadge status={l.status === "Active" ? "active" : "pending"} /></TableCell>
                      <TableCell><Button variant="ghost" size="sm">View</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="onboarding" className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Onboarding Pipeline — PNB Housing</CardTitle></CardHeader>
            <CardContent>
              <WorkflowTracker steps={onboardingSteps} />
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Current Stage</Label>
                  <p className="text-sm font-medium text-primary">Scheme Setup</p>
                  <p className="text-xs text-muted-foreground">Assigned to: Priya Sharma · Due: 12 Mar 2026</p>
                </div>
                <div className="space-y-2">
                  <Label>Checklist</Label>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-success" /> KYC Documents Uploaded</div>
                    <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-success" /> Agreement Signed</div>
                    <div className="flex items-center gap-2 text-muted-foreground"><Settings className="h-4 w-4" /> Scheme Configuration Pending</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deals"><Card><CardContent className="py-8 text-center text-muted-foreground">Deal & Scheme management — configure deal terms, coverage percentages, and scheme mappings for each lender.</CardContent></Card></TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Upload Pricing Sheet</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Drag & drop Excel file or click to browse</p>
                <p className="text-xs text-muted-foreground mt-1">Columns: Loan Slab, Premium %, Risk Coverage, Processing Fee, Tax</p>
                <Button variant="outline" className="mt-4" size="sm">Browse Files</Button>
              </div>
              <Table>
                <TableHeader><TableRow><TableHead>Loan Slab</TableHead><TableHead>Premium %</TableHead><TableHead>Risk Coverage</TableHead><TableHead>Processing Fee</TableHead><TableHead>Tax</TableHead></TableRow></TableHeader>
                <TableBody>
                  <TableRow><TableCell>Up to ₹25L</TableCell><TableCell>1.20%</TableCell><TableCell>25%</TableCell><TableCell>₹2,500</TableCell><TableCell>18% GST</TableCell></TableRow>
                  <TableRow><TableCell>₹25L - ₹50L</TableCell><TableCell>1.00%</TableCell><TableCell>20%</TableCell><TableCell>₹3,500</TableCell><TableCell>18% GST</TableCell></TableRow>
                  <TableRow><TableCell>₹50L - ₹1Cr</TableCell><TableCell>0.85%</TableCell><TableCell>15%</TableCell><TableCell>₹5,000</TableCell><TableCell>18% GST</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates"><Card><CardContent className="py-8 text-center text-muted-foreground">Template management — upload, map, approve, and download guarantee templates and offer letters.</CardContent></Card></TabsContent>
      </Tabs>
    </motion.div>
  );
}

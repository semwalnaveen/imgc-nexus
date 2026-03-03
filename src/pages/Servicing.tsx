import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Download, AlertTriangle, CheckCircle, FileText } from "lucide-react";

export default function Servicing() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div><h1>Servicing</h1><p className="text-muted-foreground text-sm">Servicing data analysis, NPA tagging, and portfolio monitoring</p></div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" /> Export</Button>
          <Button size="sm"><Upload className="h-4 w-4 mr-1" /> Upload Servicing File</Button>
        </div>
      </div>

      <Tabs defaultValue="upload">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="upload" className="text-xs">File Upload</TabsTrigger>
          <TabsTrigger value="analysis" className="text-xs">Data Analysis</TabsTrigger>
          <TabsTrigger value="npa" className="text-xs">NPA Tracking</TabsTrigger>
          <TabsTrigger value="premium" className="text-xs">Premium Check</TabsTrigger>
          <TabsTrigger value="delinquency" className="text-xs">Delinquency</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-4">
          <Card className="enterprise-shadow">
            <CardHeader><CardTitle className="text-base">Servicing Data Upload</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="space-y-2">
                  <Label>Lender Name / Client</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent><SelectItem value="lich">LIC HFL</SelectItem><SelectItem value="hdfc">HDFC</SelectItem><SelectItem value="sbi">SBI</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Servicing File Month</Label><Input type="month" /></div>
                <div className="space-y-2"><Label>Batch Received Date</Label><Input type="date" /></div>
                <div className="space-y-2"><Label>Batch ID</Label><Input /></div>
                <div className="space-y-2 col-span-full md:col-span-1">
                  <Label>File (to upload)</Label>
                  <Input type="file" />
                </div>
              </div>
              <Button><Upload className="h-4 w-4 mr-1" /> Upload</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="mt-4">
          <Card className="enterprise-shadow">
            <CardHeader><CardTitle className="text-base">Servicing Data Analysis</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="rounded-lg border p-3 text-center bg-success/5">
                  <p className="text-xs text-muted-foreground">Regular Cases</p>
                  <p className="text-2xl font-bold text-success">2,847</p>
                </div>
                <div className="rounded-lg border p-3 text-center bg-warning/5">
                  <p className="text-xs text-muted-foreground">DPD 30-60</p>
                  <p className="text-2xl font-bold text-warning">45</p>
                </div>
                <div className="rounded-lg border p-3 text-center bg-destructive/5">
                  <p className="text-xs text-muted-foreground">DPD 60-90</p>
                  <p className="text-2xl font-bold text-destructive">12</p>
                </div>
                <div className="rounded-lg border p-3 text-center bg-destructive/5">
                  <p className="text-xs text-muted-foreground">NPA (90+)</p>
                  <p className="text-2xl font-bold text-destructive">8</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Checks on POS, EMI, DPDs, Loan Closures, and premium recalculation.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="npa" className="mt-4">
          <Card className="enterprise-shadow">
            <CardHeader><CardTitle className="text-base">NPA Tracking & POS Freeze</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Automated NPA tagging for 90+ DPD cases. POS freeze for NPA-flagged cases. MG obligation routing to claims tray. Orange flag tracking for regularized cases.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="premium" className="mt-4">
          <Card className="enterprise-shadow">
            <CardHeader><CardTitle className="text-base">Guarantee Premium Check</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Recalculate and check guarantee premiums issued by underwriter based on lender MOU, coverage %, loan amount, tenure, and risk grade.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delinquency" className="mt-4">
          <Card className="enterprise-shadow">
            <CardHeader><CardTitle className="text-base">Delinquency Dashboard</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Auto-triggered delinquency reports to designated email IDs. Summary view by DPD bucket, lender, geography.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

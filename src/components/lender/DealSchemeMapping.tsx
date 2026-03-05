import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusBadge } from "@/components/StatusBadge";
import { Plus, Save, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Mapping {
  id: string;
  lender: string;
  deal: string;
  scheme: string;
  productType: string;
  region: string;
  approvalAuth: string;
  status: string;
}

const mockMappings: Mapping[] = [
  { id: "MAP-001", lender: "State Bank of India", deal: "DL-SBI-001", scheme: "SCH-001", productType: "Home Loan", region: "Pan India", approvalAuth: "L1 Manager", status: "Active" },
  { id: "MAP-002", lender: "HDFC Ltd", deal: "DL-HDFC-001", scheme: "SCH-003", productType: "Home Loan", region: "Pan India", approvalAuth: "L2 Manager", status: "Active" },
  { id: "MAP-003", lender: "Bajaj Housing Finance", deal: "DL-BAJAJ-001", scheme: "SCH-002", productType: "Affordable Housing", region: "West & South", approvalAuth: "L1 Manager", status: "Pending" },
];

export function DealSchemeMapping() {
  const [mappings, setMappings] = useState(mockMappings);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  };

  const handleBulkApprove = () => {
    setMappings((prev) => prev.map((m) => selected.includes(m.id) ? { ...m, status: "Active" } : m));
    setSelected([]);
    toast({ title: "Mappings approved", description: `${selected.length} mapping(s) activated.` });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Map deals to schemes with region and product filters. Supports bulk operations.</p>
        <div className="flex gap-2">
          {selected.length > 0 && (
            <Button size="sm" variant="default" onClick={handleBulkApprove}>
              <CheckCircle className="h-4 w-4 mr-2" /> Approve Selected ({selected.length})
            </Button>
          )}
          <Button size="sm" variant="outline"><Plus className="h-4 w-4 mr-2" /> Add Mapping</Button>
        </div>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"></TableHead>
                <TableHead>Lender</TableHead>
                <TableHead>Deal</TableHead>
                <TableHead>Scheme</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Approval Auth</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mappings.map((m) => (
                <TableRow key={m.id}>
                  <TableCell><Checkbox checked={selected.includes(m.id)} onCheckedChange={() => toggleSelect(m.id)} /></TableCell>
                  <TableCell className="font-medium text-sm">{m.lender}</TableCell>
                  <TableCell className="font-mono text-xs">{m.deal}</TableCell>
                  <TableCell className="font-mono text-xs">{m.scheme}</TableCell>
                  <TableCell><Badge variant="outline">{m.productType}</Badge></TableCell>
                  <TableCell className="text-sm">{m.region}</TableCell>
                  <TableCell className="text-sm">{m.approvalAuth}</TableCell>
                  <TableCell><StatusBadge status={m.status === "Active" ? "active" : "pending"} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

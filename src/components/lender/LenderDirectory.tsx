import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { Search, Eye, Pause, Edit } from "lucide-react";

export interface Lender {
  id: string;
  name: string;
  type: string;
  region: string;
  status: "Active" | "Pending" | "Suspended";
  deals: number;
  riskCategory: string;
  onboardingStage: number;
  registrationNumber: string;
}

const mockLenders: Lender[] = [
  { id: "LND-001", name: "State Bank of India", type: "Bank", region: "Pan India", status: "Active", deals: 12, riskCategory: "Low", onboardingStage: 9, registrationNumber: "CIN-U65920MH" },
  { id: "LND-002", name: "HDFC Ltd", type: "HFC", region: "Pan India", status: "Active", deals: 8, riskCategory: "Low", onboardingStage: 9, registrationNumber: "CIN-L70100MH" },
  { id: "LND-003", name: "Bajaj Housing Finance", type: "NBFC", region: "West & South", status: "Active", deals: 5, riskCategory: "Medium", onboardingStage: 9, registrationNumber: "CIN-U65922MH" },
  { id: "LND-004", name: "PNB Housing", type: "HFC", region: "North", status: "Pending", deals: 0, riskCategory: "Medium", onboardingStage: 3, registrationNumber: "CIN-U65922DL" },
  { id: "LND-005", name: "Tata Capital Housing", type: "NBFC", region: "Pan India", status: "Active", deals: 3, riskCategory: "Low", onboardingStage: 9, registrationNumber: "CIN-U65910MH" },
  { id: "LND-006", name: "LIC Housing Finance", type: "HFC", region: "Pan India", status: "Active", deals: 6, riskCategory: "Low", onboardingStage: 9, registrationNumber: "CIN-L65922MH" },
  { id: "LND-007", name: "Can Fin Homes", type: "HFC", region: "South", status: "Pending", deals: 0, riskCategory: "Low", onboardingStage: 2, registrationNumber: "CIN-L85110KA" },
  { id: "LND-008", name: "Aditya Birla Capital", type: "NBFC", region: "West", status: "Suspended", deals: 2, riskCategory: "High", onboardingStage: 7, registrationNumber: "CIN-U65990MH" },
];

interface LenderDirectoryProps {
  onSelectLender: (lender: Lender) => void;
}

export function LenderDirectory({ onSelectLender }: LenderDirectoryProps) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = mockLenders.filter((l) => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) || l.id.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || l.type === typeFilter;
    const matchStatus = statusFilter === "all" || l.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name or ID..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[150px]"><SelectValue placeholder="All Types" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Bank">Bank</SelectItem>
            <SelectItem value="NBFC">NBFC</SelectItem>
            <SelectItem value="HFC">HFC</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]"><SelectValue placeholder="All Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Suspended">Suspended</SelectItem>
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
                <TableHead>Stage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((l) => (
                <TableRow key={l.id} className="cursor-pointer hover:bg-muted/50" onClick={() => onSelectLender(l)}>
                  <TableCell className="font-mono text-xs">{l.id}</TableCell>
                  <TableCell className="font-medium">{l.name}</TableCell>
                  <TableCell><Badge variant="outline">{l.type}</Badge></TableCell>
                  <TableCell className="text-sm">{l.region}</TableCell>
                  <TableCell><StatusBadge status={l.riskCategory === "Low" ? "low" : l.riskCategory === "High" ? "high" : "medium"} /></TableCell>
                  <TableCell>{l.deals}</TableCell>
                  <TableCell><span className="text-xs text-muted-foreground">{l.onboardingStage}/9</span></TableCell>
                  <TableCell><StatusBadge status={l.status === "Active" ? "active" : l.status === "Suspended" ? "rejected" : "pending"} /></TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); onSelectLender(l); }}><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
                      {l.status === "Active" && <Button variant="ghost" size="icon" className="h-8 w-8"><Pause className="h-4 w-4" /></Button>}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

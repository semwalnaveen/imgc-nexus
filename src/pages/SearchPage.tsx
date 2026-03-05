import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { Search, Filter, ExternalLink } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

const results = [
  { loanId: "IMGC-2026-00456", customer: "Amit Patel", pan: "ABCPD1234E", mobile: "98765 43210", lender: "SBI", status: "in-uw" as const, stage: "Underwriting" },
  { loanId: "IMGC-2026-00412", customer: "Sneha Gupta", pan: "BXYPG5678F", mobile: "87654 32109", lender: "HDFC", status: "approved" as const, stage: "Disbursed" },
  { loanId: "IMGC-2026-00398", customer: "Ramesh Iyer", pan: "CQRRI9012G", mobile: "76543 21098", lender: "PNB Housing", status: "pending" as const, stage: "DDE" },
  { loanId: "IMGC-2026-00387", customer: "Kavita Shah", pan: "DMPKS3456H", mobile: "65432 10987", lender: "Bajaj HF", status: "rejected" as const, stage: "Rejected" },
  { loanId: "IMGC-2026-00375", customer: "Vikram Singh", pan: "ENAVS7890I", mobile: "54321 09876", lender: "Tata Capital", status: "in-review" as const, stage: "Review" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Global Search</h1>
        <p className="text-sm text-muted-foreground">Search by Loan ID, Customer Name, PAN, Mobile, or Lender</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Loan ID, PAN, Mobile, Customer Name..." className="pl-9" />
        </div>
        <Select>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="All Lenders" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Lenders</SelectItem>
            <SelectItem value="sbi">SBI</SelectItem>
            <SelectItem value="hdfc">HDFC</SelectItem>
            <SelectItem value="pnb">PNB Housing</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="All Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="in-uw">In UW</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Button><Filter className="h-4 w-4 mr-2" /> Search</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loan ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>PAN</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Lender</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((r) => (
                <TableRow key={r.loanId}>
                  <TableCell className="font-mono text-xs font-medium">{r.loanId}</TableCell>
                  <TableCell className="font-medium">{r.customer}</TableCell>
                  <TableCell className="font-mono text-xs">{r.pan}</TableCell>
                  <TableCell>{r.mobile}</TableCell>
                  <TableCell>{r.lender}</TableCell>
                  <TableCell>{r.stage}</TableCell>
                  <TableCell><StatusBadge status={r.status} /></TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">View</Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><ExternalLink className="h-3 w-3" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}

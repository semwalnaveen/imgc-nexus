import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ServiceDesk from "./pages/ServiceDesk";
import DDE from "./pages/DDE";
import Underwriting from "./pages/Underwriting";
import Claims from "./pages/Claims";
import Finance from "./pages/Finance";
import Servicing from "./pages/Servicing";
import Reports from "./pages/Reports";
import MasterSetup from "./pages/MasterSetup";
import AuditLogs from "./pages/AuditLogs";
import Admin from "./pages/Admin";
import LenderManagement from "./pages/LenderManagement";
import Loan360 from "./pages/Loan360";
import ArchitectureDashboard from "./pages/ArchitectureDashboard";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/service-desk" element={<ServiceDesk />} />
            <Route path="/dde" element={<DDE />} />
            <Route path="/underwriting" element={<Underwriting />} />
            <Route path="/claims" element={<Claims />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/servicing" element={<Servicing />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/master-setup" element={<MasterSetup />} />
            <Route path="/audit-logs" element={<AuditLogs />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/lender-management" element={<LenderManagement />} />
            <Route path="/loan-360" element={<Loan360 />} />
            <Route path="/architecture" element={<ArchitectureDashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

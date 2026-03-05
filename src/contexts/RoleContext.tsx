import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole =
  | "admin"
  | "operations-cpa"
  | "underwriter"
  | "operations-senior-manager"
  | "risk";

export interface RoleConfig {
  id: UserRole;
  label: string;
  userName: string;
  initials: string;
  permissions: string[];
  menuAccess: string[];
}

export const ROLES: RoleConfig[] = [
  {
    id: "admin",
    label: "Admin",
    userName: "Rajesh Sharma",
    initials: "RS",
    permissions: ["View", "Edit", "Approve", "Reject", "Configure"],
    menuAccess: [
      "/dashboard", "/search", "/reports", "/underwriting", "/master-setup",
      "/admin", "/audit-logs", "/architecture", "/service-desk", "/dde",
      "/claims", "/finance", "/servicing", "/lender-management", "/loan-360",
    ],
  },
  {
    id: "operations-cpa",
    label: "Operations User – CPA",
    userName: "Priya Menon",
    initials: "PM",
    permissions: ["View", "Edit"],
    menuAccess: [
      "/dashboard", "/search", "/reports", "/underwriting", "/master-setup",
      "/audit-logs", "/service-desk", "/dde",
    ],
  },
  {
    id: "underwriter",
    label: "Underwriter",
    userName: "Naveen Kumar",
    initials: "NK",
    permissions: ["View", "Edit", "Approve", "Reject"],
    menuAccess: [
      "/dashboard", "/search", "/reports", "/underwriting", "/master-setup",
      "/audit-logs", "/service-desk", "/dde", "/loan-360",
    ],
  },
  {
    id: "operations-senior-manager",
    label: "Operations Senior Manager",
    userName: "Anita Desai",
    initials: "AD",
    permissions: ["View", "Edit", "Approve"],
    menuAccess: [
      "/dashboard", "/search", "/reports", "/underwriting", "/lender-management",
      "/loan-360", "/service-desk", "/dde", "/claims", "/finance",
    ],
  },
  {
    id: "risk",
    label: "Risk",
    userName: "Vikram Patel",
    initials: "VP",
    permissions: ["View"],
    menuAccess: [
      "/dashboard", "/search", "/reports", "/underwriting", "/audit-logs",
      "/loan-360",
    ],
  },
];

interface RoleContextValue {
  role: RoleConfig;
  setRole: (role: UserRole) => void;
}

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const savedRole = localStorage.getItem("pas-role") as UserRole | null;
  const [role, setRoleState] = useState<RoleConfig>(
    ROLES.find((r) => r.id === savedRole) || ROLES[2]
  );

  const setRole = (id: UserRole) => {
    const found = ROLES.find((r) => r.id === id);
    if (found) {
      setRoleState(found);
      localStorage.setItem("pas-role", id);
    }
  };

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
}

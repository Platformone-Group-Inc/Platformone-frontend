"use client";

import {
  Chart2,
  Cpu,
  CpuSetting,
  DocumentText,
  ElementPlus,
  Hierarchy2,
  Icon,
  Logout,
  Monitor,
  Ram2,
  Security,
  SecuritySafe,
  Setting,
  Setting4,
  UserSquare,
} from "iconsax-react";

export type SidebarItem = {
  label: string;
  icon: Icon;
  href?: string;
  group?: SidebarItem[];
  badge?: string;
};

export const sidebarData: SidebarItem[] = [
  {
    label: "Dashboard",
    icon: ElementPlus,
    href: "/",
  },
  {
    label: "Work",
    icon: SecuritySafe,
    group: [
      { label: "My Work", icon: UserSquare, href: "/work/my-work" },
      { label: "Team Work", icon: Security, href: "/work/team-work" },
    ],
  },
  {
    label: "System Information",
    icon: Cpu,
    group: [
      { label: "Organization", icon: UserSquare, href: "/system/organization" },
      {
        label: "Security Personnel",
        icon: Security,
        href: "/system/security-personnel",
      },
      { label: "Info System", icon: Security, href: "/system/info-system" },
    ],
  },
  {
    label: "AI Assessment",
    icon: DocumentText,
    href: "/ai-assessment",
    badge: "new",
  },
  {
    label: "AI Reports",
    icon: DocumentText,
    href: "/ai-reports",
    badge: "new",
  },
  { label: "Frameworks", icon: Ram2, href: "/frameworks" },
  {
    label: "Controls",
    icon: Setting4,
    href: "/controls",
    group: [],
  },
  { label: "Technologies", icon: Cpu, href: "/technologies" },
  // {
  //   label: "Risks",
  //   icon: Cpu,
  //   group: [
  //     { label: "Assets", icon: CpuSetting, href: "/risks/assets" },
  //     { label: "Vendors", icon: UserSquare, href: "/risks/vendors" },
  //     { label: "Risk Register", icon: Security, href: "/risks/risk-register" },
  //   ],
  // },
  {
    label: "AI ATO Documents",
    icon: SecuritySafe,
    group: [
      { label: "Policies", icon: CpuSetting, href: "/ai-ato/policies" },
      { label: "Procedures", icon: UserSquare, href: "/ai-ato/procedures" },
      { label: "Governance", icon: Security, href: "/ai-ato/governance" },
      // { label: "SSP", icon: Security, href: "/ai-ato/ssp-builder" },
    ],
  },
  {
    label: "Monitoring",
    icon: Monitor,
    group: [
      { label: "Evidence", icon: CpuSetting, href: "/monitoring/evidence" },
      { label: "Systems", icon: UserSquare, href: "/monitoring/systems" },
      { label: "People", icon: Security, href: "/monitoring/people" },
    ],
  },
  { label: "Integrations", icon: Hierarchy2, href: "/integrations" },
  { label: "Audits", icon: DocumentText, href: "/audits" },
  { label: "AI Report", icon: Chart2, href: "/audits" },
  {
    label: "Security Settings",
    icon: SecuritySafe,
    group: [
      {
        label: "Change Framework",
        icon: CpuSetting,
        href: "/security/change-framework",
      },
      { label: "Users", icon: UserSquare, href: "/security/users" },
      {
        label: "Security Roles",
        icon: Security,
        href: "/security/security-roles",
      },
      {
        label: "Security Groups",
        icon: Security,
        href: "/security/security-groups",
      },
    ],
  },
  { label: "Settings", icon: Setting, href: "/settings" },
  { label: "Log Out", icon: Logout, href: "/logout" },
];

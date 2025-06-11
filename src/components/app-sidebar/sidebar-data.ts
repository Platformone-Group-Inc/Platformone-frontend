import {
  Cpu,
  CpuSetting,
  DocumentText,
  ElementPlus,
  Icon,
  Logout,
  Ram2,
  Security,
  SecuritySafe,
  Setting4,
  UserSquare,
} from "iconsax-react";

export interface SideBarLink {
  label: string;
  href: string;
  icon: Icon;
  subItems?: never;
}

export interface SideBarGroup {
  label: string;
  icon: Icon;
  subItems: SideBarItem[];
  href?: never;
}

export type SideBarItem = SideBarLink | SideBarGroup;

export const SIDEBAR_DATA: SideBarItem[] = [
  {
    label: "Dashboard",
    icon: ElementPlus,
    href: "/",
  },
  {
    label: "Work",
    icon: SecuritySafe,
    subItems: [
      { label: "My Work", icon: UserSquare, href: "/work/my-work" },
      { label: "Team Work", icon: Security, href: "/work/team-work" },
    ],
  },

  {
    label: "System Information",
    icon: Cpu,
    subItems: [
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
    // badge: "new",
  },
  // {
  //   label: "AI Reports",
  //   icon: DocumentText,
  //   href: "/ai-reports",
  //   badge: "new",
  // },
  { label: "Frameworks", icon: Ram2, href: "/frameworks" },
  {
    label: "Controls",
    icon: Setting4,
    href: "/controls",
    // subItems: [],
  },
  { label: "Technologies", icon: Cpu, href: "/technologies" },
  // {
  //   label: "Risks",
  //   icon: Cpu,
  //   subItems: [
  //     { label: "Assets", icon: CpuSetting, href: "/risks/assets" },
  //     { label: "Vendors", icon: UserSquare, href: "/risks/vendors" },
  //     { label: "Risk Register", icon: Security, href: "/risks/risk-register" },
  //   ],
  // },
  {
    label: "AI ATO Documents",
    icon: SecuritySafe,
    subItems: [
      { label: "Policies", icon: CpuSetting, href: "/ai-ato/policies" },
      { label: "Procedures", icon: UserSquare, href: "/ai-ato/procedures" },
      { label: "Governance", icon: Security, href: "/ai-ato/governance" },
      // { label: "SSP", icon: Security, href: "/ai-ato/ssp-builder" },
    ],
  },
  // {
  //   label: "Monitoring",
  //   icon: Monitor,
  //   subItems: [
  //     { label: "Evidence", icon: CpuSetting, href: "/monitoring/evidence" },
  //     { label: "Systems", icon: UserSquare, href: "/monitoring/systems" },
  //     { label: "People", icon: Security, href: "/monitoring/people" },
  //   ],
  // },
  // { label: "Integrations", icon: Hierarchy2, href: "/integrations" },
  // { label: "Audits", icon: DocumentText, href: "/audits" },
  // { label: "AI Report", icon: Chart2, href: "/audits" },
  {
    label: "Security Settings",
    icon: SecuritySafe,
    subItems: [
      // {
      //   label: "Change Framework",
      //   icon: CpuSetting,
      //   href: "/security/change-framework",
      // },
      { label: "Users", icon: UserSquare, href: "/security/users" },
      // {
      //   label: "Security Roles",
      //   icon: Security,
      //   href: "/security/security-roles",
      // },
      {
        label: "Security Groups",
        icon: Security,
        href: "/security/security-groups",
      },
    ],
  },
  // { label: "Settings", icon: Setting, href: "/settings" },
  { label: "Log Out", icon: Logout, href: "/logout" },
  // { icon: Wifi, label: "Network", href: "/network" },
];

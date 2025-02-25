import {
  Building,
  Calendar,
  ChartDonut,
  ChartLine,
  Desk,
  FlyingSaucer,
  Gear,
  GearSix,
  Hand,
  Headphones,
  Headset,
  Info,
  Key,
  MathOperations,
  Money,
  Package,
  Shield,
  ShoppingBag,
  Users,
} from "@phosphor-icons/react";
import { PropAdminNavItems, PropAdminNavModule } from "@vframework/ui";

export const navModules: PropAdminNavModule[] = [
  {
    icon: ShoppingBag,
    label: "v.Store",
    description: "Management your store and ecommerce centrally.",
    color: "grape",
  },
  {
    icon: Building,
    label: "v.Organization",
    description: "Management portal for your organization.",
    color: "brand",
  },
  {
    icon: MathOperations,
    label: "v.Accounting",
    description: "Full fledge accounting software for your Organization.",
    color: "teal",
  },
  {
    icon: Package,
    label: "v.Inventory",
    description: "Manage your inventory & stock centrally.",
    color: "orange",
  },

  {
    icon: Package,
    label: "v.CMS",
    description: "Manage your Sites & Content centrally.",
    color: "orange",
  },
];

export const navItems: PropAdminNavItems[] = [
  {
    label: "Dashboard",
    icon: ChartDonut,
    value: "/dashboard",
  },
  {
    label: "v.Auth",
    icon: Key,
    value: "/organization",
    children: [
      { label: "Users", value: "/vauth/users" },
      { label: "User Groups", value: "/vauth/user-groups" },
      { label: "Dev Mode", value: "/vauth/ev" },
      { label: "Auth Test", value: "/vauth/login" },
    ],
  },
  {
    label: "Organization",
    icon: Building,
    value: "/organization",
    children: [
      { label: "Company Profile", value: "/organization/profile" },
      { label: "Departments", value: "/organization/departments" },
      { label: "Locations", value: "/organization/locations" },
    ],
  },
  {
    label: "People",
    icon: Users,
    value: "/people",
    children: [
      { label: "Employees", value: "/people/employees" },
      { label: "Teams & Groups", value: "/people/teams" },
    ],
  },
  {
    label: "Project",
    icon: Package,
    value: "/projects",
    children: [
      { label: "Projects", value: "/projects/list" },
      { label: "Tasks", value: "/projects/tasks" },
      { label: "Workflows & Automation", value: "/projects/workflows" },
    ],
  },
  {
    label: "Communication",
    icon: Headset,
    value: "/communication",
    children: [
      { label: "Messaging & Chat", value: "/communication/chat" },
      { label: "Announcements & News", value: "/communication/announcements" },
      { label: "Meetings & Calendar", value: "/communication/meetings" },
      {
        label: "Document Sharing & Storage",
        value: "/communication/documents",
      },
    ],
  },
  {
    label: "Finance",
    icon: ChartDonut,
    value: "/finance",
    children: [
      { label: "Budgeting", value: "/finance/budgeting" },
      { label: "Expenses & Reimbursements", value: "/finance/expenses" },
      { label: "Billing & Invoices", value: "/finance/billing" },
      { label: "Financial Reports", value: "/finance/reports" },
    ],
  },
  {
    label: "Performance",
    icon: ChartLine,
    value: "/performance",
    children: [
      { label: "Employee Performance", value: "/performance/employees" },
      { label: "Productivity Metrics", value: "/performance/productivity" },
      { label: "Organization Health Reports", value: "/performance/reports" },
    ],
  },
  {
    label: "Security",
    icon: Shield,
    value: "/security",
    children: [
      { label: "User Access Control", value: "/security/access-control" },
      { label: "Compliance Policies", value: "/security/policies" },
      { label: "Audit Logs", value: "/security/audit-logs" },
    ],
  },
  {
    label: "Settings",
    icon: Gear,
    value: "/settings",
    children: [
      { label: "General Settings", value: "/settings/general" },
      { label: "User Roles & Permissions", value: "/settings/roles" },
      { label: "Subscription & Billing", value: "/settings/billing" },
      { label: "API & Integrations", value: "/settings/api" },
      { label: "System Logs", value: "/settings/logs" },
    ],
  },
  {
    label: "Help",
    icon: Hand,
    value: "/support",
    children: [
      { label: "Documentation", value: "/support/docs" },
      { label: "FAQs", value: "/support/faqs" },
      { label: "Contact Support", value: "/support/contact" },
      { label: "Feedback & Suggestions", value: "/support/feedback" },
    ],
  },
];

export const navItemsVStore = [
  {
    label: "Dashboard",
    icon: ChartDonut,
    value: "/dashboard",
  },
  {
    label: "POS",
    icon: Desk,
    value: "/pos",
  },
  {
    label: "Products",
    icon: Package,
    value: "/products",
    children: [
      { label: "Product Catalog", value: "/support/faqs" },
      { label: "Product Drafts", value: "/support/docs" },
      { label: "Add Product", value: "/support/faqs" },
    ],
  },
  {
    label: "Categorization",
    icon: Package,
    value: "/category",
    children: [
      { label: "Brands", value: "/support/faqs" },
      { label: "Product Type", value: "/support/faqs" },
      { label: "Attributes", value: "/support/faqs" },
      { label: "Filter Groups", value: "/support/docs" },
      { label: "Developer Portal", value: "/support/docs" },
    ],
  },
  {
    label: "Orders",
    icon: ShoppingBag,
    value: "/products",
    children: [
      { label: "Orders", value: "/support/faqs" },
      { label: "New Orders", value: "/support/docs" },
      { label: "Order Tracking", value: "/support/docs" },
      { label: "Add Order", value: "/support/faqs" },
    ],
  },
  {
    label: "Customers",
    icon: Users,
    value: "/customers",
  },
  {
    label: "Marketing",
    icon: FlyingSaucer,
    value: "/products",
  },
  {
    label: "Events",
    icon: Calendar,
    value: "/products",
  },
  {
    label: "Transactions",
    icon: Money,
    value: "/products",
  },
  {
    label: "Configure",
    icon: GearSix,
    value: "/products",
    children: [
      { label: "General Settings", value: "/support/docs" },
      { label: "Organization", value: "/support/faqs" },
      { label: "Checkout Settings", value: "/support/faqs" },
    ],
  },
  {
    label: "About Software",
    icon: Info,
    value: "/about",
  },
];

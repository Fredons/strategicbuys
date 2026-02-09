export const mainNavLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerQuickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerServiceLinks = [
  { label: "Full Service", href: "/services" },
  { label: "Negotiation Only", href: "/services" },
  { label: "Auction Bidding", href: "/services" },
  { label: "Investment Strategy", href: "/services" },
  { label: "NDIS Investing", href: "/services" },
] as const;

export const footerLegalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Disclaimer", href: "/disclaimer" },
] as const;

export const adminNavLinks = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: "LayoutDashboard" as const,
  },
  {
    label: "Blog Posts",
    href: "/admin/blog",
    icon: "FileText" as const,
  },
  {
    label: "Enquiries",
    href: "/admin/enquiries",
    icon: "MessageSquare" as const,
  },
  {
    label: "Subscribers",
    href: "/admin/subscribers",
    icon: "Users" as const,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: "Settings" as const,
  },
] as const;

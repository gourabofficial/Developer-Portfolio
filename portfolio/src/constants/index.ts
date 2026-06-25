import type { NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Experience", path: "/experience" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];

export const AVAILABILITY_LABELS: Record<string, string> = {
  open: "Available for Freelance",
  limited: "Limited Availability",
  closed: "Not Available",
};

export const STATUS_LABELS: Record<string, string> = {
  live: "Live",
  "in-progress": "In Progress",
  archived: "Archived",
};

export const TYPE_LABELS: Record<string, string> = {
  "full-time": "Full-time",
  internship: "Internship",
  freelance: "Freelance",
};

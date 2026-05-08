import { Bell, CircleUserRound, House, ListTodo, Route } from "lucide-react";

export const primaryNavigation = [
  { href: "/dashboard", label: "Dashboard", icon: House },
  { href: "/requests", label: "Requests", icon: ListTodo },
  { href: "/trips", label: "Trips", icon: Route },
  { href: "/profile", label: "Profile", icon: CircleUserRound },
];

export const utilityNavigation = [
  { href: "/notifications", label: "Notifications", icon: Bell },
];

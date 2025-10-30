"use client";
import { usePathname } from "next/navigation";
import HomeNav from "./HomeNav";
import SignInNav from "./SignInNav";
import AdminNav from "./AdminNav";

export default function NavWrapper() {
  const pathname = usePathname();

  if (pathname === "/signin" || pathname === "/signup") {
    return <SignInNav />;
  }

  if (pathname.startsWith("/admin")) {
    return <AdminNav />;
  }

  return <HomeNav />;
}

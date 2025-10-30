"use client"

import { usePathname } from "next/navigation";
import HomeNav from "./HomeNav";
import SignInNav from "./SignInNav";
import AdminNav from "./AdminNav";

export default function NavWrapper() {
    const pathname = usePathname();

    if (pathname === "/signin") return <SignInNav/>
    else if (pathname === "/signup") return <SignInNav/>

    if (pathname === "/admin/dashboard") return <AdminNav/>
    else if (pathname === "/admin/user") return <AdminNav/>

    return <HomeNav/>
}
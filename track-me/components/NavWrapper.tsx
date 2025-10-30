"use client"

import { usePathname } from "next/navigation";
import HomeNav from "./HomeNav";
import SignInNav from "./SignInNav"

export default function NavWrapper() {
    const pathname = usePathname();

    if (pathname === "/signin") return <SignInNav/>
    else if (pathname === "/signup") return <SignInNav/>

    return <HomeNav/>
}
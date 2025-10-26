"use client"

import { usePathname } from "next/navigation";
import LandingNav from "./HomeNav";
import SignUpNav from "./SignUpNav";
import SignInNav from "./SignInNav"

export default function NavWrapper() {
    const pathname = usePathname();

    if (pathname === "/signin") return <SignInNav/>
    else if (pathname === "/signup") return <SignUpNav/>

    return <LandingNav/>
}
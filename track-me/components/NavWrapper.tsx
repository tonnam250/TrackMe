"use client"

import { usePathname } from "next/navigation";
import SignedInNav from "./SignedInNav";
import HomeNav from "./HomeNav";

export default function NavWrapper() {
    const pathname = usePathname();

    if (pathname === "/") return <HomeNav/>;

    return <SignedInNav/>
}
'use client'

import React from "react";
import { useAuthStore } from "@/store/Auth"
import { useRouter } from "next/router";

export default function Layout({children}: {children: React.ReactNode}) {
    const {session} = useAuthStore();
    const router = useRouter();

    React.useEffect(() => {
        if(session){
            router.push('/');
        }
    }, [session, router]);

    if (session) {
        return null
    }

    return (
        <>
        <div className="">{children}</div>
        </>
    )
}
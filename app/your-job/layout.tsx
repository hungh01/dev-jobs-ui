"use client";

import { useContext } from 'react';
import { AuthContext } from '../auth/auth-context';
import { redirect } from 'next/navigation';

export default function YourJobLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const authenticated = useContext(AuthContext);
    if (!authenticated) {
        redirect("/auth/login");
    }
    return (
        <div >
            {children}
        </div>
    );
}
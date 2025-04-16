"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
    const cookieStore = await cookies();
    const res = cookieStore.delete("Authentication");
    if (res) {
        redirect("/login");
    }
}

"use server";


import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { API_URL } from "@/app/common/constants/api";
import { FormResponse } from "@/app/common/interface/form-response.interface";
import { getErrorMessage } from "@/app/common/ultils/errors";
import { jwtDecode } from "jwt-decode";

export default async function login(_prevSate: FormResponse, formData: FormData) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
    });

    const parsedRes = await res.json();

    if (!res.ok) {
        return { error: getErrorMessage(parsedRes) };
    }

    await setAuthCookie(res); // ✅ await vì bên trong có await cookies()
    redirect("/");
}


const setAuthCookie = async (response: Response) => {
    const setCookieHeader = response.headers.get("set-cookie");
    if (!setCookieHeader) return;

    const token = setCookieHeader.split(";")[0].split("=")[1];
    if (!token) return;

    const cookieStore = await cookies(); // ✅ cần await
    cookieStore.set({
        name: "Authentication",
        value: token,
        httpOnly: true,
        secure: true,
        expires: new Date(jwtDecode(token).exp! * 1000), // convert seconds -> ms
    });
};

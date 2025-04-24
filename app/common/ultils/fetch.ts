"use server";
import { API_URL } from "../constants/api";
import { cookies } from "next/headers";
import { getErrorMessage } from "./errors";


export const getHeaders = async () => {
    const cookieStore = await cookies();
    return {
        Cookie: cookieStore.toString(),
    };
};

export const post = async (path: string, data: FormData | object) => {
    const body = data instanceof FormData ? Object.fromEntries(data) : data;

    const headers = await getHeaders();

    const res = await fetch(`${API_URL}/${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: JSON.stringify(body),
    });

    const parsedRes = await res.json();
    if (!res.ok) {
        return { error: getErrorMessage(parsedRes) };
    }
    return { error: "", data: parsedRes };
};

export const get = async <T>(path: string, tags?: string[], params?: URLSearchParams) => {
    const url = params ? `${API_URL}/${path}?${params.toString()}` : `${API_URL}/${path}`;
    const headers = await getHeaders();
    const res = await fetch(url, {
        method: "GET",
        headers,
        next: { tags },
    });
    return res.json() as T;
};


export const getJobs = async <T>(path: string, tags?: string[], jobTitle?: string, location?: string) => {
    const params = new URLSearchParams();


    if (jobTitle) params.append("jobTitle", jobTitle);
    if (location) params.append("location", location);

    const url = params ? `${API_URL}/${path}?${params.toString()}` : `${API_URL}/${path}`;

    const headers = await getHeaders();
    const res = await fetch(url, {
        method: "GET",
        headers,
        next: { tags },
    });
    return res.json() as T;
};
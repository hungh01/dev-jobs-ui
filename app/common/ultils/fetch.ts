"use server";
import { API_URL } from "../constants/api";
import { cookies } from "next/headers";
import { getErrorMessage } from "./errors";
import { revalidateTag } from "next/cache";


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
    if (res.ok) {
        await revalidateTag('your-jobs');
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

export const getYourJobs = async <T>(path: string, tags?: string[], page?: string, limit?: string) => {
    const params = new URLSearchParams();

    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);

    const url = params ? `${API_URL}/${path}?${params.toString()}` : `${API_URL}/${path}`;

    const headers = await getHeaders();
    const res = await fetch(url, {
        method: "GET",
        headers,
        next: { tags },
    });
    return res.json() as T;
};

export const getJobs = async <T>(path: string, tags?: string[], jobTitle?: string, location?: string, page?: string, limit?: string) => {
    const params = new URLSearchParams();

    if (jobTitle) params.append("jobTitle", jobTitle);
    if (location) params.append("location", location);
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);

    const url = params ? `${API_URL}/${path}?${params.toString()}` : `${API_URL}/${path}`;

    const headers = await getHeaders();
    const res = await fetch(url, {
        method: "GET",
        headers,
        next: { tags },
    });
    return res.json() as T;
};

export const removeJob = async (path: string, jobId: string) => {
    const headers = await getHeaders();
    const params = new URLSearchParams();
    params.append("jobId", jobId);

    const url = `${API_URL}/${path}?${params.toString()}`;
    console.log("url", url);
    const res = await fetch(url, {
        method: "DELETE",
        headers,
    });
    console.log("res", res.ok);
    if (res.ok) {
        await revalidateTag('your-jobs');
    }
    return res.json();
}
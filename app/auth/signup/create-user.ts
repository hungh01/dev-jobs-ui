"use server";


import { FormResponse } from "@/app/common/interface/form-response.interface";
import { post } from "@/app/common/ultils/fetch";
import { redirect } from "next/navigation";

export default async function createUser(_prevSate: FormResponse, formData: FormData) {

    const { error } = await post("users/signup", formData);
    if (error) {
        return { error };
    }
    redirect("/auth/login");

}







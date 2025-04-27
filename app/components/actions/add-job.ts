import { post } from "@/app/common/ultils/fetch";
import { JobItem } from "../interface/job";


export default async function addJob(job: JobItem) {
    console.log("job", job);
    const response = await post("job/add-job", job);
    return response;
}
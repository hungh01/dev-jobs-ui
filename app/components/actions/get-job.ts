
import { getYourJobs } from "@/app/common/ultils/fetch";
import { JobValue } from "../interface/job";



export default async function getJob(page?: string, limit?: string) {
    return await getYourJobs<JobValue>("job/get-job", ["your-job"],
        page,
        limit
    );

}
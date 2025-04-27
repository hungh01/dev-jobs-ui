import { getJobs } from "@/app/common/ultils/fetch";
import { JobValue } from "../interface/job";

export default async function searchJobs(jobTitle: string, location: string, page?: string, limit?: string) {
    return await getJobs<JobValue>("search-engine/search", ["jobs"],
        jobTitle.trim().replace(/\s+/g, '-'),
        location.trim().replace(/\s+/g, '-'),
        page,
        limit
    );
}

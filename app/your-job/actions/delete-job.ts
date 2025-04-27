import { removeJob } from "@/app/common/ultils/fetch";

export default async function deleteJob(jobId: string) {
    return await removeJob("job/delete-job", jobId);
}
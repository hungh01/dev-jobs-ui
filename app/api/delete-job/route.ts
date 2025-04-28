

// app/api/delete-job/route.ts
import { NextRequest, NextResponse } from "next/server";
import { removeJob } from "@/app/common/ultils/fetch";
import { revalidateTag } from "next/cache";

export async function DELETE(req: NextRequest) {
    const { jobId } = await req.json();

    const res = await removeJob("job/delete-job", jobId);
    if (res) {
        await revalidateTag('your-jobs');
    }
    return NextResponse.json({ success: true, data: res });
}

"use client";

import { useEffect, useState } from "react";
import getJob from "../components/actions/get-job";

import { JobValue, } from "../providers";
import JobsResult from "./components/jobs-result";



export default function YourJob() {
    const [jobs, setJobs] = useState<JobValue | null>(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchJob = async () => {
            try {
                setLoading(true);
                const yourJob = await getJob();
                console.log("yourJob", yourJob);
                setJobs(yourJob);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, []);

    return (
        <JobsResult
            jobs={jobs as JobValue}
            onPageChange={async (newPage) => {
                if (jobs) {
                    try {
                        setLoading(true);
                        const response = await getJob(
                            newPage.toString(),
                            jobs.pageSize.toString()
                        );
                        setJobs(response);
                    } catch (error) {
                        console.error(error);
                    } finally {
                        setLoading(false);
                    }
                } else {
                    throw new Error("Jobs data is not available");
                }
            }}
            loading={loading}
            setJobs={setJobs}
        />
    );
}
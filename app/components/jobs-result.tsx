import { Grid } from "@mui/material";
import { JobValue } from "./interface/job";
import Job from "./job";

interface JobsResultProps {
    jobs: JobValue[]; // Định nghĩa kiểu của props là một mảng JobValue
}

export default function JobsResult({ jobs }: JobsResultProps) {
    if (!Array.isArray(jobs)) {
        return <div>No jobs available</div>;
    }

    return (

        <Grid container spacing={3}>
            {jobs.map((job) => (
                <Grid key={job.id} size={{ xs: 12, lg: 12, sm: 12 }}>
                    < Job {...job} />
                </Grid>
            ))}
        </Grid>
    );
}

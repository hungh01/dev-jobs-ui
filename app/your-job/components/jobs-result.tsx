import { Box, Grid, Pagination } from "@mui/material";
import Job from "./job";

import Circular from "@/app/components/circular";
import { JobItem } from "@/app/components/interface/job";

interface JobsResultProps {
    jobs: {
        keyword?: string;
        location?: string;
        totalItems: number;
        totalPages: number;
        currentPage: number;
        pageSize: number;
        items: JobItem[];
    };
    onPageChange?: (page: number) => void;
    loading: boolean;
}

export default function JobsResult({ jobs, onPageChange, loading }: JobsResultProps) {



    if (!jobs) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                minHeight="100vh" // Hoặc 100vh nếu muốn căn giữa toàn trang
            >
                Bạn đang không lưu trữ việc làm nào.
            </Box>
        );
    }

    const { items, totalPages, currentPage } = jobs;

    if (loading) {
        return <Circular />;
    }

    const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
        onPageChange?.(value);
    };

    return (
        <>
            <Grid container spacing={3}>
                {items.map((job) => (
                    <Job key={job.id} {...job} />
                ))}
            </Grid>

            <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handleChange}
                    color="primary"
                />
            </Box>
        </>
    );
}

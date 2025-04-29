import { Box, Grid, Pagination } from "@mui/material";

import Job from "./job";
import { JobItem } from "./interface/job";
import { useContext, useState } from "react";
import { ThemeModeContext } from "../providers";
import Circular from "./circular";
import AlertBox from "./alert";

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

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');

    const handleAlert = (msg: string, sev: 'success' | 'error' | 'warning' | 'info') => {
        setMessage(msg);
        setSeverity(sev);
        setOpen(true);
    };

    if (!jobs) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                minHeight="100vh" // Hoặc 100vh nếu muốn căn giữa toàn trang
            >
                Tìm việc làm của bạn.
            </Box>
        );
    }

    const { items, totalPages, currentPage } = jobs;

    if (!Array.isArray(items) || items.length === 0) {
        return <div>No jobs available</div>;
    }

    if (loading) {
        return <Circular />;
    }

    const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
        onPageChange?.(value);
    };

    return (
        <>
            <AlertBox setOpen={setOpen} open={open} severity={severity} message={message} />
            <Grid container spacing={3}>
                {items.map((job) => (
                    <Job key={job.id} job={job} onAlert={handleAlert} />
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

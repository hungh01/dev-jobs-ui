import { Box, Card, CardActionArea, Chip, Stack, Typography } from "@mui/material";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useState } from "react";

import CompanyLogo from "@/app/components/company-logo";
import { JobItem, JobValue } from "@/app/components/interface/job";


type JobProps = {
    job: JobItem;
    setJobs: React.Dispatch<React.SetStateAction<JobValue | null>>;
    onAlert: (message: string, severity: 'success' | 'error' | 'warning' | 'info') => void;
};

export default function Job({ job, setJobs, onAlert }: JobProps) {
    const [isLoading, setLoading] = useState(false);


    const handleClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();

        setLoading(true);
        try {
            const res = await fetch('/api/delete-job', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ jobId: job.id }),
            });
            await res.json();

            if (res.ok) {
                setJobs((prevJobs) => {
                    if (!prevJobs) return null;
                    const updatedItems = prevJobs.items.filter((item) => item.id !== job.id);
                    return {
                        ...prevJobs,
                        items: updatedItems,
                        totalItems: prevJobs.totalItems - 1,
                        totalPages: Math.ceil((prevJobs.totalItems - 1) / prevJobs.pageSize),
                    };
                });
                onAlert('Xóa thành công!', 'success');
            } else {
                onAlert('Xóa thất bại!', 'error');
            }
        } catch (e) {
            console.error(e);
            onAlert('Có lỗi xảy ra!', 'error');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card sx={{ position: "relative", p: 2, width: '100%' }}>
            <CardActionArea
                component="a"
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={2}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={2}>
                        {/* Left content */}
                        <Box display="flex" gap={2}>
                            {/* Logo nếu có */}
                            {job.img && (
                                <CompanyLogo
                                    src={job.img}
                                    alt={job.companyName}
                                />
                            )}
                            <Box>
                                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                                    <Chip label="Mới" size="small" color="primary" />
                                    <Typography variant="h6">{job.title}</Typography>
                                </Stack>
                                <Typography color="error.main">{job.companyName}</Typography>
                                <Typography color="error.main">{job.salary} | {job.city}</Typography>
                                <Typography variant="body2" color="text.secondary">Hôm nay</Typography>
                            </Box>
                        </Box>


                    </Box>
                </Box>
            </CardActionArea>
            {/* Nút Xoá */}
            <Box position="absolute" bottom={8} right={8} zIndex={2}>
                <Chip
                    icon={<DeleteForeverIcon />}
                    label={isLoading ? "Delete..." : "Delete"}
                    onClick={handleClick}
                    disabled={isLoading}
                    sx={{ backgroundColor: 'transparent', cursor: "pointer" }}
                />
            </Box>
        </Card>
    );
}

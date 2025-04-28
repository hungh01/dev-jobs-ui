import { Box, Card, Chip, Stack, Typography } from "@mui/material";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useEffect, useState } from "react";

import CompanyLogo from "@/app/components/company-logo";
import { JobItem, JobValue } from "@/app/components/interface/job";
import AlertBox from "./alert";

type JobProps = {
    job: JobItem;
    setJobs: React.Dispatch<React.SetStateAction<JobValue | null>>;
};

export default function Job({ job, setJobs }: JobProps) {
    const [isLoading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');


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
                setMessage('Xóa thành công!');
                setSeverity('success');
            } else {
                setMessage('Xóa thất bại!');
                setSeverity('error');
            }
        } catch (error) {
            setMessage('Có lỗi xảy ra!');
            setSeverity('error');
        } finally {
            setLoading(false);
            setOpen(true);
        }
    }
    useEffect(() => {
        console.log("Open state changed to:", open);
    }, [open]);  // Lắng nghe thay đổi của open

    return (
        <>
            <AlertBox setOpen={setOpen} open={open} severity={severity} message={message} />
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={2}
            >
                <Card className="p-4" sx={{ position: "relative" }}>
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

                        {/* Nút Xoá */}
                        <Box position="absolute" top={8} right={8}>
                            <Chip
                                icon={<DeleteForeverIcon />}
                                label={isLoading ? "Delete..." : "Delete"}
                                onClick={handleClick}
                                disabled={isLoading}
                                sx={{ backgroundColor: 'transparent', cursor: "pointer" }}
                            />
                        </Box>
                    </Box>
                </Card>
            </Box>
        </>
    );
}

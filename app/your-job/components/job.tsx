import { Box, Card, CardActionArea, Chip, Stack, Typography } from "@mui/material";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useState } from "react";
import { JobItem } from "@/app/providers";
import CompanyLogo from "@/app/components/company-logo";
import deleteJob from "../actions/delete-job";

export default function Job(job: JobItem) {
    const [isLoading, setLoading] = useState(false);

    const handleClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation(); // Ngăn click lan lên CardActionArea
        e.preventDefault(); // Ngăn nó href tới trang mới (nếu cần)

        setLoading(true);
        try {
            const response = await deleteJob(job.id.toString());
            if (response) {
                if (response.ok) {
                    alert("Job added successfully!");
                } else {
                    alert("Failed to add job");
                }
            } else {
                alert("Failed to delete job");
            }
        }
        catch (error) {
            alert("Failed to delete job");
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <CardActionArea
            component="a"
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
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
                            sx={{ backgroundColor: 'transparent', cursor: "pointer" }}
                        />
                    </Box>
                </Box>
            </Card>
        </CardActionArea>
    );
}

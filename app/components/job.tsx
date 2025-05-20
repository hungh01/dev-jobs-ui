import { Box, Card, CardActionArea, Chip, Stack, Typography } from "@mui/material";
import { JobItem } from "./interface/job";
import CompanyLogo from "./company-logo";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import addJob from "./actions/add-job";
import { useState } from "react";


type JobProps = {
    job: JobItem;
    onAlert: (message: string, severity: 'success' | 'error' | 'warning' | 'info') => void;
};


export default function Job({ job, onAlert }: JobProps) {
    const [isLoading, setLoading] = useState(false);



    const handleClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation(); // Ngăn click lan lên CardActionArea
        e.preventDefault(); // Ngăn nó href tới trang mới (nếu cần)

        setLoading(true);
        try {
            const response = await addJob(job);
            if (response) {
                if (response.data) {
                    onAlert('Xóa thành công!', 'success');
                } else {
                    alert("Failed to add job");
                }
            } else {
                onAlert('Xóa thất bại!', 'error');
            }
        }
        catch (error) {
            console.error(error);
            onAlert('Có lỗi xảy ra!', 'error');
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

                    {/* Nút add favorite */}
                    <Box position="absolute" top={8} right={8}>
                        <Chip
                            icon={<FavoriteBorderIcon />}
                            label={isLoading ? "Adding..." : "Add to favorites"}
                            onClick={handleClick}
                            sx={{ backgroundColor: 'transparent', cursor: "pointer" }}
                        />
                    </Box>
                </Box>
            </Card>
        </CardActionArea>
    );
}

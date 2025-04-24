import { Avatar, Box, Card, CardActionArea, Chip, Stack, Typography } from "@mui/material";
import { JobValue } from "./interface/job";



export default function Job(job: JobValue) {
    return (
        <CardActionArea
            component="a"
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
        >
            <Card className="p-4">
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={2}>
                    {/* Left content */}
                    <Box display="flex" gap={2}>
                        {/* Logo nếu có */}
                        {job.img && (
                            <Avatar
                                src={job.img}
                                variant="square"
                                sx={{ width: 48, height: 48 }}
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
            </Card>
        </CardActionArea>
    );
}
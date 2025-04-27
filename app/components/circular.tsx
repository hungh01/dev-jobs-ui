import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function Circular() {
    return (
        <Box
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <CircularProgress size={60} thickness={5} />
            <Typography variant="h5" mt={3} color="text.primary" fontWeight={600}>
                Vui lòng đợi...
            </Typography>
            <Typography variant="body2" mt={1} color="text.secondary" textAlign="center" maxWidth={300}>
                Việc tìm kiếm có thể mất vài phút vì hệ thống đang tìm kiếm việc làm từ nhiều nguồn khác nhau.
            </Typography>
        </Box>
    );
}
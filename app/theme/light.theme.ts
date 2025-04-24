import { createTheme } from "@mui/material";
import { green, purple } from '@mui/material/colors';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
    },
});

export default lightTheme;

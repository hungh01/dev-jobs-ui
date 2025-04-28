import { Alert, Snackbar } from "@mui/material";
import { useEffect } from "react";

type AlertBoxProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
    severity: 'success' | 'error' | 'warning' | 'info';
    message: string;
};

export default function AlertBox({ setOpen, open, severity, message }: AlertBoxProps) {

    const handleClose = () => {
        setTimeout(() => setOpen(false), 3000);
    };

    console.log("AlertBox rendered with severity:", severity, "and message:", message, "open:", open);

    return (
        <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}

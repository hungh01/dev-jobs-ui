"use client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ReactNode, useState, createContext } from "react";
import { AuthContext } from "./auth/auth-context";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import lightTheme from "./theme/light.theme";
import darkTheme from "./theme/dark.theme";

interface ProvidersProps {
    children: ReactNode;
    authenticated: boolean;
}

interface JobValue {
    title: string;
    companyName?: string;
    city?: string;
    salary?: string;
    exp?: string;
    url?: string;
}

interface ThemeModeContextType {
    mode: "light" | "dark";
    toggleTheme: () => void;
    jobs: JobValue[];
    setJobs: React.Dispatch<React.SetStateAction<JobValue[]>>;
}

export const ThemeModeContext = createContext<ThemeModeContextType>({
    mode: "light",
    toggleTheme: () => { },
    jobs: [],
    setJobs: () => { },
});

export default function Providers({ children, authenticated }: ProvidersProps) {
    const [mode, setMode] = useState<"light" | "dark">("light");
    const [jobs, setJobs] = useState<JobValue[]>([]);

    const toggleTheme = () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
    };

    const theme = mode === "light" ? lightTheme : darkTheme;

    return (
        <AppRouterCacheProvider>
            <ThemeModeContext.Provider value={{ toggleTheme, mode, jobs, setJobs }}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <AuthContext.Provider value={authenticated}>
                        {children}
                    </AuthContext.Provider>
                </ThemeProvider>
            </ThemeModeContext.Provider>
        </AppRouterCacheProvider>
    );
}

"use client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ReactNode, useState, createContext } from "react";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import lightTheme from "./theme/light.theme";
import darkTheme from "./theme/dark.theme";
import { AuthContext } from "./auth/auth-context";

interface ProvidersProps {
    children: ReactNode;
    authenticated: boolean;
}

export type JobItem = {
    id: number;
    img: string;
    title: string;
    companyName: string;
    city: string;
    salary: string;
    exp: string;
    url: string;
};

export type JobValue = {
    keyword?: string;
    location?: string;
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    items: JobItem[];
};

interface ThemeModeContextType {
    mode: "light" | "dark";
    toggleTheme: () => void;
    jobs: JobValue | undefined;
    setJobs: React.Dispatch<React.SetStateAction<JobValue | undefined>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ThemeModeContext = createContext<ThemeModeContextType>({
    mode: "light",
    toggleTheme: () => { },
    jobs: {
        keyword: "",
        location: "",
        totalItems: 0,
        totalPages: 0,
        currentPage: 0,
        pageSize: 0,
        items: [],
    },
    setJobs: () => { },
    loading: false,
    setLoading: () => { },
});

export default function Providers({ children, authenticated }: ProvidersProps) {
    const [mode, setMode] = useState<"light" | "dark">("light");
    const [jobs, setJobs] = useState<JobValue>();
    const [loading, setLoading] = useState(false);

    const toggleTheme = () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
    };

    const theme = mode === "light" ? lightTheme : darkTheme;



    return (
        <AppRouterCacheProvider>
            <ThemeModeContext.Provider value={{ toggleTheme, mode, jobs, setJobs, loading, setLoading }}>
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

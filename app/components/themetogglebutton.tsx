"use client";
import { useContext } from "react";
import { IconButton } from "@mui/material";
import { ThemeModeContext } from "../providers";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function ThemeToggleButton() {
    const { toggleTheme, mode } = useContext(ThemeModeContext);

    return (
        <IconButton onClick={toggleTheme} color="inherit">
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
    );
}

"use client";

import {
    Box,
    Button,
    Divider,
    TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PlaceIcon from "@mui/icons-material/Place";
import { useContext } from "react";
import { ThemeModeContext } from "../providers";
import searchJobs from "./actions/search-jobs";

export default function SearchBar() {
    const { jobs, setJobs } = useContext(ThemeModeContext);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const jobTitle = formData.get("jobTitle") as string;
        const location = formData.get("location") as string;

        const response = await searchJobs(jobTitle, location); // Gọi API
        setJobs(response); // Set lại state
    };

    return (
        <form onSubmit={handleSubmit} >
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                py={4}
                px={2}
            >
                <Box
                    display="flex"
                    flexDirection={{ xs: "column", sm: "row" }} // responsive direction
                    borderRadius={3}
                    boxShadow={3}
                    overflow="hidden"
                    width="100%"
                    maxWidth={900}
                    gap={{ xs: 2, sm: 0 }}
                    p={{ xs: 2, sm: 0 }}
                >
                    {/* Search input */}
                    <Box
                        display="flex"
                        alignItems="center"
                        px={3}
                        flex={1}
                        height={60}
                        width={{ xs: "100%", sm: "auto" }}
                    >
                        <SearchIcon sx={{ mr: 1, color: "gray" }} />
                        <TextField
                            name="jobTitle"
                            fullWidth
                            placeholder="Job title, keywords, or company"
                            variant="standard"
                            InputProps={{ disableUnderline: true }}
                        />
                    </Box>

                    {/* Divider chỉ hiển thị khi ở màn hình lớn */}
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ display: { xs: "none", sm: "block" } }}
                    />

                    {/* Location input */}
                    <Box
                        display="flex"
                        alignItems="center"
                        px={2}
                        flex={1}
                        height={60}
                        width={{ xs: "100%", sm: "auto" }}
                    >
                        <PlaceIcon sx={{ mr: 1, color: "gray" }} />
                        <TextField
                            name="location"
                            fullWidth
                            placeholder="Location"
                            variant="standard"
                            InputProps={{ disableUnderline: true }}
                        />
                    </Box>

                    {/* Button */}
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent={{ xs: "center", sm: "flex-start" }}
                        px={2}
                        pt={{ xs: 1, sm: 0 }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: "bold",
                                px: 3,
                                minWidth: 120,
                                bgcolor: "#1E429F",
                                ":hover": {
                                    bgcolor: "#163b8c",
                                },
                            }}
                            type="submit"
                        >
                            Find jobs
                        </Button>
                    </Box>
                </Box>
            </Box>
        </form>
    );
}

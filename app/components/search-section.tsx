"use client";

import {
    Box,
    Button,
    Chip,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useState } from "react";
import { ThemeModeContext } from "../providers";
import searchJobs from "./actions/search-jobs";
import { provinces } from "../common/constants/provinces";



export default function SearchBar() {
    const { setJobs, setLoading } = useContext(ThemeModeContext);
    const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData(e.currentTarget);
            const jobTitle = formData.get("jobTitle") as string;
            const location = selectedProvinces.join('-');
            const response = await searchJobs(jobTitle, location);
            setJobs(response);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box display="flex" justifyContent="center" alignItems="center" py={4} px={2}>
                <Box
                    display="flex"
                    flexDirection={{ xs: "column", sm: "row" }}
                    borderRadius={3}
                    boxShadow={3}
                    overflow="hidden"
                    width="100%"
                    maxWidth={900}
                    gap={{ xs: 2, sm: 0 }}
                    p={{ xs: 2, sm: 0 }}
                >
                    {/* Job Title */}
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

                    {/* Divider */}
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ display: { xs: "none", sm: "block" } }}
                    />

                    {/* Location checkboxes */}
                    <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                        <InputLabel id="province-select-label">Tỉnh thành</InputLabel>
                        <Select
                            labelId="province-select-label"
                            multiple
                            value={selectedProvinces}
                            onChange={(e) => setSelectedProvinces(e.target.value as string[])}
                            input={<OutlinedInput label="Tỉnh thành" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {(selected as string[]).map((value) => {
                                        const name = provinces.find(p => p.key === value)?.name;
                                        return <Chip key={value} label={name} />;
                                    })}
                                </Box>
                            )}
                        >
                            {provinces.map((province) => (
                                <MenuItem key={province.key} value={province.key}>
                                    {province.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>


                    {/* Submit Button */}
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

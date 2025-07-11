"use client";

import { Button, Link, Stack, TextField } from "@mui/material";

import NextLink from "next/link";
import createUser from "./create-user";
import { useActionState } from "react";



export default function Signup() {

    const [state, formActions] = useActionState(createUser, { error: "" });
    return (
        <form action={formActions} className="w-full max-w-sm">
            <Stack spacing={2}>
                <TextField name="email" label="Email" variant="outlined" type="email" helperText={state.error} error={!!state.error} />
                <TextField name="password" label="Password" variant="outlined" type="password" helperText={state.error} error={!!state.error} />
                <TextField label="Confirm Password" variant="outlined" type="password" helperText={state.error} error={!!state.error} />
                <Button type="submit" variant="contained" > Sign Up</Button>
                <Link component={NextLink} href="/auth/login" underline="none" className="self-center">
                    Log In
                </Link>
            </Stack>
        </form>
    );
}


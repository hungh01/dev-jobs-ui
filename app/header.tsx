"use client";

import { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import NextLink from 'next/link';
import { routes, unauthorizedRoutes } from './common/constants/routes';
import Link from 'next/link';
import { logout } from './auth/logout';
import { AuthContext } from './auth/auth-context';
import { Code } from '@mui/icons-material';
import ThemeToggleButton from './components/themetogglebutton';


export default function Header() {
    const isAuthenticated = useContext(AuthContext);

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const pages = isAuthenticated ? routes : unauthorizedRoutes;

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Code sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Link href="/" passHref >
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            DevJobs
                        </Typography>
                    </Link>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.title} onClick={handleCloseNavMenu}>

                                    <Typography sx={{ textAlign: 'center' }} component={NextLink} href={page.path} >
                                        {page.title}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Code sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

                    <Typography
                        variant="h5"
                        noWrap
                        component={NextLink}
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            textDecoration: 'none',
                        }}
                    >
                        DevJobs
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} className={`gap-4`}>
                        {pages.map((page) => (
                            <Link href={page.path} passHref key={page.title}>
                                <Typography sx={{ my: 2, color: 'white', display: 'block' }} onClick={handleCloseNavMenu}>
                                    {page.title}
                                </Typography>
                            </Link>
                        ))}
                    </Box>
                    {isAuthenticated && <Settings />}
                    {!isAuthenticated && <LoginButton />}
                    <ThemeToggleButton />
                </Toolbar>
            </Container>
        </AppBar>
    );
}

const Settings = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="https://avatars.githubusercontent.com/u/86761404?s=400&u=4aa044822e0d4ae0ae2327fb35c986b95c0ed790&v=4" />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem key="Logout" onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: 'center' }}
                        onClick={() => {
                            logout(); // Gọi server action
                        }}>Logout</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
}

const LoginButton = () => {
    return (
        <Link href="/auth/login" passHref>
            <Button variant="contained" sx={{ my: 2, color: 'white', display: 'block' }}>
                Login
            </Button>
        </Link>
    );
}
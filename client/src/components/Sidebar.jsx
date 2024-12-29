import React from 'react';
import { Box, Typography, List, ListItem, ListItemButton, ListItemText, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router';

const SideBar = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(`/dashboard/${path}`);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/auth/login');
    };

    return (
        <Box
            sx={{
                width: 350,
                bgcolor: 'primary.main',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
            }}
        >
            <Typography
                variant="h5"
                component="div"
                sx={{
                    textAlign: 'center',
                    py: 2,
                    fontWeight: 'bold',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                }}
            >
                Dashboard
            </Typography>
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigation('teachers')}>
                        <ListItemText primary="Teachers" />
                    </ListItemButton>
                </ListItem>
                <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.3)' }} />
                <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigation('pupils')}>
                        <ListItemText primary="Pupils" />
                    </ListItemButton>
                </ListItem>
                <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.3)' }} />
                <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigation('subjects')}>
                        <ListItemText primary="Subjects" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Box sx={{ mt: 'auto', p: 2 }}>
                <Button
                    variant="outlined"
                    color="inherit"
                    fullWidth
                    onClick={handleLogout}
                    sx={{ borderColor: 'rgba(255, 255, 255, 0.7)', color: 'white', '&:hover': { borderColor: 'white' } }}
                >
                    Log Out
                </Button>
            </Box>
        </Box>
    );
};

export default SideBar;

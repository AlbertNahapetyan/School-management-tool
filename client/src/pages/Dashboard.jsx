import React from 'react';
import { Box, Typography } from '@mui/material';
import { Routes, Route } from 'react-router';
import Sidebar from '../components/Sidebar';
import TeachersPage from "./Teachers";
import PupilsPage from "./Pupils";
import SubjectsPage from "./Subjects";
import { useLocation } from "react-router";

const Dashboard = () => {
    const location = useLocation();

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: '350px 1fr',
                height: '100vh',
                overflow: 'hidden',
            }}
        >
            <Sidebar />

            <Box
                sx={{
                    overflowY: 'auto',
                    padding: 3,
                }}
            >
                {location.pathname === '/dashboard' ? (
                    <Box
                        sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="h4" color="primary">
                            Welcome to the Dashboard Page
                        </Typography>
                    </Box>
                ) : (
                    <Routes>
                        <Route path="teachers" element={<TeachersPage />} />
                        <Route path="pupils" element={<PupilsPage />} />
                        <Route path="subjects" element={<SubjectsPage />} />
                    </Routes>
                )}
            </Box>
        </Box>
    );
};

export default Dashboard;

import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router';

const NotFound = () => {
    return (
        <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h1" component="h1" color="primary" sx={{ fontSize: '10rem', fontWeight: 'bold' }}>
                    404
                </Typography>

                <Typography variant="h5" component="h2" color="text.secondary">
                    Oops! The page you are looking for does not exist.
                </Typography>

                <Button
                    component={Link}
                    to="/auth/login"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3 }}
                >
                    Go to Home
                </Button>
            </Box>
        </Container>
    );
};

export default NotFound;

import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container, Link } from '@mui/material';
import { useNavigate } from 'react-router';
import client from "../../apollo";
import { createUserMutation } from "../../apollo/mutations/auth";

const Register = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        const { username, password, secretKey } = e.target

        if (!username.value || !password.value) {
            setError('Please fill in all required fields.');
            return;
        }

        try {
            setLoading(true);
            setError('');

            const { data } = await client.mutate({
                mutation: createUserMutation,
                variables: {
                    input: {
                        username: username.value,
                        password: password.value,
                    },
                    secretKey: secretKey.value || null,
                },
            });

            if (data?.createUser) {
                navigate('/auth/login');
            }
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <Box sx={{ textAlign: 'center' }}>
                <Typography
                    variant="h4"
                    component="h1"
                    color="primary"
                    sx={{ fontWeight: 'bold' }}
                >
                    Create an Account
                </Typography>

                {error && (
                    <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}

                <form onSubmit={handleRegister}>
                    <Box sx={{ mt: 3 }}>
                        <TextField
                            name="username"
                            label="Username"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            name="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            name="secretKey"
                            label="Secret Key (optional)"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={loading}
                            sx={{ mt: 2 }}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </Button>
                    </Box>
                </form>

                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        Already have an account?{' '}
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => navigate('/auth/login')}
                        >
                            Login
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;

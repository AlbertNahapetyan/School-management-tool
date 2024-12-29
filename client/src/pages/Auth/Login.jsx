import { useState } from 'react';
import { Box, Typography, TextField, Button, Container, Link } from '@mui/material';
import { useNavigate } from 'react-router';
import { loginMutation } from "../../apollo/mutations/auth";
import client from "../../apollo";

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const { username, password } = e.target;

        if (!username.value || !password.value) {
            return setError('Please fill in both fields.');
        }

        try {
            setError('');
            setLoading(true);

            const { data } = await client.mutate({
                mutation: loginMutation,
                variables: { username: username.value, password: password.value },
            });

            const token = data?.login?.token;

            if (token) {
                localStorage.setItem('authToken', token);
                navigate('/dashboard');
            } else {
                setError('Invalid login credentials.');
            }
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" component="h1" color="primary" sx={{ fontWeight: 'bold' }}>
                    Welcome Back
                </Typography>

                {error && (
                    <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}

                <form onSubmit={handleLogin}>
                    <Box sx={{ mt: 3 }}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            name="username"
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            name="password"
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
                            {loading ? 'Logging In...' : 'Log In'}
                        </Button>
                    </Box>
                </form>

                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        Don't have an account? {' '}
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => navigate('/auth/register')}
                        >
                            Register
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;

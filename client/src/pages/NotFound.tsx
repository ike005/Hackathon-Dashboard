// src/pages/NotFound.tsx
import { Box, Button, Typography, Stack } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { SearchX } from 'lucide-react';

export default function NotFound() {
    const theme = useTheme();
    const navigate = useNavigate();

    const primary = theme.palette.primary.main;
    const secondary =
        (theme.palette.secondary && theme.palette.secondary.main) ||
        theme.palette.primary.light;

    const ring = `0 10px 30px ${alpha(theme.palette.common.black, theme.palette.mode === 'dark' ? 0.5 : 0.08)}`;

    return (
        <Box
            sx={{
                minHeight: '100dvh',
                bgcolor: 'background.default',
                color: 'text.primary',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: { xs: 2, sm: 4 },
                py: { xs: 6, sm: 8 },
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 840,
                    textAlign: 'center',
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    boxShadow: ring,
                    p: { xs: 4, sm: 6 },
                    border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
                }}
            >
                <Box
                    aria-hidden
                    sx={{
                        mx: 'auto',
                        width: 140,
                        height: 140,
                        borderRadius: '50%',
                        display: 'grid',
                        placeItems: 'center',
                        mb: 3,
                        background: `linear-gradient(135deg, ${alpha(primary, 0.18)}, ${alpha(secondary, 0.18)})`,
                        border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
                        boxShadow: `inset 0 1px 0 ${alpha(theme.palette.common.white, theme.palette.mode === 'dark' ? 0.06 : 0.7)}`,
                    }}
                >
                    <SearchX
                        aria-label="Not found"
                        size={44}
                        color={primary}
                        style={{ opacity: 0.9 }}
                    />
                </Box>

                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { xs: 56, sm: 84 },
                        fontWeight: 800,
                        lineHeight: 1,
                        mb: 1.5,
                        letterSpacing: '-0.02em',
                        background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                    }}
                >
                    404
                </Typography>

                <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, mb: 1.5 }}
                >
                    Page not found
                </Typography>

                <Typography
                    variant="body1"
                    sx={{ color: 'text.secondary', mb: 4, maxWidth: 560, mx: 'auto' }}
                >
                    The page you’re looking for doesn’t exist or may have been moved.
                </Typography>

                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    justifyContent="center"
                >
                    <Button
                        component={RouterLink}
                        to="/"
                        variant="contained"
                        color="primary"
                        size="large"
                    >
                        Go to Home
                    </Button>

                    <Button
                        variant="outlined"
                        color="inherit"
                        size="large"
                        onClick={() => navigate(-1)}
                    >
                        Go Back
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                textAlign: 'center',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark'
                        ? theme.palette.grey[800]
                        : theme.palette.grey[200],
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="body1">This is my first React application!</Typography>
                <Typography variant="body2" color="text.secondary">
                    {'Copyright © '}
                    <Link target="_blank" rel="noopener" color="inherit" href="https://www.linkedin.com/in/d-nevolin/">
                        Dmitriy Nevolin
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
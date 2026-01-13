import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from "./components/Footer";
import Header from "./components/Header";
import Center from "./components/Center";

const App = () => {
    return (
        <>
            <CssBaseline />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh'
            }}>
                <Header />
                <Center />
                <Footer />
            </Box>
        </>
    );
};

export default App;
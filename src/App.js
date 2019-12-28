import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Footer from "./components/Footer"
import Header from "./components/Header"
import Center from "./components/Center"
import CssBaseline from "@material-ui/core/CssBaseline";
// import { BrowserRouter, Route, Switch } from 'react-router-dom';

const styles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    }
});

const App = () => {
    return (
        // <BrowserRouter>
        <>
            <CssBaseline/>
            <div className={styles().root}>
                <Header/>
                <Center/>
                <Footer/>
            </div>
        </>
        // </BrowserRouter>
    );
};

export default App;
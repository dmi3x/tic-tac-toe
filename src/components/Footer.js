import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        textAlign: 'center',
        backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
    }
}));

const Footer = () => {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <Container maxWidth="sm">
                <Typography variant="body1">This is my first React application!</Typography>
                <Typography variant="body2" color="textSecondary">
                    {'Copyright © '}
                    <Link target="_blank" rel="noopener" color="inherit" href="https://www.linkedin.com/in/d-nevolin/">
                        Dmitriy Nevolin
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>
        </footer>
    )
};

export default Footer
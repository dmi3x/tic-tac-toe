import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const buttonStyles = {
    width: 100,
    height: 100,
    fontWeight: 'bold',
    lineHeight: 0,
    fontSize: '200%',
    borderColor: 'grey.300',
    '&:hover': {
        borderColor: 'grey.300'
    }
};

const SinglePlayerDialog = (props) => {
    const { selectPlayer } = props;
    return (
        <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                Select Player
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" component="div">
                <Grid container spacing={2} justifyContent="center" direction="column">
                    <Grid item>
                        <Button variant="outlined" color="primary" sx={buttonStyles}
                                onClick={() => selectPlayer('X')}>X</Button>
                        <Button variant="outlined" color="secondary" sx={buttonStyles}
                                onClick={() => selectPlayer('O')}>O</Button>
                    </Grid>
                </Grid>
            </Typography>
        </Container>
    );
};

export default SinglePlayerDialog;
import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
    button: {
        width: 100,
        height: 100,
        fontWeight: 'bold',
        lineHeight: 0,
        fontSize: '200%',
        borderColor: theme.palette.grey[300],
        "&:hover": {
            borderColor: theme.palette.grey[300]
        }
    }
}));

const SinglePlayerDialog = (props) => {
    const {selectPlayer} = props;
    const className = styles().button;
    return (
        <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Select Player
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary">
                <Grid container spacing={2} justify="center" direction="column">
                    <Grid item>
                        <Button variant="outlined" color="primary" className={className}
                                onClick={() => selectPlayer('X')}>X</Button>
                        <Button variant="outlined" color="secondary" className={className}
                                onClick={() => selectPlayer('O')}>O</Button>
                    </Grid>
                </Grid>
            </Typography>
        </Container>
    )
};

export default SinglePlayerDialog;
import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Fab from '@material-ui/core/Fab';
import ComputerIcon from "@material-ui/icons/Computer";
import PeopleIcon from "@material-ui/icons/People";
import WifiIcon from "@material-ui/icons/Wifi";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import * as actions from "../../actions/start";

const styles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    }
}));

const Start = (props) => {
    const onSelectSingleMode = () => {
        props.selectMode('SINGLE');
        props.startGame();
    };
    const onSelectDoubleMode = () => {
        props.selectMode('DOUBLE');
        props.startGame();
    };
    const onSelectOnlineMode = () => {
        props.selectMode('ONLINE');
        props.startGame();
    };

    const classes = styles();
    return (
        <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Select Mode
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary">
                <Grid container spacing={2} justify="center" direction="column">
                    <Grid item>
                        <Fab variant="extended" disabled={true} color="primary" className={classes.margin}
                             onClick={onSelectSingleMode}>
                            <ComputerIcon className={classes.extendedIcon} />
                            1 Player
                        </Fab>
                    </Grid>
                    <Grid item>
                        <Fab variant="extended" color="primary" className={classes.margin}
                             onClick={onSelectDoubleMode}>
                            <PeopleIcon className={classes.extendedIcon} />
                            2 Players
                        </Fab>
                    </Grid>
                    <Grid item>
                        <Fab variant="extended" disabled={true} color="primary" className={classes.margin}
                             onClick={onSelectOnlineMode}>
                            <WifiIcon className={classes.extendedIcon} />
                            Play Online
                        </Fab>
                    </Grid>
                </Grid>
            </Typography>
        </Container>
    )
};

export default connect(
    state => ({
        mode: state.mode
    }),
    actions
)(Start);
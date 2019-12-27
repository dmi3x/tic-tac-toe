import React, {PureComponent} from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Fab from '@material-ui/core/Fab';
import ComputerIcon from "@material-ui/icons/Computer";
import PeopleIcon from "@material-ui/icons/People";
import WifiIcon from "@material-ui/icons/Wifi";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";

const styles = theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    }
});

class Start extends PureComponent {
    onSelectSingleMode = () => {
        this.props.selectMode('SINGLE');
        this.props.startGame();
    };
    onSelectDoubleMode = () => {
        this.props.selectMode('DOUBLE');
        this.props.startGame();
    };
    onSelectOnlineMode = () => {
        this.props.selectMode('ONLINE');
        this.props.startGame();
    };

    render() {
        return (
            <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Select Mode
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary">
                    <Grid container spacing={2} justify="center" direction="column">
                        <Grid item>
                            <Fab variant="extended" disabled={true} color="primary" className={this.props.classes.margin}
                                 onClick={this.onSelectSingleMode}>
                                <ComputerIcon className={this.props.classes.extendedIcon} />
                                1 Player
                            </Fab>
                        </Grid>
                        <Grid item>
                            <Fab variant="extended" color="primary" className={this.props.classes.margin}
                                 onClick={this.onSelectDoubleMode}>
                                <PeopleIcon className={this.props.classes.extendedIcon} />
                                2 Players
                            </Fab>
                        </Grid>
                        <Grid item>
                            <Fab variant="extended" disabled={true} color="primary" className={this.props.classes.margin}
                                 onClick={this.onSelectOnlineMode}>
                                <WifiIcon className={this.props.classes.extendedIcon} />
                                Play Online
                            </Fab>
                        </Grid>
                    </Grid>
                </Typography>
            </Container>
        )
    }
}

Start.propTypes = {
    classes: PropTypes.object.isRequired,
};
const StyledStart = withStyles(styles)(Start);
export default connect(
    state => ({
        mode: state.mode
    }),
    dispatch => ({
        selectMode: (mode) => {
            dispatch({ type: 'SELECT_MODE', mode })
        },
        startGame: () => {
            dispatch({ type: 'START_GAME' })
        }
    })
)(StyledStart);
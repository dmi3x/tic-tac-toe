import React, {PureComponent} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import AppIcon from "@material-ui/icons/Apps";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import CloseIcon from "@material-ui/icons/Close";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import ReplayIcon from "@material-ui/icons/Replay";

const styles = theme => ({
    icon: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
    },
    button: {
        marginLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    }
});

class Header extends PureComponent {
    render() {
        return (
            <>
                <CssBaseline/>
                <AppBar position="relative">
                    <Toolbar>
                        <AppIcon className={this.props.classes.icon} />
                        <Typography variant="h6" color="inherit" noWrap className={this.props.classes.title}>
                            Tic Tac Toe
                        </Typography>
                        {!!Object.keys(this.props.matrix).length &&
                            <Fab variant="extended" color="secondary" size="small"
                                 className={this.props.classes.button} onClick={()=>this.props.replay()}>
                                <ReplayIcon/> Replay
                            </Fab>
                        }
                        {this.props.startGame &&
                            <Fab variant="extended" color="secondary" size="small"
                                 className={this.props.classes.button} onClick={()=>this.props.restart()}>
                                <CloseIcon /> Close
                            </Fab>
                        }
                    </Toolbar>
                </AppBar>
            </>
        )
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

const StyledHeader = withStyles(styles)(Header);
export default connect(
    state => ({
        startGame: state.gameStatus.startGame,
        matrix: state.gameStatus.matrix
    }),
    dispatch => ({
        replay: () => {
            dispatch({ type: 'REPLAY_GAME' })
        },
        restart: () => {
            dispatch({ type: 'RESTART_GAME' })
        }
    })
)(StyledHeader);
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import AppIcon from "@material-ui/icons/Apps";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import CloseIcon from "@material-ui/icons/Close";
import {connect} from "react-redux";
import ReplayIcon from "@material-ui/icons/Replay";
import * as actions from "../actions/header";

const styles = makeStyles(theme => ({
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
}));

const Header = (props) => {
    const classes = styles();
    return (
        <>
            <AppBar position="relative">
                <Toolbar>
                    <AppIcon className={classes.icon} />
                    <Typography variant="h6" color="inherit" noWrap className={classes.title}>
                        Tic Tac Toe
                    </Typography>
                    {!props.boardIsEmpty &&
                        <Fab key="replay" variant="extended" color="secondary" size="small"
                             className={classes.button} onClick={props.replay}>
                            <ReplayIcon/> Replay
                        </Fab>
                    }
                    {props.startGame &&
                        <Fab key="close" variant="extended" color="secondary" size="small"
                             className={classes.button} onClick={props.restart}>
                            <CloseIcon /> Close
                        </Fab>
                    }
                </Toolbar>
            </AppBar>
        </>
    )
};

export default connect(
    state => ({
        boardIsEmpty: state.gameStatus.boardIsEmpty,
        startGame: state.gameStatus.startGame
    }
), actions)(Header);
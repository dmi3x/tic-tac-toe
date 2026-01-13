import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AppsIcon from "@mui/icons-material/Apps";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import CloseIcon from "@mui/icons-material/Close";
import ReplayIcon from "@mui/icons-material/Replay";
import { connect } from "react-redux";
import * as actions from "../actions/header";

const Header = (props) => {
    return (
        <>
            <AppBar position="relative">
                <Toolbar>
                    <AppsIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        Tic Tac Toe
                    </Typography>
                    {!props.boardIsEmpty &&
                        <Fab key="replay" variant="extended" color="secondary" size="small"
                             sx={{ ml: 1, pr: 1 }} onClick={props.replay}>
                            <ReplayIcon /> Replay
                        </Fab>
                    }
                    {props.startGame &&
                        <Fab key="close" variant="extended" color="secondary" size="small"
                             sx={{ ml: 1, pr: 1 }} onClick={props.restart}>
                            <CloseIcon /> Close
                        </Fab>
                    }
                </Toolbar>
            </AppBar>
        </>
    );
};

export default connect(
    state => ({
        boardIsEmpty: state.gameStatus.boardIsEmpty,
        startGame: state.gameStatus.startGame
    }),
    actions
)(Header);
import React from "react";
import Container from "@material-ui/core/Container";
import {connect} from "react-redux";
import SinglePlayerDialog from "./SinglePlayerDialog";
import ModeDialog from "./ModeDialog";
import * as actions from "../../actions/start";

const Start = (props) => {
    const {mode, isGameStarted} = props;
    const selectMode = (mode) => {
        props.selectMode(mode);
        if (mode==='DOUBLE') {
            props.startGame();
        }
    };
    const selectPlayer = (player) => {
        props.selectPlayer(player);
        props.startGame();
    };
    return (
        <Container maxWidth="sm">
            {mode==='SINGLE' && !isGameStarted
                ? <SinglePlayerDialog selectPlayer={selectPlayer}/>
                : <ModeDialog selectMode={selectMode}/>
            }
        </Container>
    )
};

export default connect(
    state => ({
        mode: state.selectedMode,
        isGameStarted: state.startGame
    }),
    actions
)(Start);
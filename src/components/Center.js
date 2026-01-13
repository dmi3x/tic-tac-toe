import React from "react";
import Board from "./Board";
import StartDialog from "./StartDialog";
import { connect } from "react-redux";

const Center = (props) => {
    return props.startGame ? <Board /> : <StartDialog />;
};

export default connect(
    state => ({
        startGame: state.gameStatus.startGame
    })
)(Center);
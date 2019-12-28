import React from "react";
import Board from "./Board";
import Start from "./Start";
import {connect} from "react-redux";

const Center = props => {
    return props.startGame ? <Board /> : <Start />
};

export default connect(
    state => ({
        startGame: state.gameStatus.startGame
    })
)(Center);
import {combineReducers} from "redux";
import {allLines} from "../config/index.js";

const initialState = {
    matrix: {},
    nextPlayer: 'X',
    gameOver: false,
    winner: null,
    wonLine: null,
    startGame: false,
    boardIsEmpty: true
};
const checkWin = (state) => {
    for (const line of allLines) {
        let prevValue, currentValue;
        for (const index of line) {
            currentValue = state.matrix[index];
            if (!currentValue || (prevValue && currentValue !== prevValue)) {
                prevValue = null;
                break;
            }
            prevValue = currentValue;
        }
        if (prevValue) {
            state.winner = prevValue;
            state.wonLine = line;
            break;
        }
    }
    if (state.winner || Object.keys(state.matrix).length >= 9) {
        state.gameOver = true;
    }
};
const gameStatus = (state = initialState, action) => {
    switch (action.type) {
        case 'MAKE_MOVE':
            state = {
                ...state,
                nextPlayer: state.nextPlayer === 'X' ? 'O' : 'X',
                matrix: {...state.matrix, [action.index]: state.nextPlayer}
            };
            checkWin(state);
            break;
        case 'START_GAME':
            state = {
                ...state,
                startGame: true
            };
            break;
        case 'REPLAY_GAME':
            state = {
                ...initialState,
                startGame: true
            };
            break;
        case 'RESTART_GAME':
            state = initialState;
            break;
        default:
    }
    state.boardIsEmpty = !Object.keys(state.matrix).length;
    return state;
};

const selectedMode = (state = null, action) => {
    if (action.type === 'SELECT_MODE') {
        state = action.mode;
    } else if (action.type === 'RESTART_GAME') {
        state = null;
    }
    return state;
};

const selectedPlayer = (state = 'X', action) => {
    if (action.type === 'SELECT_PLAYER') {
        state = action.player === 'X' ? 'X' : 'O';
    }
    return state;
};

export default combineReducers({
    gameStatus,
    selectedMode,
    selectedPlayer
})
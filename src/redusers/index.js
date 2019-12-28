import {combineReducers} from "redux";

const initialState = {
    matrix: {},
    nextPlayer: 'X',
    gameOver: false,
    winner: null,
    wonLine: null,
    startGame: false,
    boardIsEmpty: true
};
const winLines = (() => {
    function* range(start, end, step = 1) {
        for (let i = start; i <= end; i = i + step) yield i;
    }
    return [
        ...[0, 3, 6].map(i => [...range(i, i + 2)]),
        ...[0, 1, 2].map(i => [...range(i, 8, 3)]),
        [0, 4, 8],
        [2, 4, 6]
    ]
})();
const checkWin = (state) => {
    for (const line of winLines) {
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

const selectMode = (state = null, action) => {
    if (action.type === 'SELECT_MODE') {
        state = action.mode;
    } else if (action.type === 'RESTART_GAME') {
        state = null;
    }
    return state;
};

export default combineReducers({
    gameStatus,
    selectMode
})
import React, { Component } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import Typography from "@mui/material/Typography";
import Cell from "./Cell";
import { allLines } from "../../config";

const calcBestTurn = (lines, matrix, currentPlayer) => {
    //const centerIndex = 4;
    const ranks = {};
    //console.log(matrix);
    // if (!matrix[centerIndex]) {
    //     return centerIndex;
    // }
    const p1 = currentPlayer;
    const p2 = currentPlayer === 'X' ? 'O' : 'X';
    const rankMatrix = {
        [p1 + p1]: 1000, // XXF
        [p2 + p2]: 300, // OOF
        [p1]: 50, //XFF
        [p2]: 5, //0FF
        "": 20, //FFF
        [p2 + p1]: 50 //X0F
    };
    for (const line of lines) {
        const emptyCells = [],
            values = [];
        for (const i of line) {
            let value = matrix[i];
            values.push(value);
            if (!value) emptyCells.push(i);
        }
        if (!emptyCells.length) continue;
        const hash = values.sort().join('');
        const rank = rankMatrix[hash] || 0;
        //console.log(p1, hash, rank, emptyCells, line);
        for (const i of emptyCells) {
            ranks[i] = (ranks[i] || 0) + rank;
        }
    }
    const sortedRanks = Object.entries(ranks).sort((a, b) => b[1] - a[1]);
    //console.log('sortedRanks',sortedRanks);
    return sortedRanks[0][0];
};

const aiTurn = (props) => {
    const AiTurn = calcBestTurn(allLines, props.matrix, props.nextPlayer);
    props.onMakeMove(AiTurn);
};

class Board extends Component {

    getValue = (index) => {
        return this.props.matrix[index] || '';
    };

    onMakeMove = (index) => {
        this.props.onMakeMove(index);
    };

    shouldComponentUpdate = (nextProps) => {
        const props = nextProps;
        if (props.gameMode === 'SINGLE' && props.nextPlayer !== props.playerSymbol && !props.gameOver) {
            aiTurn(props);
            return false;
        }
        return true;
    };

    componentDidMount() {
        const {nextPlayer, playerSymbol} = this.props;
        if (nextPlayer !== playerSymbol) {
            aiTurn(this.props);
        }
    };

    getGameInfo = () => {
        const {gameMode, playerSymbol, gameOver, winner, nextPlayer} = this.props;
        let gameOverInfo, gameOverColor = 'textPrimary', turnInfo;
        if (gameOver) {
            if (winner) {
                if (gameMode === 'SINGLE') {
                    gameOverInfo = (winner === playerSymbol ? 'You won!' : 'Computer won!')
                } else {
                    gameOverInfo = `Player ${winner === 'X' ? 1 : 2} wins!`;
                }
                gameOverColor = (winner === 'X' ? 'primary' : 'secondary');
            } else {
                gameOverInfo = 'Draw'
            }
        } else {
            turnInfo = gameMode === 'SINGLE' ? 'Your turn' : `Player ${nextPlayer === 'X' ? 1 : 2} to move`;
        }
        return {gameOverInfo, gameOverColor, turnInfo}
    };

    getCellMode = (isGameOver, wonLine, index) => {
        if (isGameOver) {
            if (wonLine && wonLine.includes(index)) {
                return 'selected';
            } else {
                return 'disabled';
            }
        }
        return null;
    };

    render() {
        const { gameOver, wonLine } = this.props;
        const { gameOverInfo, gameOverColor, turnInfo } = this.getGameInfo();
        return (
            <Box component="main">
                <Box sx={{ backgroundColor: 'background.paper', py: 1 }}>
                    <Container maxWidth="sm">
                        {gameOver
                            ? <Typography component="h1" variant="h2" align="center" color={gameOverColor}>
                                {gameOverInfo}
                            </Typography>
                            : <Typography variant="h5" align="center" color="text.secondary" sx={{ p: 2 }}>
                                {turnInfo}
                            </Typography>
                        }
                    </Container>
                </Box>
                <Container sx={{ py: 3 }} maxWidth="md">
                    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
                        <ImageList cols={3} sx={{ width: 300 }}>
                            {[...Array(9).keys()].map(index => (
                                <Cell key={index}
                                      index={index}
                                      value={this.getValue(index)}
                                      mode={this.getCellMode(gameOver, wonLine, index)}
                                      onMakeMove={this.onMakeMove}/>
                            ))}
                        </ImageList>
                    </Grid>
                </Container>
            </Box>
        );
    }
}

export default connect(
    state => ({
        matrix: state.gameStatus.matrix,
        wonLine: state.gameStatus.wonLine,
        nextPlayer: state.gameStatus.nextPlayer,
        gameOver: state.gameStatus.gameOver,
        winner: state.gameStatus.winner,
        gameMode: state.selectedMode,
        playerSymbol: state.selectedPlayer
    }),
    ({
        onMakeMove: (index) => ({type: 'MAKE_MOVE', index})
    })
)(Board);

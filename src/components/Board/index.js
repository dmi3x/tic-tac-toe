import React, {Component} from "react";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import Typography from "@material-ui/core/Typography";
import Cell from "./Cell";
import {allLines} from "../../config/index.js";

const styles = theme => ({
    cardGrid: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    grid: {
        width: 300
    },
    title: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1, 0, 1),
    },
    player: {
        padding: theme.spacing(2),
    }
});

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

    getGameInfo = () => {
        const {gameMode, playerSymbol, gameOver, winner, nextPlayer} = this.props;
        let gameOverInfo, turnInfo;
        if (gameOver) {
            if (winner) {
                if (gameMode === 'SINGLE') {
                    gameOverInfo = (winner===playerSymbol ? 'You won!' : 'Computer won!')
                } else {
                    gameOverInfo = `Player ${winner === 'X' ? 1 : 2} wins!`;
                }
            } else {
                gameOverInfo = 'Draw'
            }
        } else {
            turnInfo = gameMode === 'SINGLE' ? 'Your turn' : `Player ${nextPlayer === 'X' ? 1 : 2} to move`;
        }
        return {gameOverInfo, turnInfo}
    };

    render() {
        const {classes, gameOver, winner, wonLine} = this.props;
        const {gameOverInfo, turnInfo} = this.getGameInfo();
        return (
            <main>
                <div className={classes.title}>
                    <Container maxWidth="sm">
                        {gameOver
                            ? <Typography component="h1" variant="h2" align="center"
                                          color={winner ? (winner === 'X' ? 'primary' : 'secondary') : 'textPrimary'}>
                                {gameOverInfo}
                            </Typography>
                            : <Typography variant="h5" align="center" color="textSecondary" className={classes.player}>
                                {turnInfo}
                            </Typography>
                        }
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                        <GridList cellHeight="auto" cols={3} className={classes.grid}>
                            {[...Array(9).keys()].map(index => (
                                <Cell key={index}
                                      index={index}
                                      value={this.getValue(index)}
                                      wonLine={wonLine}
                                      gameOver={gameOver}
                                      onMakeMove={this.onMakeMove.bind(this)}/>
                            ))}
                        </GridList>
                    </Grid>
                </Container>
            </main>
        )
    }
}

Board.propTypes = {
    classes: PropTypes.object.isRequired,
};

const StyledBoard = withStyles(styles)(Board);
export default connect(
    state => ({
        matrix: state.gameStatus.matrix,
        wonLine: state.gameStatus.wonLine,
        nextPlayer: state.gameStatus.nextPlayer,
        gameOver: state.gameStatus.gameOver,
        winner: state.gameStatus.winner,
        gameMode: state.selectedMode,
        playerSymbol: state.selectedSymbol
    }),
    ({
        onMakeMove: (index) => ({type: 'MAKE_MOVE', index})
    })
)(StyledBoard);
import React from "react";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import Typography from "@material-ui/core/Typography";
import Cell from "./Cell";

const styles = makeStyles(theme => ({
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
}));

const Board = (props) => {

    const getValue = (index) => {
        return props.matrix[index] || '';
    };
    const classes = styles();
    const winner = props.winner;

    return (
        <main>
            <div className={classes.title}>
                <Container maxWidth="sm">
                    {props.gameOver
                        ? <Typography component="h1" variant="h2" align="center"
                            color={winner ? (winner === 'X' ? 'primary' : 'secondary') : 'textPrimary'}>
                            {winner ? `Player ${winner === 'X' ? 1 : 2} wins!` : 'Draw!'}
                          </Typography>
                        : <Typography variant="h5" align="center" color="textSecondary" className={classes.player}>
                            Player {props.nextPlayer==='X' ? 1 : 2} to move
                          </Typography>
                    }
                </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                    <GridList cellHeight="auto" cols={3} className={classes.grid}>
                        {[...Array(9).keys()].map(cell => (
                            <Cell key={cell}
                                  index={cell}
                                  wonLine={props.wonLine}
                                  gameOver={props.gameOver}
                                  value={getValue(cell)} />
                        ))}
                    </GridList>
                </Grid>
            </Container>
        </main>
    )
};

export default connect(
    state => ({
        matrix: state.gameStatus.matrix,
        wonLine: state.gameStatus.wonLine,
        nextPlayer: state.gameStatus.nextPlayer,
        gameOver: state.gameStatus.gameOver,
        winner: state.gameStatus.winner
    })
)(Board);
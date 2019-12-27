import React, {PureComponent} from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import {withStyles} from "@material-ui/core/styles";
import Cell from "./Cell";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

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

class Board extends PureComponent {

    render() {
        const winner = this.props.winner;
        return (
            <main>
                <div className={this.props.classes.title}>
                    <Container maxWidth="sm">
                        {this.props.gameOver &&
                            <Typography component="h1" variant="h2" align="center"
                                color={winner ? (winner === 'X' ? 'primary' : 'secondary') : 'textPrimary'}>
                                {winner ? `Player ${winner === 'X' ? 1 : 2} wins!` : 'Draw!'}
                            </Typography>
                        }
                        {!this.props.gameOver &&
                            <Typography variant="h5" align="center" color="textSecondary" className={this.props.classes.player}>
                                Player {this.props.nextPlayer==='X'?1:2} to move
                            </Typography>
                        }
                    </Container>
                </div>
                <Container className={this.props.classes.cardGrid} maxWidth="md">
                    <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                        <GridList cellHeight="auto" cols={3} className={this.props.classes.grid}>
                            {[...Array(9).keys()].map(cell => (
                                <Cell key={cell} index={cell} />
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
        nextPlayer: state.gameStatus.nextPlayer,
        gameOver: state.gameStatus.gameOver,
        winner: state.gameStatus.winner
    })
)(StyledBoard);
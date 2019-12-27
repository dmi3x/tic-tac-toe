import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import GridListTile from "@material-ui/core/GridListTile";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";

const styles = theme => ({
    cell: {
        width: 100,
        height: 100,
        fontWeight: 'bold',
        lineHeight: 0,
        fontSize: '250%',
        borderRadius: 0,
        borderColor: theme.palette.grey[300],
        "&:hover": {
            borderColor: theme.palette.grey[300]
        }
    }
});

class Cell extends PureComponent {

    getValue = () => {
        return this.props.matrix[this.props.index] || '';
    };

    makeMove = (e) => {
        if (this.props.gameOver) {
            e.preventDefault();
        } else if (this.getValue()) {
            e.preventDefault();
        } else {
            this.props.onMakeMove(this.props.index);
        }
    };

    render() {
        const className = this.props.classes.cell;
        const value = this.getValue();
        const colorMap = {
            X: 'primary',
            O: 'secondary'
        };
        let disabled = false;
        let variant = 'outlined';
        if (this.props.gameOver) {
            if (this.props.wonLine && this.props.wonLine.includes(this.props.index)) {
                variant = 'contained';
            } else {
                disabled = true;
            }
        }
        return (
            <GridListTile>
                <Button variant={variant} color={colorMap[value] || 'default'}
                        onClick={this.makeMove}
                        disabled={disabled}
                        className={className}>
                    {value}
                </Button>
            </GridListTile>
        )
    }
}

Cell.propTypes = {
    classes: PropTypes.object.isRequired,
};

const StyledCell = withStyles(styles)(Cell);
export default connect(
    state => ({
        nextPlayer: state.gameStatus.nextPlayer,
        gameOver: state.gameStatus.gameOver,
        wonLine: state.gameStatus.wonLine,
        matrix: state.gameStatus.matrix
    }),
    dispatch => ({
        onMakeMove: (index) => {
            dispatch({ type: 'MAKE_MOVE', index })
        }
    })
)(StyledCell);
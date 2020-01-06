import React from "react";
import Button from "@material-ui/core/Button";
import GridListTile from "@material-ui/core/GridListTile";
import {makeStyles} from "@material-ui/core/styles";
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

const styles = makeStyles(theme => ({
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
}));

const Cell = (props) => {

    const makeMove = (e) => {
        //todo: block board if turm of other player
        if (props.gameOver) {
            e.preventDefault();
        } else if (props.value) {
            e.preventDefault();
        } else {
            props.onMakeMove(props.index);
        }
    };

    const className = styles().cell;
    const value = props.value;
    const colorMap = {
        X: 'primary',
        O: 'secondary'
    };
    let disabled = false;
    let variant = 'outlined';
    if (props.gameOver) {
        if (props.wonLine && props.wonLine.includes(props.index)) {
            variant = 'contained';
        } else {
            disabled = true;
        }
    }

    return (
        <GridListTile>
            <Button variant={variant} color={colorMap[value] || 'default'}
                    onClick={makeMove}
                    disabled={disabled}
                    className={className}>
                {value}
            </Button>
        </GridListTile>
    )
};

//IMPORTANT! onlyUpdateForKeys filters props.style from material-ui
export default onlyUpdateForKeys(['value','gameOver'])(Cell);
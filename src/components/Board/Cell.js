import React from "react";
import Button from "@material-ui/core/Button";
import ImageListItem from "@material-ui/core/ImageListItem";
import {makeStyles} from "@material-ui/core/styles";

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

    const {mode, value, index} = props,
        className = styles().cell,
        colorMap = {
            X: 'primary',
            O: 'secondary'
        };

    const makeMove = (e) => {
        if (value || mode === 'selected' || mode === 'disabled') {
            e.preventDefault();
        } else {
            props.onMakeMove(index);
        }
    };

    let disabled = false,
        variant = 'outlined';
    if (mode === 'selected') {
        variant = 'contained';
    } else if (mode === 'disabled') {
        disabled = true;
    }
    return (
        <ImageListItem>
            <Button variant={variant} color={colorMap[value] || 'default'}
                    onClick={makeMove}
                    disabled={disabled}
                    className={className}>
                {value}
            </Button>
        </ImageListItem>
    )
};

//IMPORTANT! filters props.style from material-ui
export default React.memo(Cell, (prevProps, nextProps) => {
    return prevProps.value === nextProps.value &&
        prevProps.mode === nextProps.mode
});
import React from "react";
import Button from "@mui/material/Button";
import ImageListItem from "@mui/material/ImageListItem";

const cellStyles = {
    width: 100,
    height: 100,
    fontWeight: 'bold',
    lineHeight: 0,
    fontSize: '250%',
    borderRadius: 0,
    borderColor: 'grey.300',
    '&:hover': {
        borderColor: 'grey.300'
    }
};

const Cell = (props) => {
    const { mode, value, index } = props;
    const colorMap = {
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

    let disabled = false;
    let variant = 'outlined';
    if (mode === 'selected') {
        variant = 'contained';
    } else if (mode === 'disabled') {
        disabled = true;
    }

    return (
        <ImageListItem>
            <Button
                variant={variant}
                color={colorMap[value] || 'inherit'}
                onClick={makeMove}
                disabled={disabled}
                sx={cellStyles}
            >
                {value}
            </Button>
        </ImageListItem>
    );
};

// IMPORTANT! filters props.style from material-ui
export default React.memo(Cell, (prevProps, nextProps) => {
    return prevProps.value === nextProps.value &&
        prevProps.mode === nextProps.mode;
});
import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import ComputerIcon from "@mui/icons-material/Computer";
import PeopleIcon from "@mui/icons-material/People";
import WifiIcon from "@mui/icons-material/Wifi";

const ModeDialog = (props) => {
    const onSelectSingleMode = () => {
        props.selectMode('SINGLE');
    };
    const onSelectDoubleMode = () => {
        props.selectMode('DOUBLE');
    };
    const onSelectOnlineMode = () => {
        props.selectMode('ONLINE');
    };

    return (
        <>
            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                Select Mode
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" component="div">
                <Grid container spacing={2} justifyContent="center" direction="column">
                    <Grid item>
                        <Fab variant="extended" color="primary" sx={{ m: 1 }}
                             onClick={onSelectSingleMode}>
                            <ComputerIcon sx={{ mr: 1 }} />
                            1 Player
                        </Fab>
                    </Grid>
                    <Grid item>
                        <Fab variant="extended" color="primary" sx={{ m: 1 }}
                             onClick={onSelectDoubleMode}>
                            <PeopleIcon sx={{ mr: 1 }} />
                            2 Players
                        </Fab>
                    </Grid>
                    <Grid item>
                        <Fab variant="extended" disabled={true} color="primary" sx={{ m: 1 }}
                             onClick={onSelectOnlineMode}>
                            <WifiIcon sx={{ mr: 1 }} />
                            Play Online
                        </Fab>
                    </Grid>
                </Grid>
            </Typography>
        </>
    );
};

export default ModeDialog;
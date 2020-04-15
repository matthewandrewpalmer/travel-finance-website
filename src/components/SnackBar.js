import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackBar(props) {
    const actions = props.snackbarActions;

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        actions.closeSnackbar();
    };

    return (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                open={actions.open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert severity={actions.status}>{actions.text}</Alert>
            </Snackbar>
        </>
    );
}
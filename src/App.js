import React, {useState} from "react";
// import './App.css';
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import NavigationBar from "./components/NavigationBar";
import SnackBar from "./components/SnackBar";
import {RailJourneyForm, RailJourneyList} from "./components/railJourney";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";


const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column"
    },
    staticList: {
        height: "calc( 100vh - 64px )",
        overflow: "auto",
        backgroundColor: "#f5f5f5"
    },
    fab: {
        position: "absolute",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));


function App() {
    const styles = useStyles();

    const [search, setSearch] = useState(null);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarText, setSnackBarText] = useState("");
    const [snackBarStatus, setSnackBarStatus] = useState("info");

    const snackbarActions = {
        statusTypes: ["info", "warning", "error", "success"],
        open: snackBarOpen,
        text: snackBarText,
        status: snackBarStatus,
        openSnackbar: () => setSnackBarOpen(true),
        closeSnackbar: () => setSnackBarOpen(false),
        set: (value, status) => {
            setSnackBarText(value);
            setSnackBarStatus(snackbarActions.statusTypes.includes(status) ? status : "info");
        }
    };

    const [newJourneyFormActive, setNewJourneyFormActive] = useState(false);

    return (


        <div className="App">
            <SnackBar snackbarActions={snackbarActions}/>
            <NavigationBar setSearch={setSearch}/>

            <div className={styles.root}>

                <Grid container>
                    <Grid item xs={6} className={styles.staticList}>
                        <RailJourneyList search={search}/>
                    </Grid>
                    <Grid item xs={6}>
                        {/*<div style={{backgroundColor: "pink", width: "100%", "height": "100%"}}/>*/}
                        {
                            newJourneyFormActive ?
                                <RailJourneyForm setNewJourneyFormActive={setNewJourneyFormActive} snackbarActions={snackbarActions}/>
                                :
                                <>
                                    <Fab color="secondary" aria-label="add" className={styles.fab}>
                                        <AddIcon onClick={() => setNewJourneyFormActive(true) } />
                                    </Fab>
                                </>
                        }

                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default App;

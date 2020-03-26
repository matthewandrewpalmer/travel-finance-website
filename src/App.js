import React, {Fragment, useState} from 'react';
// import './App.css';
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TravelListItem from "./components/TravelListItem";
import {trainTravel} from "./data/trainTravel";
import JourneyForm from "./components/JourneyForm";
import NavigationBar from "./components/NavigationBar";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column"
    },

    staticList: {
        height: "calc( 100vh - 64px )",
        overflow: "auto",
    },
}));


function App() {
    const styles = useStyles();

    const [trainTravelList, setTrainTravelList] = useState(trainTravel);

    return (
        <div className="App">
            <NavigationBar/>
            <div className={styles.root}>

                <Grid container>
                    <Grid item xs={6} className={styles.staticList}>
                        {
                            trainTravelList.map((item, index) =>
                                <TravelListItem key={index} journey={item}/>
                            )
                        }
                    </Grid>
                    <Grid item xs={6} className={styles.staticList}>
                        <JourneyForm/>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default App;

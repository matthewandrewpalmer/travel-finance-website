import React, {useState} from 'react';
// import './App.css';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {stationNames} from "./data/trainStations";
import TravelListItem from "./components/TravelListItem";
import {trainTravel} from "./data/trainTravel";
import JourneyForm from "./components/JourneyForm";

const useStyles = makeStyles(theme => ({
    root: {
        // flexGrow: 1,
    },
    // paper: {
    //   padding: theme.spacing(2),
    //   textAlign: 'center',
    //   color: theme.palette.text.secondary,
    // },
    staticList: {
        height: "100vh",
        overflow: "auto",
        // background: "#3D3861"
    },
}));


function App() {
    const styles = useStyles();


    const [trainTravelList, setTrainTravelList] = useState(trainTravel);

    return (
        <div className="App">
            <div className={styles.root}>
                <Grid container spacing={3}>
                    <Grid item xs={6} className={styles.staticList}>
                        {
                            trainTravelList.map((item, index) =>
                                <TravelListItem key={index} journey={item}/>
                            )
                        }
                    </Grid>
                    <Grid item xs={6}>
                        <JourneyForm/>
                        {/*    <Fragment key={index}>*/}
                        {/*      <h1>{station.name}</h1>*/}
                        {/*    </Fragment>*/}
                        {/*  )*/}
                        {/*}*/}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default App;

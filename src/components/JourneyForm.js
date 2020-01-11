import React, {useState} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {stationNames} from "../data/trainStations";
import {MuiPickersUtilsProvider,} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import PublicIcon from '@material-ui/icons/Public';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles(theme => ({
    root: {
        // flexGrow: 1,
    },
    staticList: {
        height: "100vh",
        overflow: "auto",
        // background: "#3D3861"
    },
}));


function JourneyForm() {
    const styles = useStyles();

    const [stationList, setStationList] = useState(stationNames);


    const [name, setName] = React.useState();
    const handleChange = event => {
        setName(event.target.value);
    };

    const [departing, setDeparting] = React.useState();
    const [destination, setDestination] = React.useState();

    const [date, setDate] = useState(new Date());

    const MaterialInput = ({value, onClick}) => (
        <TextField id="standard-basic" label="Date" value={value} onClick={onClick}/>
    );

    const [journeyType, setJourneyType] = React.useState('Single');

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <h1>New Journey</h1>

            <form className={styles.root} noValidate autoComplete="off">
                <div style={{alignItems: "center"}}>
                    <div onClick={() => setJourneyType('Single')}
                         style={{float: "left", marginLeft: "10px", alignItems: "center"}}>
                        <ArrowForwardIcon value={'Single'} color={journeyType === 'Single' ? "primary" : "disabled"}/>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Single
                        </Typography>
                    </div>
                    <div onClick={() => setJourneyType('Return')}
                         style={{float: "left", marginLeft: "10px", alignItems: "center"}}>
                        <KeyboardReturnIcon value={'Return'} color={journeyType === 'Return' ? "primary" : "disabled"}/>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Return
                        </Typography>
                    </div>
                    <div onClick={() => setJourneyType('Rover')}
                         style={{float: "left", marginLeft: "10px", alignItems: "center"}}>
                        <PublicIcon value={'Rover'} color={journeyType === 'Rover' ? "primary" : "disabled"}/>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Rover
                        </Typography>
                    </div>
                    <div onClick={() => setJourneyType('PlusBus')}
                         style={{float: "left", marginLeft: "10px", alignItems: "center"}}>
                        <DirectionsBusIcon value={'PlusBus'}
                                           color={journeyType === 'PlusBus' ? "primary" : "disabled"}/>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Plus Bus
                        </Typography>
                    </div>
                </div>


                <Autocomplete
                    options={stationList}
                    getOptionLabel={station => station.name + " (" + station.code + ")"}
                    id="departing-station-field"
                    autoHighlight

                    value={departing}
                    onChange={(event, newValue) => {
                        setDeparting(newValue);
                    }}
                    renderInput={params => (
                        <TextField {...params} label="Departing Station" margin="normal" fullWidth/>
                    )}
                />
                <Autocomplete
                    options={stationList}
                    getOptionLabel={station => station.name + " (" + station.code + ")"}
                    id="destination-station-field"
                    autoHighlight
                    value={destination}
                    onChange={(event, newValue) => {
                        setDestination(newValue);
                    }}
                    renderInput={params => (
                        <TextField {...params} label="Destination Station" margin="normal" fullWidth/>
                    )}
                />
                <DatePicker
                    selected={date}
                    onChange={date => setDate(date)}
                    customInput={<MaterialInput/>}
                />
                <TextField id="standard-basic" label="Departing" value={name} onChange={handleChange}/>
            </form>
        </MuiPickersUtilsProvider>
    );
}

export default JourneyForm;
import React, {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {stationNames} from "../../data/trainStations";
import {MuiPickersUtilsProvider,} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import PublicIcon from "@material-ui/icons/Public";
import DirectionsBusIcon from "@material-ui/icons/DirectionsBus";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import ButtonBase from "@material-ui/core/ButtonBase";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import {saveRailJourney} from "../../utilities/http";

const useStyles = makeStyles(theme => ({
    root: {
        // flexGrow: 1,
    },
    staticList: {
        height: "100vh",
        overFlow: "auto",
        // background: "#3D3861"
    },
    margin: {
        margin: theme.spacing(1),
    },
    journeyTypeList: {
        marginLeft: "auto",
        marginRight: "auto",
    },
    journeyType: {
        borderRadius: "50%",
        height: "70px",
        width: "70px",
        textAlign: "center",
        alignItems: "center",
        marginLeft: "20px"
    },
    button: {
        margin: theme.spacing(1),
    },
}));


function RailJourneyForm(props) {
    const styles = useStyles();

    let setNewJourneyFormActive = props.setNewJourneyFormActive;
    let snackbarActions = props.snackbarActions;

    const [stationList, setStationList] = useState(stationNames);


    // const [name, setName] = React.useState();
    // const handleChange = event => {
    //     setName(event.target.value);
    // };

    // Form items State
    const [journeyType, setJourneyType] = React.useState("Single");
    const [departing, setDeparting] = React.useState();
    const [destination, setDestination] = React.useState();
    const [ticketName, setTicketName] = React.useState("");
    const [date, setDate] = useState(new Date());

    const [railcardUsed, setRailcardUsed] = React.useState(false);
    const [cost, setCost] = React.useState("");
    const [totalCost, setTotalCost] = React.useState("");

    const MaterialInput = ({value, onClick}) => (
        <TextField id="standard-basic" label="Date" value={value} onClick={onClick}/>
    );

    const submitRailJourney = () => {
        let railJourney = {};

        try {
            let destination_string = (journeyType !== "Rover" && journeyType !== "PlusBus") ? {
                String: destination.name,
                Valid: true
            } : {String: "", Valid: false};
            let ticket_name_string = journeyType === "Rover" ? {String: ticketName, Valid: true} : {
                String: "",
                Valid: false
            };
            railJourney = {
                "journey_type": journeyType,
                "departing": departing.name,
                "destination": destination_string,
                "ticket_name": ticket_name_string,
                "date": date,
                "railcard_used": railcardUsed,
                "cost": parseFloat(cost),
                "total_cost": parseFloat(totalCost)
            };
        } catch (err) {
            snackbarActions.set("Form not completely filled in", "warning");
            snackbarActions.openSnackbar();
            return;
        }

        console.log(railJourney);

        saveRailJourney(railJourney)
            .then(r => {
                snackbarActions.set("Journey saved successfully", "success");
                snackbarActions.openSnackbar();
                setNewJourneyFormActive(false);
            })
            .catch(error => {
                if (process.env.NODE_ENV === "development") {
                    snackbarActions.set("Save Failed", "error");
                    snackbarActions.openSnackbar();
                    console.error("Error Connecting to Server");
                }
            });
    };


    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Container maxWidth="sm">
                <h1>New Journey</h1>

                <form className={styles.root} noValidate autoComplete="off">
                    <div className={styles.journeyTypeList}>
                        <ButtonBase
                            focusRipple
                            className={styles.journeyType}
                            onClick={() => setJourneyType("Single")}
                        >
                            <div>
                                <ArrowForwardIcon value={"Single"}
                                                  color={journeyType === "Single" ? "primary" : "disabled"}/>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Single
                                </Typography>
                            </div>
                        </ButtonBase>
                        <ButtonBase
                            focusRipple
                            className={styles.journeyType}
                            onClick={() => setJourneyType("Return")}
                        >
                            <div>
                                <KeyboardReturnIcon value={"Return"}
                                                    color={journeyType === "Return" ? "primary" : "disabled"}/>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Return
                                </Typography>
                            </div>
                        </ButtonBase>
                        <ButtonBase
                            focusRipple
                            className={styles.journeyType}
                            onClick={() => setJourneyType("Rover")}
                        >
                            <div>
                                <PublicIcon value={"Rover"} color={journeyType === "Rover" ? "primary" : "disabled"}/>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Rover
                                </Typography>
                            </div>
                        </ButtonBase>
                        <ButtonBase
                            focusRipple
                            className={styles.journeyType}
                            onClick={() => setJourneyType("PlusBus")}
                        >
                            <div>
                                <DirectionsBusIcon value={"PlusBus"}
                                                   color={journeyType === "PlusBus" ? "primary" : "disabled"}/>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Plus Bus
                                </Typography>
                            </div>
                        </ButtonBase>
                    </div>

                    <FormControl fullWidth className={styles.margin}>
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
                    </FormControl>

                    {
                        journeyType === "Rover" ?
                            <FormControl fullWidth className={styles.margin}>
                                <InputLabel htmlFor="standard-adornment-amount">Rover Name</InputLabel>
                                <Input
                                    id="standard-adornment-amount"
                                    value={ticketName}
                                    onChange={(event => setTicketName(event.target.value))}
                                />
                            </FormControl>
                            :
                            journeyType !== "PlusBus" &&
                            <FormControl fullWidth className={styles.margin}>
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
                            </FormControl>
                    }


                    <FormControl fullWidth className={styles.margin}>
                        <DatePicker
                            selected={date}
                            onChange={date => setDate(date)}
                            customInput={<MaterialInput/>}
                        />
                    </FormControl>

                    <FormControlLabel
                        control={
                            <Switch
                                checked={railcardUsed}
                                onChange={(event, newValue) => {
                                    setRailcardUsed(newValue);
                                }}
                                name="railcardUsed"
                                color="primary"
                            />
                        }
                        label="Railcard used"
                    />

                    <FormControl fullWidth className={styles.margin}>
                        <InputLabel htmlFor="standard-adornment-amount">Cost</InputLabel>
                        <Input
                            type="number"
                            id="standard-adornment-amount"
                            value={cost}
                            onChange={(event => setCost(event.target.value))}
                            startAdornment={<InputAdornment position="start">£</InputAdornment>}
                        />
                    </FormControl>

                    {
                        railcardUsed &&
                        <FormControl fullWidth className={styles.margin}>
                            <InputLabel htmlFor="standard-adornment-amount">Total Cost</InputLabel>
                            <Input
                                type="number"
                                id="standard-adornment-amount"
                                value={totalCost}
                                onChange={(event => setTotalCost(event.target.value))}
                                startAdornment={<InputAdornment position="start">£</InputAdornment>}
                            />
                        </FormControl>
                    }


                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={styles.button}
                        startIcon={<SaveIcon/>}
                        onClick={() => submitRailJourney()}
                    >
                        Save
                    </Button>

                    {/*<TextField id="standard-basic" label="Departing" value={name} onChange={handleChange}/>*/}
                </form>
            </Container>
        </MuiPickersUtilsProvider>
    );
}

export default RailJourneyForm;
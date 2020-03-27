import React, {useEffect} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import RailJourneyListItem from "./RailJourneyListItem";
import {getRailJourneys} from "../utilities/http";
import {trainTravel} from "../data/trainTravel";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({});

function RailJourneyList(props) {
    const styles = useStyles();

    let search = props.search;
    let [railJourneys, setRailJourneys] = React.useState(null);

    const getRailJourneysList = () => {
        getRailJourneys()
            .then(r => {
                console.log(r);
                setRailJourneys(r)
            })
            .catch(error => {
                if (process.env.NODE_ENV === "development") {
                    console.log(error);
                    console.log("Error Connecting to Server, Loading mock data");
                    setRailJourneys(trainTravel)
                }
            });
    };

    useEffect(() => getRailJourneysList(), []);

    return (
        <>
            {
                railJourneys !== null ?
                    search ?
                        railJourneys.filter(item =>
                            (item.departing + item.destination).toLowerCase().includes(search.toLowerCase())).map((item, index) => (
                            <RailJourneyListItem key={index} journey={item}/>
                        ))
                        :
                        railJourneys.map((item, index) =>
                            <RailJourneyListItem key={index} journey={item}/>
                        )
                    :
                    <Typography>No results</Typography>
            }
        </>
    )
}

export default RailJourneyList;
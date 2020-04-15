import React, {useEffect} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import RailJourneyListItem from "./RailJourneyListItem";
import {getRailJourneys} from "../../utilities/http";
import {trainTravel} from "../../data/trainTravel";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({}));


function RailJourneyList(props) {
    const styles = useStyles();

    let search = props.search;
    let [railJourneys, setRailJourneys] = React.useState(null);

    const getRailJourneysList = () => {
        getRailJourneys()
            .then(r => {
                setRailJourneys(r);
            })
            .catch(error => {
                if (process.env.NODE_ENV === "development") {
                    console.error("Error Connecting to Server, Loading mock data");
                    setRailJourneys(trainTravel);
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
                    <div>
                        <LinearProgress color="secondary"/>
                    </div>
            }
        </>
    );
}

export default RailJourneyList;
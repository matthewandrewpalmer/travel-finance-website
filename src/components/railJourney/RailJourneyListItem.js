import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DirectionsBusOutlinedIcon from "@material-ui/icons/DirectionsBusOutlined";
import ExploreIcon from "@material-ui/icons/Explore";
import dayjs from "dayjs";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles({
    card: {
        // maxWidth: 345,
        margin: 25,
        // width: "100%"
    },
});


function RailJourneyListItem(props) {
    const styles = useStyles();

    let index = props.index;
    let journey = props.journey;


    function journeyTitle() {
        switch (journey.journey_type) {
            case "PlusBus":
                return (
                    <Typography gutterBottom variant="h5" component="h2">
                        <DirectionsBusOutlinedIcon/> PlusBus {journey.departing}
                    </Typography>
                );
            case "Rover":
                return (
                    <Typography gutterBottom variant="h5" component="h2">
                        <ExploreIcon/> {journey.ticket_name.String}
                    </Typography>
                );
            default:
                return (
                    <Typography gutterBottom variant="h5" component="h2">
                        {journey.departing} - {journey.destination.String}
                    </Typography>
                );
        }
    }


    return (
        <Card key={index} className={styles.card}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="50"
                    image="/class_800.png"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    {journeyTitle()}
                    <Typography variant="body2" color="textSecondary" component="p">
                        Ticket Type: {journey.journey_type}
                        <br/>
                        Cost: £{(Math.round(journey.cost * 100) / 100).toFixed(2)}
                        <br/>
                        Date: {dayjs(journey.date).format("DD/MM/YYYY")}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}

export default RailJourneyListItem;
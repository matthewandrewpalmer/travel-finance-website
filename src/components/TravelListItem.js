import React from 'react';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DirectionsBusOutlinedIcon from '@material-ui/icons/DirectionsBusOutlined';

const useStyles = makeStyles({
    card: {
        // maxWidth: 345,
        margin: 25,
        // width: "100%"
    },
});


function TravelListItem(props) {
    const styles = useStyles();

    let journey = props.journey;


    return (
        <Card key={props.key} className={styles.card}>
            <CardActionArea>
                {/*<CardMedia*/}
                {/*    component="img"*/}
                {/*    alt="Contemplative Reptile"*/}
                {/*    height="140"*/}
                {/*    image="/static/images/cards/contemplative-reptile.jpg"*/}
                {/*    title="Contemplative Reptile"*/}
                {/*/>*/}
                <CardContent>
                    {
                        journey.ticket_type === "PlusBus" ?
                            <Typography gutterBottom variant="h5" component="h2">
                                <DirectionsBusOutlinedIcon/> PlusBus {journey.departing}
                            </Typography>
                            :
                            <Typography gutterBottom variant="h5" component="h2">
                                {journey.departing} - {journey.destination}
                            </Typography>
                    }
                    <Typography variant="body2" color="textSecondary" component="p">
                        Ticket Type: {journey.ticket_type}
                        <br/>
                        Cost: £{(Math.round(journey.cost * 100) / 100).toFixed(2)}
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
    )
}

export default TravelListItem;
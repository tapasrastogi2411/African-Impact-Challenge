import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({ 
    details: {
        '& h3': {
            marginTop: 0,
            marginBottom: 0
        },
        '& p': {
            marginTop: 0,
            color: '#606060'
        }
    },
    card: {
        marginRight: 50,
    }
});


function VideoCard({video, title, uploader} : any) {
    const classes = useStyles();

    return (
        <div className={classes.card}>
            <video width="250px" height="140px" controls>
                <source src={video} type="video/mp4"/>
            </video>
            <div className={classes.details}>
                <h3>{title}</h3>
                <p>{uploader}</p>
            </div>
        </div>
    );
}

//"http://localhost:8080/uploads/videos/1626128398710_a.mp4"

export default VideoCard;


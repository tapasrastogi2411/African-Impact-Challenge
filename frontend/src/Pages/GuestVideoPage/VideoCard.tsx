import React from "react";
import { makeStyles } from "@material-ui/core/styles";

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


function VideoCard({video, title, uploader, upload_date} : any) {
    const classes = useStyles();

    return (
        <div className={classes.card}>
            <video width="250px" height="140px" controls>
                <source src={video} type="video/mp4"/>
            </video>
            <div className={classes.details}>
                <h3>{title}</h3>
                <p>{uploader} • {upload_date.substring(0, 10)} </p>
            </div>
        </div>
    );
}

export default VideoCard;


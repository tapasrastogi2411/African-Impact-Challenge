import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        width: 300,

    },
    media: {
        height: 140,
    },
    content: {
        height: 20,
    },
    txt: {
        fontSize: 20,
        fontWeight: 500,
        lineHeight: 1,
        textOverflow: "ellipsis"
    }
});

export default function MediaCard(props: any) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.src}
                />
                <CardContent className={classes.content}>
                    <Typography className={classes.txt}>
                        Sample Title 
                    </Typography>

                </CardContent>
            </CardActionArea>

        </Card>
    );
}
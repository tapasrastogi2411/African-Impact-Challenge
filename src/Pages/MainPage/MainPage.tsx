import * as React from 'react';
import SignIn from "../UserProfile/LogIn";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
const useStyles: (props?: any) => any = makeStyles((theme: Theme) =>
    createStyles({
        root: {
          
        },
        signUpBtn: {
            height: 50,
            width: 100,
            background: "#fcb040",
            color: "white",
            marginRight: 40
        },
        logInBtn: {
            height: 50,
            width: 100,
            background: "#ffffff",
            color: "black"
        },
        content: {
            width: 600,
            marginLeft: 300,

        },
        highlightTxt: {
            fontWeight: 800,
            fontSize: 40,
            marginBottom: 10
        },
        description: {
            fontWeight: 500,
            fontSize: 18,
            fontStyle: "italic",
            marginBottom: 40,
            paddingRight: 85,
        },

    })
);
function MainPage(props: any) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid className={classes.content} container>
                <Grid item xs={12}>
                    <Typography className={classes.highlightTxt}>
                        Helping Africa’s brightest minds go from idea to MVP to market
                        </Typography >
                </Grid>
                <Grid item xs={12}>
                    <Typography className={classes.description}>
                        Enabling the continent’s aspiring entrepreuners to build market-creating innovations, which tackle the country’s biggest challenges with technology                        </Typography >
                </Grid>
                <Grid item >
                    <Button className={classes.signUpBtn}
                        component={Link}
                        to="/signup">
                        Sign Up
                        </Button>
                </Grid>
                <Grid item >
                    <Button className={classes.logInBtn}
                        component={Link}
                        to="/login">Log In
                        </Button>
                </Grid>
            </Grid>
            
        </div >

    );
}
export default MainPage;
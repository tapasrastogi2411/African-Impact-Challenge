import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import SignIn from "./UserProfile/LogIn";
import SignUp from './UserProfile/SignUp';
import ProfilePage from './ProfilePage/Profilepage';
import Update from './ProfilePage/UpdateProfile';
import {
    makeStyles,
    createStyles,
    Theme,
} from "@material-ui/core";


const useStyles: (props?: any) => any = makeStyles((theme: Theme) =>
    createStyles({

        root: {
            background: "#f2f6fa",
            display: "flex",
            paddingTop: 80,
            height: "800px",
            alignItems: "center",
        },
    })
);



export default function Pages(props: any) {
    const classes = useStyles();


    const currentLocation = useLocation();


    return (
        <div className={classes.root}>
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route exact path="/login" component={SignIn} />
                <Route exact path="/signup" component={SignUp}/>
                <Route exact path="/profile" component={ProfilePage}/>
                <Route exact path="/update" component={Update}/>

            </Switch>

        </div>
    );
}



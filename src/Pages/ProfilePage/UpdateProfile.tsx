import React from "react";
import SignIn from "../UserProfile/LogIn";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../NavBar/Navbar";
import Appbar from "../../AppBar/AppBar";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Avatar, Divider, TextField, Toolbar, withStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import profilepic from "./profilepic.jpeg";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "absolute",
        top: 170,
        left: 300,
        width: 1400
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    divider: {
        width: "100%",
        height: 3,
        marginTop: 10,
        marginBottom: 10,
    },
    profilePic: {
        width: 200,
        marginTop: 20,
        borderRadius: 5
    },
    info: {
        marginTop: 3,
        marginLeft: 15,
        maxWidth: 1100
    },
    category: {
        fontSize: 22,
        fontWeight: 700
    },
    about: {
        width: 960,
    },
    btn: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#fcb040",
        color: "#ffffff",
        width: 180,
        '&:hover': { background: "#e69113" },
        marginLeft: 10,
        borderRadius: 20,

    },
    relatedPic: {
        width: 100,
        height: "auto"
    },
    relatedUser: {
        marginRight: 40
    }
}));
const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#e69113',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#e69113',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                //borderColor: 'black',
            },
            '&:hover fieldset': {
                borderColor: '#fcb040',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#e69113',
            },
        },
    },
})(TextField);

function UpdateProfile() {
    const classes = useStyles();
    return (
        <div >
            <Navbar></Navbar>

            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Typography variant="h4">Username</Typography>
                </Grid>
                <Divider className={classes.divider} />
                <Grid xs={2} item alignItems="center" >
                    <img src={profilepic} className={classes.profilePic} />
                    <Button className={classes.btn}>Save</Button>
                    <Button className={classes.btn}>Delete</Button>

                </Grid>
                <Grid
                    item
                    container
                    spacing={3}
                    xs={10}
                    direction="row"
                    className={classes.info}>
                    <Grid item xs={4}>
                        <Typography className={classes.category}>Email</Typography>
                        <CssTextField variant="outlined" />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography className={classes.category}>Organization</Typography>
                        <CssTextField variant="outlined" />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography className={classes.category}>Location</Typography>
                        <CssTextField variant="outlined" />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography className={classes.category}>Site</Typography>
                        <CssTextField variant="outlined" />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography className={classes.category}>Number</Typography>
                        <CssTextField variant="outlined" />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography className={classes.category}>Birthday</Typography>
                        <CssTextField variant="outlined" />
                    </Grid>
                    <Grid item xs={12} >
                        <Typography className={classes.category}>About</Typography>
                        <CssTextField multiline className={classes.about} variant="outlined" />
                    </Grid>
                </Grid>
                <Divider className={classes.divider} />

            </Grid>
        </div>
    );
}

export default UpdateProfile;

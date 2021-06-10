import React from "react";
import SignIn from "../UserProfile/LogIn";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Appbar from "../../AppBar/AppBar";
import Profilepage from "./Profilepage";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Divider } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import profilepic from "./profilepic.jpeg";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  entrepreunerTitle: {
    marginTop: -335,
    marginLeft: 110,
    fontWeight: 600,
    fontSize: 25,
  },
  profilePicture: {
    marginLeft: 110,
    width: 260,
    marginTop: 0,
  },
  avatar1: {
    marginLeft: 150,
    marginTop: 20,
  },
  usersTitle: {
    marginLeft: 110,
    fontWeight: 600,
    fontSize: 25,
    marginTop: 92,
  },
  avatar1name: {
    marginLeft: 140,
    marginTop: 0,
  },
  birthdayTitle: {
    marginTop: -505,
    marginLeft: 715,
    fontWeight: 600,
    fontSize: 25,
    font: "Copperplate",
  },
  birthdayInfo: {
    marginLeft: 715,
    marginTop: 10,
    fontWeight: 300,
  },
  companyTitle: {
    marginTop: -71,
    marginLeft: 990,
    fontWeight: 600,
    fontSize: 25,
  },
  companyInfo: {
    marginLeft: 990,
    marginTop: 10,
    fontWeight: 300,
  },
}));

function EntrepreunerPage() {
  const classes = useStyles();
  return (
    <div>
      <Profilepage />
      <Grid>
        <Typography className={classes.entrepreunerTitle}>
          Entrepreuner
        </Typography>
        <img src={profilepic} className={classes.profilePicture} />
        <Typography className={classes.usersTitle}>Related Users</Typography>
        <Avatar
          alt="hi"
          src={profilepic}
          className={classes.avatar1}
          style={{ height: "70px", width: "70px" }}
        ></Avatar>
        <Typography className={classes.avatar1name}>Temp avatar</Typography>
        <Grid>
          <Typography className={classes.birthdayTitle}>Birthday</Typography>
          <Typography className={classes.birthdayInfo}>June 5</Typography>
        </Grid>
        <Grid>
          <Typography className={classes.companyTitle}>Company</Typography>
          <Typography className={classes.companyInfo}>Company Inc.</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default EntrepreunerPage;

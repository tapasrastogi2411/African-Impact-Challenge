import React from "react";
import SignIn from "../UserProfile/LogIn";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../NavBar/Navbar";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Avatar, Divider, Toolbar } from "@material-ui/core";

import profilepic from "./profilepic.jpeg";
import ChatIcon from '@material-ui/icons/Chat';
import EditIcon from '@material-ui/icons/Edit';

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
    marginBottom: 30,
    maxWidth: "80%",
  },
  btn: {
    backgroundColor: "#fcb040",
    color: "#ffffff",
    width: 180,
    '&:hover': { background: "#e69113" },
    marginLeft: 10,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  relatedPic: {
    width: 100,
    height: "auto"
  },
  relatedUser: {
    marginRight: 40
  }
}));


function Profilepage() {
  const classes = useStyles();
  return (
    <div >
      <Navbar></Navbar>

      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Typography variant="h4">Username</Typography>
        </Grid>


        <Divider className={classes.divider} />
        <Grid xs={2} item alignItems="center">
          <img src={profilepic} className={classes.profilePic} />
          <Button startIcon={<ChatIcon />} className={classes.btn}>Message</Button>
          <Button component={Link} to="/update" startIcon={<EditIcon />} className={classes.btn}>Update Info</Button>

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
            <Typography >user.name@mail.com</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.category}>Organization</Typography>
            <Typography >Sample Inc.</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.category}>Location</Typography>
            <Typography >Toronto</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.category}>Site</Typography>
            <Typography >userNameBlog.com</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.category}>Number</Typography>
            <Typography >+1-647-123-5588</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.category}>Birthday</Typography>
            <Typography >March 9th</Typography>
          </Grid>
          <Grid item xs={12} className={classes.about}>
            <Typography className={classes.category}>About</Typography>
            <Typography >Anon is the co-founder and chief investment officer of Startupbootcamp AfriTech. He is also a venture capital principal at Nedbank, a managing partner at Launch Africa VC and the founder of Cactus advisors.  Anon advises us on our strategy for the African Impact Challenge
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5">Related Users</Typography>
          </Grid>
          <Grid item className={classes.relatedUser}>
            <Avatar src={profilepic} className={classes.relatedPic} />
            <Typography align="center">User1</Typography>
          </Grid>
          <Grid item className={classes.relatedUser}>
            <Avatar src={profilepic} className={classes.relatedPic} />
            <Typography align="center">User2</Typography>
          </Grid>
          <Grid item className={classes.relatedUser}>
            <Avatar src={profilepic} className={classes.relatedPic} />
            <Typography align="center">User3</Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Profilepage;

import React from "react";
import SignIn from "../UserProfile/LogIn";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../NavBar/Navbar";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Avatar, Divider, Toolbar } from "@material-ui/core";
import Card from './Card';
import player from "./player.png";
import book from "./books.jpg";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: 120,
    left: 300,
    width: 1400
  },

  divider: {
    width: "100%",
    height: 3,
    marginTop: 10,
    marginBottom: 30,
  },
  section: {
    marginBottom: 30
  },
  btn: {
    marginTop: 10,
    marginLeft: 600,
    backgroundColor: "#fcb040",
    color: "#ffffff",
    width: 150,
    '&:hover': { background: "#e69113" },
  }
}));






export default function Dashboard(props: any) {

  const classes = useStyles();





  return (
    <div >
      <Navbar></Navbar>
      <Grid container className={classes.root}>

        <Grid item xs={12}>
          <Typography variant="h4">Dashboard</Typography>
        </Grid>


        <Divider className={classes.divider} />

        <Grid
          container
          item
          xs={12}
          className={classes.section}
          spacing={2}
   
        >
          <Grid item xs={12} >
            <Typography variant="h5">Videos</Typography>
          </Grid>
          <Grid item xs={3}>
            <Card src={player} />
          </Grid>
          <Grid item xs={3}>
            <Card src={player} />
          </Grid>
          <Grid item xs={3}>
            <Card src={player} />
          </Grid>
          <Grid item xs={3}>
            <Card src={player} />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              className={classes.btn}
              endIcon={<MoreHorizIcon />}
            >
              More
            </Button>
          </Grid>
        </Grid>


        <Grid container xs={12} className={classes.section} spacing={2}>
          <Grid item xs={12} >
            <Typography variant="h5">Readings</Typography>
          </Grid>
          <Grid item xs={3}>
            <Card src={book} />
          </Grid>
          <Grid item xs={3}>
            <Card src={book} />
          </Grid>
          <Grid item xs={3}>
            <Card src={book} />
          </Grid>
          <Grid item xs={3}>
            <Card src={book} />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              className={classes.btn}
              endIcon={<MoreHorizIcon />}
            >
              More
            </Button>
          </Grid>
        </Grid>


      </Grid>
    </div>
  );
}


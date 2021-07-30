import React, { Component, Fragment, useState, useEffect } from "react";
import SignIn from "../UserProfile/LogIn";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../NavBar/Navbar";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Divider, Paper, Toolbar } from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: 130,
    left: 300,
    width: 1400,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  divider: {
    width: "150%",
    height: 3,
    marginTop: 15,
    marginBottom: 15,
  },
  inviteCard: {
    width: 800,
    padding: 10,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: "#fcb040",
    color: "#ffffff",
    width: 100,
    '&:hover': { background: "#e69113" },
    borderRadius: 10,
    textTransform: 'none',
    fontSize: 15,

  },
  declineBtn: {
    '&:hover': { background: "#806348" },
    backgroundColor: "#987b60",
    width: 100,
    borderRadius: 10,
    textTransform: 'none',
    fontSize: 15,
    color: "#ffffff",

  }

}));



function InvitationPage(prop: any) {
  const classes = useStyles();
  const [inviteItems, setInviteItems] = React.useState([]);
  const [alertMessage, setAlertMessage] = React.useState("");


  const handleGet = async () => {
    const response = await fetch(
      "http://localhost:8080/api/profile/fetchIncomingInvites",
      {
        method: "GET",
        credentials: "include",
        mode: "cors",
      }
    );
    const responseData = await response.json();
    if (response.status > 300 || response.status < 200) {
      throw responseData;
    }

    setInviteItems(responseData);
  };



  const handleAlert = (e: string) => {
    setAlertMessage(e);
  };

  const handleAccept = async (company: any) => {
    const formData = new FormData();
    formData.append("company", company);

    const response = await fetch("http://localhost:8080/api/profile/acceptInvite", {
      method: "PATCH",
      body: formData,
      credentials: "include",
      mode: "cors",
    });

    console.log(response.status);

    if (response.status > 300 || response.status < 200) {
      handleAlert("Failed to accept");
    }
    handleAlert("Successfully Accepted");
    handleGet();
  };

  const handleDecline = async (company: any) => {
    const formData = new FormData();
    formData.append("company", company);

    const response = await fetch("http://localhost:8080/api/profile/declineInvite", {
      method: "PATCH",
      body: formData,
      credentials: "include",
      mode: "cors",
    });

    console.log(response.status);

    if (response.status > 300 || response.status < 200) {
      handleAlert("Failed to decline");
    }
    handleAlert("Successfully Declined");
    handleGet();
  };

  const renderInvites = (item: any) => {
    return (
      <Paper className={classes.inviteCard} elevation={2}>
        <Grid
          direction="row"
          container
          alignItems="center"
          justify="space-evenly">
          <Grid item>
            <Typography>
              {item.sender}
            </Typography>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item>
            <Typography>
              {item.company_name}
            </Typography>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item >
            <Button onClick={() => handleAccept(item.company_name)} className={classes.btn} endIcon={<CheckIcon />}>Accept</Button>
          </Grid>
          <Grid item >
            <Button onClick={() => handleDecline(item.company_name)} className={classes.declineBtn} endIcon={<CloseIcon />} >Decline</Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <div>
      {handleGet}
      <Navbar></Navbar>
      <Grid container className={classes.root}>
        <Grid item xs={12} container spacing={2}>
          <Typography variant="h4" >
            Invites
          </Typography>
        </Grid>
        <Divider className={classes.divider} />
        {inviteItems.length > 0 ? (
          inviteItems.map((item) => (
            renderInvites(item)
          ))
        ) : (
            <Typography align="center" >
              No pending invites
            </Typography>
          )}
        {/* <Paper className={classes.inviteCard} elevation={2}>
          <Grid
            direction="row"
            container
            alignItems="center"
            justify="space-evenly">
            <Grid item>
              <Typography>
                FirstName LastName
              </Typography>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item>
              <Typography>
                CompanyName
              </Typography>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item >
              <Button className={classes.btn} endIcon={<CheckIcon />}>Accept</Button>
            </Grid>
            <Grid item >
              <Button className={classes.declineBtn} endIcon={<CloseIcon />} >Decline</Button>
            </Grid>
          </Grid>
        </Paper> */}
      </Grid>
    </div >
  );
}

export default InvitationPage;

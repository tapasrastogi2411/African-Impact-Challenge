import React, { Component, Fragment, useState, useEffect } from "react";
import SignIn from "../UserProfile/LogIn";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../NavBar/Navbar";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Divider, Paper, Toolbar } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuBookIcon from '@material-ui/icons/MenuBook';
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

const RedTextTypography = withStyles({
  root: {
    color: "#e43132",
  },
})(Typography);

function InvitationPage(prop: any) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [readingItems, setreadingItems] = React.useState([]);
  const [alertMessage, setAlertMessage] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAlertMessage("");
  };

  const handleUploadedFile = (e: any) => {
    setFile(e.target.files[0]);
  };
  const handleAlert = (e: string) => {
    setAlertMessage(e);
  };
  const handleSubmit = async (e: any) => {
    const formData = new FormData();
    formData.append("readings", file);
    formData.append("title", title);
    formData.append("description", description);

    const response = await fetch("http://localhost:8080/api/course/upload", {
      method: "POST",
      body: formData,
      credentials: "include",
      mode: "cors",
    });

    console.log(response.status);

    if (response.status > 300 || response.status < 200) {
      handleAlert("Failed to upload");
    }
    handleAlert("Successfully Uploaded");
    handleClose();
    handleGet();
  };


  const parseItem = (e: any) => {
    var filePath = e.file_path;
    return filePath.substring(filePath.indexOf('_') + 1, filePath.length)
  };

  const renderInvites = (item: any) => {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <MenuBookIcon style={{ marginTop: 3, marginRight: 10 }} />
          <Typography variant="h6" style={{ flexBasis: "73.33%" }} >{item.title}</Typography>
        </AccordionSummary>

        <AccordionDetails style={{ flexDirection: "column" }} >
          <div style={{ flexBasis: "33.33%" }}>
            <Typography variant="body2" style={{ marginBottom: 14 }}>
              Uploaded on {item.upload_date.substring(0, 10)}
            </Typography>
            <Typography variant="body2" style={{ marginBottom: 25 }}>
              Created by {item.upload_user}
            </Typography>
          </div>

          <div style={{ flexBasis: "33.33%" }}>
            <Typography variant="body2" >
              {item.description}
            </Typography>
          </div>
          <Divider style={{ marginBottom: "20px" }} />
          <Grid container direction="row" justify="space-between">

            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="body2" style={{ marginBottom: 10 }}>
                    Download File
                  </Typography>
                </Grid>

                <Grid item>
                  <a href={"http://localhost:8080" + item.file_path} target='_blank' download>
                    <Typography variant="body2" >
                      {parseItem(item)}
                    </Typography>
                  </a>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    );

  }
  const handleGet = async () => {
    const response = await fetch(
      "http://localhost:8080/api/course/getReadings",
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

    setreadingItems(responseData);
  };

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
        {/* {readingItems.length > 0 ? (
          readingItems.map((item) => (
            renderReadings(item)
          ))
        ) : (
            <Typography align="center" className={classes.noReadingHeader}>
              There are currently no readings!
            </Typography>
          )} */}
        <Paper className={classes.inviteCard} elevation={2}>
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
        </Paper>
      </Grid>
    </div >
  );
}

export default InvitationPage;

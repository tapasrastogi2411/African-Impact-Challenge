import React, { Component, Fragment, useState, useEffect } from "react";
import SignIn from "../UserProfile/LogIn";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../NavBar/Navbar";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Divider, Toolbar } from "@material-ui/core";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import YouTubeIcon from '@material-ui/icons/YouTube';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
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
  profilePic: {
    width: 200,
    marginTop: 20,
    borderRadius: 5,
  },
  info: {
    marginTop: 3,
    marginLeft: 15,
    maxWidth: 1100,
  },
  category: {
    fontSize: 22,
    fontWeight: 700,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  btn: {
    backgroundColor: "#fcb040",
    color: "#ffffff",
    width: 180,
    "&:hover": { background: "#e69113" },
    marginLeft: 10,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    display: "none",
  },
  pageTitle: {
    marginLeft: 10,
  },
  uploadButton: {
    marginLeft: 840,
    fontWeight: 600,
    backgroundColor: "#fcb040",
    color: "#ffffff",
    width: 180,
    "&:hover": { background: "#e69113" },
    borderRadius: 20,
  },
  VideoHeader: {
    fontSize: 22,
  },
  noVideoHeader: {
    fontSize: 22,
  },

  videoCard: {
    width: 800,
  },
  cardBody: {
    marginBottom: 25,
    color: "#5f6368",
    fontSize: "12px",
    fontWeight: 400
  },
  cardDesc: {
    fontSize: "13px",
    fontWeight: 400,
    marginBottom: 35
  },

}));

const RedTextTypography = withStyles({
  root: {
    color: "#e43132",
  },
})(Typography);

function VideoPage(prop: any) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState("");
  const [title, settitle] = React.useState("");
  const [videoItems, setVideoItems] = React.useState([]);
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
    formData.append("videos", file);
    formData.append("title", title);

    const response = await fetch("http://localhost:8080/api/course/upload", {
      method: "POST",
      body: formData,
      credentials: "include",
      mode: "cors",
    });
    if (response.status > 300 || response.status < 200) {
      handleAlert("Failed to upload");
    }
    handleAlert("Successfully Uploaded");
    handleClose();
    handleGet();
  };

  const parseItem = (e: string) => {
    return e.substring(e.indexOf("_") + 1, e.length);
  };

  const renderVideos = (item: any) => {

    return (
      <Accordion className={classes.videoCard}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <YouTubeIcon style={{ marginTop: 4, marginRight: 10 }} />
          <Typography variant="h6" style={{ flexBasis: "73.33%" }} >{item.title}</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ flexDirection: "column" }} >
          <div style={{ flexBasis: "33.33%", marginRight: 20, marginLeft: 35 }} >
            <video width="533" height="300" controls>
              <source src={"http://localhost:8080" + item.file_path} type="video/mp4" />
            </video>
          </div>
          <div style={{ flexBasis: "33.33%" }}>
            <Typography variant="body2" className={classes.cardBody} style={{ marginBottom: 14 }}>
              Uploaded on {item.upload_date.substring(0, 10)}
            </Typography>
            <Typography variant="body2" className={classes.cardBody} style={{ marginBottom: 25 }}>
              Created by {item.upload_user}
            </Typography>
          </div>
        </AccordionDetails>
      </Accordion>
    );

  }
  const handleGet = async () => {
    const response = await fetch(
      "http://localhost:8080/api/course/getVideos",
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

    setVideoItems(responseData);
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
          <Typography variant="h4" className={classes.pageTitle}>
            Videos
          </Typography>
          <Grid>
            <div>
              <Button
                variant="outlined"
                onClick={handleClickOpen}
                className={classes.uploadButton}
              >
                Upload Videos
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogContent>
                  <DialogContentText>
                    Please fill in the following fields
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    name="title"
                    label="title"
                    type="text"
                    fullWidth
                    onChange={(e) => settitle(e.target.value)}
                  />
                </DialogContent>

                <DialogContent>
                  <TextField
                    type={"file"}
                    name="videos"
                    id="videos"
                    label="videos"
                    inputProps={{ accept: ".mp4" }}
                    onChange={handleUploadedFile}
                  ></TextField>
                  <YouTubeIcon />
                </DialogContent>
                <DialogContent>
                  {alertMessage.length > 0 ? (
                    <RedTextTypography>{alertMessage}</RedTextTypography>
                  ) : null}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleSubmit} color="primary">
                    Submit
                  </Button>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </Grid>
        </Grid>

        <Divider className={classes.divider} />
        {videoItems.length > 0 ? (
          videoItems.map((item) => (
            renderVideos(item)
          ))
        ) : (
            <Typography align="center" className={classes.noVideoHeader}>
              There are currently no videos!
            </Typography>
          )}

        {/* <Accordion className={classes.videoCard}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <YouTubeIcon style={{ marginTop: 4, marginRight: 10 }} />
            <Typography variant="h6" style={{ flexBasis: "73.33%" }} >title</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ flexDirection: "row" }} >
            <div style={{ flexBasis: "33.33%", marginRight: 20, marginLeft: 35 }} >
              <video width="533" height="300" controls>
                vid
            </video>
            </div>
            <div style={{ flexBasis: "33.33%" }}>
              <Typography variant="body2" className={classes.cardBody} style={{ marginBottom: 14 }}>
                Posted: asfgasga
            </Typography>
              <Typography variant="body2" className={classes.cardBody} style={{ marginBottom: 25 }}>
                Created by asgasga
            </Typography>
            </div>
          </AccordionDetails>
        </Accordion> */}
      </Grid>
    </div>
  );
}

export default VideoPage;

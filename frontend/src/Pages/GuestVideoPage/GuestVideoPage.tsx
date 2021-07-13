import React, { Component, Fragment, useState, useEffect } from "react";
import SignIn from "../UserProfile/LogIn";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../NavBar/Navbar";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Avatar, Divider, Toolbar } from "@material-ui/core";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import AssignmentIcon from "@material-ui/icons/Assignment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import VideoCard from "./VideoCard";
const useStyles = makeStyles((theme) => ({
  root: { //uncomment pages.tsk root
    marginTop: 100,
    marginLeft: 200,   
    marginRight: "10%",
  },
  divider: {
    width: "100%",
    height: 3,
    marginTop: 5,
    marginBottom: 10,
  },
  pageTitle: {
    marginLeft: 10,
  },
  noVideoHeader: {
    fontSize: 22,
  },
  videoGrid: {
    display: "flex",
    flexWrap: "wrap"
  }
}));

const RedTextTypography = withStyles({
  root: {
    color: "#e43132",
  },
})(Typography);

function GuestVideoPage(prop: any) {
  const classes = useStyles();
  const [assignmentItems, setAssignmentItems] = React.useState([]);

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

    setAssignmentItems(responseData.file_paths);
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <div className={classes.root}>
      
      <Typography variant="h4" className={classes.pageTitle}>Videos</Typography>
        
      <Divider className={classes.divider} />
      <div className={classes.videoGrid}>
        {assignmentItems.length > 0 ? (
          assignmentItems.map((item) => (
              <VideoCard video={"http://localhost:8080" + item} title="Harry Potter" uploader="Aaron Tan"></VideoCard>
          ))
        ) : (
          <Typography align="center" className={classes.noVideoHeader}>
            There are currently no Videos!
          </Typography>
        )}
      </div>

    </div>
  );
}

export default GuestVideoPage;

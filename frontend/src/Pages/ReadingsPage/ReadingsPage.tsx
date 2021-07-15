import React, { Component, Fragment, useState, useEffect } from "react";
import SignIn from "../UserProfile/LogIn";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../NavBar/Navbar";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Divider, Toolbar } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuBookIcon from '@material-ui/icons/MenuBook';
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
    marginLeft: 800,
    fontWeight: 600,
    backgroundColor: "#fcb040",
    color: "#ffffff",
    width: 180,
    "&:hover": { background: "#e69113" },
    borderRadius: 20,
  },
  readingHeader: {
    fontSize: 22,
  },
  noReadingHeader: {
    fontSize: 22,
  },

 
  noreadingHeader: {
    fontSize: 22,
  },
  readingCard: {
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

function ReadingPage(prop: any) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState("");
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

  // const parseItem = (e: string) => {
  //   return e.substring(e.indexOf("_") + 1, e.length);
  // };
  const parseItem = (e: any) => {
    var filePath = e.file_path;
    return filePath.substring(filePath.indexOf('_') + 1, filePath.length)
  };

  const renderReadings = (item: any) => {  // item is an object containing reading data
    // call event handler in main and set state to the current reading
    return (
      <Accordion className={classes.readingCard}>
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
            <Typography variant="body2" className={classes.cardBody} style={{ marginBottom: 14 }}>
              Uploaded on {item.upload_date.substring(0, 10)}
            </Typography>
            <Typography variant="body2" className={classes.cardBody} style={{ marginBottom: 25 }}>
              Created by {item.upload_user}
            </Typography>
          </div>

          <div style={{ flexBasis: "33.33%" }}>
            <Typography variant="body2" className={classes.cardDesc}>
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

    setreadingItems(responseData.file_paths);
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
            Readings
          </Typography>
          <Grid>
            <div>
              <Button
                variant="outlined"
                onClick={handleClickOpen}
                className={classes.uploadButton}
              >
                Upload Readings
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
                    id="description"
                    name="description"
                    label="description"
                    type="text"
                    fullWidth
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </DialogContent>

                <DialogContent>
                  <TextField
                    type={"file"}
                    name="readings"
                    id="readings"
                    label="readings"
                    inputProps={{ accept: "application/pdf,.doc,.docx,.txt" }}
                    onChange={handleUploadedFile}
                  ></TextField>
                  <MenuBookIcon />
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
        {readingItems.length > 0 ? (
          readingItems.map((item) => (
            renderReadings(item)
          ))
        ) : (
            <Typography align="center" className={classes.noReadingHeader}>
              There are currently no readings!
            </Typography>
          )}

        {/* <Accordion className={classes.readingCard}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <MenuBookIcon style={{ marginTop: 3, marginRight: 10 }}/>

            <Typography variant="h6" style={{ flexBasis: "73.33%" }} >title</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ flexDirection: "column" }} >
            <div style={{ flexBasis: "33.33%" }}>
              <Typography variant="body2" className={classes.cardBody} style={{ marginBottom: 14 }}>
                Posted:
            </Typography>
              <Typography variant="body2" className={classes.cardBody} style={{ marginBottom: 25 }}>
                Created by
            </Typography>
            </div>
            <div style={{ flexBasis: "33.33%" }}>
              <Typography variant="body2" className={classes.cardDesc}>
                des
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
                    <a href={"http://localhost:8080"} target='_blank' download>
                      <Typography variant="body2" >
                        item
                            </Typography>
                    </a>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion> */}
      </Grid>
    </div>
  );
}

export default ReadingPage;

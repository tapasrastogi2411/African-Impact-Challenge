import React, { Component, Fragment, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../NavBar/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import VideoCard from "../GuestVideoPage/VideoCard";
import VideoLibraryOutlinedIcon from '@material-ui/icons/VideoLibraryOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    // position: "absolute",
    // top: 130,
    // left: 300,
    // width: 1400,
    display: "flex",
  },
  combine: {
    display: "flex",
    flexDirection: "column",
    marginTop: 100,
    marginLeft:200,
    marginRight: "5%",
    width: "100%"
  },
  divider: {
    width: "100%",
    height: 3,
    marginTop: 5,
    marginBottom: 10,
  },
  vidTitle: {
    display: "flex",
    justifyContent: "space-between"
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


function VideoPage(prop: any) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState("");
  const [title, settitle] = React.useState("");
  const [videoItems, setvideoItems] = React.useState([]);
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

  const parseItem = (e: any) => {
    var filePath = e.file_path;
    return filePath.substring(filePath.indexOf('_')+1,filePath.length)
  };

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

    setvideoItems(responseData);
    console.log(responseData);
  };


  const renderVideoCard = (item: any) => {
    return(
      <VideoCard video={"http://localhost:8080" + item.file_path} title={item.title} uploader={item.upload_user}></VideoCard>
    );
  }

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <div className={classes.root}>
      <div>
        <Navbar></Navbar>
      </div>

      <div className={classes.combine}>
      <div>
        <div className={classes.vidTitle}>
            <div>
                <Typography variant="h4" className={classes.pageTitle}>Videos</Typography>
            </div>
            
            <div>
                <Button
                    variant="outlined"
                    onClick={handleClickOpen}
                    // className={classes.uploadButton}
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
                            onChange={(e) =>
                            settitle(e.target.value)}
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
                    <VideoLibraryOutlinedIcon />
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
        </div>
        <Divider className={classes.divider} />
      </div>
      <div className={classes.videoGrid}>
        {videoItems.length > 0 ? (
          videoItems.map((item) => (
            renderVideoCard(item)
          ))
        ) : (
          <Typography align="center" className={classes.noVideoHeader}>
            There are currently no Videos!
          </Typography>
        )}
      </div>
      </div>
      
    </div>
    
  );
}

export default VideoPage;

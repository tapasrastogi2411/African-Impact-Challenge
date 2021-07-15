import React, {useState, useEffect} from "react";
import SignIn from "../UserProfile/LogIn";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../NavBar/Navbar";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Avatar, Container, Dialog, DialogActions, DialogContent, DialogContentText,  Divider, TextField, Toolbar, withStyles } from "@material-ui/core";

import profilepic from "../ProfilePage/profilepic.jpeg";
import ChatIcon from '@material-ui/icons/Chat';
import EditIcon from '@material-ui/icons/Edit';
import BusinessIcon from '@material-ui/icons/Business';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import tims from "./tims.jpeg";
import building from "./building.png";
import member from "./member.jpg";
import founder from "./founder.jpg";
import AddIcon from '@material-ui/icons/Add';
import AssignmentIcon from "@material-ui/icons/Assignment";



const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: 170,
    left: 300,
    width: 1400,
    height: "auto",
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
    marginTop: 25,
    borderRadius: 5
  },
  info: {
    marginTop: 3,
    marginLeft: 60,
    maxWidth: 1100
  },
  category: {
    fontSize: 22,
    fontWeight: 700
  },
  role: {
    fontSize: 22,
    fontWeight: 700,
    width: 200,
    display: "block",
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
  companyBtn: {
    backgroundColor: "#fcb040",
    color: "#ffffff",
    width: "200px",
    '&:hover': { background: "#e69113" },
    marginLeft: 1200,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  invBtn: {
    backgroundColor: "#fcb040",
    color: "#ffffff",
    width: 150,
    '&:hover': { background: "#e69113" },
    borderRadius: 20,
    marginLeft: 1250,
  },

  relatedPic: {
    width: 100,
    height: "auto",
    alignSelf:"center",
    marginLeft:"auto",
    marginRight:"auto",
    marginTop: 10,
    marginBottom: 10,
  },
  relatedPicFounder: {
    width: 100,
    height: "auto",
    marginTop: 2
  },

  // Adding the basic structure of the upload button, adapted from AssignmentPage.tsx
  uploadButton: {
    //marginLeft: 800,
    marginBottom: "10px",
    width: 200,
  },

  upload: {
    flexBasis: "23.33%",
    color: "#5f6368",
    fontSize: "12px",
    fontWeight: 400,
    marginTop: 8,
  }

  /* relatedUser: {
    marginRight: 40
  } */
}));

const defaultCompanyData = {
  company_name: "",
  address: "",
  industry: "",
  bio: "",
  creator: ""
};

const RedTextTypography = withStyles({
  root: {
    color: "#e43132",
  },
})(Typography);

function CompanyPage(props: any) {
  
  const classes = useStyles();
  const [companyData, setCompanyData] = React.useState(defaultCompanyData);

  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [file, setFile] = React.useState("");
  const [assignmentItems, setAssignmentItems] = React.useState([]); // array of objects
  
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

  const handleGet = async () => {
    const response = await fetch(
      "http://localhost:8080/api/course/getAssignments",
      {
        method: "GET",
        credentials: 'include',
        mode: "cors",
      }
    );
    const responseData = await response.json();
    if (response.status > 300 || response.status < 200) {
      throw responseData;
    }
    
    setAssignmentItems(responseData);
  };

  const handleSubmit = async (e: any) => {
    const formData = new FormData();
    formData.append("assignments", file);
    formData.append("title", title);
    formData.append("description", description);

    const response = await fetch("http://localhost:8080/api/course/upload", {
      method: "POST",
      body: formData,
      credentials: 'include',
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



  const getCompanyData = () => {
    fetch('http://localhost:8080/api/profile/getCompany/', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                },
            credentials: 'include',
            mode: 'cors',
        })
        .then(response => { // company data successfully retrieved
            return response.json();
        })
        .then(responseJson => {
          setCompanyData(responseJson);
        })
        .catch(err => { // company data cannot be retrieved 
            console.log("error"); 
        })
  }

  React.useEffect(() => {
    getCompanyData();
  }, []);


  

  return (
    <div >
      <Navbar></Navbar>

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
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <TextField
      
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
                    name="assignments"
                    id="assignments"
                    label="assignments"
                    inputProps={{ accept: "application/pdf,.doc,.docx,.txt" }}
                    onChange={handleUploadedFile}
                  ></TextField>
                  <AssignmentIcon />
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

      <Grid container className={classes.root}>
    
        <Grid container>
            <Grid item xs={12}>
                    
                    <Button startIcon={<AddIcon />} className={classes.invBtn}>Invite</Button>
            </Grid>

            <Grid item xs={12}>
                <Typography variant="h4">{companyData.company_name}</Typography>
            </Grid>
            
        </Grid>




        <Divider className={classes.divider} />
        <Grid xs={2} item alignItems="center">
          <img src={building} className={classes.profilePic} />
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
            <Typography className={classes.category}>Company Address</Typography>
            <Typography >{companyData.address}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.category}>Industry</Typography>
            <Typography >{companyData.industry}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.category}>About</Typography>
            <Typography >{companyData.bio}</Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />


        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography variant="h5">Members</Typography>
          </Grid>


          <Grid item >
              <Typography align="center">Founder</Typography>
              <Avatar src={founder} className={classes.relatedPic} />
              <Typography align="center">{companyData.creator}</Typography>
          </Grid>
          

          <Grid item >
             <Typography align="center">Member</Typography>
            <Avatar src={member} className={classes.relatedPic} />
            <Typography align="center">Aaron1999</Typography>
          </Grid>
          <Grid item >
          <Typography align="center">Member</Typography>
            <Avatar src={member} className={classes.relatedPic} />
            <Typography align="center">Jason2002</Typography>
          </Grid>
        </Grid>

        <Divider className={classes.divider} />
      
          <Typography variant="h5">Resources</Typography>
          <Button
                variant="outlined"
                onClick={handleClickOpen}
                // className={classes.uploadButton}
                startIcon={<AddIcon />}
                style={{marginLeft: 850}}
                className={classes.invBtn}
              >
                Resources
              </Button>
          
        
      </Grid>
    </div>
  );
}

export default CompanyPage;
import React from "react";
import SignIn from "../UserProfile/LogIn";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../NavBar/Navbar";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Avatar, Divider, Toolbar } from "@material-ui/core";

import profilepic from "../ProfilePage/profilepic.jpeg";
import ChatIcon from '@material-ui/icons/Chat';
import EditIcon from '@material-ui/icons/Edit';
import BusinessIcon from '@material-ui/icons/Business';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

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
    marginTop: 5,
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
  relatedPic: {
    width: 100,
    height: "auto"
  },
  relatedUser: {
    marginRight: 40
  }
}));




function CompanyPage(props: any) {
  
  const classes = useStyles();
  const companyData = props.companyData;

  

  return (
    <div >
      <Navbar></Navbar>

      <Grid container className={classes.root}>
    
        <Grid item xs={12}>
          <Typography variant="h4">{companyData.company_name}</Typography>
        </Grid>


        <Divider className={classes.divider} />
        <Grid xs={2} item alignItems="center">
          <img src={profilepic} className={classes.profilePic} />
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
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5">Members</Typography>
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

        <Divider className={classes.divider} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5">Resources</Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default CompanyPage;
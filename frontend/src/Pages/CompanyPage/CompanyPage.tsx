import React from "react";
import SignIn from "../UserProfile/LogIn";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../NavBar/Navbar";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Avatar, Container, Divider, Toolbar } from "@material-ui/core";

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
    marginLeft: 1000,
  },

  relatedPic: {
    width: 100,
    height: "auto"
  },
  relatedPicFounder: {
    width: 100,
    height: "auto",
    marginTop: 2
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
          direction="column"
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
          <Typography align="center">Founder</Typography>
            <Avatar src={founder} className={classes.relatedPicFounder} />
            <Typography align="center">{companyData.creator}</Typography>
          </Grid>
          <Grid item className={classes.relatedUser}>
          <Typography align="center">Member</Typography>
            <Avatar src={member} className={classes.relatedPic} />
            <Typography align="center">Aaron1999</Typography>
          </Grid>
          <Grid item className={classes.relatedUser}>
          <Typography align="center">Member</Typography>
            <Avatar src={member} className={classes.relatedPic} />
            <Typography align="center">Jason2002</Typography>
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
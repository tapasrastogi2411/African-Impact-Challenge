import React from "react";
import SignIn from "../UserProfile/LogIn";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../NavBar/Navbar";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Avatar, Divider, Toolbar } from "@material-ui/core";

import profilepic from "./profilepic.jpeg";
import ChatIcon from "@material-ui/icons/Chat";
import EditIcon from "@material-ui/icons/Edit";
import BusinessIcon from "@material-ui/icons/Business";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import * as Constants from '../../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: 170,
    left: 300,
    width: 1400,
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
    "&:hover": { background: "#e69113" },
    marginLeft: 10,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  companyBtn: {
    backgroundColor: "#fcb040",
    color: "#ffffff",
    width: "200px",
    "&:hover": { background: "#e69113" },
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
    height: "auto",
  },
  relatedUser: {
    marginRight: 40,
  },
}));

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const viewUserData = {
  username: "",
  role_name: "",
  honorifics: "",
  first_name: "",
  last_name : "",
  email: "",
  phone_number: "",
  country: "",
  address: "",
}

function ViewProfilepage(props: any) {
  const classes = useStyles();

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [userData, setUserData] = React.useState(viewUserData);
  const [showCreateCompanyBtn, setShowCreateCompanyBtn] = React.useState(false);

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const getUserData = () => {
    setUserData(props.viewUserDataProp);
  }

  const checkUserInCompany = () => {
    fetch(Constants.server + "/api/profile/inCompany/", {
      method: "GET",
      credentials: "include",
      mode: "cors",
    })
      .then((response) => {
        // if company exists then show view company button/hide create company button
        if (response.status == 200) {
          setShowCreateCompanyBtn(false); // hide
        } else {
          setShowCreateCompanyBtn(true); // show
        }
      })
      .catch((err) => {
        console.log("error");
        setShowCreateCompanyBtn(false); // hide
      });
  };

  React.useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <Navbar></Navbar>

      <Grid container className={classes.root}>
        <Grid>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={4000}
            onClose={handleCloseSnackbar}
          >
            <Alert severity="success" onClose={handleCloseSnackbar}>
              Company successfully created!
            </Alert>
          </Snackbar>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h4">{userData.username}</Typography>
        </Grid>

        <Divider className={classes.divider} />
        <Grid xs={2} item alignItems="center">
          <Typography className={classes.role} variant="caption" align="center">
            {userData.role_name}
          </Typography>
          <img src={profilepic} className={classes.profilePic} />
          <Button startIcon={<ChatIcon />} className={classes.btn}>
            Message
          </Button>
        </Grid>
        <Grid
          item
          container
          spacing={3}
          xs={10}
          direction="row"
          className={classes.info}
        >
          <Grid item xs={4}>
            <Typography className={classes.category}>Honorifics</Typography>
            <Typography>{userData.honorifics}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.category}>First Name</Typography>
            <Typography>{userData.first_name}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.category}>Last Name</Typography>
            <Typography>{userData.last_name}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.category}>Phone Number</Typography>
            <Typography>{userData.phone_number}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.category}>Email</Typography>
            <Typography>{userData.email} </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.category}>Address</Typography>
            <Typography>{userData.address}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.category}>Country</Typography>
            <Typography>{userData.country}</Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5">Related Users</Typography>
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
      </Grid>
    </div>
  );
}

export default ViewProfilepage;

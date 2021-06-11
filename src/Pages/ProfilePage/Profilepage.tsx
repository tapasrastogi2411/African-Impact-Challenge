import React from "react";
import SignIn from "../UserProfile/LogIn";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../NavBar/Navbar";
import Appbar from "../../AppBar/AppBar";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Divider } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
const useStyles = makeStyles((theme) => ({
  profileDivider: {
    marginTop: 45,
    width: "85%",
    color: "#000000",
    background: "#000000",
    alignSelf: "center",
    position: "absolute",
    left: "50%",

    transform: "translate(-50%, -50%)",
  },
  profileDivider2: {
    marginTop: 60,
    width: "85%",
    color: "#000000",
    background: "#000000",
    alignSelf: "center",
    position: "absolute",
    left: "50%",

    transform: "translate(-50%, -50%)",
  },
  firstNameTitle: {
    marginTop: 50,
    bottom: 5,
    marginLeft: 400,
    fontWeight: 600,
    fontSize: 25,
  },
  firstNameInfo: {
    marginTop: 10,
    bottom: 5,
    marginLeft: 400,
    fontWeight: 300,
  },
  emailTitle: {
    marginTop: 25,
    marginLeft: 400,
    fontWeight: 600,
    fontSize: 25,
  },
  emailInfo: {
    marginLeft: 400,
    marginTop: 10,
    fontWeight: 300,
  },
  locationTitle: {
    marginTop: -70,
    marginLeft: 715,
    fontWeight: 600,
    fontSize: 25,
  },
  locationInfo: {
    marginLeft: 715,
    marginTop: 10,
    fontWeight: 300,
  },
  numberTitle: {
    marginLeft: 400,
    marginTop: 120,
    fontWeight: 600,
    fontSize: 25,
  },
  numberInfo: {
    marginLeft: 400,
    marginTop: 15,
    fontWeight: 300,
  },
  msgButton: {
    marginLeft: 110,
    bottom: -10,
    width: 85,
  },
  deleteButton: {
    top: 10,
    left: 3,
    width: 85,
  },
  updateButton: {
    top: 10,
    width: 85,
    left: 5,
  },
  lastNameTitle: {
    fontWeight: 600,
    fontSize: 25,
    marginLeft: 715,
    marginTop: -170,
  },
  lastNameInfo: {
    marginLeft: 715,
    marginTop: 15,
    fontWeight: 300,
  },
}));

const themeDark = createMuiTheme({
  palette: {
    background: {
      default: "#F2F2F7",
    },
  },
});

function Profilepage() {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={themeDark}>
      <CssBaseline />
      <div color="#F2F2F7">
        <Appbar />
        <Navbar />
        <Divider className={classes.profileDivider} />
        <Grid>
          <Grid>
            <Typography className={classes.firstNameTitle}>
              Firstname
            </Typography>
            <Typography className={classes.firstNameInfo}>John</Typography>
          </Grid>

          <Grid>
            <Typography className={classes.emailTitle}>Email</Typography>
            <Typography className={classes.emailInfo}>
              temp@email.com
            </Typography>
          </Grid>
          <Grid>
            <Typography className={classes.locationTitle}>Address</Typography>
            <Typography className={classes.locationInfo}>
              219 Temp Ave road
            </Typography>
          </Grid>
          <Grid>
            <Typography className={classes.lastNameTitle}>Last Name</Typography>
            <Typography className={classes.lastNameInfo}>
              219 Temp Ave road
            </Typography>
          </Grid>
          <Grid>
            <Typography className={classes.numberTitle}>
              Phone Number
            </Typography>
            <Typography className={classes.numberInfo}>4169992111</Typography>
          </Grid>

          <Button
            variant="contained"
            color="primary"
            className={classes.msgButton}
          >
            Message
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.deleteButton}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.updateButton}
          >
            Update
          </Button>
          <Divider className={classes.profileDivider2} />
        </Grid>
      </div>
    </MuiThemeProvider>
  );
}

export default Profilepage;

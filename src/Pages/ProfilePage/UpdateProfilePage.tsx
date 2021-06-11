import React from "react";
import SignIn from "../UserProfile/LogIn";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../NavBar/Navbar";
import Appbar from "../../AppBar/AppBar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Divider } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, withStyles } from "@material-ui/core/styles";
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
    marginTop: 0,
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
    marginTop: -100,
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
    marginTop: 160,
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
    bottom: 85,
    width: 85,
  },
  deleteButton: {
    top: -85,
    left: 3,
    width: 85,
  },
  updateButton: {
    top: -85,
    width: 85,
    left: 5,
  },
  lastNameTitle: {
    fontWeight: 600,
    fontSize: 25,
    marginLeft: 715,
    marginTop: -235,
  },
  lastNameInfo: {
    marginLeft: 715,
    marginTop: 5,
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

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#e69113",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#e69113",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        //borderColor: 'black',
      },
      "&:hover fieldset": {
        borderColor: "#fcb040",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#e69113",
      },
    },
  },
})(TextField);

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
            <CssTextField
              variant="outlined"
              required
              id="firstname"
              label="First Name"
              name="firstname"
              autoComplete="firstname"
              className={classes.firstNameInfo}
            />
          </Grid>
          <Grid>
            <Typography className={classes.emailTitle}>Email</Typography>
            <CssTextField
              variant="outlined"
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              className={classes.emailInfo}
            />
          </Grid>
          <Grid>
            <Typography className={classes.locationTitle}>Address</Typography>
            <CssTextField
              variant="outlined"
              id="Address"
              label="Address"
              name="Address"
              autoComplete="Address"
              className={classes.locationInfo}
            />
          </Grid>
          <Grid>
            <Typography className={classes.lastNameTitle}>Last Name</Typography>
            <CssTextField
              variant="outlined"
              required
              id="lastname"
              label="Last Name"
              name="lastname"
              autoComplete="lastname"
              className={classes.lastNameInfo}
            />
          </Grid>
          <Grid>
            <Typography className={classes.numberTitle}>
              Phone Number
            </Typography>
            <CssTextField
              variant="outlined"
              name="phone_number"
              label="Phone Number"
              type="text"
              id="phone_number"
              className={classes.numberInfo}
            />
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
            Confirm
          </Button>
          <Divider className={classes.profileDivider2} />
        </Grid>
      </div>
    </MuiThemeProvider>
  );
}

export default Profilepage;

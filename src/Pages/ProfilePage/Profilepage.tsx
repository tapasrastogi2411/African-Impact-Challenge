import React from "react";
import SignIn from "../UserProfile/LogIn";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../NavigationBar/Navbar";
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
    marginTop: 65,
    width: "85%",
    color: "#000000",
    background: "#000000",
    alignSelf: "center",
    position: "absolute",
    left: "50%",

    transform: "translate(-50%, -50%)",
  },
  emailTitle: {
    marginTop: 50,
    bottom: 5,
    marginLeft: 400,
    fontWeight: 600,
    fontSize: 25,
  },
  emailInfo: {
    marginTop: 10,
    bottom: 5,
    marginLeft: 400,
    fontWeight: 300,
  },
  siteTitle: {
    marginTop: 25,
    marginLeft: 400,
    fontWeight: 600,
    fontSize: 25,
  },
  siteInfo: {
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
  aboutTitle: {
    marginLeft: 400,
    marginTop: 15,
    fontWeight: 600,
    fontSize: 25,
  },
  aboutInfo: {
    marginLeft: 400,
    marginTop: 15,
    fontWeight: 300,
  },
  msgButton: {
    marginLeft: 190,
    bottom: -26,
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
            <Typography className={classes.emailTitle}>Email</Typography>
            <Typography className={classes.emailInfo}>
              temp@email.com
            </Typography>
          </Grid>

          <Grid>
            <Typography className={classes.siteTitle}>Site</Typography>
            <Typography className={classes.siteInfo}>www.temp.com</Typography>
          </Grid>
          <Grid>
            <Typography className={classes.locationTitle}>Location</Typography>
            <Typography className={classes.locationInfo}>
              219 Temp Ave road
            </Typography>
          </Grid>

          <Grid>
            <Typography className={classes.aboutTitle}>About</Typography>
            <Typography className={classes.aboutInfo}>
              Bunch of random infomation putting it as a example here but will
              have to extract from user
            </Typography>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            className={classes.msgButton}
          >
            Message
          </Button>
          <Divider className={classes.profileDivider2} />
        </Grid>
      </div>
    </MuiThemeProvider>
  );
}

export default Profilepage;

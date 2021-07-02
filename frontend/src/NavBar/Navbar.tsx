import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Container, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import Profilepage from "../Pages/ProfilePage/Profilepage";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 88,
    background: "black"
  },
  list: {
    width: 200,
    background: "#FFFFFF",
    paddingTop: 120
  },
  drawerContainer: {
    overflow: "auto"
  },
  btn: {
    height: 50,
    paddingLeft: 40,
  },
  txt: {
    fontSize: 18

  }

}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const [state, setState] = React.useState(false);

  const navOpen = () => {
    setState(true);
  };

  const navClose = () => {
    setState(false);
  };

  const [hover, setHover] = React.useState(false);

  const hoverOver = () => {
    setHover(true);
  };
  const hoverOff = () => {
    setHover(false);
  };
  return (
    <Container >
      {/* <IconButton
        onClick={navOpen}
        onMouseEnter={() => hoverOver}
        onMouseLeave={() => hoverOff}
        className={classes.rightIcon}
      >
        {hover && <div>hovertext</div>}
        <ChevronRightIcon />
      </IconButton> */}

      <Drawer open variant="permanent">
        {/* <IconButton onClick={navClose}>
          <ChevronLeftIcon className={classes.leftArrow} />
        </IconButton> */}

        <List className={classes.list}>
          <ListItem
            button
            className={classes.btn}
            component={Link}
            to="/profile">
            <Typography className={classes.txt}>Profile</Typography>
          </ListItem>
          <ListItem
            button
            className={classes.btn}
            component={Link}
            to="/dashboard">
            <Typography className={classes.txt}>Dashboard</Typography>
          </ListItem>
          <ListItem button className={classes.btn}>
            <Typography className={classes.txt}>Classes</Typography>
          </ListItem>
          <ListItem button className={classes.btn}>
            <Typography className={classes.txt}>Discussions</Typography>
          </ListItem>
          <ListItem button className={classes.btn}>
            <Typography className={classes.txt}>Calendar</Typography>
          </ListItem>
          <ListItem button className={classes.btn}>
            <Typography className={classes.txt}>Assignments</Typography>
          </ListItem>
          <ListItem button className={classes.btn}>
            <Typography className={classes.txt}>Grades</Typography>
          </ListItem>
          <ListItem
            button
            className={classes.btn}
            component={Link}
            to="/people">
            <Typography className={classes.txt}>People</Typography>
          </ListItem>
          <ListItem button className={classes.btn}>
            <Typography className={classes.txt}>Messages</Typography>
          </ListItem>
        </List>
      </Drawer>
    </Container>
  );
}

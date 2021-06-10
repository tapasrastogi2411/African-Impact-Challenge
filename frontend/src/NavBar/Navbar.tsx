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
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import Profilepage from "../Pages/ProfilePage/Profilepage";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawerexpand: {
    width: drawerWidth,
    background: "#FFFFFF",
  },
  leftArrow: {
    marginLeft: 70,
  },

  profilebutton: {
    marginLeft: 25,
    alignItems: "center",
    textalign: "center",
    display: "inlineblock",
  },
  classesbutton: {
    marginLeft: 20,
    alignItems: "center",
    textalign: "center",
    display: "inlineblock",
  },
  dashboardButton: {
    marginLeft: 5,
    alignItems: "center",
    textalign: "center",
    display: "inlineblock",
  },
  discussionsButton: {
    marginLeft: 5,
    alignItems: "center",
    textalign: "center",
    display: "inlineblock",
  },
  calendarButton: {
    marginLeft: 17,
    alignItems: "center",
    textalign: "center",
    display: "inlineblock",
  },
  assignmentsButton: {
    marginLeft: 5,
    alignItems: "center",
    textalign: "center",
    display: "inlineblock",
  },
  gradesButton: {
    marginLeft: 20,
    alignItems: "center",
    textalign: "center",
    display: "inlineblock",
  },
  peopleButton: {
    marginLeft: 20,
    alignItems: "center",
    textalign: "center",
    display: "inlineblock",
  },
  messagesButton: {
    marginLeft: 10,
    alignItems: "center",
    textalign: "center",
    display: "inlineblock",
  },

  rightIcon: {
    marginTop: 77,
  },
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
    <div>
      <IconButton
        onClick={navOpen}
        onMouseEnter={() => hoverOver}
        onMouseLeave={() => hoverOff}
        className={classes.rightIcon}
      >
        {hover && <div>hovertext</div>}
        <ChevronRightIcon />
      </IconButton>

      <Drawer className={classes.drawerexpand} anchor="left" open={state}>
        <IconButton onClick={navClose}>
          <ChevronLeftIcon className={classes.leftArrow} />
        </IconButton>
        <List>
          <ListItem button>
            <Typography className={classes.profilebutton}>Profile</Typography>
          </ListItem>
          <ListItem button>
            <Typography className={classes.dashboardButton}>
              Dashboard
            </Typography>
          </ListItem>
          <ListItem button>
            <Typography className={classes.classesbutton}>Classes</Typography>
          </ListItem>
          <ListItem button>
            <Typography className={classes.discussionsButton}>
              Discussions
            </Typography>
          </ListItem>
          <ListItem button>
            <Typography className={classes.calendarButton}>Calendar</Typography>
          </ListItem>
          <ListItem button>
            <Typography className={classes.assignmentsButton}>
              {" "}
              Assignments
            </Typography>
          </ListItem>
          <ListItem button>
            <Typography className={classes.gradesButton}>Grades</Typography>
          </ListItem>
          <ListItem button>
            <Typography className={classes.peopleButton}>People</Typography>
          </ListItem>
          <ListItem button>
            <Typography className={classes.messagesButton}>Messages</Typography>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

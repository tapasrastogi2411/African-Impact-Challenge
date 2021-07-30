import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import { Container, Grid, withStyles } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 88,
    background: "black",
  },
  list: {
    width: 200,
    background: "#FFFFFF",
    paddingTop: 120,
  },
  drawerContainer: {
    overflow: "auto",
  },
  btn: {
    height: 50,
    paddingLeft: 40,
    "&:hover": {
      background: "#e8e8e8",
    },

  },
  txt: {
    fontSize: 18,
  },
}));

const StyledListItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: "red",

    },
  },
}))(ListItem);

export default function PersistentDrawerLeft(props: any) {
  const classes = useStyles();
  const location = useLocation();

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
    <Container>
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

        <List className={classes.list} >


          <ListItem
            button
            className={classes.btn}
            component={RouterLink}
            to="/profile"
            selected={'/profile' === location.pathname}>
            <Typography className={classes.txt}>Profile</Typography>
          </ListItem>
          <ListItem
            button
            className={classes.btn}
            component={Link}
            to="/dashboard"
            selected={'/dashboard' === location.pathname}
          >
            <Typography className={classes.txt}>Dashboard</Typography>
          </ListItem>
          <ListItem button className={classes.btn}>
            <Typography className={classes.txt}>Discussions</Typography>
          </ListItem>
          <ListItem button
            className={classes.btn}
            component={RouterLink}
            to="/calendar"
            selected={'/calendar' === location.pathname}
          >
            <Typography className={classes.txt}>Calendar</Typography>
          </ListItem>
          <ListItem
            button
            className={classes.btn}
            component={RouterLink}
            to="/videos"
            selected={'/videos' === location.pathname}

          >
            <Typography className={classes.txt}>Videos</Typography>
          </ListItem>
          <ListItem
            button
            className={classes.btn}
            component={RouterLink}
            to="/readings"
            selected={'/readings' === location.pathname}

          >
            <Typography className={classes.txt}>Readings</Typography>
          </ListItem>
          <ListItem
            button
            className={classes.btn}
            component={RouterLink}
            to="/assignments"
            selected={location.pathname.includes('/assignments')}

          >
            <Typography className={classes.txt}>Assignments</Typography>
          </ListItem>
          <ListItem button className={classes.btn}>
            <Typography className={classes.txt}>Grades</Typography>
          </ListItem>
          <ListItem
            button
            className={classes.btn}
            component={Link}
            to="/people"
            selected={'/people' === location.pathname}
            >
            <Typography className={classes.txt}>People</Typography>
          </ListItem>
          <ListItem button className={classes.btn}>
            <Typography className={classes.txt}>Messages</Typography>
          </ListItem>
          <ListItem
            button
            className={classes.btn}
            component={Link}
            to="/invites"
            selected={'/invites' === location.pathname}
            >
            <Typography className={classes.txt}>Invites</Typography>
          </ListItem>
        </List>
      </Drawer>
    </Container>
  );
}

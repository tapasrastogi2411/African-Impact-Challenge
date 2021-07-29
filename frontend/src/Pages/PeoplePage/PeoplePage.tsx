import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Controller, useForm } from "react-hook-form";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  useHistory,
} from "react-router-dom";
import Navbar from "../../NavBar/Navbar";
import List from "@material-ui/core/List";
import UserItem from "./UserItem";
import { Accordion, AccordionSummary, Divider, ListItem } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { textSpanIsEmpty } from "typescript";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import * as Constants from '../../utils';

const useStyles: (props?: any) => any = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
  },
  people: {
    display: "flex",
    width: "100%",
    marginTop: 100,
    marginLeft:180,
    marginRight: 15,
    justifyContent: "space-between",

    [theme.breakpoints.down('sm')]: {
      flexDirection: "column",
    },
  },
  item: {
    width: "25%",
    marginRight: 10,
    
    [theme.breakpoints.down('sm')]: {
      width: "100%",
    },
  },
  list: {
    marginBottom: 30,
    background: "white",
    borderRadius: 5,
  },
  txt: {
    fontWeight: 700,
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
    background: "#faf6f2",
  },
}));

export default function PeoplePage(props: any) {
  const classes = useStyles();
  const [instructors, setInstructors] = React.useState([]); // array of instructors
  const [entrepreneurs, setEntrepreneurs] = React.useState([]); // array of entrepreneurs
  const [startups, setStartups] = React.useState([]); // array of startups
  const [partners, setPartners] = React.useState([]); // array of partners

  const fetchInstructors = async () => {
    const response = await fetch(
      Constants.server + "/api/profile/getInstructors",
      {
        method: "GET",
        credentials: "include",
        mode: "cors",
      }
    );

    const responseData = await response.json();
    setInstructors(responseData);
    console.log("HERE: " + responseData);
  };

  const fetchEntrepreneurs = async () => {
    const response = await fetch(
      Constants.server + "/api/profile/getEntrepreneurs",
      {
        method: "GET",
        credentials: "include",
        mode: "cors",
      }
    );

    const responseData = await response.json();
    setEntrepreneurs(responseData);
  };

  const fetchPartners = async () => {
    const response = await fetch(
      Constants.server + "/api/profile/getPartners",
      {
        method: "GET",
        credentials: "include",
        mode: "cors",
      }
    );

    const responseData = await response.json();
    setPartners(responseData);
  };

  const fetchStartups = async () => {
    const response = await fetch(
      Constants.server + "/api/profile/getStartups",
      {
        method: "GET",
        credentials: "include",
        mode: "cors",
      }
    );

    const responseData = await response.json();
    setStartups(responseData);
  };

  useEffect(() => {
    fetchInstructors();
    fetchEntrepreneurs();
    fetchPartners();
    fetchStartups();
  }, []);

  return (
    <div className={classes.root}>
      <div>
        <Navbar></Navbar>
      </div>

      <div className={classes.people}>
        <div className={classes.item}>
            <Typography variant="h6" className={classes.txt}>
                Instructors
            </Typography>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Instructors</Typography>
              </AccordionSummary>
              <List>
                {instructors.length > 0 ? (
                  instructors.map((item) => (
                    <UserItem
                      name={`${item["first_name"]} ${item["last_name"]}`}
                      object={item}
                      peopleProps={props}
                    >
                      {" "}
                    </UserItem>
                  ))
                ) : (
                  <Typography align="center">
                    There are currently no Instructors!
                  </Typography>
                )}
              </List>
            </Accordion>
          </div>

          <div className={classes.item}>
            <Typography variant="h6" className={classes.txt}>
              Partners
            </Typography>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Partners</Typography>
              </AccordionSummary>
              <List>
                {partners.length > 0 ? (
                  partners.map((item) => (
                    <UserItem
                      name={`${item["first_name"]} ${item["last_name"]}`}
                      object={item}
                      peopleProps={props}
                    >
                      {" "}
                    </UserItem>
                  ))
                ) : (
                  <Typography align="center">
                    There are currently no Partners!
                  </Typography>
                )}
              </List>
            </Accordion>
          </div>

          <div className={classes.item}>
            <Typography variant="h6" className={classes.txt}>
              Entrepreneurs
            </Typography>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Entrepreneurs</Typography>
              </AccordionSummary>
              {console.log("ENTREPRENEUR")}
              <List>
                {entrepreneurs.length > 0 ? (
                  entrepreneurs.map((item) => (
                    <UserItem
                      name={`${item["first_name"]} ${item["last_name"]}`}
                      object={item}
                      peopleProps={props}
                    >
                      {" "}
                      {console.log(item)}
                    </UserItem>
                  ))
                ) : (
                  <Typography align="center">
                    There are currently no Entrepreneurs!
                  </Typography>
                )}
              </List>
            </Accordion>
          </div>

          <div className={classes.item}>
            <Typography variant="h6" className={classes.txt}>
              Startups
            </Typography>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Startups</Typography>
              </AccordionSummary>
              <List>
                {startups.length > 0 ? (
                  startups.map((item) => (
                  <ListItem button onClick={() => props.changeViewCompanyData(item)} component={RouterLink} to="/viewCompany" >
                    <ListItemAvatar>
                    <Avatar
                      src='/ProfilePage/profilepic.jpeg'
                    />
                    </ListItemAvatar>
                  <ListItemText primary={`${item["company_name"]}`}/>
                  </ListItem>

                  ))
                ) : (
                  <Typography align="center">
                    There are currently no Startups!
                  </Typography>
                )}
              </List>
            </Accordion>
          </div>
      </div>
    </div>
  );
}

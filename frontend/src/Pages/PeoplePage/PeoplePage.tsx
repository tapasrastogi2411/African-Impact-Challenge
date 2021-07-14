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
import { Accordion, AccordionSummary, Divider } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const useStyles: (props?: any) => any = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: 120,
    left: 230,
    width: 1400,
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
      "http://localhost:8080/api/profile/getInstructors",
      {
        method: "GET",
        credentials: "include",
        mode: "cors",
      }
    );

    const responseData = await response.json();
    setInstructors(responseData);
  };

  const fetchEntrepreneurs = async () => {
    const response = await fetch(
      "http://localhost:8080/api/profile/getEntrepreneurs",
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
      "http://localhost:8080/api/profile/getPartners",
      {
        method: "GET",
        credentials: "include",
        mode: "cors",
      }
    );

    const responseData = await response.json();
    setPartners(responseData);
  };

  useEffect(() => {
    fetchInstructors();
    fetchEntrepreneurs();
    fetchPartners();
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        className={classes.root}
      >
        <Grid container xs={3}>
          <Grid item xs={6} md={6}>
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
                  instructors.map((item) => <UserItem name={item}> </UserItem>)
                ) : (
                  <Typography align="center">
                    There are currently no Instructors!
                  </Typography>
                )}
              </List>
            </Accordion>
          </Grid>
        </Grid>
        <Grid container xs={3}>
          <Grid item xs={6} md={6}>
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
                  partners.map((item) => <UserItem name={item}> </UserItem>)
                ) : (
                  <Typography align="center">
                    There are currently no Partners!
                  </Typography>
                )}
              </List>
            </Accordion>
          </Grid>
        </Grid>
        <Grid container xs={3}>
          <Grid item xs={6} md={6}>
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
              <List>
                {entrepreneurs.length > 0 ? (
                  entrepreneurs.map((item) => (
                    <UserItem name={item}> </UserItem>
                  ))
                ) : (
                  <Typography align="center">
                    There are currently no Entrepreneurs!
                  </Typography>
                )}
              </List>
            </Accordion>
          </Grid>
        </Grid>
        <Grid container xs={3}>
          <Grid item xs={6} md={6}>
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
                  startups.map((item) => <UserItem name={item}> </UserItem>)
                ) : (
                  <Typography align="center">
                    There are currently no Startups!
                  </Typography>
                )}
              </List>
            </Accordion>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

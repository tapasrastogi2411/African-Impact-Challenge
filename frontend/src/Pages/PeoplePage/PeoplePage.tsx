import React from "react";
import Grid from "@material-ui/core/Grid";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Controller, useForm } from "react-hook-form";
import { Link as RouterLink, LinkProps as RouterLinkProps, useHistory } from 'react-router-dom';
import Navbar from "../../NavBar/Navbar";
import List from '@material-ui/core/List';
import UserItem from "./UserItem";
import { Divider } from "@material-ui/core";

const useStyles: (props?: any) => any = makeStyles((theme) => ({
    root: {
        position: "absolute",
        top: 120,
        left: 400,
        width: 1400
    },
    list: {
        marginBottom: 30,
        background: "white",
        borderRadius: 5
    },
    txt: {
        fontWeight: 700,
        textAlign: "center",
        paddingTop: 10,
        paddingBottom: 10,
        background: "#faf6f2",

    }

}));




export default function PeoplePage(props: any) {
    const classes = useStyles();

    return (
        <div >
            <Navbar></Navbar>
            <Grid container className={classes.root} >
                <Grid container xs={6} >
                    <Grid item xs={12} md={6} className={classes.list} >
                        <Typography variant="h6" className={classes.txt}>
                            Instructors
                    </Typography>
                        <List >
                            <UserItem />
                            <UserItem />
                            <UserItem />
                            <UserItem />
                            <UserItem />
                        </List>
                    </Grid>
                </Grid>
                <Grid container xs={6} >
                    <Grid item xs={12} md={6} className={classes.list} >
                        <Typography variant="h6" className={classes.txt}>
                            Partners
                    </Typography>
                        <List >
                            <UserItem />
                            <UserItem />
                            <UserItem />
                            <UserItem />
                            <UserItem />
                        </List>
                    </Grid>
                </Grid>
                <Grid container xs={6} >
                    <Grid item xs={12} md={6} className={classes.list} >
                        <Typography variant="h6" className={classes.txt}>
                            Entrepreneurs
                    </Typography>
                        <List >
                            <UserItem />
                            <UserItem />
                            <UserItem />
                            <UserItem />
                            <UserItem />
                        </List>
                    </Grid>
                </Grid>
                <Grid container xs={6} >
                    <Grid item xs={12} md={6} className={classes.list} >
                        <Typography variant="h6" className={classes.txt}>
                            Startups
                    </Typography>
                        <List >
                            <UserItem />
                            <UserItem />
                            <UserItem />
                            <UserItem />
                            <UserItem />
                        </List>
                    </Grid>
                </Grid>
            </Grid>
        </div >
    );
}

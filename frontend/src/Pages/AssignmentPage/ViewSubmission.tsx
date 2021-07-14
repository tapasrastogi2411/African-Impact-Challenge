import React, { Component, Fragment, useState, useEffect} from "react";
import {Grid, Tooltip} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../NavBar/Navbar";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Avatar, Divider, Toolbar } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Alert from '@material-ui/lab/Alert';

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
      position: "absolute",
      top: 130,
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
      marginTop: 15,
      marginBottom: 20,
    },
    
    pageTitle: {
      marginLeft: 10,
      marginRight: 790,
      marginTop: 40,
      display: "inline",
    },
    upload: {
      flexBasis: "23.33%",
      color: "#5f6368",
      fontSize: "12px",
      fontWeight: 400,
      marginTop: 8,
    },
    embed: {
        backgroundColor: 'white',
        objectPosition: 'left top',
        marginRight: 180,
        borderRadius: "10px",
        padding: "5px",
        boxShadow: "0px 0px 16px",
        // overflowY: 'auto'
      },

      labels: {
        fontSize: 22,
        fontWeight: 700
      },
      values: {
          fontsize: 24,
          fontWeight: 400
      }
  
  }));

// 2021-07-14T03:38:31.000Z
//["Tue", "Jul", "13", "2021", "11:38:31 PM"]
function parseSubmissionTime(submitTime: string) {
    //console.log(deadline);
    let datetimeObj:any = {};
    
    let datetime = new Date(submitTime).toString().split(' ', 4);
    let time = new Date(submitTime).toLocaleTimeString('en-US');
    
    datetimeObj['time'] = time;
    //console.log(datetime);
    let datetimeString = "";
    for (let i = 0; i < datetime.length; i++) {
        if (i == 2) {
            datetimeString += datetime[i] + ", ";
        } else {
            datetimeString += datetime[i] + " ";
        }
      
    }
    datetimeObj['date'] = datetimeString;
    return datetimeObj;
}

function parseFileName(assignment: any) {
    var filePath = assignment.submission_file_path;
    return filePath.substring(filePath.indexOf('_')+1,filePath.length)
};

function ViewSubmission(props: any) {
    const classes = useStyles();
    const assignment = props.assignment;
    const datetime = parseSubmissionTime(assignment.submission_date);



    {console.log(props.assignment)}



    return (
        <React.Fragment>
            <Navbar />

            <Grid container className={classes.root} direction="column" justify="flex-start" >
                <Grid item>
                    <Typography variant="h4" className={classes.pageTitle}> Submission for {assignment.title} </Typography>
                    <Divider className={classes.divider} />
                </Grid>
                <Grid item>
                    <Grid container direction="row" >
                        <Grid item className={classes.embed}>

                            <embed type="application/pdf"
                            src={"http://localhost:8080" + assignment.submission_file_path}
                            width="1000"
                            height="800" 
                            />
                
                        </Grid>
                        <Grid item>
                            <Grid container direction="column" spacing={4}>
                                
                                <Grid item>
                                    <Typography  className={classes.labels} > Submitted File </Typography>
                                    <a href={"http://localhost:8080" + assignment.submission_file_path}  target='_blank' download>  
                                        <Typography className={classes.values}> {parseFileName(assignment)} </Typography>
                                    </a>
                                </Grid>

                                <Grid item>
                                    <Typography  className={classes.labels} > Submission Time </Typography>
                                    <Typography  className={classes.values}> {datetime['date']} </Typography>
                                    <Typography  className={classes.values}> {datetime['time']} </Typography>
                                </Grid>

                                <Grid item>
                                    <Typography  className={classes.labels} > Score </Typography>
                                    <Typography  className={classes.values} style={{letterSpacing: "1px"}}> {!assignment.grade ? '-' : assignment.grade}/{assignment.total_marks}</Typography>
                                </Grid>

                                <Grid item>
                                    <Typography  className={classes.labels} > Feedback </Typography>
                                    <Typography  className={classes.values}>{!assignment.feedback ? 'N/A' : assignment.feedback}</Typography>
                                </Grid>

                            </Grid>
                        </Grid>

                        
                            
                            
                       

                    </Grid>
                </Grid>



            </Grid>
        </React.Fragment>
       

        
    );
  }
  
export default ViewSubmission;
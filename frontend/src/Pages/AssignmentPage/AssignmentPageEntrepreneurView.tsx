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
    width: "85%",
    height: 3,
    marginTop: 15,
    marginBottom: 20,
  },
  
  submitBtn: {
    backgroundColor: "#fcb040",
    color: "#ffffff",
    width: 120,
    "&:hover": { background: "#e69113" },
    borderRadius: 20,
    marginRight: 269,
    marginBottom: 20,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
  },
  reSubmitBtn: {
    backgroundColor: "#fcb040",
    color: "#ffffff",
    width: 120,
    "&:hover": { background: "#e69113" },
    borderRadius: 20,
    marginRight: 50,
    marginBottom: 20,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
  },
  viewSubmissionBtn: {
    backgroundColor: "#fcb040",
    color: "#ffffff",
    width: 170,
    "&:hover": { background: "#e69113" },
    borderRadius: 20,
    marginRight: 50,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12
  },
  uploadBtn: {
    backgroundColor: "#fcb040",
    color: "#ffffff",
    width: 120,
    "&:hover": { background: "#e69113" },
    marginBottom: 10
  },
  input: {
    display: "none",
  },
  pageTitle: {
    marginLeft: 10,
    marginRight: 790,
    marginTop: 40,
    display: "inline",
  },
  assignmentHeader: {
    fontSize: 22,
  },
  noAssignmentHeader: {
    fontSize: 22,
  },
  assignmentCard: {
    width: 1200,
  },
  cardBody: {
    marginBottom: 25,
    color: "#5f6368",
    fontSize: "12px",
    fontWeight: 400
  }, 
  cardDesc: {
    fontSize: "13px",
    fontWeight: 400,
    marginBottom: 35
  },
  upload: {
    flexBasis: "23.33%",
    color: "#5f6368",
    fontSize: "12px",
    fontWeight: 400,
    marginTop: 8,
  },

}));

const defaultFileVals = {
  name: ""
}

const RedTextTypography = withStyles({
  root: {
    color: "#e43132",
  },
})(Typography);

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
    border: '1px solid #dadde9',
    marginRight: 20,
  },
}))(Tooltip);


function parseDeadline(deadline: string) {
  //console.log(deadline);
  let datetime = new Date(deadline).toString().split(' ', 5);
  let time = new Date(deadline).toLocaleTimeString('en-US');
  datetime[4] = time;
  //console.log(datetime);
  let datetimeString = "";
  for (let i = 0; i < datetime.length; i++) {
    datetimeString += datetime[i] + " ";
  }
  return datetimeString;
}

function Submit(props: any) {
  const classes = useStyles();
  return <Button variant="contained" className={classes.submitBtn} onClick={props.openHandler} >Submit</Button>
}

function DisabledSubmit(props: any) {
  const classes = useStyles();
  return <LightTooltip placement="bottom-start" title="The deadline for this assignment has passed">
      <span >
        <Button variant="contained" className={classes.submitBtn}  disabled>Submit</Button>
      </span>
  </LightTooltip>
}

function Resubmit(props: any) {
  const classes = useStyles();
  return <Button variant="contained" className={classes.reSubmitBtn} onClick={props.openHandler} >Resubmit</Button>
}

function DisabledResubmit(props: any) {
  const classes = useStyles();
  return <LightTooltip placement="bottom-start" title="The deadline for this assignment has passed">
      <span >
        <Button variant="contained" className={classes.reSubmitBtn}  disabled>Resubmit</Button>
      </span>
  </LightTooltip>
}



function AssignmentPageEntrepreneurView(prop: any) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState(defaultFileVals);
  const [assignment, setAssignment] = React.useState(defaultFileVals);
  const [assignmentItems, setAssignmentItems] = React.useState([]); // array of objects
  const [alertMessage, setAlertMessage] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAlertMessage("");
    setFile(defaultFileVals);
  };

  const handleUploadedFile = (e: any) => {
    setAlertMessage("");
    setFile(e.target.files[0]);
  };
  const handleAlert = (e: string) => {
    setAlertMessage(e);
  };
  /* const handleSubmit = async (e: any) => { // upload selected file to the server
    //console.log(file);
    if (file.name == "") {
      handleAlert("Please select a file");
      return false;
    }
    
    const formData = new FormData();
    
    formData.append("assignments", file as any);
    formData.append("postedAssignment", JSON.stringify(assignment as any));
    

    const response = await fetch("http://localhost:8080/api/course/upload/assignment/entrepreneur/", {
      method: "POST",
      body: formData,
      credentials: 'include',
      mode: "cors",

    });

    console.log(response.status);
    if (response.status > 300 || response.status < 200) {
      handleAlert("Failed to upload");
    }
    handleAlert("Successfully Uploaded");
    handleClose();
    handleGet();
  }; */

  const handleSubmit = async (e: any) => { // upload selected file to the server
    //console.log(file);
    try{

    if (file.name == "") {
      handleAlert("Please select a file");
      return false;
    }
    
    const formData = new FormData();
    
    // formData.append("company", file as any);
    console.log("exec");
    

    const response = await fetch("http://localhost:8080/api/course/getCompanyFiles/", {
      method: "GET",
      credentials: 'include',
      mode: "cors",
    });

    if (response.status > 300 || response.status < 200) {
      handleAlert("Failed to upload");
    }
    
    let responseJson = await response.json();
    responseJson = JSON.parse(responseJson);
    console.log(responseJson);

    handleAlert("Successfully Uploaded");
    handleClose();
    handleGet();
  } catch (e) {
    console.log("Invalid JSON");
    console.log(e);
  }
  };

  const parseItem = (e: any) => {
    var filePath = e.file_path;
    return filePath.substring(filePath.indexOf('_')+1,filePath.length)
  };

  const handleGet = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/course/getAssignments",
        {
          method: "GET",
          credentials: 'include',
          mode: "cors",
        }
      );
      const responseData = await response.json();
      if (response.status > 300 || response.status < 200) {
        throw responseData;
      }
      //console.log(responseData);
      setAssignmentItems(responseData);

    } catch (err) {
      console.log(err);
    }
  };

  const handleUpload = (e: any) => {
    console.log(e);
  };

  const renderSubmit = (assignmentItem: any) => {
      let deadline = Date.parse(assignmentItem.deadline);
      let currentTime = Date.now();
      if (deadline < currentTime) {
        return <DisabledSubmit />
      }
      return <Submit openHandler={handleClickOpen} />
  }

  const renderResubmit = (assignmentItem: any) => {
    let deadline = Date.parse(assignmentItem.deadline);
    let currentTime = Date.now();
    if (deadline < currentTime) {
      return <DisabledResubmit />
    }
    return <Resubmit openHandler={handleClickOpen} />
}

  const renderButtons = (index:any) => {
    let submissionUser:any = (assignmentItems[index] as any).submission_user;

    if (!submissionUser) {
      return (
              <Grid item>
                {renderSubmit(assignmentItems[index])}
              </Grid>
              );
    } else {
      return (
              <React.Fragment>
                <Grid item>
                  <Grid container direction="row" spacing={0}>
                    <Grid item>
                      {renderResubmit(assignmentItems[index])}
                    </Grid>
                    <Grid item>
                      <Link to="/assignments/entrepreneur/submission" style={{textDecoration: "none"}}> 
                        <Button variant="contained" className={classes.viewSubmissionBtn} onClick={handleClickOpen} >View Submission</Button> 
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </React.Fragment>
        
        );
    }

  };

  
    const renderAssignments = (item: any, index: any) => {  // item is an object containing assignment data
    // call event handler in main and set state to the current assignment.
    // determine whether current assignment has been submitted by the currently logged-in user and render accordingly
    // assignmentItems[index]
    
    return(
      <Accordion className={classes.assignmentCard} onClick={() => {
        
          setAssignment(assignmentItems[index]);
          prop.setAssignment(assignmentItems[index]);
      
      
        }}>
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <AssignmentOutlinedIcon style={{marginTop: 2, marginRight: 8}} /> 
          <Typography variant="h6" style={{flexBasis: "73.33%"}} >{item.title}</Typography>
          <Typography className={classes.upload} style={{marginLeft: 600}} >Due: {parseDeadline(item.deadline)}</Typography>
      
        </AccordionSummary>
        
        <AccordionDetails style={{flexDirection: "column"}} >
          <div style={{flexBasis: "33.33%"}}>
          <Typography variant="body2" className={classes.cardBody} style={{marginBottom: 14}}>
              Posted: {item.upload_date.substring(0,10)}
            </Typography>
            <Typography variant="body2" className={classes.cardBody} style={{marginBottom: 25}}>
              Created by {item.upload_user}
            </Typography>
          </div>

          <div style={{flexBasis: "33.33%"}}>
            <Typography variant="body2" className={classes.cardDesc}>
            {item.description}
            </Typography>
          </div>
          <Divider style={{marginBottom: "20px"}}/>
          <Grid container direction="row" justify="space-between"> 

            <Grid item>
                <Grid container direction="column"> 
                    <Grid item>   
                        <Typography variant="body2" style={{marginBottom: 10}}>
                            Download File
                        </Typography>
                    </Grid>

                    <Grid item>
                        <a href={"http://localhost:8080" + item.file_path }  target='_blank' download>
                            <Typography variant="body2" >
                                {parseItem(item)}
                            </Typography>
                        </a>
                    </Grid>
                </Grid>
            </Grid>

            
              {renderButtons(index)}
            
        </Grid>
        </AccordionDetails>
      </Accordion>
      
    ); 

  }

 
  

  

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <div>
      {handleGet}
      <Navbar></Navbar>
      <Grid container className={classes.root}>
        <Grid item xs={12} container spacing={2}>
          
          <Grid>

            <Typography variant="h4" className={classes.pageTitle}>
              Assignments
            </Typography>
           
  
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                
              >
                <DialogTitle id="form-dialog-title" >Upload</DialogTitle>
                
                <DialogContent style = {{width: "300px"}}>

                    <input
                      style={{ display: "none" }}
                      id="contained-button-file"
                      type="file"
                      accept="application/pdf,.doc,.docx,.txt"
                      onChange = {handleUploadedFile}
                    />
                    <label htmlFor="contained-button-file">
                      <Button className={classes.uploadBtn} variant="contained" color="primary" component="span"  style={{width:"130px"}}>
                        Select File
                      </Button>
                      <Typography style={{display:"inline", marginLeft: "20px"}}>{file.name.length > 0 ? file.name : "No files selected" } </Typography>
                    </label>
              
                </DialogContent>

                <DialogContent>
                  {alertMessage.length > 0 ? (
                     <Alert severity="error">{alertMessage}</Alert>
                  ) : null}
                </DialogContent>

                <DialogActions>
                  <Button onClick={handleSubmit} color="primary">
                    Save
                  </Button>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            
          </Grid>
        </Grid>

        <Divider className={classes.divider} />
          {assignmentItems.length > 0 ?  assignmentItems.map((item, index) => (
      renderAssignments(item, index)
    )) : ( 
            <Typography align="center" className={classes.noAssignmentHeader}>
              There are currently no assignments!
            </Typography>
          )}

      </Grid>
    </div>

    
  );
}

export default AssignmentPageEntrepreneurView;
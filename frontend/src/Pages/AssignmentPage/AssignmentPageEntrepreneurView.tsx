import React, { Component, Fragment, useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
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
  profilePic: {
    width: 200,
    marginTop: 20,
    borderRadius: 5,
  },
  info: {
    marginTop: 3,
    marginLeft: 15,
    maxWidth: 1100,
  },
  category: {
    fontSize: 22,
    fontWeight: 700,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  submitBtn: {
    backgroundColor: "#fcb040",
    color: "#ffffff",
    width: 100,
    "&:hover": { background: "#e69113" },
    borderRadius: 20,
    marginRight: 50
    
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
  uploadButton: {
    //marginLeft: 800,
    marginBottom: "10px",
    width: 200,
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
    

  }
}));

const defaultFileVals = {
  name: ""
}

const RedTextTypography = withStyles({
  root: {
    color: "#e43132",
  },
})(Typography);

function AssignmentPageEntrepreneurView(prop: any) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState(defaultFileVals);
  const [assignment, setAssignment] = React.useState(defaultFileVals);
  const [assignmentItems, setAssignmentItems] = React.useState([]); // array of objects
  const [alertMessage, setAlertMessage] = React.useState("");
  const handleClickOpen = () => {
    let tmp:any = assignment;
    console.log(tmp);
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
  const handleSubmit = async (e: any) => { // upload selected file to the server
    console.log(file);
    if (file.name == "") {
      handleAlert("Please select a file");
      return false;
    }
    
    const formData = new FormData();
    
    formData.append("assignments", file as any);
    formData.append("submission", JSON.stringify(assignment as any));
    
    
    

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
      setAssignmentItems(responseData);

    } catch (err) {
      console.log(err);
    }
  };

  const handleUpload = (e: any) => {
    console.log(e);
  };

  
    const renderAssignments = (item: any, index: any) => {  // item is an object containing assignment data
    // call event handler in main and set state to the current assignment
    return(
      <Accordion className={classes.assignmentCard} onClick={() => {setAssignment(assignmentItems[index])}}>
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <AssignmentOutlinedIcon style={{marginTop: 2, marginRight: 8}} /> 
          <Typography variant="h6" style={{flexBasis: "73.33%"}} >{item.title}</Typography>
          <Typography className={classes.upload} style={{marginLeft: 600}} >Posted: {item.upload_date.substring(0,10)}</Typography>
        </AccordionSummary>
        
        <AccordionDetails style={{flexDirection: "column"}} >
          <div style={{flexBasis: "33.33%"}}>

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

            <Grid item> 
                <Button className={classes.submitBtn} onClick={handleClickOpen} >Submit</Button>
            </Grid>
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
import React, {useState, useEffect} from "react";
import SignIn from "../UserProfile/LogIn";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../NavBar/Navbar";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Avatar, Container, Dialog, DialogActions, DialogContent, DialogContentText,  Divider, TextField, Toolbar, Tooltip, withStyles } from "@material-ui/core";

import profilepic from "../ProfilePage/profilepic.jpeg";
import ChatIcon from '@material-ui/icons/Chat';
import EditIcon from '@material-ui/icons/Edit';
import BusinessIcon from '@material-ui/icons/Business';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import tims from "./tims.jpeg";
import building from "./building.png";
import member from "./member.jpg";
import founder from "./founder.jpg";
import AddIcon from '@material-ui/icons/Add';
import AssignmentIcon from "@material-ui/icons/Assignment";
import * as Constants from '../../utils';

// Adding these imports for making the rendered files look cleaner through Accordion

import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: 170,
    left: 300,
    width: 1400,
    height: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  divider: {
    width: "100%",
    height: 3,
    marginTop: 10,
    marginBottom: 10,
  },
  profilePic: {
    width: 200,
    marginTop: 25,
    borderRadius: 5
  },
  info: {
    marginTop: 3,
    marginLeft: 60,
    maxWidth: 1100
  },
  category: {
    fontSize: 22,
    fontWeight: 700
  },
  role: {
    fontSize: 22,
    fontWeight: 700,
    width: 200,
    display: "block",
  },
  about: {
    marginBottom: 30,
    maxWidth: "80%",
  },
  btn: {
    backgroundColor: "#fcb040",
    color: "#ffffff",
    width: 180,
    '&:hover': { background: "#e69113" },
    marginLeft: 10,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  companyBtn: {
    backgroundColor: "#fcb040",
    color: "#ffffff",
    width: "200px",
    '&:hover': { background: "#e69113" },
    marginLeft: 1200,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  invBtn: {
    backgroundColor: "#fcb040",
    color: "#ffffff",
    width: 150,
    '&:hover': { background: "#e69113" },
    borderRadius: 20,
    marginLeft: 1250,
  },

  relatedPic: {
    width: 100,
    height: "auto",
    alignSelf:"center",
    marginLeft:"auto",
    marginRight:"auto",
    marginTop: 10,
    marginBottom: 10,
  },
  relatedPicFounder: {
    width: 100,
    height: "auto",
    marginTop: 2
  },

  // Adding the basic structure of the upload button, adapted from AssignmentPage.tsx
  uploadButton: {
    //marginLeft: 800,
    marginBottom: "10px",
    width: 200,
  },

  upload: {
    flexBasis: "23.33%",
    color: "#5f6368",
    fontSize: "12px",
    fontWeight: 400,
    marginTop: 8,
  },

  // Adding the basic structure of how the rendered files should look like

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

  // Adding submit and resubmit button structure 

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

  /* relatedUser: {
    marginRight: 40
  } */
}));

const defaultCompanyData = {
  company_name: "",
  address: "",
  industry: "",
  bio: "",
  creator: ""
};

const RedTextTypography = withStyles({
  root: {
    color: "#e43132",
  },
})(Typography);

function CompanyPage(props: any) {
  
  const classes = useStyles();
  const [companyData, setCompanyData] = React.useState(defaultCompanyData);
  const [members, setMembers] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [file, setFile] = React.useState("");

  // Change assignmentItem to companyFile state to use for rendering files on the company page
  const [companyFiles, setCompanyFiles] = React.useState([]); // array of objects

  // Making a setCompany instead of a setAssignment
  const [company, setCompany] = React.useState("");
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAlertMessage("");
  };

  const handleUploadedFile = (e: any) => {
    setFile(e.target.files[0]);
  };
  const handleAlert = (e: string) => {
    setAlertMessage(e);
  };

  const parseItem = (e: any) => {
    var filePath = e.file_path;
    return filePath.substring(filePath.indexOf('_')+1,filePath.length)
  };

  const handleGet = async () => {
    const response = await fetch(
      Constants.server + "/api/course/getCompanyFiles",
      {
        method: "GET",
        credentials: 'include',
        mode: "cors",
      }
    );
    let responseData = await response.json();
    responseData = JSON.parse(responseData);
    if (response.status > 300 || response.status < 200) {
      throw responseData;
    }
    
    setCompanyFiles(responseData); // Changed setAssignmentItems to setCompanyFiles in this original handleGet method
  };

  const handleSubmit = async (e: any) => {
    const formData = new FormData();
    formData.append("assignments", file);
    formData.append("title", title);
    formData.append("description", description);

    const response = await fetch(Constants.server + "/api/course/upload", {
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

  const updateMemebers = async (e: any) => {
    // pass in company name
    const formData = new FormData();
    formData.append("company_name", companyData.company_name);

    var object:any = {};
      formData.forEach(function(value: any, key: any){
      object[key] = value;
      });
    
    const response = await fetch(Constants.server + "/api/profile/getCompanyMembers/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(object),

    });

    setMembers(await response.json());

  }
  const handleCompanyFileSubmit = async (e: any) => {
    const formData = new FormData();
    formData.append("company", file);
    formData.append("title", title);
    formData.append("description", description);

    const response = await fetch(Constants.server + "/api/course/upload/companyFile", {
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



  const getCompanyData = () => {
    fetch(Constants.server + '/api/profile/getCompany/', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                },
            credentials: 'include',
            mode: 'cors',
        })
        .then(response => { // company data successfully retrieved
            return response.json();
        })
        .then(responseJson => {
          setCompanyData(responseJson);
        })
        .catch(err => { // company data cannot be retrieved 
            console.log("error"); 
        })
  }

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

  // The render submit and resubmit methods o be used in render button method

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

  // The render button to be used in the accordion view

  const renderButtons = (index:any) => {
    let submissionUser:any = (companyFiles[index] as any).submission_user;

    if (!submissionUser) {
      return (
              <Grid item>
                {renderSubmit(companyFiles[index])}
              </Grid>
              );
    } else {
      return (
              <React.Fragment>
                <Grid item>
                  <Grid container direction="row" spacing={0}>
                    <Grid item>
                      {renderResubmit(companyFiles[index])}
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
  
  // Adding an renderCompanyFiles method here using Accordion
  const renderCompanyFiles = (item: any, index: any) => {  // item is an object containing assignment data
    // call event handler in main and set state to the current assignment.
    // determine whether current assignment has been submitted by the currently logged-in user and render accordingly
    // assignmentItems[index]
    
    return(
      <Accordion className={classes.assignmentCard}>
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <AssignmentOutlinedIcon style={{marginTop: 2, marginRight: 2}} /> 
          <Typography variant="h6" style={{flexBasis: "73.33%"}} >{item.title}</Typography>
        </AccordionSummary>
        
        <AccordionDetails style={{flexDirection: "column"}} >
          <div style={{flexBasis: "33.33%"}}>
          <Typography variant="body2" className={classes.cardBody} style={{marginBottom: 14}}>
              Posted on: {item.upload_date.substring(0,10)}
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
                        <a href={Constants.awsServer + "" + item.file_path }  target='_blank' download>
                            <Typography variant="body2" >
                                {parseItem(item)}
                            </Typography>
                        </a>
                    </Grid>
                </Grid>
            </Grid>

            
              {/* {renderButtons(index)} */}
            
        </Grid>
        </AccordionDetails>
      </Accordion>
      
    
      
    ); 

  }

  React.useEffect(() => {
    getCompanyData();
    handleGet();
  }, []);


  

  return (
    <div >
      <Navbar></Navbar>

      <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogContent>
                  <DialogContentText>
                    Please fill in the following fields
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    name="title"
                    label="title"
                    type="text"
                    fullWidth
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <TextField
      
                    margin="dense"
                    id="description"
                    name="description"
                    label="description"
                    type="text"
                    fullWidth
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </DialogContent>

                <DialogContent>
                  <TextField
                    type={"file"}
                    name="assignments"
                    id="assignments"
                    label="assignments"
                    inputProps={{ accept: "application/pdf,.doc,.docx,.txt" }}
                    onChange={handleUploadedFile}
                  ></TextField>
                  <AssignmentIcon />
                </DialogContent>
                <DialogContent>
                  {alertMessage.length > 0 ? (
                    <RedTextTypography>{alertMessage}</RedTextTypography>
                  ) : null}
                </DialogContent>
                <DialogActions>
                  {/* <Button onClick={handleSubmit} color="primary">
                    Submit
                  </Button> */}
                  <Button onClick={handleCompanyFileSubmit} color="primary">
                    Submit
                  </Button>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>

      <Grid container className={classes.root}>
    
        <Grid container>
            <Grid item xs={12}>
                    
                    <Button startIcon={<AddIcon />} className={classes.invBtn}>Invite</Button>
            </Grid>

            <Grid item xs={12}>
                <Typography variant="h4">{companyData.company_name}</Typography>
            </Grid>
            
        </Grid>




        <Divider className={classes.divider} />
        <Grid xs={2} item alignItems="center">
          <img src={building} className={classes.profilePic} />
          <Button component={Link} to="/update" startIcon={<EditIcon />} className={classes.btn}>Update Info</Button>
        </Grid>
        <Grid
          item
          container
          spacing={3}
          xs={10}
          direction="row"
          className={classes.info}>

          <Grid item xs={4}>
            <Typography className={classes.category}>Company Address</Typography>
            <Typography >{companyData.address}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.category}>Industry</Typography>
            <Typography >{companyData.industry}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.category}>About</Typography>
            <Typography >{companyData.bio}</Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />


        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography variant="h5">Members</Typography>
          </Grid>


          <Grid item >
              <Typography align="center">Founder</Typography>
              <Avatar src={founder} className={classes.relatedPic} />
              <Typography align="center">{companyData.creator}</Typography>
          </Grid>
          

          <Grid item >
             <Typography align="center">Member</Typography>
            <Avatar src={member} className={classes.relatedPic} />
            <Typography align="center">Aaron1999</Typography>
          </Grid>
          <Grid item >
          <Typography align="center">Member</Typography>
            <Avatar src={member} className={classes.relatedPic} />
            <Typography align="center">Jason2002</Typography>
          </Grid>
        </Grid>

        <Divider className={classes.divider} />
      
          <Typography variant="h5">Resources</Typography>
          <Grid item>
          <Button
                variant="outlined"
                onClick={handleClickOpen}
                // className={classes.uploadButton}
                startIcon={<AddIcon />}
                style={{marginLeft: 850}}
                className={classes.invBtn}
              >
                Resources
              </Button>
            </Grid>
              <Grid item style= {{marginTop: '12px'}} >
                {companyFiles.length > 0 ? companyFiles.map((item, index) => (

                  renderCompanyFiles(item, index)

                  )) : (

                    <Typography align="center" className={classes.noAssignmentHeader}>
                      There are no files uploaded at this moment!
                    </Typography>
                  )}
                </Grid>
        
      </Grid>


      
      

  </div>
  );
}

export default CompanyPage;
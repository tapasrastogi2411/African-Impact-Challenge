import React from "react";
import SignIn from "../UserProfile/LogIn";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../NavBar/Navbar";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Avatar, Divider, Toolbar } from "@material-ui/core";
import profilepic from "./profilepic.jpeg";
import ChatIcon from "@material-ui/icons/Chat";
import EditIcon from "@material-ui/icons/Edit";
import BusinessIcon from "@material-ui/icons/Business";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: 170,
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
    marginTop: 10,
    marginBottom: 10,
  },
  profilePic: {
    width: 200,
    marginTop: 5,
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
    "&:hover": { background: "#e69113" },
    marginLeft: 10,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  companyBtn: {
    backgroundColor: "#fcb040",
    color: "#ffffff",
    width: "200px",
    "&:hover": { background: "#e69113" },
    marginLeft: 1200,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  relatedPic: {
    width: 100,
    height: "auto",
  },
  relatedUser: {
    marginRight: 40,
  },
  invitebtn: {
      backgroundColor: "#fcb040",
      color: "#ffffff",
      width: 250,
      '&:hover': { background: "#e69113" },
      borderRadius: 20,
    marginLeft: 1150,
    top: 35,
  },
  alt: {
    marginLeft: 300,
    marginTop:100,
  }
}));

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const resultdata = {
  result: false
}

const defaultUserData = {
  username: "",
  user_role: "",
  honorifics: "",
  first_name: "",
  last_name : "",
  email: "",
  phone_number: "",
  country: "",
  address: "",
  showCompanyBtn: true, // unused
}

const viewUserData = {
  username: "",
  role_name: "",
  honorifics: "",
  first_name: "",
  last_name : "",
  email: "",
  phone_number: "",
  country: "",
  address: "",
}

const defaultCompanyData = {
  company_name: "",
  address: "",
  industry: "",
  bio: "",
  creator: ""
};

function ViewProfilepage(props: any) {
  const classes = useStyles();
  const [hasCompany, setHasCompany] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [viewUserCompany, setViewUserCompany] = React.useState(resultdata);
  const [userData, setUserData] = React.useState(viewUserData);
  const [mainUser, setMainUser] = React.useState(defaultUserData);
  const [companyData, setCompanyData] = React.useState(defaultCompanyData);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [invite, setInvite] = React.useState(true);
  const handleCloseSnackbar = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const getUserData = () => {
    setUserData(props.viewUserDataProp);
    setMainUser(props.viewLoggedInUserData);
    updateHasCompany();
  }

  const handleAlert = (e: string) => {
    setAlertMessage(e);
  };

  const handleInvite = async () => {
    var formdata = new FormData();
    formdata.append("receiver", userData.username);
    formdata.append("company_name", companyData.company_name);

    var object:any = {};
      formdata.forEach(function(value: any, key: any){
      object[key] = value;
    });
    //fetch req to backend after user presses invite button.
    const response = await fetch('http://localhost:8080/api/profile/createInvite/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(object),
    });
    
    console.log(response.status);
    if (response.status > 300 || response.status < 200) {
      handleAlert("Invite Failed to send");
      setOpen(true);
    }
    handleAlert("Invite Successfully Sent");
    setInvite(false);
    setOpen(true);
  }

  const updateHasCompany = async () => {
    // makes request to backend to check if logged in user has a company and updates Hascompany.
    const response = await fetch('http://localhost:8080/api/profile/getCompany/', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      mode: 'cors',
    });
    if (response.status > 300 || response.status < 200) {
      setHasCompany(false);
    }
    else {
      setCompanyData(await response.json());
      setHasCompany(true);
    }
    var formdata = new FormData();
    formdata.append("username", userData.username);

    var object:any = {};
      formdata.forEach(function(value: any, key: any){
      object[key] = value;
      });
    
    const response2 = await fetch('http://localhost:8080/api/profile/checkCompany/' + userData.username, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      mode: 'cors',
    });
    const responseData = await response2.json();
    setViewUserCompany(responseData);    

  }
  
  React.useEffect( () => {
    getUserData();
    updateHasCompany();
    setAlertMessage("");
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <Collapse in={open}>
            {alertMessage.length > 0 && open ? (
            <Alert variant="outlined" color="info" icon={false} action={
                      <IconButton
                        aria-label="close"
                color="inherit"
                
                        size="small"
                        onClick={() => {
                          setOpen(false);
                          setAlertMessage("");
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    } className={classes.alt}>{alertMessage}</Alert>
            ) : null}
            </Collapse>
      <Grid container className={classes.root}>
        <Grid>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={4000}
            onClose={handleCloseSnackbar}
          >
            <Alert severity="success" onClose={handleCloseSnackbar}>
              Company successfully created!
            </Alert>
          </Snackbar>
        </Grid>
        
        
        <Grid container xs={2}>

        <Grid item xs={12}> {hasCompany && userData.role_name == "Entrepreuner" && invite && (!viewUserCompany.result) ? (
                  <Button startIcon={<BusinessIcon />} className={classes.invitebtn} onClick={handleInvite}>
                  Invite to Company
                 </Button>
        ): null
          }
            </Grid>

        <Grid item xs={12}>
          <Typography variant="h4">{userData.username}</Typography>
          </Grid>
        </Grid>
        

        <Divider className={classes.divider} />
        <Grid xs={2} item alignItems="center">
          <Typography className={classes.role} variant="caption" align="center">
            {userData.role_name}
          </Typography>
          <img src={profilepic} className={classes.profilePic} />
          <Button startIcon={<ChatIcon />} className={classes.btn}>
            Message
          </Button>
        </Grid>
        <Grid
          item
          container
          spacing={3}
          xs={10}
          direction="row"
          className={classes.info}
        >
          <Grid item xs={4}>
            <Typography className={classes.category}>Honorifics</Typography>
            <Typography>{userData.honorifics}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.category}>First Name</Typography>
            <Typography>{userData.first_name}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.category}>Last Name</Typography>
            <Typography>{userData.last_name}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.category}>Phone Number</Typography>
            <Typography>{userData.phone_number}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.category}>Email</Typography>
            <Typography>{userData.email} </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.category}>Address</Typography>
            <Typography>{userData.address}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.category}>Country</Typography>
            <Typography>{userData.country}</Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5">Related Users</Typography>
          </Grid>
          <Grid item className={classes.relatedUser}>
            <Avatar src={profilepic} className={classes.relatedPic} />
            <Typography align="center">User1</Typography>
          </Grid>
          <Grid item className={classes.relatedUser}>
            <Avatar src={profilepic} className={classes.relatedPic} />
            <Typography align="center">User2</Typography>
          </Grid>
          <Grid item className={classes.relatedUser}>
            <Avatar src={profilepic} className={classes.relatedPic} />
            <Typography align="center">User3</Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ViewProfilepage;

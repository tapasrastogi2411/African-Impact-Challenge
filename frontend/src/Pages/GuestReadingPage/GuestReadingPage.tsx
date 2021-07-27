import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core/styles";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as Constants from '../../utils';

const useStyles = makeStyles((theme) => ({
  root: { 
    marginTop: 100,
    marginLeft: 200,   
    marginRight: "10%",
  },
  divider: {
    width: "100%",
    height: 3,
    marginTop: 5,
    marginBottom: 10,
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
    // width: 1200,
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

const RedTextTypography = withStyles({
  root: {
    color: "#e43132",
  },
})(Typography);

function GuestReadingPage(prop: any) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [readingItems, setreadingItems] = React.useState([]); // array of objects
  const [alertMessage, setAlertMessage] = React.useState("");
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
  const handleSubmit = async (e: any) => {
    const formData = new FormData();
    formData.append("readings", file);
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

  const parseItem = (e: any) => {
    var filePath = e.file_path;
    return filePath.substring(filePath.indexOf('_')+1,filePath.length)
  };

  const handleGet = async () => {
    const response = await fetch(
      Constants.server + "/api/course/getReadings",
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
    
    setreadingItems(responseData);
  };

  

    const renderReadings = (item: any) => {  // item is an object containing assignment data
    // call event handler in main and set state to the current assignment
    return(
      <Accordion className={classes.assignmentCard}>
        <AccordionSummary 
        expandIcon={
        <ExpandMoreIcon />
        }
        aria-controls="panel1a-content"
        id="panel1a-header"
        >
        <LocalLibraryOutlinedIcon style={{marginTop: 2, marginRight: 8}} /> 
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
        <Typography variant="body2" style={{marginBottom: 10}}>
        Download File
        </Typography>
        <a href={"http://localhost:8080" + item.file_path }  target='_blank' download>
            <Typography variant="body2" >
              {parseItem(item)}
            </Typography>
        </a>
        </AccordionDetails>
      </Accordion>
    ); 
  }

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.pageTitle}>Readings</Typography>
      <Divider className={classes.divider} />
      <div>
          <List component="nav" aria-labelledby="readingList">
            {readingItems.length > 0 ?  readingItems.map((item) => (
            renderReadings(item)
            )) : ( 
            <Typography align="center" className={classes.noAssignmentHeader}>
                There are currently no Readings!
            </Typography>
            )}
          </List>
      </div>
    </div>
  );
}

export default GuestReadingPage;


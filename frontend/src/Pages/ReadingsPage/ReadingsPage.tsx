import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../NavBar/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import List from "@material-ui/core/List";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  combine: {
    display: "flex",
    flexDirection: "column",
    marginTop: 100,
    marginLeft:200,
    marginRight: "5%",
    width: "100%"
  },
  divider: {
    width: "100%",
    height: 3,
    marginTop: 5,
    marginBottom: 10,
  },
  readingTitle: {
    display: "flex",
    justifyContent: "space-between"
  },
  pageTitle: {
    marginLeft: 10,
    marginRight: 790,
    marginTop: 40,
    display: "inline",
  },
  uploadButton: {
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

function ReadingsPage(prop: any) {
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

    const response = await fetch("http://localhost:8080/api/course/upload", {
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
      "http://localhost:8080/api/course/getReadings",
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
          expandIcon={<ExpandMoreIcon />}
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
      <div>
          <Navbar></Navbar>
      </div>
      <div className={classes.combine}>
          <div>
            <div className={classes.readingTitle}>
                <div>
                  <Typography variant="h4" className={classes.pageTitle}>Readings</Typography>
                </div>
                <div>
                  <Button
                      variant="outlined"
                      onClick={handleClickOpen}
                      className={classes.uploadButton}
                      >
                  Upload Readings
                  </Button>
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
                            onChange={(e) =>
                        setTitle(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            name="description"
                            label="description"
                            type="text"
                            fullWidth
                            onChange={(e) =>
                            setDescription(e.target.value)}
                            />
                      </DialogContent>
                      <DialogContent>
                      <TextField
                      type={"file"}
                      name="readings"
                      id="readings"
                      label="readings"
                      inputProps={{ accept: "application/pdf,.doc,.docx,.txt" }}
                      onChange={handleUploadedFile}
                      ></TextField>
                      <LocalLibraryOutlinedIcon />
                      </DialogContent>
                      <DialogContent>
                        {alertMessage.length > 0 ? (
                        <RedTextTypography>{alertMessage}</RedTextTypography>
                        ) : null}
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleSubmit} color="primary">
                        Submit
                        </Button>
                        <Button onClick={handleClose} color="primary">
                        Cancel
                        </Button>
                      </DialogActions>
                  </Dialog>
                </div>
            </div>
            <Divider className={classes.divider} />
          </div>
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
    </div>
  );
}

export default ReadingsPage;


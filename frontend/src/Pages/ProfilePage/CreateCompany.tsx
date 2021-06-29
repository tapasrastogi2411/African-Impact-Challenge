import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import BusinessIcon from '@material-ui/icons/Business';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { borders } from '@material-ui/system';
import { useForm, Controller } from "react-hook-form";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { SignInAjax } from '../UserProfile/LogIn';


const useStyles = makeStyles((theme) => ({
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
    createLeftBtn: {
        backgroundColor: "#fcb040",
        borderRadius: 10,
        color: "#ffffff",
        '&:hover': { background: "#e69113" },
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 20,
        marginTop: 20,
        marginBottom: 20,
    },
    createRightBtn: {
        backgroundColor: "#fcb040",
        borderRadius: 10,
        color: "#ffffff",
        '&:hover': { background: "#e69113" },
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 338,
        marginTop: 20,
        marginBottom: 20,
    },

    industry: {
        width: "177px",
    },
    companySize: {
        width: "177px",
    },
    card: {
        maxWidth: "500px"
    },
    about: {
        width: "300px"
    },
    aboutText: {
        marginTop: "20px"
    },
    error: {
        color: "red"
    },


  }));


const defaultError = {
    companyName: "",
    companyAddress: "",
    industry: "",
    size: "",
    about: ""
};

const defaultFieldData = {
    companyName: "",
    companyAddress: "",
    industry: "",
    size: "",
    about: ""
};


const createCompanyAjax = (data: any) => {
    
    var formdata = new FormData();
    formdata.append("companyName", data.companyName);
    formdata.append("companyAddress", data.companyAddress);
    formdata.append("industry", data.industry);
    formdata.append("size", data.size);
    formdata.append("about", data.about);

    // convert formData to JSON since that is what the server looks for
    var object:any = {};
    formdata.forEach(function(value: any, key: any){
        object[key] = value;
    });

    fetch('http://localhost:8080/api/profile/createCompany/', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            },
        body: JSON.stringify(object),
        credentials: 'include',
        mode: 'cors',
        
    })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.log("error");
    })
        
    
}

export default function CreateCompany(props: any) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(defaultError);
    const [fieldData, setFieldData] = React.useState(defaultFieldData);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
        setFieldData(defaultFieldData);
        setError(defaultError);
        setOpen(false);
    };

    const validate = (data: {companyName:any, companyAddress:any, industry:any, size:any, about:any}) => {
        const newError = { ...defaultError };
        // console.log(data);
        if (data.companyName == "") {
            newError.companyName = "Company name is required";
        }
        if (data.industry == "") {
            newError.industry = "Industry is required";
        }
        setError(newError);
        const haveError = Object.values(newError).find(
            (el: String) => el.length > 0
        );

        if (!haveError) {
            createCompanyAjax(fieldData);
        }

    };

    var setField = (e: any) => {
        const newData = { ...defaultFieldData };
        var name = e.target.name;
        var value = e.target.value;
        //console.log(e);
        //console.log(name);
        //console.log(value);

        switch(name) {
            case 'companyName':
                setFieldData(prevState => {
                    return {...prevState, companyName: value }
               });
                setError(prevState => {
                    return {...prevState, companyName: "" }
                });
                break;
            
            case 'companyAddress':
                setFieldData(prevState => {
                    return {...prevState, companyAddress: value }
               });
                break;
            
            case 'about':
                setFieldData(prevState => {
                    return {...prevState, about: value }
                });
                break;
            case 'industry-select':
                setFieldData(prevState => {
                    return {...prevState, industry: value }
                });

                setError(prevState => {
                    return {...prevState, industry: "" }
                    });
                break;
            case 'size-select':
                setFieldData(prevState => {
                    return {...prevState, size: value }
                });
                setError(prevState => {
                    return {...prevState, size: "" }
                    });
                break;

            default:
                break;
        }
    };

    return(
        <div >
            <Button startIcon={<BusinessIcon />} className={classes.companyBtn} onClick={handleClickOpen} aria-labelledby="form-dialog-title">Create Company </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="sm" scroll="body" >
                <DialogTitle id="form-dialog-title" style={{background:"#f2f6fa"}}>Create Company</DialogTitle>
                
                    <form
                        noValidate
                        onSubmit={(e) => {validate(fieldData)}}
                    >
                        <DialogContent className={classes.card} style={{ overflow: "hidden", background:"#f2f6fa"}}>
                        <Grid
                        container
                        spacing={4}>
                            
                            <Grid item>
                                <TextField
                                    variant="standard"
                                    name="companyName"
                                    label="Company Name"
                                    id="companyName"
                                    required
                                    onChange={(e) => {setField(e)}}
                                    error={error.companyName == "" ? false: true}
                                    helperText={error.companyName}
                                />
                            </Grid>

                            <Grid item>
                                <TextField
                                    variant="standard"
                                    name="companyAddress"
                                    label="Company Address"
                                    id="companyAddress"
                                    onChange={(e) => {setField(e)}}
                                />
                            </Grid>

                            <Grid item  >
                                <FormControl className={classes.industry} error={error.industry != "" && true}>
                                    <InputLabel id="industry-select-label" required >Industry</InputLabel>
                                    <Select
                                        labelId="industry-select-label"
                                        id="industry-select"
                                        name="industry-select"
                                        value={fieldData.industry}
                                        onChange={(e: any) => setField(e)}
                                       
                                        >
                                        
                                        <MenuItem value="energy">Energy</MenuItem>
                                        <MenuItem value="manufacturing">Manufacturing</MenuItem>
                                        <MenuItem value="technology">Technology</MenuItem>
                                        <MenuItem value="aerospace">Aerospace</MenuItem>
                                        <MenuItem value="construction">Construction</MenuItem>
                                        <MenuItem value="other">Other</MenuItem>
                                    </Select>
                                    {error.industry != "" && <FormHelperText > Industry is required </FormHelperText>} 
                                </FormControl>
                            </Grid>

                            <Grid item>
                                <FormControl className={classes.companySize} >
                                    <InputLabel id="size-select-label"># of Employees</InputLabel>
                                    <Select
                                        labelId="size-select-label"
                                        id="size-select"
                                        value={fieldData.size}
                                        onChange={(e: any) => setField(e)}
                                        name="size-select"
                                        >
                                        <MenuItem value={10}>0 - 3</MenuItem>
                                        <MenuItem value={20}>4 - 8</MenuItem>
                                        <MenuItem value={30}>{'>'} 8</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                           
                            <Grid item>
                                <Typography variant="subtitle1" className={classes.aboutText}>
                                    Briefly tell us a little about your company
                                </Typography>
                            </Grid>


                            <Grid item>
                                <FormControl className={classes.about}>
                                    <TextField
                                        variant="outlined"
                                        name="about"
                                        label="About"
                                        id="about"
                                        multiline
                                        rowsMax={4}
                                        onChange={(e) => {setField(e)}}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions style={{background:"#f2f6fa"}}>
                        <div >
                            <Button onClick={handleClose}  className={classes.createLeftBtn}>
                                Cancel
                            </Button>
                            <Button onClick={(e) => validate(fieldData)} className={classes.createRightBtn}>
                                Create
                            </Button>

                        </div>
                        
                        
                 </DialogActions>
                 </form>

                

                

            

            </Dialog>

        </div>

    );

}
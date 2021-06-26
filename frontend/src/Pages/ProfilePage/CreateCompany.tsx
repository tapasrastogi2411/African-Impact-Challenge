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
import { useForm } from "react-hook-form";


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


  }));




export default function CreateCompany(props: any) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return(
        <div >
            <Button startIcon={<BusinessIcon />} className={classes.companyBtn} onClick={handleClickOpen} aria-labelledby="form-dialog-title">Create Company </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="sm" scroll="body" >
                <DialogTitle id="form-dialog-title" style={{background:"#f2f6fa"}}>Create Company</DialogTitle>
                <DialogContent className={classes.card} style={{ overflow: "hidden", background:"#f2f6fa"}}>
                        <Grid
                        container
                        spacing={4}>
                            
                            <Grid item>
                                <TextField
                                    variant="standard"
                                    name="name"
                                    label="Company Name"
                                    id="name"
                                />
                            </Grid>

                            <Grid item>
                                <TextField
                                    variant="standard"
                                    name="address"
                                    label="Company Address"
                                    id="address"
                                />
                            </Grid>

                            <Grid item>
                                <FormControl className={classes.industry}>
                                    <InputLabel id="industry-select-label">Industry</InputLabel>
                                    <Select
                                        labelId="industry-select-label"
                                        id="industry-select"
                                        value=""
                                        >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item>
                                <FormControl className={classes.companySize}>
                                    <InputLabel id="industry-select-label">Size</InputLabel>
                                    <Select
                                        labelId="industry-select-label"
                                        id="industry-select"
                                        value=""
                                        >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
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
                                    />
                                </FormControl>
                            </Grid>

    
                        </Grid>
                    



                </DialogContent>

                <DialogActions style={{background:"#f2f6fa"}}>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Create
                    </Button>
                </DialogActions>

            </Dialog>

        </div>

    );

}
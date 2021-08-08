import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { Link as RouterLink, LinkProps as RouterLinkProps, useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { Divider } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { useLocation } from "react-router-dom";
import * as Constants from '../../utils';

const axios = require('axios');

const useStyles: (props?: any) => any = makeStyles((theme) => ({
    root: {
        marginTop: 250,
        [theme.breakpoints.down('lg')]: {
            marginTop: 200,
        },
    },
    paragraph: {
        fontWeight: 500,
        fontSize: 15,
        color: "#72716f",
    },
    divider: {
        width: "100%",
        height: 3,
        marginTop: 15,
        marginBottom: 10,
    },
    form: {
        width: "100%", 
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#fcb040",
        color: "#ffffff",
        '&:hover': { background: "#e69113" },
    },
    loginpagebtn: {
        margin: theme.spacing(6, 0, 2),
        backgroundColor: "#fafafa",
        color: "#343434",
        '&:hover': { background: "#f0f0f0" },
    },
    input: {
        background: "white",
        borderRadius: "20px"
    },
    title: {
        fontWeight: 600,
        fontSize: 36,
    },
    registration: {
        marginTop: 10,
    },
    error: {
        backgroundColor: "#FF7F7F",
        fontWeight: 800,
        marginTop: theme.spacing(1),
    }

}));


const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#e69113',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#e69113',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                //borderColor: 'black',
            },
            '&:hover fieldset': {
                borderColor: '#fcb040',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#e69113',
            },
        },
    },
})(TextField);

const defaultErr = {resetCodeErr: "", passErr: "", backendErr: "false"};

export const SignInAjax =  async (
    data: any,
    onSuccess: any,
    setError: any,
    ) => {
    try {
        var newErr = {... defaultErr};
        var errFlag = false;
        if (data.resetCode == "") {
            errFlag = true;
            newErr.resetCodeErr = "Reset Code is required";
        }
        if (data.password == "") {
            errFlag = true;
            newErr.passErr = "Password is required";
        }


        setError(newErr);

        if (errFlag == false){
            var formdata = new FormData();
            formdata.append("username", data.uname);
            formdata.append("resetCode", data.resetCode);
            formdata.append("password", data.password);

            // convert formData to JSON since that is what the server looks for
            var object:any = {};
            formdata.forEach(function(value: any, key: any){
                object[key] = value;
            });

                
            const response = await fetch(Constants.server + '/api/profile/resetpassword/', {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                mode: 'cors',
                body: JSON.stringify(object),
            });
            
            const responseData = await response.json();
           if (response.status > 300 || response.status < 200) {
               throw responseData;
           }
           console.log(response);
           onSuccess(responseData);
           window.location.reload()
           
        }
        
        
    } catch (e) { // username is invalid
        console.log(e);
        setError( (prevState:Object) => {
            return { ...prevState, backendErr:"true" } 
            });
    } 
};

interface IState {
    detail?: string;
  }

export default function ResetPassword(props: any) {
    const location = useLocation();
    const uname = (location.state as IState).detail;
    const history = useHistory();
    // get user data from server and pass it to the handler
    const onSuccess = (responseData: any) => {  
        //history.push('/login');   //change t0 reset password  
        history.push({
            pathname: "/login",
            state: {pwdReset: true}
        })
        console.log(responseData);   
    }
 
    const classes = useStyles();
    const { register, handleSubmit } = useForm();
    const [error, setError] = React.useState(defaultErr); 

    const onSubmit = ({ resetCode, password }: any) => {
        SignInAjax({ uname,resetCode, password }, onSuccess, setError);
    };

    const renderError = () => {
        if (error.backendErr == "true") {
            return <Alert variant="filled" severity="error" className={classes.error}>
                        Invalid Reset Code
                    </Alert>
        }
    }

    return (
        <Container component="main" maxWidth="xs" className={classes.root}>
            <Typography variant="h5" className={classes.title} align="center">
                Enter Reset Code 
            </Typography>
            <Typography className={classes.paragraph} align="center">
                Please check your email for a message with your code. Your code is 8 characters long.
            </Typography>
            
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
                <CssTextField
                    error={error.resetCodeErr == "" ? false: true}
                    helperText={error.resetCodeErr}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="resetCode"
                    label="Reset Code"
                    name="resetCode"
                    autoComplete="resetCode"
                    className={classes.input}
                    inputRef={register}
                    onInput={() => setError( prevState => {return { ...prevState, resetCodeErr:"", backendErr: "false" } } )}
                />

                <CssTextField
                    error={error.passErr == "" ? false: true}
                    helperText={error.passErr}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="New Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    className={classes.input}
                    inputRef={register}
                    onInput={() => setError( prevState => {return { ...prevState, passErr:"", backendErr: "false"} } )}
                />
                {renderError()}
                
                <Button type="submit" fullWidth variant="contained" size="large" className={classes.submit}>
                    Reset Password
                </Button>            
            </form>
        </Container>
    );
}

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

const defaultErr = {userErr: "", passErr: "", backendErr: "false"};

export const SignInAjax =  async (
    data: any,
    onSuccess: any,
    setError: any,
    ) => {
    try {
        var newErr = {... defaultErr};
        var errFlag = false;
        if (data.username == "") {
            errFlag = true;
            newErr.userErr = "Username is required";
        }

        setError(newErr);

        if (errFlag == false){
            var formdata = new FormData();
            formdata.append("username", data.username);

            // convert formData to JSON since that is what the server looks for
            var object:any = {};
            formdata.forEach(function(value: any, key: any){
                object[key] = value;
            });

                
            const response = await fetch('http://localhost:8080/api/profile/forgotpassword/', {
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
           onSuccess(responseData, data.username);
           window.location.reload()
           
        }
        
        
    } catch (e) { // username is invalid
        console.log(e);
        setError( (prevState:Object) => {
            return { ...prevState, backendErr:"true" } 
            });
    } 
};

export default function ForgotPassword(props: any) {
    const history = useHistory();
    // get user data from server and pass it to the handler
    const onSuccess = (responseData: any, username: string) => {  
        history.push({pathname: '/resetpassword', state: {detail: username}});   //change t0 reset password  
        console.log(responseData);        
    }
 
    const classes = useStyles();
    const { register, handleSubmit } = useForm();
    const [error, setError] = React.useState(defaultErr); 

    const onSubmit = ({ username }: any) => {
        SignInAjax({ username }, onSuccess, setError);
    };

    const renderError = () => {
        if (error.backendErr == "true") {
            return <Alert variant="filled" severity="error" className={classes.error}>
                        Invalid username
                    </Alert>
        }
    }

    return (
        <Container component="main" maxWidth="xs" className={classes.root}>
            <Typography variant="h5" className={classes.title} align="center">
                Trouble Logging In?
            </Typography>
            <Typography className={classes.paragraph} align="center">
                Enter your username and we'll send you a link to get back into your account.
            </Typography>
            
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
                <CssTextField
                    error={error.userErr == "" ? false: true}
                    helperText={error.userErr}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    className={classes.input}
                    inputRef={register}
                    onInput={() => setError( prevState => {return { ...prevState, userErr:"", backendErr: "false" } } )}
                />
                {renderError()}
                
                <Button type="submit" fullWidth variant="contained" size="large" className={classes.submit}>
                    Send Reset Code
                </Button>            
            </form>

            <Divider className={classes.divider} />
            <Link href="#" variant="body2" color="textSecondary" component={RouterLink} to="/signup">{"Don't have an account? Sign Up"}</Link>
            <Button fullWidth variant="contained" size="large" className={classes.loginpagebtn} component={RouterLink} to="/login">
                    Back To Login
            </Button>
        </Container>
    );
}

import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { Link as RouterLink, LinkProps as RouterLinkProps, useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';

const axios = require('axios');


const useStyles: (props?: any) => any = makeStyles((theme) => ({
    paper: {
        marginTop: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#fcb040",
        color: "#ffffff",
        '&:hover': { background: "#e69113" },

    },
    input: {
        background: "white",
        borderRadius: "20px"
    },
    text: {
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

// userErr/passErr = username/password not provided
// backendErr = username already taken or invalid password
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
        if (data.password == "") {
            errFlag = true;
            newErr.passErr = "Password is required";
        }

        setError(newErr);


        if (errFlag == false){
            var formdata = new FormData();
            formdata.append("username", data.username);
            formdata.append("password", data.password);

            // convert formData to JSON since that is what the server looks for
            var object:any = {};
            formdata.forEach(function(value: any, key: any){
                object[key] = value;
            });

                
            const response = await fetch('http://localhost:8080/api/profile/login/', {
                method: "POST",
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
           
        }
        
        
    } catch (e) { // username or password is invalid
        console.log(e);
        setError( (prevState:Object) => {
            return { ...prevState, backendErr:"true" } 
            });
    } 
};

export default function SignIn(props: any) {
    const history = useHistory();
    // get user data from server and pass it to the handler
    const onSuccess = (responseData: any) => {  
        history.push('/profile');
        console.log(responseData);

        // get company membership 
        checkUserInCompany(responseData);
        props.updateUserDataHandler(responseData); 

        
    }
    const checkUserInCompany = (responseData: any) => {
        fetch('http://localhost:8080/api/profile/inCompany/', {
          method: "GET",
          credentials: 'include',
          mode: 'cors',
        })
        .then(response => { // if company exists then show view company button/hide create company button
            if (response.status == 200) {
                props.setCompanyCreateBtnHandler(false); // hide
            } else {
                props.setCompanyCreateBtnHandler(true); // show
            }

        })
        .catch(err => { 
            console.log("error");
            props.setCompanyCreateBtnHandler(false); // hide
        })
    }


    const classes = useStyles();
    const { register, handleSubmit } = useForm();
    const [error, setError] = React.useState(defaultErr); 

    const onSubmit = ({ username, password }: any) => {
        SignInAjax({ username, password }, onSuccess, setError);
    };


    
    const renderError = () => {
        if (error.backendErr == "true") {
            return <Alert variant="filled" severity="error" className={classes.error}>
                        Invalid username or password
                    </Alert>
        }
    }
    
    // If user successfully registered and is taken to login page, regVal prop is set to true
    // -> render the alert 
    const renderRegAlert = () => {
        if (props.regVal == "true") {
            return <Alert variant="standard" severity="success" className={classes.registration}>
                        User successfully registered! 
                    </Alert>
        } else {
            return "";
        }
    }



    return (
        <Container component="main" maxWidth="xs">
            <Typography variant="h5" className={classes.text}>
                WELCOME BACK!
            </Typography>
            <Link
                href="#"
                variant="body2"
                color="textSecondary"
                component={RouterLink}
                to="/signup"
            >
                {"Don't have an account? Sign Up"}
            </Link>

            
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={classes.form}
                noValidate
            >
                
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

                <CssTextField
                    error={error.passErr == "" ? false: true}
                    helperText={error.passErr}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    className={classes.input}
                    inputRef={register}
                    onInput={() => setError( prevState => {return { ...prevState, passErr:"", backendErr: "false"} } )}
                />
                {renderError()}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    className={classes.submit}
                >
                    Log In
                </Button>

                <Link
                    href="#"
                    variant="body2"
                    color="textSecondary"
                >
                    Forgot password?
                </Link>

                

            </form>

            {renderRegAlert()}

            
        </Container>
    );
}

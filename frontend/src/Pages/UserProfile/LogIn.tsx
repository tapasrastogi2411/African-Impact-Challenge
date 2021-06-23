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

export const SignInAjax = async (
    data: any,
    onSuccess: any,

    setError: any,
) => {
    try {
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
            body: JSON.stringify(object),
        });
        const responseData = await response.json();
        if (response.status > 300 || response.status < 200) {
            throw responseData;
        }
        onSuccess();
    } catch (e) {
        console.log(e);
        setError(
            "Password does not match user name"
        );
    }
};

export default function SignIn(props: any) {
    const history = useHistory();
    const onSuccess = () => {
        history.push('/profile')
    }
    const classes = useStyles();
    const { register, handleSubmit } = useForm();
    const [error, setError] = React.useState("");

    const onSubmit = ({ username, password }: any) => {
        SignInAjax({ username, password }, onSuccess, setError);
    };

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

                />

                <CssTextField
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
                />
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

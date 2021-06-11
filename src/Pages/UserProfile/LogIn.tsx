import React, {useState, useEffect} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

const ThemeColor = "#a0530d";

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

export default function SignIn(props: any) {
    const classes = useStyles();
    const [formState, setFormState] = useState({username: "", password: ""});

    const signinHandler = (event: any) => {
        event.preventDefault();
        fetch('https://localhost:8080/api/profile/login/', {
            method: "POST",
            headers:{
                "accepts":"application/json",
                'Content-Type': 'application/json'
            },        
            body: JSON.stringify(formState),
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log("err"));
        
    }

    function updateUsername(value: any) {
        setFormState(prevState => { return {...prevState, username: value}; })
    }

    function updatePassword(value: any) {
        setFormState(prevState => { return {...prevState, password: value}; })
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
                onSubmit = {signinHandler}
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
                    onChange={e => updateUsername(e.target.value)}
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
                    onChange={e => updatePassword(e.target.value)}
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
        </Container>
    );
}

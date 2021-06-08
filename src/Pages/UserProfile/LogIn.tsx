import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
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

    },
    input: {
        background: "white",
        borderRadius: "20px"
    },
    text:{
        fontWeight: 600,
        fontSize: 36,
    }

}));



export default function SignIn(props: any) {
    const classes = useStyles();

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
                className={classes.form}
                noValidate
            >
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    className={classes.input}
                />
                <TextField
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

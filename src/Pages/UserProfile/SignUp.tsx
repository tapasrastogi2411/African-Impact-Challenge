import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

const ThemeColor = "#a0530d";

const useStyles: (props?: any) => any = makeStyles((theme) => ({
    fst: {
        paddingLeft: 147
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: 20

    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#fcb040",
        color: "#ffffff",
        width: 300,
        '&:hover': { background: "#e69113" },


    },
    input: {
        background: "white",
        //borderRadius: "20px",
        width: 300
    },
    text: {
        fontWeight: 600,
        fontSize: 36,
    }

}));



export default function SignUp(props: any) {
    const classes = useStyles();
    const [role, setRole] = React.useState('');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setRole(event.target.value as string);
    };
    return (
        <Container component="main" maxWidth="md">

            <div className={classes.fst}>
                <Typography variant="h5" className={classes.text}>
                    Sign Up
                        </Typography>
                <Link
                    href="#"
                    variant="body2"
                    color="textSecondary"
                    component={RouterLink}
                    to="/login"
                >
                    {"Already have an account? Log In"}
                </Link>
            </div>
            <form
                className={classes.form}
                noValidate
            >
                <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={3}>

                    <Grid item>
                        <TextField
                            variant="outlined"
                            required
                            name="Full Name"
                            label="Full Name"
                            type="text"
                            id="full-name"
                            className={classes.input}
                        />
                    </Grid>
                    <Grid item>
                        <FormControl
                            variant="outlined"
                            className={classes.input}
                            required>
                            <InputLabel>Role</InputLabel>
                            <Select
                                label="Role"
                                id="role"
                                value={role}
                                onChange={handleChange}
                            >
                                <MenuItem value="Entrepreneur">Entrepreneur</MenuItem>
                                <MenuItem value="Instructor">Instructor</MenuItem>
                                <MenuItem value="Partner">Partner</MenuItem>
                            </Select>
                        </FormControl>

                    </Grid>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            required
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            className={classes.input}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            required
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            className={classes.input}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            name="phone_number"
                            label="Phone Number"
                            type="text"
                            id="phone_number"
                            className={classes.input}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            className={classes.input}
                        />
                    </Grid>

                    <Grid item>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                    </Grid>
                </Grid>

            </form>

        </Container >
    );
}

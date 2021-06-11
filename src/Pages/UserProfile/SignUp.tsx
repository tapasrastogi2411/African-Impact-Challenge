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
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Controller, useForm } from "react-hook-form";
import { Link as RouterLink, LinkProps as RouterLinkProps, useHistory } from 'react-router-dom';
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

const defaultError = {
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    role: "",
    password: "",
};

const SignUpAjax = async (data: any, onSuccess: any
) => {
    try {
        var formdata = new FormData();
        formdata.append("username", data.username);
        formdata.append("password", data.password);
        formdata.append("phone_number", data.phone_number);
        formdata.append("first_name", data.first_name);
        formdata.append("last_name", data.first_name);
        formdata.append("role", data.role);
        formdata.append("email", data.email);
        const response = await fetch('https://localhost:8080/api/profile/signup/', {
            method: "post",
            body: formdata,
            credentials: "include",
        });
        const responseData = await response.json();
        if (response.status > 300 || response.status < 200) {
            throw responseData;
        }
        onSuccess();

    } catch (e) {
        console.dir(e);
    }
};

export default function SignUp(props: any) {
    const history = useHistory();

    const classes = useStyles();
    // const [role, setRole] = React.useState('');
    const { register, handleSubmit, control } = useForm();
    const [error, setError] = React.useState(defaultError);
    const onSuccess = () => {
        history.push('/login')
    }
    // const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    //     setRole(event.target.value as string);
    // };
    const onSubmit = ({ username, email, first_name, last_name, password, role, phone_number }: any) => {
        const newError = { ...defaultError };
        if (username.match(/[^a-z0-9@\/\.\+\-\_]/i)) {
            newError.username =
                "User name may contain only letters, numbers, and @/./+/-/_ characters";
        } else if (username.length < 6 || username.length > 28) {
            newError.username = "User name must be between 6 and 28 characters long";
        }
        if (email && !email.match(/.{3,}@.+\.[a-z\d]{2,}/i)) {
            newError.email = "Please enter a valid email";
        }
        if (first_name && first_name.match(/[^a-zA-Z\s]/i)) {
            newError.first_name =
                "Name may contain only letters";
        }

        if (last_name && last_name.match(/[^a-zA-Z\s]/i)) {
            newError.last_name =
                "Name may contain only letters";
        }
        if (!password || password.length < 8) {
            newError.password = password
                ? "Password must be at least 8 characters long"
                : "Password is required";
        }
        const haveError = Object.values(newError).find(
            (el: String) => el.length > 0
        );
        setError(newError);
        if (!haveError) {
            console.log({ username, email, first_name, password, role, phone_number });
            SignUpAjax(
                { username, email, first_name, password, role, phone_number }, onSuccess
            );


        }
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
                onSubmit={handleSubmit(onSubmit)}
            >
                <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={3}>

                    <Grid item>
                        <CssTextField
                            error={!!error.first_name}
                            helperText={error.first_name}
                            variant="outlined"
                            required
                            name="first_name"
                            label="First Name"
                            type="text"
                            id="first_name"
                            className={classes.input}
                            inputRef={register({ required: true })}

                        />
                    </Grid>

                    <Grid item>
                        <CssTextField
                            error={!!error.last_name}
                            helperText={error.last_name}
                            variant="outlined"
                            required
                            name="last_name"
                            label="Last Name"
                            type="text"
                            id="last_name"
                            className={classes.input}
                            inputRef={register({ required: true })}

                        />
                    </Grid>

                    <Grid item>
                        <FormControl
                            variant="outlined"
                            className={classes.input}
                            required>
                            <Controller
                                as={
                                    <CssTextField select required variant="outlined" label="Role">
                                        <MenuItem value="Entrepreneur">Entrepreneur</MenuItem>
                                        <MenuItem value="Instructor">Instructor</MenuItem>
                                        <MenuItem value="Partner">Partner</MenuItem>
                                    </CssTextField>
                                }
                                name="role"
                                control={control}
                                defaultValue=""
                            />
                        </FormControl>

                    </Grid>
                    <Grid item>
                        <CssTextField
                            error={!!error.username}
                            helperText={error.username}
                            variant="outlined"
                            required
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            className={classes.input}
                            inputRef={register({ required: true })}

                        />
                    </Grid>
                    <Grid item>
                        <CssTextField
                            variant="outlined"
                            required
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            className={classes.input}
                            inputRef={register({ required: true })}

                        />
                    </Grid>
                    <Grid item>
                        <CssTextField
                            name="phone_number"
                            variant="outlined"
                            label="Phone Number"
                            type="text"
                            id="phone_number"
                            className={classes.input}
                            inputRef={register}
                        />
                    </Grid>
                    <Grid item>
                        <CssTextField
                            variant="outlined"
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            className={classes.input}
                            inputRef={register}

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

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
import CountrySelect from  './countries';
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
    honorifics: "",
    address: "",
};

const defaultReqFields = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    role: ""
}



const SignUpAjax = async (data: any, onSuccess: any
) => {
    try {
        var formdata = new FormData();
        formdata.append("username", data.username);
        formdata.append("password", data.password);
        formdata.append("phone_number", data.phone_number);
        formdata.append("first_name", data.first_name);
        formdata.append("last_name", data.last_name);
        // console.log(data.role);
        if (data.role == "Entrepreneur") {
            formdata.append("user_role", "2");
        } else if (data.role == "Instructor") {
            formdata.append("user_role", "1");
        } else {
            formdata.append("user_role", "3");
        }
        
        formdata.append("email", data.email);
        formdata.append("honorifics", data.honorifics);
        formdata.append("address", data.address);
        formdata.append("country", "");
        
        // convert formData to JSON since that is what the server looks for
        var object:any = {};
        formdata.forEach(function(value: any, key: any){
            object[key] = value;
        });

        const response = await fetch('http://localhost:8080/api/profile/register/', {
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
        console.dir(e);
    }
};



//var errVal = false;
export default function SignUp(props: any) {
    
    const history = useHistory();
    const classes = useStyles();
    const [role, setRole] = React.useState('');
    const { register, handleSubmit, control } = useForm();
    const [error, setError] = React.useState(defaultError);
    const [reqFields, setReqFields] = React.useState(defaultReqFields)
    const onSuccess = () => {
        history.push('/login')
    }
    // const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    //     setRole(event.target.value as string);
    // };

    var validate = (e: {target: {name: String, value: String, id: String, innerText: String }}) => {
        
        const newError = { ...error };
        var name;
        var value: any;
        // no validation needed for country
        // just need to extract country name to send to the server
        if (e.target.id.includes("country")) {
            name = "country";
            var country = e.target.innerText.split("(")[0];
            value = country.split("\n")[1];

        } else {
            name = e.target.name;
            value = e.target.value;
        }
       
        
        switch(name) {
            case 'first_name':
                setReqFields(prevState => {
                     return {...prevState, first_name: value }
                });

                if (value.match(/[^a-zA-Z\s]/i)) {
                    newError.first_name =
                        "First name may contain only letters";
                } else {
                    newError.first_name =
                        "";

                }
                break;
            case 'last_name':
                setReqFields(prevState => {
                    return {...prevState, last_name: value }
               });
                if (value.match(/[^a-zA-Z\s]/i)) {
                    newError.last_name =
                        "Last name may contain only letters";
                } else {
                    newError.last_name =
                        "";
                }
                break;
            case 'username':
                setReqFields(prevState => {
                    return {...prevState, username: value }
               });
                if (value.match(/[^a-z0-9@\/\.\+\-\_]/i)) {
                    newError.username = "User name may contain only letters, numbers, and @/./+/-/_ characters";
                } else {
                    newError.username = "";
                }
                break;

            case 'password':
                setReqFields(prevState => {
                    return {...prevState, password: value }
               });
                if (value && value.length < 8) {
                    newError.password = "Password must be at least 8 characters long";
                } else {
                    newError.password = "";
                }
                break;

            case 'email':
                if (!value.match(/.{3,}@.+\.[a-z\d]{2,}/i)) {
                    newError.email = "Please enter a valid email";
                } else {
                    newError.email = "";
                }
                break;
            
            default:
                break;
    
        };
       
        
        setError(newError);
        const haveError = Object.values(newError).find(
            (el: String) => el.length > 0
        );
         
    }

    
    const handleSelect = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        var selectedRole = e.currentTarget.innerText;
        setRole(selectedRole);
        setReqFields(prevState => { // redundant because of the above role state
            return {...prevState, role: selectedRole }
       });
       if (selectedRole != "") {
           error.role = "";
       }
    }

    // only do submission based validation: unique username
    const onSubmit = ({ username, email, first_name, last_name, password, phone_number, honorifics, address }: any) => {
        const newError = { ...error };  // the errors from dynamic validation are kept from before
        // only submit if the required fields are non-empty and there are no other validation errors
        // console.log(reqFields.first_name);
        console.log(role);

        if (reqFields.first_name == "") {
            newError.first_name = "First name is required"
        }
        if (reqFields.last_name == "") {
            newError.last_name = "Last name is required"
        }
        if (reqFields.username == "") {
            newError.username = "Username is required"
        }
        if (reqFields.password == "") {
            newError.password = "Password is required"
        }
        if (role == "") {
            newError.role = "Role is required"
        } 
        
       

        const haveError = Object.values(newError).find(
            (el: String) => el.length > 0
        );
        
        setError(newError);
        
        if (!haveError) {
            console.log({ username, email, first_name, last_name, password, role, phone_number, honorifics, address });
            SignUpAjax(
                { username, email, first_name, last_name, password, role, phone_number, honorifics, address }, onSuccess
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
                            error={error.first_name == "" ? false: true}
                            helperText={error.first_name}
                            
                            variant="outlined"
                            required
                            name="first_name"
                            label="First Name"
                            type="text"
                            id="first_name"
                            className={classes.input}
                            //inputRef={register({ required: true })}
                            onChange={validate}

                        />
                    </Grid>

                    <Grid item>
                        <CssTextField
                            error={error.last_name == "" ? false: true}
                            helperText={error.last_name}
                            variant="outlined"
                            required
                            name="last_name"
                            label="Last Name"
                            type="text"
                            id="last_name"
                            className={classes.input}
                            inputRef={register({ required: true })}
                            onChange={validate}

                        />
                    </Grid>

                    <Grid item>
                        <FormControl
                            variant="outlined"
                            className={classes.input}
                            >
                            
                            <Controller
                                as={
                                    <CssTextField select variant="outlined" label="Honorifics">
                                        <MenuItem value="Mr">Mr</MenuItem>
                                        <MenuItem value="Ms">Ms</MenuItem>
                                    </CssTextField>
                                }
                                name="honorifics"
                                control={control}
                                defaultValue=""
                            />
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <FormControl
                            variant="outlined"
                            className={classes.input}
                            
                            >
                            <Controller
                                as={
                                    <CssTextField select required variant="outlined" label="Role" error={error.role == "" ? false: true} helperText={error.role} 

                                    >
                                        <MenuItem  onClick={(e:React.MouseEvent<HTMLLIElement, MouseEvent>) => handleSelect(e)} value="Entrepreneur">Entrepreneur</MenuItem>
                                        <MenuItem onClick={(e:React.MouseEvent<HTMLLIElement, MouseEvent>) => handleSelect(e)} value="Instructor">Instructor</MenuItem>
                                        <MenuItem onClick={(e:React.MouseEvent<HTMLLIElement, MouseEvent>) => handleSelect(e)} value="Partner">Partner</MenuItem>
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
                            error={error.username == "" ? false: true}
                            helperText={error.username}
                            variant="outlined"
                            required
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            className={classes.input}
                            inputRef={register({ required: true })}
                            onChange={validate}

                        />
                    </Grid>
                    <Grid item>
                        <CssTextField
                            error={error.password == "" ? false: true}
                            helperText={error.password}
                            variant="outlined"
                            required
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            className={classes.input}
                            inputRef={register({ required: true })}
                            onChange={validate}

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
                            error={error.email == "" ? false: true}
                            helperText={error.email}
                            variant="outlined"
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            className={classes.input}
                            inputRef={register}
                            onChange={validate}

                        />
                    </Grid>

                    <Grid item>
                        
                        <CountrySelect
                            onChange={validate}
                        />
                    
                        
                    </Grid>

                    <Grid item>
                        <TextField
                            variant="outlined"
                            name="address"
                            label="Address"
                            id="address"
                            autoComplete="address"
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
                            onClick={onSubmit}
                        >
                            Sign Up
                        </Button>
                    </Grid>
                </Grid>

            </form>

        </Container >
    );
}

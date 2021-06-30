import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import SignIn from "./UserProfile/LogIn";
import SignUp from './UserProfile/SignUp';
import ProfilePage from './ProfilePage/Profilepage';
import Update from './ProfilePage/UpdateProfile';
import {
    makeStyles,
    createStyles,
    Theme,
} from "@material-ui/core";


const useStyles: (props?: any) => any = makeStyles((theme: Theme) =>
    createStyles({

        root: {
            background: "#f2f6fa",
            display: "flex",
            paddingTop: 80,
            height: "800px",
            alignItems: "center",
        },
    })
);


// updated when user logs in
// maybe don't need this
const defaultUserData = {
    username: "",
    user_role: "",
    honorifics: "",
    first_name: "",
    last_name : "",
    email: "",
    phone_number: "",
    country: "",
    address: "",
    showCompanyBtn: true,
}
const showCompanyBtn = true;



export default function Pages(props: any) {
    const classes = useStyles();
    const currentLocation = useLocation();

    const [reg, setReg] = React.useState("false");
    const [userData, setUserData] = React.useState(defaultUserData);
    const [showCompanyBtn, setShowCompanyBtn] = React.useState(false);

    const updateReg = (val:string) => {
        setReg(val);
    };

    const updateUserData = (newUserData: any) => {
        setUserData(newUserData);
        console.log(newUserData);
    }

    const updateCompanyBtn = (val: boolean) => {
        setShowCompanyBtn(val);
    }


    return (
        <div className={classes.root}>
            <Switch>
                <Route exact path="/" render={() => <MainPage regHandler={updateReg} />}  />
                <Route exact path="/login" render={() => <SignIn regVal={reg} updateUserDataHandler={updateUserData} updateCompanyBtnHandler={updateCompanyBtn} />}  />
                <Route exact path="/signup" render={() => <SignUp regHandler={updateReg} />} />
                <Route exact path="/profile" render={() => <ProfilePage handler={updateCompanyBtn} showCompanyBtn={showCompanyBtn} userDataProp={userData} />}   />
                <Route exact path="/update" component={Update}/>

            </Switch>

        </div>
    );
}



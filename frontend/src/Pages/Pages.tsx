import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import SignIn from "./UserProfile/LogIn";
import SignUp from './UserProfile/SignUp';
import ProfilePage from './ProfilePage/Profilepage';
import Update from './ProfilePage/UpdateProfile';
import CompanyPage from './CompanyPage/CompanyPage';
import PeoplePage from './PeoplePage/PeoplePage';
import Dashboard from './Dashboard/Dashboard';
import {
    makeStyles,
    createStyles,
    Theme,
} from "@material-ui/core";

import SignUp from "./UserProfile/SignUp";
import ProfilePage from "./ProfilePage/Profilepage";
import Update from "./ProfilePage/UpdateProfile";
import AssignmentPage from "./AssignmentPage/AssignmentPage";
import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles: (props?: any) => any = makeStyles((theme: Theme) =>
    createStyles({

        root: {
            background: "#faf6f2",
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
  last_name: "",
  email: "",
  phone_number: "",
  country: "",
  address: "",
  showCompanyBtn: true,
};

export default function Pages(props: any) {
  const classes = useStyles();
  const currentLocation = useLocation();

  const [reg, setReg] = React.useState("false");
  const [userData, setUserData] = React.useState(defaultUserData);
  const [showCompanyCreateBtn, setShowCompanyCreateBtn] = React.useState(false);

  const updateReg = (val: string) => {
    setReg(val);
  };

  const updateUserData = (newUserData: any) => {
    setUserData(newUserData);
    console.log(newUserData);
  };

  const setCompanyCreateBtn = (show: boolean) => {
    setShowCompanyCreateBtn(show);
  };

  return (
    <div className={classes.root}>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <MainPage regHandler={updateReg} />}
        />
        <Route
          exact
          path="/login"
          render={() => (
            <SignIn
              regVal={reg}
              updateUserDataHandler={updateUserData}
              setCompanyCreateBtnHandler={setCompanyCreateBtn}
            />
          )}
        />
        <Route
          exact
          path="/signup"
          render={() => <SignUp regHandler={updateReg} />}
        />
        <Route
          exact
          path="/profile"
          render={() => (
            <ProfilePage
              setCompanyCreateBtnHandler={setCompanyCreateBtn}
              showCreateCompanyBtn={showCompanyCreateBtn}
              userDataProp={userData}
            />
          )}
        />
        <Route exact path="/update" component={Update} />
        <Route exact path="/assignments" component={AssignmentPage} />
      </Switch>
    </div>
  );
}

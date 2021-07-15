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
import AssignmentPageRouter from "./AssignmentPage/AssignmentPageRouter";
import VideoPage from "./VideoPage/VideoPage";
import ReadingsPage from "./ReadingsPage/ReadingsPage";
import GuestVideoPage from "./GuestVideoPage/GuestVideoPage";
import GuestReadingPage from "./GuestReadingPage/GuestReadingPage";

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
    showCompanyBtn: true, // unused
}

export default function Pages(props: any) {
    const currentLocation = useLocation();

    const [reg, setReg] = React.useState("false"); // used to track whether the user is logged-in so the LoginPage can display "User is succesfully registered" alert
    const [userData, setUserData] = React.useState(defaultUserData);

    const updateReg = (val:string) => {
        setReg(val);
    };

    const updateUserData = (newUserData: any) => {
        setUserData(newUserData);
    }
   
    return (
        <Switch>
            <Route exact path="/" render={() => <MainPage regHandler={updateReg} />}  />
            <Route exact path="/login" render={() => <SignIn regVal={reg} updateUserDataHandler={updateUserData}  />}  />
            <Route exact path="/signup" render={() => <SignUp regHandler={updateReg} />} />
            <Route exact path="/profile" render={() => <ProfilePage regHandler={updateReg} userDataProp={userData} />}   />
            <Route exact path="/update" component={Update}/>
            <Route exact path="/company" render={() => <CompanyPage  />}  />
            <Route path="/assignments" render={() => <AssignmentPageRouter userDataProp={userData} />}   /> 
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/people" component={PeoplePage} />
            <Route exact path="/videos" component={VideoPage} />
            <Route exact path="/readings" component={ReadingsPage} />

            <Route exact path="/guestVideos" component={GuestVideoPage} />    
            <Route exact path="/guestReadings" component={GuestReadingPage} />   
        </Switch>
    );

}





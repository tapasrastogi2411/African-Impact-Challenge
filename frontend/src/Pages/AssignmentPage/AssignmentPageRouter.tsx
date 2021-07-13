import React, {useState, useEffect} from "react";
import { Switch, Route, useLocation, useHistory, Redirect } from "react-router-dom";
import AssignmentPageTeacherView from './AssignmentPageTeacherView';
import AssignmentPageEntrepreneurView from './AssignmentPageEntrepreneurView';
import Navbar from "../../NavBar/Navbar";



export default function AssignmentPageRouter(props: any) {

    const [userRole, setUserRole] = React.useState("");
    let location = useLocation();
    let history = useHistory();
    
    const getLoggedInUser = () => {
        fetch('http://localhost:8080/api/profile/getUser/', {
            method: "GET",
            credentials: 'include',
            mode: 'cors',
        })
        .then(response => { 
            return response.json();
        })
        .then(responseJson => {
            console.log(responseJson);
            setUserRole(responseJson['user_role']);
        })
        .catch(err => { 
            console.log("error"); 
        })
    }

    useEffect(() => {
        getLoggedInUser();
      }, [userRole]);

    return (
            <div>
                {console.log(userRole)}
                {
                    userRole == "Teacher" ? <Redirect  to="/assignments/teacher" />  : <Redirect   to="/assignments/entrepreneur" /> 
                }
                
                <Switch>
                
                    <Route exact path="/assignments/teacher" render={() => <AssignmentPageTeacherView  />}  />
                    <Route exact path="/assignments/entrepreneur" render={() => <AssignmentPageEntrepreneurView   />}  />
                    <Route exact path="/assignments">
                        {
                            userRole == "Teacher" ? <Redirect  to="/assignments/teacher" />  : <Redirect  to="/assignments/entrepreneur" /> 
                        }
                    </Route>
                </Switch>
                
            </div>
    );

}
import React from 'react';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InputIcon from "@material-ui/icons/Input";
import VideoLibraryOutlinedIcon from '@material-ui/icons/VideoLibraryOutlined';
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';
import * as Constants from '../utils';

import Logo from './LOGO.png'
import { Link, useHistory } from "react-router-dom";
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            justifyContent: "space-between",
            minHeight: 70,
            [theme.breakpoints.down("sm")]: {
                paddingLeft: 8,
                paddingRight: 8,
                minHeight: 56,
            },
            marginLeft: 50,
        },
        hideIcon: {
            visibility: "hidden"
        },
        link: {
            textDecoration: "none",
        },
        mainAppBar: {
            background: "#FFFFFF",
            boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.1)",
            zIndex: theme.zIndex.drawer + 1,

        },
        logo: {
            width: 80,
            marginRight: 10,
            [theme.breakpoints.down("sm")]: {
                marginRight: 5,
            },
            float: "left",
        },
        title: {
            color: "black",
            fontWeight: 600,
            [theme.breakpoints.up("sm")]: {
                display: "block",
            },
            
        },
        btn: {
            // position: "absolute",
            right: 40,
            color: "black"
        },
        btnTxt: {
            marginLeft: 5,
            fontWeight: 500
        }
    })
);
function Appbar(props: any) {
    const history = useHistory();
    const onSuccess = () => {
        history.push('/login');
    }
    const videosPage = () => {
        history.push('/guestVideos');
    }
    const readingsPage = () => {
        history.push('/guestReadings');
    }
    const classes = useStyles();

    const renderGuestPage = () => {
        let cookie = document.cookie.split('; ');
        for(let i in cookie){
            var keyval = cookie[i].split('=');
            if(keyval[0] === 'loggedIn' && keyval[1]) {
                return (
                    <IconButton onClick={logoutUser} className={classes.btn}>
                        <InputIcon />
                        <Typography variant="button" noWrap className={classes.btnTxt}>Sign Out</Typography>
                    </IconButton>
                );
            }
        }
        return (
            <div>
            <IconButton onClick={videosPage} className={classes.btn}>
                <VideoLibraryOutlinedIcon />
                <Typography variant="button" noWrap className={classes.btnTxt}>Videos</Typography>
            </IconButton>
            <IconButton onClick={readingsPage} className={classes.btn}>
                <LocalLibraryOutlinedIcon />
                <Typography variant="button" noWrap className={classes.btnTxt}>Readings</Typography>
            </IconButton>
            </div>
        );
    }

    // session should be destroyed and user taken back to the login page
    function logoutUser() {
        fetch(Constants.server + '/api/profile/logout', {
            method: 'GET', 
            credentials: 'include',
        })
        .then(() => {
            onSuccess();
            window.location.reload();
        })
    }

    return (
        <AppBar position="fixed" className={classes.mainAppBar}>
            <Toolbar className={classes.root}>
                <div style={{display: "flex", alignItems: "center"}}>
                    <Link to='/' className={classes.link}>
                    <img src={Logo} className={classes.logo}/>
                    </Link>
                    <Typography
                        className={classes.title}
                        variant="h6"
                        noWrap
                        >
                        THE AFRICAN IMPACT CHALLENGE
                    </Typography>
                </div>
            
                <div>
                    {renderGuestPage()}
                </div>
                
            </Toolbar>
        </AppBar>
    );
}

export default Appbar;
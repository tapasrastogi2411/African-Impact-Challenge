import React from 'react';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import InputIcon from "@material-ui/icons/Input";
import Logo from './LOGO.png'
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minHeight: 70,
            [theme.breakpoints.down("sm")]: {
                paddingLeft: 8,
                paddingRight: 8,
                minHeight: 56,
            },
            marginLeft: 50,
        },
        mainAppBar: {
            background: "#FFFFFF",
            boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.1)",
        },
        logo: {
            width: 80,
            marginRight: 10,
            [theme.breakpoints.down("sm")]: {
                marginRight: 5,
            },
        },
        title: {
            color:"black",
            fontWeight: 600,
            [theme.breakpoints.up("sm")]: {
              display: "block",
            },
          },
         
    })
);
function Appbar(props: any) {
    const classes = useStyles();

    return (
        <AppBar position="fixed" className={classes.mainAppBar}>
            <Toolbar className={classes.root}>
                <img src={Logo} className={classes.logo} />
                <Typography
                    className={classes.title}
                    variant="h6"
                    noWrap
                >
                    THE AFRICAN IMPACT CHALLENGE
        </Typography>

            </Toolbar>
        </AppBar>
    );
}

export default Appbar;
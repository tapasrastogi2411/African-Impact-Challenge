import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Navbar from "../../NavBar/Navbar";

const useStyles = makeStyles((theme) => ({
  root: { 
    marginTop: 100,
    marginLeft: 250,   
    marginRight: "10%",
  },
  divider: {
    width: "100%",
    height: 3,
    marginTop: 5,
    marginBottom: 10,
  },
  pageTitle: {
    marginLeft: 10,
  }
}));


function CalendarPage(prop: any) {
  const classes = useStyles();

  return (
      
    <div className={classes.root}>
      <div>
        <Navbar></Navbar>
      </div>
      
      <div>
        <Typography variant="h4" className={classes.pageTitle}>Calendar</Typography>
        <Divider className={classes.divider} />
        <iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FToronto&amp;src=YWZyaWNhbmltcGFjdGNoYWxsZW5nZXRlc3RpbmdAZ21haWwuY29t&amp;src=ajRnanVvZGo0azRhOHJoOHV1NWd2MmNmaW9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=ODRhdHMzc2pyMjkyNGRtMDZhdDBpMjFwNjhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%23EF6C00&amp;color=%23795548&amp;color=%23616161&amp;title=African%20Impact%20Challenge" style={{borderWidth:0,width:"100%", height:600}}></iframe>
      </div>
    </div>
  );
}

export default CalendarPage;

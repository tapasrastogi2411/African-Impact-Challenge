import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import VideoCard from "./VideoCard";
import * as Constants from '../../utils';

const useStyles = makeStyles((theme) => ({
  root: { 
    marginTop: 100,
    marginLeft: 200,   
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
  },
  noVideoHeader: {
    fontSize: 22,
    width: "-webkit-fill-available"
  
  },
  videoGrid: {
    display: "flex",
    flexWrap: "wrap"
  }
}));

const RedTextTypography = withStyles({
  root: {
    color: "#e43132",
  },
})(Typography);

function GuestVideoPage(prop: any) {
  const classes = useStyles();
  const [videoItems, setvideoItems] = React.useState([]);

  const handleGet = async () => {
    const response = await fetch(
      Constants.server + "/api/course/getVideos",
      {
        method: "GET",
        credentials: "include",
        mode: "cors",
      }
    );
    const responseData = await response.json();
    if (response.status > 300 || response.status < 200) {
      throw responseData;
    }

    setvideoItems(responseData);
  };

  const renderVideoCard = (item: any) => {
    return(
      <VideoCard video={Constants.awsServer + item.file_path} title={item.title} uploader={item.upload_user} upload_date={item.upload_date}></VideoCard>
    );
  }

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.pageTitle}>Videos</Typography>
      <Divider className={classes.divider} />
      
      <div className={classes.videoGrid}>
        {videoItems.length > 0 ? (
          videoItems.map((item) => (
            renderVideoCard(item)
          ))
        ) : (
          <Typography align="center" className={classes.noVideoHeader}>
            There are currently no Videos!
          </Typography>
        )}
      </div>
    </div>
  );
}

export default GuestVideoPage;

import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
  } from "react-router-dom";
const useStyles: (props?: any) => any = makeStyles((theme) => ({
    fst: {
        paddingLeft: 147
    },

}));

export default function UserItem(props: any) {

    const handleclick = (e: any) => {
        props.peopleProps.changeViewUserData(props.object);
    }

    return (
        <ListItem button onClick={handleclick} component={RouterLink} to="/viewProfile" >
            <ListItemAvatar>
                <Avatar
                    src='/ProfilePage/profilepic.jpeg'
                //src={props.userpic}
                />
            </ListItemAvatar>
            <ListItemText
                //primary="User"
            //primary={props.username}
                primary={props.name}

            />
        </ListItem>
    );
}

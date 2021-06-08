import React from 'react';
import './App.css';
import AppBar from './AppBar/AppBar';
import Pages from './Pages/Pages';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { BrowserRouter } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
    },
  })
);

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <AppBar />
        <Pages />
      </div>
    </BrowserRouter>

  );
}

export default App;

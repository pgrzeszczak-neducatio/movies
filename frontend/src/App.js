import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import MovieList from './MovieList';

const styles = {
  root: {
    flexGrow: 1,
  },
};

const App = ({classes}) => (
  <div className={classes.root}>
    <Router>
      <Fragment>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Movies
            </Typography>
          </Toolbar>
        </AppBar>
        <Route path="/" exact component={MovieList}/>
      </Fragment>
    </Router>
  </div>
);

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);


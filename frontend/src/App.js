import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import MovieList from './MovieList';
import Movie from './Movie';

const styles = {
  root: {
    flexGrow: 1,
  },
};

const App = ({classes}) => (
  <div className={classes.root}>
    <Router>
      <Fragment>
        <Route path="/" exact component={MovieList}/>
        <Route path="/:id" exact component={Movie}/>
      </Fragment>
    </Router>
  </div>
);

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);


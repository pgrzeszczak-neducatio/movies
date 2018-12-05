import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import ForwardIcon from '@material-ui/icons/Forward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const styles = theme => ({
  root: {
  },
});

class Movie extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movie: {}
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3000/movie/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(data => this.setState({movie: data}));
  }

  render() {
    return (
      <Fragment>
        <AppBar position="static" color="default">
          <Toolbar>
            <Link to="/">
              <IconButton>
                <ArrowBackIcon />
              </IconButton>
            </Link>
            <Typography variant="h6" color="inherit">
              Movies
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={this.props.classes.root}>
          {this.state.movie.title}
        </div>
      </Fragment>
    );
  }
}

Movie.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Movie);

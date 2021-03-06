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
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1260,
  },
  paper: {
    width: '95%',
    height: '95%',
  },
  iconAdd: {
    fontSize: 100,
  },
  addGrid: {
    height: '100%',
  },
  iconForward: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

class MovieList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/movie')
      .then(response => response.json())
      .then(data => this.setState({movies: data}));
  }

  render() {
    return (
      <Fragment>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Movies
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={this.props.classes.root}>
          <GridList cellHeight={500} cols={4} className={this.props.classes.gridList}>
            {this.state.movies.map(movie => (
              <GridListTile key={movie.id}>
                <img src={movie.poster} alt={movie.title}/>
                <GridListTileBar
                  title={movie.title}
                  subtitle={<span>{movie.year}</span>}
                  actionIcon={
                    <Link to={`/${movie.id}`}>
                      <IconButton className={this.props.classes.iconForward}>
                        <ForwardIcon />
                      </IconButton>
                    </Link>
                  }
                />
              </GridListTile>
            ))}
            <GridListTile key="add_new">
              <Grid className={this.props.classes.addGrid} container justify="center" alignItems="center">
                <Paper className={this.props.classes.paper}>
                  <Grid className={this.props.classes.addGrid} container justify="center" alignItems="center">
                    <IconButton>
                      <AddIcon className={this.props.classes.iconAdd} />
                    </IconButton>
                  </Grid>
                </Paper>
              </Grid>
            </GridListTile>
          </GridList>
        </div>
      </Fragment>
    );
  }
}

MovieList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MovieList);

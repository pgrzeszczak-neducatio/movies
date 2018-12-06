import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid/Grid";
import Rating from 'react-rating';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import openSocket from 'socket.io-client';

const styles = theme => ({
  grid: {
    width: '100%',
    height: 600,
  },
  card: {
    display: 'flex',
    height: 500,
    width: '80%',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    minWidth: 315,
  },
  description: {
    marginTop: 50,
  },
  rating: {
    color: 'gold',
    marginTop: 30,
  },
  ratingIcon: {
    fontSize: 50,
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
    this.socket = openSocket('http://localhost:3000');
    this.socket.on('rate', data => {
      if (data.movieId === this.state.movie.id) {
        this.setState(prevState => ({
          movie: {
            ...prevState.movie,
            rating: data.rating,
            votes: data.votes,
          }
        }));
      }
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    let  movieGrid;
    if (this.state.movie.id > 0) {
      movieGrid = (
        <Grid className={this.props.classes.grid} container justify="center" alignItems="center">
          <Card className={this.props.classes.card}>
            <CardMedia
              className={this.props.classes.cover}
              image={this.state.movie.poster}
              title={this.state.movie.title}
            />
            <div className={this.props.classes.details}>
              <CardContent className={this.props.classes.content}>
                <Typography component="h3" variant="h3">
                  {this.state.movie.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {this.state.movie.year}, running time: {this.state.movie.length} min
                </Typography>
                <Typography variant="body1" color="textSecondary" className={this.props.classes.description}>
                  {this.state.movie.description}
                </Typography>
                <Rating
                  className={this.props.classes.rating}
                  stop={10}
                  emptySymbol={<StarBorderIcon className={this.props.classes.ratingIcon} />}
                  fullSymbol={<StarIcon className={this.props.classes.ratingIcon} />}
                  onClick={value => {
                    this.socket.emit('rate', {
                      movieId: this.state.movie.id,
                      rate: value,
                    });
                  }}
                />
                <Typography variant="body1" color="textSecondary">
                  {this.state.movie.rating.toFixed(1)}/10 ({this.state.movie.votes})
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
      );
    } else {
      movieGrid = <span>loading</span>;
    }

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
        {movieGrid}
      </Fragment>
    );
  }
}

Movie.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Movie);

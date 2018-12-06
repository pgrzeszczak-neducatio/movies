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
                <Typography variant="body" color="textSecondary" className={this.props.classes.description}>
                  {this.state.movie.description}
                </Typography>
                <Rating
                  className={this.props.classes.rating}
                  stop={10}
                  emptySymbol={<StarBorderIcon className={this.props.classes.ratingIcon} />}
                  fullSymbol={<StarIcon className={this.props.classes.ratingIcon} />}
                />
                <Typography variant="body" color="textSecondary">
                  {this.state.movie.rating}/10 ({this.state.movie.votes})
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
      </Fragment>
    );
  }
}

Movie.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Movie);

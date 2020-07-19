import React from 'react';
import MovieCard from './MovieCard';

import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from '@material-ui/core';
import SmallMovieCard from './SmallMovieCard';

class MovieList extends React.Component {
	state = {
		movies: []
	};

	componentDidMount() {
		if (this.props.url) {
			this.loadMovieList();
		}
	}

	loadMovieList() {
		fetch(this.props.url, {
			method: 'GET'
		})
			.then(function(response) {
				return response.json();
			})
			.then((jsonResp) => {
				const results = jsonResp.results;
				this.setState({ movies: results });
			});
	}

	render() {
		var movies = [];
		if (this.props.movies && this.props.movies.length > 0) {
			movies = this.props.movies;
		} else if (this.state.movies && this.state.movies.length > 0) {
			movies = this.state.movies;
		}
		return this.props.showVerticalCard ? (
			<Grid container justify="center" spacing={4}>
				{movies.map((item) => (
					<Grid item key={item.id}>
						<SmallMovieCard movie={item} />
					</Grid>
				))}
			</Grid>
		) : (
			<React.Fragment>
				<Grid container spacing={1}>
					{movies && movies.length > 0 ? (
						movies.map((item) => (
							<Grid item key={item.id}>
								<MovieCard
									movie={item}
									changeRating={this.props.changeRating}
									removeFromFavorites={this.props.removeFromFavorites}
								/>
							</Grid>
						))
					) : (
						<CircularProgress color="primary" />
					)}
				</Grid>
			</React.Fragment>
		);
	}
}

export default MovieList;

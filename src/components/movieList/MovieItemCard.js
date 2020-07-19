import React from 'react';

import { IconButton, Grid, Button } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import styles from '../search/ResultsList.module.css';
import { formatDate } from '../../utils/dateUtils';
import { handleMovie, isMovieFavorite } from '../../FavoritesManager';

class MovieItemCard extends React.Component {
	state = { isFavorite: isMovieFavorite(this.props.movie) };

	getPosterUrl = (imageUri) =>
		imageUri ? `https://image.tmdb.org/t/p/w200${imageUri}` : 'https://placehold.co/200x300?text=No+image';

	getGenreNames(genreIds) {
		var allMovieGenres = JSON.parse(localStorage.getItem('genreData'));
		return allMovieGenres
			.filter((genre) => {
				return genreIds.includes(genre.id);
			})
			.map((genre) => genre.name);
	}

	onFavoritesClick(movie) {
		handleMovie(movie);
		this.setState({
			isFavorite: isMovieFavorite(movie)
		});
	}

	render() {
		return (
			<Grid container className={styles.mygrid}>
				<Grid item xs={2}>
					<img src={this.getPosterUrl(this.props.movie.poster_path)} alt={''} className={styles.poster} />
				</Grid>
				<Grid item xs={3}>
					<h5>{this.props.movie.original_title}</h5>
				</Grid>
				<Grid item xs={2}>
					{formatDate(this.props.movie.release_date)}
				</Grid>
				<Grid item xs={2}>
					{this.getGenreNames(this.props.movie.genre_ids).join(', ')}
				</Grid>
				<Grid item xs={2}>
					<IconButton onClick={() => this.onFavoritesClick(this.props.movie)}>
						{isMovieFavorite(this.props.movie) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
					</IconButton>
					<Button
						size="small"
						color="secondary"
						onClick={() => this.props.history.push(`/details/${this.props.movie.id}`)}
					>
						View details
					</Button>
				</Grid>
			</Grid>
		);
	}
}

export default MovieItemCard;

import React, { useEffect, useState } from 'react';

import { useParams, useHistory } from 'react-router-dom';
import {
	Card,
	CardActionArea,
	CardMedia,
	Typography,
	CardContent,
	CardActions,
	Button,
	Container
} from '@material-ui/core';

import { getPosterUrl } from '../../utils/urlUtils';
import { formatDate } from '../../utils/dateUtils';

import { getDetails } from '../../api/MovieService';

const MovieDetails = () => {
	const { id } = useParams();
	const [ movie, setMovie ] = useState({});
	let history = useHistory();

	useEffect(
		() => {
			getDetails(id).then((results) => setMovie(results.data));
		},
		[ id ]
	);

	return (
		<Container>
			<Card>
				<CardActions>
					<Button size="small" color="secondary" onClick={() => history.push(`/`)}>
						Go back to main page
					</Button>
				</CardActions>
				<CardActionArea>
					<CardContent>
						<CardMedia image="" description="movie poster">
							<img src={getPosterUrl(movie.poster_path, 200)} alt="Movie poster" />
						</CardMedia>
						<Typography variant="h5">{movie.original_title}</Typography>
						<Typography variant="button">{formatDate(movie.release_date)}</Typography>
						<Typography variant="body2">{movie.overview}</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Container>
	);
};
export default MovieDetails;

/*
<Container>
			<Card>
				<CardActions>
					<Button size="small" color="secondary" onClick={() => history.push(`/`)}>
						Go back to main page
					</Button>
				</CardActions>
				<CardActionArea>
					<CardContent>
						<CardMedia image="" description="movie poster">
							<img src={getPosterUrl(movie.poster_path, 200)} alt="Movie poster" />
						</CardMedia>
						<Typography variant="h5">{movie.original_title}</Typography>
						<Typography variant="button">{formatDate(movie.release_date)}</Typography>
						<Typography variant="body2">{movie.overview}</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Container>

<div className={classes.root}>
			<Grid container spacing={1}>
				<Grid container item xs={6} spacing={3}>
					<img src={getPosterUrl(movie.poster_path, 200)} alt="Movie poster" />
				</Grid>
				<Grid container item xs={6} spacing={3}>
					<Typography variant="h5">{movie.original_title}</Typography>
					<Typography variant="button">{formatDate(movie.release_date)}</Typography>
					<Typography variant="body2">{movie.overview}</Typography>
				</Grid>
			</Grid>
		</div>
*/

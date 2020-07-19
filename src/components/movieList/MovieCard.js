import React from 'react';
import { Card, CardActionArea, CardContent, CardActions, Button, Typography } from '@material-ui/core';

import Rating from './Rating';
import { formatDate } from '../../utils/dateUtils';

import { useHistory } from 'react-router-dom';

const MovieCard = (props) => {
	const { movie, changeRating, removeFromFavorites } = props;
	let history = useHistory();
	return (
		<Card>
			<CardActionArea>
				<CardContent>
					<Typography variant="h5">{movie.original_title}</Typography>
					<Typography variant="body2" color="textSecondary">
						{formatDate(movie.release_date)}
					</Typography>
					<div>
						<Rating userRating={movie.userRating} changeRating={changeRating} movieId={movie.id} />
					</div>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size="small" color="secondary" onClick={() => history.push(`/details/${movie.id}`)}>
					View details
				</Button>
				<Button size="small" color="primary" onClick={() => removeFromFavorites(movie)}>
					Remove from favorites
				</Button>
			</CardActions>
		</Card>
	);
};

export default MovieCard;

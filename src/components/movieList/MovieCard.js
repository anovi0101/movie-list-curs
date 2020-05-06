import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, CardActions, Button, Typography } from '@material-ui/core';

const MovieCard = () => {
	return (
		<Card>
			<CardActionArea>
				<CardContent>
					<CardMedia image="" description="movie poster" />
					<Typography variant="h5">Movie Title</Typography>
					<Typography variant="body2" color="textSecondary">
						Movie description
					</Typography>
					<CardActions>
						<Button size="small" color="primary">
							Delete
						</Button>
					</CardActions>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default MovieCard;

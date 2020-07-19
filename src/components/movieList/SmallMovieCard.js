import React from 'react';

import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { useHistory } from 'react-router-dom';

import { formatDate } from '../../utils/dateUtils';

const useStyles = makeStyles({
	root: {
		width: 180,
		height: 320
	},
	media: {
		height: 140
	},
	mytext: {
		textTransform: 'none',
		lineHeight: 1
	}
});

const getPosterUrl = (imageUri) =>
	imageUri ? `https://image.tmdb.org/t/p/w200${imageUri}` : 'https://placehold.co/200x300?text=No+image';

const SmallMovieCard = (props) => {
	const { movie } = props;
	const classes = useStyles();
	let history = useHistory();
	return (
		<Card className={classes.root} onClick={() => history.push(`/details/${movie.id}`)}>
			<CardActionArea>
				<CardMedia className={classes.media} image={getPosterUrl(movie.poster_path)} />
				<CardContent>
					<Typography className={classes.mytext} variant="subtitle2">
						{movie.original_title}
					</Typography>
					<Typography variant="overline" component="p">
						{formatDate(movie.release_date)}
					</Typography>
					<Typography variant="caption" color="textSecondary" component="p">
						{movie.overview.substring(0, 75) + '...'}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default SmallMovieCard;

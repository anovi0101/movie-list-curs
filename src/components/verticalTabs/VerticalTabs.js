import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Settings from '../../config/Settings';

import MovieList from '../movieList/MovieList';
import { getFavoriteMovies } from '../../FavoritesManager';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			style={{ width: '80%' }}
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={1}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
};

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		display: 'flex',
		height: '100%'
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`
	}
}));

export default function VerticalTab(props) {
	const classes = useStyles();
	const [ value, setValue ] = React.useState(0);
	const { changeRating, removeFromFavorites } = props;
	const { API_URL, API_KEY } = Settings;
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const favoriteMovies = getFavoriteMovies();

	return (
		<div className={classes.root}>
			<Tabs
				orientation="vertical"
				variant="scrollable"
				value={value}
				onChange={handleChange}
				aria-label="Vertical tabs example"
				className={classes.tabs}
			>
				<Tab label="Popular movies" {...a11yProps(0)} />
				<Tab label="Top rated movies" {...a11yProps(1)} />
				<Tab label="Now playing movies" {...a11yProps(2)} />
				<Tab label="Upcoming movies" {...a11yProps(3)} />
				<Tab label="Favorite movies" {...a11yProps(4)} />
			</Tabs>
			<TabPanel value={value} index={0}>
				<MovieList
					url={`${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`}
					showVerticalCard={true}
				/>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<MovieList
					url={`${API_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`}
					showVerticalCard={true}
				/>
			</TabPanel>
			<TabPanel value={value} index={2}>
				<MovieList
					url={`${API_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`}
					showVerticalCard={true}
				/>
			</TabPanel>
			<TabPanel value={value} index={3}>
				<MovieList
					url={`${API_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`}
					showVerticalCard={true}
				/>
			</TabPanel>
			<TabPanel value={value} index={4}>
				<MovieList
					movies={favoriteMovies}
					changeRating={changeRating}
					removeFromFavorites={removeFromFavorites}
				/>
			</TabPanel>
		</div>
	);
}

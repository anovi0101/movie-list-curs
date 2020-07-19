const onMovieAdd = (movie) => {
	const movies = getFavoriteMovies();

	if (!isMovieFavorite(movie)) {
		movies.push(movie);
		localStorage.setItem(
			'userData',
			JSON.stringify({
				savedMovies: movies
			})
		);
	}
};

const onMovieRemove = (movie) => {
	const movies = getFavoriteMovies();
	const movieIds = movies.map((item) => item.id);
	const index = movieIds.indexOf(movie.id);
	if (index > -1) {
		movies.splice(index, 1);
		localStorage.setItem(
			'userData',
			JSON.stringify({
				savedMovies: movies
			})
		);
	}
};

export const getFavoriteMovies = () => {
	const userData = JSON.parse(localStorage.getItem('userData'));
	const favorites = userData.savedMovies;
	return favorites;
};

export const isMovieFavorite = (movie) => {
	const movies = getFavoriteMovies();
	const movieIds = movies.map((item) => item.id);
	return movieIds.includes(movie.id);
};

export const handleMovie = (movie) => {
	if (isMovieFavorite(movie)) {
		onMovieRemove(movie);
	} else {
		onMovieAdd(movie);
	}
};

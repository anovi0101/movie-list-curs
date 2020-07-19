import React from 'react';

import MovieItemCard from '../movieList/MovieItemCard';
import { useHistory } from 'react-router-dom';

function fetchData() {
	fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=b926657d26b006b4fbca8dc63ceb66d6`, {
		method: 'GET'
	})
		.then(function(response) {
			return response.json();
		})
		.then(function(jsonResp) {
			localStorage.setItem('genreData', JSON.stringify(jsonResp.genres));
		});
}

fetchData();

const ResultsList = (props) => {
	let history = useHistory();
	return (
		<React.Fragment>
			{props.movies.map((item) => <MovieItemCard key={item.id} movie={item} history={history} />)}
		</React.Fragment>
	);
};

export default ResultsList;

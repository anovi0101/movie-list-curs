import React from 'react';
import Header from './shared/header/Header';
import { Container, TextField, Button } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import MovieDetails from './components/movieDetails/MovieDetails';
import Search from './components/search/Search';

import VerticalTabs from './components/verticalTabs/VerticalTabs';
import { handleMovie, getFavoriteMovies } from './FavoritesManager';

class App extends React.Component {
	state = {
		savedMovies: [],
		user: null,
		userName: '',
		showSecret: false
	};

	componentDidMount() {
		const savedMovies = localStorage.getItem('userData');
		const userDetails = localStorage.getItem('userDetails');
		if (userDetails) {
			const parsedUser = JSON.parse(userDetails);
			this.setState({
				user: parsedUser
			});
		}

		if (savedMovies) {
			try {
				const parsed = JSON.parse(savedMovies);
				this.setState({
					savedMovies: parsed.savedMovies
				});
			} catch (error) {
				console.log('App crashed check user input...' + error);
			}
		}
	}

	handleAddUser = (event) => {
		localStorage.setItem(
			'userDetails',
			JSON.stringify({
				userName: this.state.userName
			})
		);

		this.setState({
			user: {
				userName: this.state.userName
			},
			userName: null
		});
	};

	onUserChange = (event) => {
		const { value } = event.target;
		this.setState({
			userName: value
		});
	};

	changeRating = (rating, movieId) => {
		const storedMovies = getFavoriteMovies();
		const foundIndex = storedMovies.findIndex((item) => item.id === movieId);

		const movie = storedMovies[foundIndex];

		storedMovies[foundIndex] = Object.assign({}, movie, { userRating: rating });

		localStorage.setItem(
			'userData',
			JSON.stringify({
				savedMovies: storedMovies
			})
		);

		this.setState({
			savedMovies: storedMovies
		});
	};

	removeFromFavorites = (movie) => {
		handleMovie(movie);
		this.setState({
			savedMovies: getFavoriteMovies()
		});
	};

	logout = () => {
		this.setState({ user: null });
		localStorage.removeItem('userDetails');
	};

	render() {
		const { user } = this.state;
		return (
			<Router>
				<div className="App">
					<Header user={user} onLogout={this.logout} />
					{user ? (
						<Switch>
							<Route path="/" exact>
								<React.Fragment>
									<Container maxWidth="md">
										<Search onMovieAdd={this.onMovieAdd} />
									</Container>
									{this.state.showSecret && <h2>This is interactive </h2>}
									<Container margin-left="0">
										<VerticalTabs
											changeRating={this.changeRating}
											removeFromFavorites={this.removeFromFavorites}
										/>
									</Container>
								</React.Fragment>
							</Route>
							<Route path="/details/:id">
								<MovieDetails />
							</Route>
							<Route path="*">
								<Redirect to="/" />
							</Route>
						</Switch>
					) : (
						<Container maxWidth="md">
							<h2>Hello stranger!</h2>
							<h4>What is your name?</h4>
							<TextField label="Name" onChange={this.onUserChange} />
							<Button variant="contained" onClick={this.handleAddUser}>
								Save
							</Button>
						</Container>
					)}
				</div>
			</Router>
		);
	}
}

export default App;

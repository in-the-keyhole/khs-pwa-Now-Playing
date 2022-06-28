import React, { Component } from 'react'
import '../App.css'
import Header from './MovieHeader'
import MovieList from './MovieList'
import {getMovies} from '../api/instance'
import { GetMovies } from './GqlMovies';

const USE_JSON = 0;

class Movies extends Component {
	constructor(props) {
		super(props)
		this.state = { movies: null, searchText: '', loading: true }
	}

	componentDidMount = async () => {
		if (USE_JSON) {
			try {
				const response = await getMovies();
				const { results: movies } = response.data
				this.setState(() => ({ movies, filteredMovies: movies, loading: false }))
			} catch (e) {
				console.error(e)
				this.setState(() => ({ error: 'Cannot fetch movies', loading: false }))
			}
		}
	}

	search = e => {
		const searchText = e.target.value
		this.setState(() => ({
			searchText,
			filteredMovies: this.state.movies.filter(
				movie =>
					movie.title.toLowerCase().match(searchText.toLowerCase()) != null
			)
		}))
	}

	render() {
		const { loading, error, filteredMovies, searchText } = this.state
		
		return (
			<div className="movie-container">
				<Header searchText={searchText} search={this.search} />
				{ USE_JSON && loading ? (
					<p className="msg">Loading movies...</p>
				) : USE_JSON && error ? (
					<p className="msg">{error}</p>
				) : USE_JSON ? (
					<MovieList movies={filteredMovies} />
				) : (
					<GetMovies />
				)}
			</div>
		)
	}
}

export default Movies

import React, { Component } from 'react'
import '../App.css'
import Header from './MovieHeader'
import MovieList from './MovieList'
import {getMovies} from '../api/instance'

class Movies extends Component {
	constructor(props) {
		super(props)
		this.state = { movies: null, searchText: '', loading: true }
	}

	componentDidMount = async () => {
		try {
			const response = await getMovies();
			const { results: movies } = response.data
			this.setState(() => ({ movies, filteredMovies: movies, loading: false }))
		} catch (e) {
			console.error(e)
			this.setState(() => ({ error: 'Cannot fetch movies', loading: false }))
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
				{ loading ? (
					<p className="msg">Loading movies...</p>
				) : error ? (
					<p className="msg">{error}</p>
				) : (
					<MovieList movies={filteredMovies} />
				)}
			</div>
		)
	}
}

export default Movies

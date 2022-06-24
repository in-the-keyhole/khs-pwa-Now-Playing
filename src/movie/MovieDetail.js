import React, { Component } from 'react'
import {getMovie} from '../api/instance'

class MovieDetail extends Component {
	constructor(props) {
		super(props)
		this.state = { error: null, movie: null, loading: true }
	}

	componentDidMount = async () => {
		const path = window.location.pathname.split('/');
		const id = path.pop();

		const movie = await getMovie(id);
		const error = movie ? false : true;
		this.setState(() => ({ movie, error, loading: false }))
	}

	render() {
		const { movie, loading, error } = this.state
		const { history } = this.props // react-router-dom provides us with history in props

		if (loading) {
			return <h1 className="msg">Loading...</h1>
		} else if (error) {
			return (
				<h4 className="msg">
					Oops! Movie details couldn't be loaded.
					<br />
					<a href="/">Go back.</a>
				</h4>
			)
		} else {
			return (
				<div className="movie-detail">
					<div className="info">
						<h3>{movie.title}</h3>
						<h4>{movie.overview}</h4>
					</div>
					<a href="/" className="close"></a>
					<img
						src={`${process.env.PUBLIC_URL}/images/backdrops${movie.backdrop_path}`}
						alt={`Backdrop for ${movie.title}`}
					/>
				</div>
			)
		}
	}
}

export default MovieDetail

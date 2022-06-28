import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {getMovie} from '../api/instance';
import { GetMovieDetail } from './GqlMovies';


const USE_JSON = 0;

class MovieDetail extends Component {
	constructor(props) {
		super(props)

		const path = window.location.pathname.split('/');
		const id = Number(path.pop());
		this.state = { error: null, movie: null, loading: false, id: id }
	}

	componentDidMount = async () => {
		const path = window.location.pathname.split('/');
		const id = Number(path.pop());

		if (USE_JSON) {
			const movie = await getMovie(id);
			const error = movie ? false : true;
			this.setState({ movie, error, loading: false });
		}
		if (!isNaN(id)) {
			this.setState({id});
		}

	}

	render() {
		const { movie, loading, error, id } = this.state
		const { history } = this.props // react-router-dom provides us with history in props

		if (loading && USE_JSON) {
			return <h1 className="msg">Loading...</h1>
		} else if (error && USE_JSON) {
			return (
				<h4 className="msg">
					Oops! Movie details couldn't be loaded.
					<br />
					<Link to="/">Go back.</Link>
				</h4>
			)
		} else if (USE_JSON) {
			return (
				<div className="movie-detail">
					<div className="info">
						<h3>{movie.title}</h3>
						<h4>{movie.overview}</h4>
					</div>
					<Link to="/" className="close" />
					<img
						src={`/images/backdrops${movie.backdrop_path}`}
						alt={`Backdrop for ${movie.title}`}
					/>
				</div>
			)
		} else {
			return (<GetMovieDetail id={id} />)
		}
	}
}

export default MovieDetail

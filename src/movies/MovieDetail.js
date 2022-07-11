import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, makeVar } from '@apollo/client';
import { MOVIE_DETAIL } from '../GqlQueries';
import Header from "../components/Header";
import { LS_PREFIX, setBadge } from "../config";

const MovieDetail = () => {
	//clear app icon badge
	setBadge(0);

	//get movie id from url path
	const { id } = useParams();

	const [error, setError] = useState(false);
	const [movie, setMovie] = useState(null);
	const { loading } = useQuery(MOVIE_DETAIL, {
		variables: { id },
		onCompleted: (result) => {
			//set full list of movies as master list which can be filtered thru and display a subset
			setMovie(result.movie);
			console.log("Got live movie result", result.movie);
			localStorage.setItem(LS_PREFIX+id, JSON.stringify(result.movie));
			//movieCache(result.movie);
		},
		onError: (err) => {
			const cachedMovie = localStorage.getItem(LS_PREFIX+id);
			//const cachedMovie = movieCache();
			if (cachedMovie) {
				const data = JSON.parse(cachedMovie);
				console.log("Got cached movie...", data);
				setMovie(data);
			} else {
				console.log("No results from api, no data in cache, show error");
				setError(true);
			}
		}
	});

	return (
		<>
			<Header />
		{loading ? (
			<p className="msg">Loading movie details...</p>
		) : error ? (
			<h4 className="msg">
				Oops! Movie details couldn't be loaded.
				<br />
				<Link to="/movies">Go back.</Link>
			</h4>
		) : movie ? (
			<div className="movie-detail">
				<div className="info">
					<h3>{movie.title}</h3>
					<h4>{movie.overview}</h4>
				</div>
				<Link to="/movies" className="close" />
				<img
					src={movie.posterPath}
					alt={`Backdrop for ${movie.title}`}
				/>
			</div>
		) : (
			<h4 className="msg">
				Oops! Movie details couldn't be rendered.
				<br />
				<Link to="/movies">Go back.</Link>
			</h4>
		)}
		</>
	)
}

export default MovieDetail;
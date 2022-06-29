import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { MOVIE_DETAIL } from '../GqlQueries';
import Header from "../components/Header";

const MovieDetail = () => {

	//get movie id from url path
	const { id } = useParams();

	const { loading, error, data } = useQuery(MOVIE_DETAIL, {
		variables: { id },
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
				<Link to="/">Go back.</Link>
			</h4>
		) : (
			<div className="movie-detail">
				<div className="info">
					<h3>{data.movie.title}</h3>
					<h4>{data.movie.overview}</h4>
				</div>
				<Link to="/" className="close" />
				<img
					src={data.movie.posterPath}
					alt={`Backdrop for ${data.movie.title}`}
				/>
			</div>
		)}
		</>
	)
}

export default MovieDetail;
import { Link } from 'react-router-dom'
import Movie from './Movie'
import {
	useQuery,
	gql
} from "@apollo/client";

const NOW_PLAYING = gql`
	query Query {
		nowPlaying {
			id,
			title,
			posterPath
		}
	}
`;

export function GetMovies() {
	const { loading, error, data } = useQuery(NOW_PLAYING);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<ul>
			{data.nowPlaying.map(({ id, title, posterPath }) => (
				<li key={id}>
					<Movie
						title={title}
						poster={posterPath}
						id={id}
					/>
				</li>
			))}
		</ul>
	);
}

const MOVIE_DETAIL = gql`
	query Query($id: ID!) {
	  movie(id: $id) {
	    id
	    title
	    overview
	    posterPath,
	  }
	}
`;

export function GetMovieDetail(params) {
		const id = params.id;//453395;
		if (id) {
		const { loading, error, data } = useQuery(MOVIE_DETAIL, {
	    variables: { id },
	  });

		if (loading) return <p>Loading...</p>;
		if (error) return <p>Error :(</p>;

		return (
			<div className="movie-detail">
				<div className="info">
					<h3>{data.movie.title}</h3>
					<h4>{data.movie.overview}</h4>
				</div>
				<a href="/" className="close"></a>
				<img
					src={data.movie.posterPath}
					alt={`Backdrop for ${data.movie.title}`}
				/>
			</div>
		);
	}
}
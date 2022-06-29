import { gql } from '@apollo/client';

export const NOW_PLAYING = gql`
	query getNowPlaying {
		nowPlaying {
			id,
			title,
			posterPath
		}
	}
`;

export const MOVIE_DETAIL = gql`
	query getMovieDetail($id: ID!) {
	  movie(id: $id) {
	    id
	    title
	    overview
	    posterPath,
	  }
	}
`;
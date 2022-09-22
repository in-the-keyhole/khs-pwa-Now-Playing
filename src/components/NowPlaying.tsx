import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { NOW_PLAYING } from '../graphql/queries';
import { Movie } from '../model';
import MovieList from './MovieList';

import './NowPlaying.css';

// import { toast } from 'react-toastify';
// import {UpdateRefreshToast} from './Toast';

function NowPlaying() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | undefined>();

    const { loading } = useQuery(NOW_PLAYING, {
        onCompleted: (data) => {
            setMovies(data.nowPlaying);
        },
        onError: (err) => {
            setError("An error occurred querying movies: " + err);
        }
    });

    // const notify = () => toast.info(UpdateRefreshToast, {
    //     autoClose: false,
    //     progress: 5
    // });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error}</p>;

    return (
        <>
            {/* <button onClick={notify}>Notify!</button> */}
            <MovieList movies={movies} />
        </>
    );
}

export default NowPlaying;

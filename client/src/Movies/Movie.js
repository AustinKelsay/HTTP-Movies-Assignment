import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import MovieCard from './MovieCard';
import MovieForm from "./MovieForm";

function Movie(props, { addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const editMovie = () => {
    props.history.push(`/update-movie/${match.params.id}`)

  }

  const deleteMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${match.params.id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err.response));

      props.history.push('/')
  }

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <button onClick={editMovie}>Edit</button>
      <button onClick={deleteMovie}>Delete</button>
    </div>
  );
}

export default Movie;

import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import MovieForm from "./Movies/MovieForm";
import Movie from "./Movies/Movie";
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => {
        console.log(res);
        setMovieList(res.data)
      })
      .catch(err => console.log(err.response));
  };
  getMovieList();

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id" render = {(props) => <Movie {...props} addToSavedList={addToSavedList} />} />

      <Route path='/update-movie/:id' render ={(props) => <MovieForm movies={MovieList} {...props} />} />
    </>
  );
};

export default App;

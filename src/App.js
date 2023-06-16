import React, { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCrad";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [SearchTerm, setSearchTerm] = useState("");
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Harry Potter");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={SearchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() =>
            searchMovies(SearchTerm !== "" ? SearchTerm : "Avengers")
          }
        />
      </div>
      {movies.length > 0 ? (
        <div className="container">
          {movies.map((e) => (
            <MovieCard movie={e} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;

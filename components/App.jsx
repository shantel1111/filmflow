import React from "react";
import Swipe from "./Swipe";
import Search from "./Search";
import Watchlist from "./Watchlist";

export default function App() {
  const mykey = "54ab6a5b";
  const [view, setView] = React.useState("swipe");
  const [restricted, setRestricted] = React.useState(true);
  const [showSearch, setShowSearch] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [movies, setMovies] = React.useState([]);
  const [selectedMovie, setSelectedMovie] = React.useState(null);

  function handleChange(e) {
    setSearchValue(e.target.value);
  }

  async function fetchMovies() {
    let movieIds = [];
    const searchUrl = `https://www.omdbapi.com/?apikey=${mykey}&s=${searchValue}&type=movie`;
    const res = await fetch(searchUrl);
    if (!res.ok) {
      console.log("Error", res.status);
    }
    const data = await res.json();
    data.Search.forEach(function (film) {
      if (!movieIds.includes(film.imdbID)) {
        movieIds.push(film.imdbID);
      }
    });

    let fetches = movieIds.map(async function (id) {
      let movieUrl = `https://www.omdbapi.com/?apikey=54ab6a5b&i=${id}&type=movie&plot=short`;
      const res = await fetch(movieUrl);
      return await res.json();
    });
    const allMovieData = await Promise.all(fetches);

    renderMovie(allMovieData);
  }

  function renderMovie(data) {
    const filteredMovies = data.filter(function (film) {
      const filmGenre = film.Genre.split(",");
      const blockedGenres = ["Documentary", "Short", "Reality-TV"];

      let filteredPoster = !film.Poster.includes("N/A");
      let filteredPlot = !film.Plot.includes("N/A");
      let filteredGenre = !filmGenre.some(function (genre) {
        return blockedGenres.includes(genre.trim());
      });

      return filteredPoster && filteredPlot && filteredGenre;
    });
    setMovies(filteredMovies);
  }

  return (
    <>
      <header>
        <div className={`menus-box ${restricted ? "restricted" : ""}`}>
          <ul>
            <li
              onClick={() => {
                setView("swipe");
                setShowSearch(false);
              }}
            >
              <i className="fa-solid fa-film selected"></i>
            </li>
            <div className="search-container">
              <li
                onClick={() => {
                  setView("search");
                  setRestricted(false);
                  setShowSearch(true);
                }}
              >
                <i className="fa-solid fa-magnifying-glass "></i>
              </li>
              {showSearch && (
                <input
                  id="search-el"
                  type="search"
                  placeholder="Search for a movie"
                  value={searchValue}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      fetchMovies();
                    }
                  }}
                />
              )}
            </div>
            <li
              onClick={() => {
                setView("watchlist");
                setRestricted(true);
                setShowSearch(false);
              }}
            >
              <i className="fa-solid fa-heart-circle-check"></i>
            </li>
          </ul>
        </div>
      </header>
      <main className="container">
        {(view === "swipe" && <Swipe />) ||
          (view === "search" && (
            <Search movies={movies} selected={selectedMovie} />
          )) ||
          (view === "watchlist" && <Watchlist />)}
      </main>
    </>
  );
}

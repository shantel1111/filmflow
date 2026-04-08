import React from "react";
import Header from "./Header";
import Swipe from "../features/Swipe";
import Search from "../features/Search";
import Watchlist from "../features/Watchlist";

import { getMovies } from "../services/searchApi";

export default function Content() {
  const [view, setView] = React.useState("swipe");
  const [searchValue, setSearchValue] = React.useState("");
  const [movies, setMovies] = React.useState([]);

  function runSearch(searchValue) {
    getMovies(searchValue).then((movies) => {
      setMovies(movies);
    });
  }

  return (
    <>
      <Header
        setView={setView}
        view={view}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        runSearch={runSearch}
      />

      {(view === "swipe" && <Swipe />) ||
        (view === "search" && <Search movies={movies} />) ||
        (view === "watchlist" && <Watchlist />)}
    </>
  );
}

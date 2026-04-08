const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
  },
};

export async function getMovies(searchQuery) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US`,
    options,
  );
  const data = await response.json();

  const movieArr = filterMovie(data.results);

  const movieId = movieArr.map((film) => {
    return film.id;
  });

  const movieDetails = movieId.map(async function (id) {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      options,
    );
    return await res.json();
  });

  const allMovieData = await Promise.all(movieDetails);

  return allMovieData;
}

function filterMovie(movies) {
  return movies.filter((movie) => {
    return (
      movie.poster_path &&
      movie.overview &&
      movie.genre_ids.length > 0 &&
      movie.vote_count >= 100 &&
      movie.popularity >= 1 &&
      !movie.video
    );
  });
}

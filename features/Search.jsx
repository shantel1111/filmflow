export default function Search({ movies }) {
  function sortGenres(genres) {
    let genreStr = "";
    genres.map((genre) => {
      return (genreStr += genre.name + ", ");
    });
    return genreStr.slice(0, -2);
  }

  return (
    <div className="app-container">
      {movies.length === 0 ? (
        <div className="film-standby">
          <span className="body-text">Popcorn ready? Let’s find a movie.</span>
        </div>
      ) : (
        movies.map((movie) => (
          <div className="film-search">
            <div className="img-container">
              <img
                className="film-img"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              />
              <div className="rating">
                <p className="film-rating">{movie.vote_average.toFixed(2)}</p>
                <i className="fa-solid fa-star star-icon"></i>
                <p className="film-year">{movie.release_date.slice(0, 4)}</p>
              </div>
            </div>
            <div className="info-container">
              <div className="top-section">
                <p className="film-name">
                  {movie.title}
                  {movie.original_language !== "en"
                    ? ` / ${movie.original_title}`
                    : ""}
                </p>
              </div>
              <div className="middle-section">
                <p className="film-time">{movie.runtime} mins</p>
                <p>{sortGenres(movie.genres)}</p>
              </div>
              <p className="film-desc">{movie.overview}</p>
            </div>
            <div className="bottom-section">
              <i className="fa-solid fa-heart"></i>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

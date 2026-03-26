export default function Search({ movies }) {
  console.log(movies);
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
              <img className="film-img" src={movie.Poster} />
              <div className="rating">
                <p className="film-rating">{movie.imdbRating}</p>
                <i className="fa-solid fa-star star-icon"></i>
                <p className="film-year">{movie.Year}</p>
              </div>
            </div>
            <div className="info-container">
              <div className="top-section">
                <p className="film-name">{movie.Title}</p>
              </div>
              <div className="middle-section">
                <p className="film-time">{movie.Runtime}</p>
                <p>{movie.Genre}</p>
              </div>
              {/* <p className="film-desc">{cleanPlot(movie.Plot)}</p> */}
            </div>
            <div className="bottom-section">
              <i className="fa-solid fa-circle-info info"></i>
              <i className="fa-solid fa-heart"></i>
            </div>
          </div>
        ))
      )}
    </div>
  );
}


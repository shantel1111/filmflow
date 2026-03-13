import { useState } from "react";

export default function Swipe({ movies }) {
  const [overlay, setOverlay] = useState(null);
  console.log(movies);

  // function cleanPlot(plot) {
  //   console.log(plot);
  // }

  function infoModal(plot) {
    // setOverlay(true);
    console.log(`THE PLOT: ${plot}`);
  }

  function watchlist() {
    console.log("ADD TO WATCHLIST");
  }

  return (
    <div className="app-container">
      {/* <div class="film-standby">
        <span class="body-text">let’s find a movie.</span>
      </div> */}
      {movies.map((movie) => (
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
            <i
              className="fa-solid fa-circle-info info"
              onClick={() => {
                infoModal(movie.Plot);
              }}
            ></i>
            <i className="fa-solid fa-heart" onClick={watchlist}></i>
          </div>
        </div>
      ))}
      {/* {overlay && (
            <div className="plot-overlay">
              <div className="exit">
                <i className="fa-solid fa-circle-xmark exit-btn"></i>
              </div>
              <p className="film-desc"></p>
            </div>
          )} */}
    </div>
  );
}


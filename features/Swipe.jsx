import React from "react";
import TinderCard from "react-tinder-card";
import "../styles/swipe.css";
import { findMovie } from "../services/tmbdApi";

export default function Search() {
  const [movieArr, setMovieArr] = React.useState([]);

  React.useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
      },
    };

    fetch("https://api.themoviedb.org/3/movie/popular", options)
      .then((res) => res.json())
      .then((data) => {
        const movieObjects = data.results.map((movie) => {
          return {
            id: movie.id,
            title: movie.title,
            img: movie.poster_path,
            description: movie.overview,
          };
        });
        setMovieArr(movieObjects);
      })
      .catch((err) => console.error(err));
  }, []);

  function heart() {
    console.log("isLiked");
  }

  function cross() {
    console.log("isNotLiked");
  }

  function redo() {
    console.log("Undo");
  }

  const onSwipe = (dir, id) => {
    console.log(`You swiped ${dir} with the movie ${id}`);
    if (dir === "right") {
      addtoWatchList(id);
    }
  };

  // const onCardLeftScreen = (id) => {
  //   console.log(`${id} left the screen`);
  // };

  function addtoWatchList(id) {
    findMovie(id);
  }

  return (
    <>
      <section>
        <div className="film-container">
          <div className="swipe-container">
            {movieArr
              .slice()
              .reverse()
              .map((movie) => {
                return (
                  <TinderCard
                    key={movie.id}
                    onSwipe={(dir) => {
                      onSwipe(dir, movie.id);
                    }}
                    // onCardLeftScreen={() => {
                    //   onCardLeftScreen(movie.id);
                    // }}
                    preventSwipe={["up", "down"]}
                    className="tinder-card"
                  >
                    <div
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.img})`,
                        backgroundSize: "cover",
                      }}
                      className="film-box border-style"
                    ></div>
                  </TinderCard>
                );
              })}
            <TinderCard className="film-box border-style">
              <h1>filmflow.</h1>
              <p>swipe - save - watch.</p>
              <div className="swipe-feature">
                <div>
                  <i className="fa-solid fa-left-long"></i>
                  <p>NO</p>
                </div>

                <div>
                  <i className="fa-solid fa-right-long"></i>
                  <p>YES</p>
                </div>
              </div>
            </TinderCard>{" "}
          </div>
        </div>
      </section>

      <section className="btn-selectors">
        <button className="icon" onClick={cross}>
          <i className="fa-solid fa-xmark fa-lg cross"></i>
        </button>
        <button className="icon" onClick={redo}>
          <i className="fa-solid fa-rotate-left fa-lg undo"></i>
        </button>
        <button className="icon" onClick={heart}>
          <i className="fa-solid fa-heart fa-lg heart"></i>
        </button>
      </section>
    </>
  );
}

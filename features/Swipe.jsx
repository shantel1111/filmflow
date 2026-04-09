import React from "react";
import TinderCard from "react-tinder-card";
import "../styles/swipe.css";
import { findMovie } from "../services/swipeApi";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
  },
};

export default function Swipe() {
  const [movieArr, setMovieArr] = React.useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const currentIndexRef = React.useRef(currentIndex);

  const cardRefs = React.useMemo(() => {
    return Array(movieArr.length)
      .fill(0)
      .map(() => React.createRef());
  }, [movieArr.length]);

  React.useEffect(() => {
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
        setCurrentIndex(movieObjects.length - 1);
      })
      .catch((err) => console.error(err));
  }, []);

  const canSwipe = currentIndex >= 0;

  const goBack = currentIndex < movieArr.length - 1;

  const updateCurrentIndex = (value) => {
    setCurrentIndex(value);
    currentIndexRef.current = value;
  };

  const swiped = (direction, id, index) => {
    console.log(`You swiped ${direction} with the movie ${id} index: ${index}`);
    updateCurrentIndex(index - 1);

    if (direction === "right") {
      addtoWatchList(id);
    }
  };

  const leftScreen = (index) => {
    currentIndexRef.current >= index && cardRefs[index].current.restoreCard();
  };

  const swipe = (dir) => {
    if (canSwipe && currentIndex < movieArr.length) {
      cardRefs[currentIndex].current.swipe(dir);
    }
  };

  const redo = () => {
    if (!goBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    cardRefs[newIndex].current.restoreCard();
  };

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
              .map((movie, index) => {
                return (
                  <TinderCard
                    ref={cardRefs[index]}
                    key={movie.id}
                    onSwipe={(dir) => {
                      swiped(dir, movie.id, index);
                    }}
                    onCardLeftScreen={() => leftScreen(index)}
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
        <button className="icon" onClick={() => swipe("left")}>
          <i className="fa-solid fa-xmark fa-lg cross"></i>
        </button>
        <button
          className="icon"
          onClick={() => {
            redo();
          }}
        >
          <i className="fa-solid fa-rotate-left fa-lg undo"></i>
        </button>
        <button className="icon" onClick={() => swipe("right")}>
          <i className="fa-solid fa-heart fa-lg heart"></i>
        </button>
      </section>
    </>
  );
}

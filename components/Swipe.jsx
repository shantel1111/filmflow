import { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";

export default function Search() {
  const [movieArr, setMovieArr] = useState([]);

  useEffect(() => {
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
  };

  const onCardLeftScreen = (id) => {
    console.log(`${id} left the screen`);
  };

  return (
    <>
      <div>
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
                    onCardLeftScreen={() => {
                      onCardLeftScreen(movie.id);
                    }}
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
              <h1>film flow</h1>
              <p>swipe. save. watch.</p>
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
      </div>

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

// movie that is currently on top
//  render 2-3 movies max at once the top card reacts to the gesture and when it leave it promotes the next card
// gesture based-swiping so drag distance dragged and direction
//  if dragged far enough accept swipe if not snap back to center

// activeIndex – which movie is on top
// likedMovies – stores right-swiped movies
// dislikedMovies – stores left-swiped movies

// Past +35% → RIGHT swipe (YES)
// Past −35% → LEFT swipe (NO)
// Between −35% and +35% → cancel

// The parent container owns the three-zone rule

// The decision (YES / NO / snap back) lives in the parent

// The card is responsible for movement and interaction

// The decision is made on release, not during drag

// const containerRef = useRef(null);
//   const [threshold, setThreshold] = useState(null);
//   // const [currentIndex, setCurrentIndex] = useState() // tracks which card is showing
//   // increment on swipe
//   // decrement on redo

//   useEffect(() => {
//     if (containerRef.current) {
//       const width = containerRef.current.offsetWidth; // width of the container
//       setThreshold(0.35 * width); // how far i move from the center
//       console.log(`This is the width ${width}`);
//     }
//   }, []);

//   function onDrag(event, info) {
//     // console.log(info.point.x);
//     // console.log(threshold);

//     if (info.offset.x > threshold) {
//       console.log("YES");
//       heart(); // what happens after dragEnd
//       // animate off screen
//       //  update state and render card stack
//     } else if (info.offset.x < -threshold) {
//       console.log("NO");
//       cross();
//     } else {
//       console.log("SNAP BACK");
//     }
//   }

// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzN2I2NWQxOGY1NDExNWFlYjUyNGI5OTdhOWEyYzBiZiIsIm5iZiI6MTc2NjE0NjA2MS4yMzUwMDAxLCJzdWIiOiI2OTQ1NDAwZDFiMzM0OWZlYWY4Y2Q3YTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.TDSoLMQduay7xq_UzP-PZDzBvTquzXfRtteL0E312Jw",
//   },
// };

// function renderMovie(movie) {
//   fetch(
//     `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US`,
//     options
//   )
//     .then((res) => res.json())
//     .then((data) => console.log(data));
// }

// fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
//   .then((res) => res.json())
//   .then((res) => console.log(res.genres))
//   .catch((err) => console.error(err));

// document.addEventListener("DOMContentLoaded");

// let movieArr = [];
// let html = "";

// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzN2I2NWQxOGY1NDExNWFlYjUyNGI5OTdhOWEyYzBiZiIsIm5iZiI6MTc2NjE0NjA2MS4yMzUwMDAxLCJzdWIiOiI2OTQ1NDAwZDFiMzM0OWZlYWY4Y2Q3YTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.TDSoLMQduay7xq_UzP-PZDzBvTquzXfRtteL0E312Jw",
//   },
// };

// fetch("https://api.themoviedb.org/3/trending/movie/day?language=en-US", options)
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//     data.results.forEach(function (movie) {
//       return (html = `
//         <img class="movie-poster" src=https://image.tmdb.org/t/p/w500/${movie.poster_path}>`);
//     });
//     filmBox.innerHTML = html;
//   })
//   .catch((err) => console.error(err));

// data.results.forEach(function(movie) {
//     movieArr.push({
//         id: movie.id,
//         title: movie.title,
//         img: movie.poster_path,
//         description: movie_overview
//     })
// })
//  console.log(movieArr)

//   https://api.themoviedb.org/3/movie/{movie_id}

//   id: data.id
//   title: data.original_title
//   image: data.poster_path

//   https://api.themoviedb.org/3/trending/movie/day?language=en-US
//   https://api.themoviedb.org/3/movie/popular

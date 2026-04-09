export async function findMovie(id) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
    },
  };

  fetch(`https://api.themoviedb.org/3/movie/${id}}`, options)
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}

// .poster_path
// .vote_average
// .release_date
// .title
// .original_language
// .runtime
// .genres
// .overview

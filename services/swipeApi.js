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

// Poster  res.poster_path
// imbdRating res.imbd_id
// Year res.release_date (have to make into year)
// Title res.original_title
// Description res.overview
// Runtime res.runtime
// Genre res.genres (an array that needs to be mapped)

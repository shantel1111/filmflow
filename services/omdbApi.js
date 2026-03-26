export async function getMovies(searchQuery) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMBDI_KEY}&s=${searchQuery}&type=movie`,
  );
  const data = await response.json();

  if (!data.Search) return [];

  const movieIdsSet = new Set();
  data.Search.forEach((film) => movieIdsSet.add(film.imdbID));
  const movieIds = [...movieIdsSet];

  const fetches = movieIds.map(async function (id) {
    let movieUrl = `https://www.omdbapi.com/?apikey=54ab6a5b&i=${id}&type=movie&plot=short`;
    const res = await fetch(movieUrl);
    return await res.json();
  });
  const allMovieData = await Promise.all(fetches);

  const filterd = filterMovies(allMovieData);

  return sortByYear(filterd);
}

function filterMovies(data) {
  return data.filter(function (film) {
    const filmGenre = film.Genre.split(",");
    const blockedGenres = ["Documentary", "Short", "Reality-TV"];

    const hasPoster = !film.Poster.includes("N/A");
    const hasPlot = !film.Plot.includes("N/A");
    const isAllowedGenre = !filmGenre.some(function (genre) {
      return blockedGenres.includes(genre.trim());
    });

    return hasPoster && hasPlot && isAllowedGenre;
  });
}

function sortByYear(movies) {
  return movies.sort((a, b) => {
    return parseInt(b.Year) - parseInt(a.Year);
  });
}

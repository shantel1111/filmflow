

export default function Header({ setView }) {
  return (
    <header>
      <div className="menus-box ">
        <ul>
          <li
            onClick={() => {
              setView("swipe");
            }}
          >
            <i className="fa-solid fa-film selected"></i>
          </li>
          <div className="search-container">
            <li
              onClick={() => {
                setView("search");
              }}
            >
              <i className="fa-solid fa-magnifying-glass "></i>
            </li>
            {/* {showSearch && (
              <input
                id="search-el"
                type="search"
                placeholder="Search for a movie"
                value={searchValue}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    fetchMovies();
                  }
                }}
              />
            )} */}
          </div>
          <li
            onClick={() => {
              setView("watchlist");
            }}
          >
            <i className="fa-solid fa-heart-circle-check"></i>
          </li>
        </ul>
      </div>
    </header>
  );
}

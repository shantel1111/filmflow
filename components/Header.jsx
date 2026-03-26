import "../styles/search.css";

export default function Header({ setView, view }) {
  return (
    <header>
      <div className="menus-box ">
        <ul>
          <li
            onClick={() => {
              setView("swipe");
            }}
          >
            <i
              className={`fa-solid fa-film ${view === "swipe" ? "selected" : ""}`}
            ></i>
          </li>
          <div className="search-container">
            <li
              onClick={() => {
                setView("search");
              }}
            >
              <i
                className={`fa-solid fa-magnifying-glass ${view === "search" ? "selected" : ""}`}
              ></i>
            </li>

            {view === "search" && (
              <input
                id="search-el"
                type="search"
                placeholder="Search for a movie"
              />
            )}
          </div>
          <li
            onClick={() => {
              setView("watchlist");
            }}
          >
            <i
              className={`fa-solid fa-heart-circle-check ${view === "watchlist" ? "selected" : ""}`}
            ></i>
          </li>
        </ul>
      </div>
    </header>
  );
}

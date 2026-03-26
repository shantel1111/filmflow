import React from "react";
import Header from "./Header";
import Swipe from "../features/Swipe";
import Search from "../features/Search";
import Watchlist from "../features/Watchlist";

export default function Content() {
  const [view, setView] = React.useState("swipe");
  return (
    <>
      <Header setView={setView} view={view} />

      {(view === "swipe" && <Swipe />) ||
        (view === "search" && <Search view={view} />) ||
        (view === "watchlist" && <Watchlist />)}
    </>
  );
}

import React, { useState } from "react";
import { HiSearch } from "react-icons/hi";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, Routes, Route } from "react-router-dom";
import Movies from "./Movies";
import TvShows from "./TvShows";
import Trending from "./Trends";
import Pricing from "./Pricing";
import "../styles/NavBarStyle.css";

export const container = React.createContext();

function NavBar() {
  const [toggle, setToggle] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => setMenuOpen(!menuOpen);

  return (
    <container.Provider value={{ toggle, inputValue }}>
      <>
        <nav id={toggle ? "" : "navBarColor"}>
          <div className="nav-left">
            <h1 id="heading">DAHRLIX</h1>

            <div className="hamburger" onClick={handleMenuToggle}>
              {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </div>

            <div className={`nav-options ${menuOpen ? "active" : ""}`}>
              <NavLink to="/" end onClick={() => setMenuOpen(false)}>
                <span>Movies</span>
              </NavLink>
              <NavLink to="/TvShows" onClick={() => setMenuOpen(false)}>
                <span>Tv Shows</span>
              </NavLink>
              <NavLink to="/Trending" onClick={() => setMenuOpen(false)}>
                <span>Trending</span>
              </NavLink>
              <NavLink to="/Pricing" onClick={() => setMenuOpen(false)}>
                <span>Pricing</span>
              </NavLink>
            </div>
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="Search Whatever You Want"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <HiSearch fontSize={21} color="white" id="search" />

            <div id="Color-switcher" onClick={() => setToggle(!toggle)}>
              <div
                id={toggle ? "Color-switcher-mover" : "Color-switcher-moved"}
              ></div>
            </div>
          </div>
        </nav>

        <div className={`drawer ${menuOpen ? "open" : ""}`}>
          <div className="drawer-content">
            <NavLink to="/" end onClick={() => setMenuOpen(false)}>
              <span>Movies</span>
            </NavLink>
            <NavLink to="/TvShows" onClick={() => setMenuOpen(false)}>
              <span>Tv Shows</span>
            </NavLink>
            <NavLink to="/Trending" onClick={() => setMenuOpen(false)}>
              <span>Trending</span>
            </NavLink>
            <NavLink to="/Pricing" onClick={() => setMenuOpen(false)}>
              <span>Pricing</span>
            </NavLink>
          </div>
        </div>

        {menuOpen && <div className="overlay" onClick={handleMenuToggle}></div>}

        <main className="page-content">
          <Routes>
            <Route path="/" element={<Movies />} />
            <Route path="/TvShows" element={<TvShows />} />
            <Route path="/Trending" element={<Trending />} />
            <Route path="/Pricing" element={<Pricing />} />
          </Routes>
        </main>
      </>
    </container.Provider>
  );
}

export default NavBar;

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AiFillPlayCircle } from "react-icons/ai";
import { container } from "./NavBar";
import "../styles/videos.css";
import NoImg from "./NoImage.jpg";
import TrailerPlayer from "../Trailers/TrailerPlayer";

function Trends() {
  const { toggle } = useContext(container);
  const [items, setItems] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  const apiKey =
    process.env.REACT_APP_TMDB_API_KEY || "77f876d7cdee43f24835c3b9cdf053d8";
  const images = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const { data } = await axios.get(
          "https://api.themoviedb.org/3/trending/all/day",
          { params: { api_key: apiKey } }
        );
        setItems(data.results || []);
      } catch (err) {
        console.error("Trending fetch error:", err);
        setItems([]);
      }
    };
    
    fetchTrending();
  }, []);

  const handlePlay = async (item) => {
    try {
      const path = item.media_type === "tv" ? "tv" : "movie";
      const res = await axios.get(
        `https://api.themoviedb.org/3/${path}/${item.id}/videos`,
        { params: { api_key: apiKey } }
      );
      const video =
        res.data.results.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
        res.data.results.find((v) => v.site === "YouTube");
      if (video) {
        setTrailerUrl(`https://www.youtube.com/embed/${video.key}`);
        setShowTrailer(true);
      } else {
        alert("No trailer available for this item.");
      }
    } catch (err) {
      console.error("Trending trailer fetch error:", err);
    }
  };

  return (
    <>
      <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
        <div className="movies-container">
          {items.map((item) => (
            <div key={item.id} id={showTrailer ? "NoContainer" : "container"}>
              <AiFillPlayCircle
                color="white"
                fontSize={40}
                id={showTrailer ? "hide" : "playIcon"}
                onClick={() => handlePlay(item)}
              />
              <img
                src={item.poster_path ? `${images}${item.poster_path}` : NoImg}
                alt={item.title || item.name}
                onClick={() => handlePlay(item)}
              />
              <h3
                id={(item.title || item.name)?.length > 28 ? "smaller-Text" : ""}
                className={toggle ? "mainColor" : "secondaryColor"}
              >
                {item.title || item.name}
              </h3>
            </div>
          ))}

          {showTrailer && (
            <TrailerPlayer
              trailerUrl={trailerUrl}
              onClose={() => setShowTrailer(false)}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Trends;
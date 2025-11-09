import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AiFillPlayCircle } from "react-icons/ai";
import { container } from "./NavBar";
import "../styles/videos.css";
import NoImg from "./NoImage.jpg";
import TrailerPlayer from "../Trailers/TrailerPlayer";

function TvShows() {
  const { toggle, inputValue } = useContext(container);
  const [tvData, setTvData] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  const apiKey =
    process.env.REACT_APP_TMDB_API_KEY || "77f876d7cdee43f24835c3b9cdf053d8";
  const images = "https://image.tmdb.org/t/p/w500";

  const input = inputValue;
  const shown = input ? "search" : "discover";
  const apiBase = `https://api.themoviedb.org/3/${shown}/tv`;

  useEffect(() => {
    const fetchTv = async () => {
      try {
        const { data } = await axios.get(apiBase, {
          params: { api_key: apiKey, query: input || undefined },
        });
        setTvData(data.results || []);
      } catch (err) {
        console.error("TV fetch error:", err);
        setTvData([]);
      }
    };
    
    fetchTv();
  }, [input]);

  const handlePlay = async (show) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/tv/${show.id}/videos`,
        { params: { api_key: apiKey } }
      );
      console.log("Trailer results for:", show.name, res.data.results);

      const video =
        res.data.results.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
        res.data.results.find((v) => v.site === "YouTube");
      if (video) {

        setTrailerUrl(`https://www.youtube.com/embed/${video.key}`);
        console.log("Trailer URL:", `https://www.youtube.com/embed/${video.key}`);


        setShowTrailer(true);
      } else {
        alert("No trailer available for this TV show.");
      }
    } catch (err) {
      console.error("Trailer fetch error:", err);
    }
  };

  return (
    <>
      <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
        <div className="movies-container">
          {tvData.map((show) => (
            <div key={show.id} id={showTrailer ? "NoContainer" : "container"}>
              <AiFillPlayCircle
                color="white"
                fontSize={40}
                id={showTrailer ? "hide" : "playIcon"}
                onClick={() => handlePlay(show)}
              />
              <img
                src={show.poster_path ? `${images}${show.poster_path}` : NoImg}
                alt={show.name}
                onClick={() => handlePlay(show)}
              />
              <h3
                id={show.name && show.name.length > 28 ? "smaller-Text" : ""}
                className={toggle ? "mainColor" : "secondaryColor"}
              >
                {show.name}
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

export default TvShows;

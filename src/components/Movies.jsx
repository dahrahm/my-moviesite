import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AiFillPlayCircle } from "react-icons/ai";
import { container } from "./NavBar";
import "../styles/videos.css";
import NoImg from "./NoImage.jpg";
import TrailerPlayer from "../Trailers/TrailerPlayer";

function Movies() {
  const { toggle, inputValue } = useContext(container);
  const [moviesData, setMoviesData] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  const apiKey =
    process.env.REACT_APP_TMDB_API_KEY || "77f876d7cdee43f24835c3b9cdf053d8";
  const images = "https://image.tmdb.org/t/p/w500";

  const shown = inputValue ? "search" : "discover";
  const Api = `https://api.themoviedb.org/3/${shown}/movie`;

  const fetchMovies = async () => {
    try {
      const { data } = await axios.get(Api, {
        params: { api_key: apiKey, query: inputValue || undefined },
      });
      setMoviesData(data.results || []);
    } catch (err) {
      console.error("Movie fetch error:", err);
      setMoviesData([]);
    }
  };

  useEffect(() => {
    const t = setTimeout(fetchMovies, 700);
    return () => clearTimeout(t);
  }, [inputValue]);

  const handlePlay = async (movie) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
        { params: { api_key: apiKey } }
      );
      const video =
        res.data.results.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
        res.data.results.find((v) => v.site === "YouTube");
      if (video) {
        setTrailerUrl(`https://www.youtube.com/embed/${video.key}`);
        setShowTrailer(true);
      } else {
        alert("No trailer available for this movie.");
      }
    } catch (err) {
      console.error("Movie trailer fetch error:", err);
    }
  };

  return (
    <>
      <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
        <div className="movies-container">
          {moviesData.map((movie) => (
            <div key={movie.id} id={showTrailer ? "NoContainer" : "container"}>
              <AiFillPlayCircle
                color="white"
                fontSize={40}
                id={showTrailer ? "hide" : "playIcon"}
                onClick={() => handlePlay(movie)}
              />
              <img
                src={movie.poster_path ? `${images}${movie.poster_path}` : NoImg}
                alt={movie.title || movie.name}
                onClick={() => handlePlay(movie)}
              />
              <h3
                id={movie.title && movie.title.length > 28 ? "smaller-Text" : ""}
                className={toggle ? "mainColor" : "secondaryColor"}
              >
                {movie.title || movie.name}
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

export default Movies;

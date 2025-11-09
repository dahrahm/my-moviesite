import React, { useRef } from "react";
// import ReactPlayer from "react-player";
import { AiOutlineClose } from "react-icons/ai";
import "../styles/videos.css";

const TrailerPlayer = ({ trailerUrl, onClose }) => {
  const playerRef = useRef(null);

  if (!trailerUrl) return null;
  console.log("Trailer URL trying to play:", trailerUrl);


  const handleClose = () => {
    try {
      playerRef.current?.seekTo(0);
    } catch (error) {
      console.warn("Error while closing trailer:", error);
    }
    onClose();
  };

  return (
    <div className="trailer-wrapper show" onClick={handleClose}>
      <div
        className="trailer-box"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "80vw",
          maxWidth: "900px",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            width: "40px",
            height: "40px",
            background: "rgba(0,0,0,0.6)",
            border: "none",
            borderRadius: 20,
            padding: 6,
            cursor: "pointer",
            color: "#fff",
            zIndex: 2,
          }}
          aria-label="Close trailer"
        >
          <AiOutlineClose size={20} />
        </button>
        <iframe
          width="100%"
          height="480"
          src={trailerUrl}
          title="YouTube trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />


      </div>
    </div>
  );
};

export default TrailerPlayer;

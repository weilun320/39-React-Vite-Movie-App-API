import { useEffect } from "react";
import { useState } from "react";
import "./App.css"

// Component to display movie info
function MovieInfo({ movieData }) {
  return (
    <>
      <h2>{movieData.Title} ({movieData.Year})</h2>
      <img alt={movieData.Title} src={movieData.Poster} />
      <p>{movieData.Plot}</p>
      <p>Rating: {movieData.Ratings[0].Value}</p>
    </>
  );
}

// Function to fetch movie data from API based on title
async function fetchMovieData(title) {
  const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=258a2345`);
  const data = await response.json();

  return data;
}

function App() {
  const [title, setTitle] = useState("");
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(false);

  const options = [
    "Doctor Strange",
    "Black Panther",
    "Iron Man",
    "Madagascar",
  ];

  // Option change handler
  const onOptionChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  // Fetch movie info on-the-fly when user select an option
  useEffect(() => {
    if (title) {
      setLoading(true);
      fetchMovieData(title)
        .then((data) => setMovieData(data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [title]);

  return (
    <div>
      <h1>Movie App</h1>
      <select onChange={onOptionChangeHandler}>
        <option value="">Select a Movie</option>
        {options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
      {loading && <p>Loading...</p>}
      {movieData && (
        <MovieInfo movieData={movieData} />
      )}
    </div>
  );
}

export default App;

import React from "react";
import axios from "axios";
import { useState } from "react";
import { PropagateLoader } from "react-spinners";

const MoviesList = () => {
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // this will display a loading indicator when fetching data

  //import from the environment variable file (.env)

  console.log(import.meta.env.VITE_TMDB_API_KEY);

  async function fetchMovies() {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&language=en-US&page=1`
      ); //api call to fetch popular movies. WE have to import the api key from the .env file
      console.log(response.data.results);
      setMovieData(response.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  console.log(movieData);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl text-center mb-6 font-bold">
        🎥 Popular Movies - It Happens Here...
      </h2>
      <div className="flex justify-center mb-6">
        <button
          className="mt-3 px-6 py-2 rounded-lg shadow-md transition bg-blue-600 hover:bg-blue-800 text-white"
          onClick={fetchMovies}
        >
          Search
        </button>
      </div>
      {isLoading && (
        <div className="flex justify-center items-center my-8">
          <PropagateLoader color="#3B82F6" size={15} />
          {/* // Loading spinner */}
        </div>
      )}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movieData.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
              alt={item.poster_path}
              className="w-full h-80 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{item.original_title}</h3>
              <p className="text-sm text-gray-400">{item.overview}</p>
              <p>
                ⭐ <span className="text-sm ml-2">{item.vote_average}</span>
                <span className="ml-15">
                  📅 <span className="text-sm">{item.release_date}</span>
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <footer>
          <p className="text-center text-white text-sm mt-6">
            &copy; 2025 Movies App. All rights reserved. David Francis Effiong
            (Aquaticus)
          </p>
        </footer>
      </div>
    </div>
  );
};

export default MoviesList;

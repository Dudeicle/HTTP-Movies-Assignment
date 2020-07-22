import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

// app.delete("/api/movies/:id", (req, res) => {
//   if (!req.params.id)
//     res.status(400).send("Your request is missing the movie id");
//   movies = movies.filter(movie => `${movie.id}` !== req.params.id);
//   res.status(202).send(req.params.id);
// });


function Movie(props) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  console.log(props)

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const handleDelete = e => {
    e.preventDefault()
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res => {
        console.log(res)
        const newMoviesArray = props.movieList.filter(v => v.id !== movie.id)
        props.setMovieList(newMoviesArray)
        push('/');
      })
      .catch(err => console.log({ err }))
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <div>
        <button onClick={() => push(`/update-movie/${params.id}`)} >Update Movie</button>
      </div>
      <div>
        <button onClick={handleDelete}>Delete This Movie!</button>
      </div>
    </div>
  );
}

export default Movie;

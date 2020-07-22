import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

const initialState = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [],
  }

function MovieForm (props) {
    const [movie, setMovie] = useState(initialState);
    const { push } = useHistory();
    const { id } = useParams();
    const location = useLocation()

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                console.log(res.data)
                setMovie(res.data)
            })
            .catch(err => console.log({ err }))

    }, [])

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                console.log(res)
                props.movieList.filter(v => v.id === movie.id)
                const newMovieListTwo = [...props.movieList, movie]
                props.setMovieList(newMovieListTwo)
                push(`/movies/${movie.id}`)
            })
            .catch(err => console.log({ err }))
    }

    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;
        if (ev.target.name === "metascore") {
          value = parseInt(value, 10);
        }
    
        setMovie({
          ...movie,
          [ev.target.name]: value
        });
    };
    
    return (
        <div>
            <h1>Edit The Movie Details!</h1>
            <form onSubmit={handleSubmit}>
                <label>Title -:- 
                    <input 
                        type="text"
                        name="title"
                        onChange={changeHandler}
                        value={movie.title}
                    />
                </label>
                <br></br>

                <label>Director -:-
                    <input 
                        type="text"
                        name="director"
                        onChange={changeHandler}
                        value={movie.director}
                    />
                </label>
                <br></br>

                <label>Metascore -:-
                    <input 
                        type="text"
                        name="metascore"
                        onChange={changeHandler}
                        value={movie.metascore}
                    />
                </label>
                <br></br>

                <label>Cast -:-
                    <input 
                        type="text"
                        name="cast"
                        onChange={changeHandler}
                        value={movie.cast}
                    />
                </label>
                <br></br>
                <button>Sumbit Info</button>
            </form>
        </div>
    )
}

export default MovieForm;
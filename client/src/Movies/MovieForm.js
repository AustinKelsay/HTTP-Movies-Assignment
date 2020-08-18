import React, {useState, useEffect} from "react"
import axios from "axios"
import MovieCard from "./MovieCard";

const MovieForm = (props) => {
    const [starHandle, setStarHandle] = useState('')
    const [movie, setMovie] = useState(null)
    const [newMovie, setNewMovie] = useState({
            id:69,
            title: '',
            director: '',
            metascore: null,
            stars: []
    })

    const fetchMovie = id => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then(res => setMovie(res.data))
          .catch(err => console.log(err.response));
      };

      useEffect(() => {
        fetchMovie(props.match.params.id);
      }, [props.match.params.id]);
    

    const handleChange = (e) => {
        e.preventDefault()
        setNewMovie({
            ...newMovie,
            [e.target.name]: e.target.value
        })
    }

    const handleStar = (e) => {
        e.preventDefault()
        setNewMovie({
            ...newMovie,
            stars: [...newMovie.stars, e.target.value]
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios     
        .put(`http://localhost:5000/api/movies/${props.match.params.id}`, newMovie)
        .then(response => {
            console.log(response)
            props.history.push('/')
        })
        .catch(err => {
            console.log(err)
        });
    }
    if (!movie) {
        return <div>Loading movie information...</div>;
      }

    return(
        <div>
            <MovieCard movie={movie} />
            <h1>Update this film</h1>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <br/>
                <input type="text" name="title" value={newMovie.title} onChange={handleChange} />
                <br/>
                <label>Director</label>
                <br/>
                <input type="text" name="director" value={newMovie.director} onChange={handleChange} />
                <br/>
                <label>MetaScore</label>
                <br/>
                <input type="text" name="metascore" value={newMovie.metascore} onChange={handleChange} />
                <br/>
                <button type="submit">Submit</button>
                <h5>Stars</h5>
                <input
                name='stars'
                placeholder='Stars'
                value={starHandle}
                onChange={(e) => {
                    setStarHandle(e.target.value)
                }}
                />
                <button onClick={(e) => {
                    e.preventDefault()
                    setNewMovie({...newMovie, stars: [...newMovie.stars, starHandle]})
                    setStarHandle('')
                }}>Add Stars</button>
                {newMovie.stars.map((item, index) => {
                    return <p key={index}>{item}</p>
                })}
                <button type='submit'>Update Movie</button>
                </form>
        </div>
    )
}

export default MovieForm;
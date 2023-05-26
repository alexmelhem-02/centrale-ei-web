import logo from './logo.svg';
import './Home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieGrid from '../../components/MovieGrid/movieGrid';

function Home() {
  const [movieName, setMovieName] = useState('');
  const [movies, setMovies] = useState([]);

  const useFetchMovies = () => {
    axios
      .get("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", {
        headers: {'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo'},
      })
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.log(error)
      })
  };

  useEffect(useFetchMovies,[]);
  let movieList = movies.filter(movie => movie.title.includes(movieName))

  return (
    <div className="App">
      <header className="App-header">
        List of Movies
      </header>
      <input value={movieName} onChange={event => setMovieName(event.target.value)} placeholder='Search a movie'/>
      <MovieGrid movies={movieList} />
      {movieList.length == 0 && <p>We're sorry. No movies matched your search</p>}
    </div>
  );
}

export default Home;

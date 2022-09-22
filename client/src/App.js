import React, { useEffect, useMemo, useState, createContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Search } from './Search.js';
import { AddMovie } from './AddMovie.js';
import { MovieDetail } from './MovieDetail.js';
export const AppContext = createContext();

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [displayUserMade, setDisplayUserMade] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(false);

  const navigate = useNavigate();
  const serverLocation = 'http://localhost:3001';

  const searchResults = useMemo(() => {
    if (!displayUserMade) {
      let result = movies.filter(movie =>
        movie.name.toLowerCase().includes(searchText.toLowerCase())
      );
      return result;
    } else {
      let result = movies.filter(
        movie =>
          movie.name.toLowerCase().includes(searchText.toLowerCase()) &&
          movie.userAdded
      );
      return result;
    }
  }, [displayUserMade, searchText, movies]);

  useEffect(() => {
    console.log('fetching all movies');
    fetch(`${serverLocation}/movies`)
      .then(res => res.json())
      .then(data => setMovies(data));
  }, [triggerFetch]);

  const setContext = {
    searchResults,
    displayUserMade,
    serverLocation,
    setTriggerFetch,
  };

  return (
    <AppContext.Provider value={setContext}>
      <div className='flex flex-col justify-center items-center gap-3'>
        <div>
          <div className='flex my-10 justify-center text-5xl font-extrabold'>
            <button>Movie-List!</button>
          </div>
          <div className='flex my-10 justify-center text-5xl'>
            <input
              type='text'
              className='rounded-lg'
              id='search'
              name='search'
              placeholder='Movie Name'
              value={searchText}
              onChange={e => {
                console.log(searchText);
                setSearchText(e.target.value);
              }}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  navigate('/');
                }
              }}
            ></input>
          </div>
          <div className='flex items-center justify-center gap-2 h-10'>
            Filters
            <button
              className='bg-slate-600 rounded px-2 w-40 h-8 text-stone-100 hover:font-bold hover:bg-slate-500'
              onClick={e => {
                setSearchText('');
              }}
            >
              Reset Search
            </button>
            <button
              className='bg-slate-600 rounded px-2 w-40 h-8 text-stone-100 hover:font-bold hover:bg-slate-500'
              onClick={e => {
                setDisplayUserMade(prev => !prev);
              }}
            >
              {`User-Made ${displayUserMade}`}
            </button>
          </div>
          <div className='flex items-center justify-center gap-2 h-10'>
            <button
              className='bg-slate-600 rounded px-2 w-40 h-8 text-stone-100 hover:font-bold hover:bg-slate-500'
              onClick={e => {
                navigate('/addMovie');
              }}
            >
              Add Movie
            </button>
            <button
              className='bg-slate-600 rounded px-2 w-40 h-8 text-stone-100 hover:font-bold hover:bg-slate-500'
              onClick={e => {
                navigate('/');
              }}
            >
              Search Results
            </button>
          </div>
          <Routes>
            <Route path='/' element={<Search />} />
            <Route path='/addMovie' element={<AddMovie />} />
            <Route path='/:id' element={<MovieDetail />} />
          </Routes>
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;

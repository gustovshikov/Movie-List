import { useContext } from 'react';
import { AppContext } from './App.js';
import { useNavigate } from 'react-router-dom';

export const Search = () => {
  const { searchResults } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      {searchResults.length > 0 ? (
        <div className='flex flex-row gap-3 flex-wrap m-10'>
          {searchResults.map((movie, index) => (
            <button
              key={index}
              className='w-fit h-fitv bg-stone-200 rounded hover:bg-stone-400'
              onClick={e => {
                console.log(movie);
                navigate(`/${movie.id}`);
              }}
            >
              <div className=' rounded p-3 w-80 h-60'>
                <span className='text-3xl'>{movie.name}</span>
                <ul>
                  <li>Rating: {movie.rating}</li>
                  <li>Studio: {movie.studio}</li>
                  <li>Release Date: {movie.date}</li>
                  <li>Country: {movie.country}</li>
                  <li>Runtime: {movie.runtime}min</li>
                </ul>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className='flex justify-center text-3xl mt-20'>No Results</div>
      )}
    </>
  );
};

import { useContext, useMemo } from 'react';
import { AppContext } from './App.js';
import { useNavigate, useParams } from 'react-router-dom';

export const MovieDetail = () => {
  const { searchResults, setTriggerFetch, serverLocation } =
    useContext(AppContext);
  const navigate = useNavigate();
  let { id } = useParams();
  id = id.toString();

  const CurrentMovieDetail = useMemo(() => {
    let results = searchResults.filter(movie => movie.id.toString() === id);
    return results;
  }, [id, searchResults]);

  const deleteMovie = () => {
    fetch(`${serverLocation}/movies/${id}`, {
      method: 'DELETE',
      body: JSON.stringify(),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log(response);
        setTriggerFetch(prev => !prev);
      })
      .catch(err => {
        console.log('error: ', err);
      });
  };

  console.log('id', id);
  console.log(CurrentMovieDetail);
  return (
    <>
      {CurrentMovieDetail[0] !== undefined ? (
        <div className='flex my-10 justify-center items-center flex-col p-10 bg-stone-200 rounded-lg gap-3'>
          <div className='flex flex-col justify-center items-center'>
            <span className='text-4xl'>{CurrentMovieDetail[0].name}</span>
            <div className='relative flex py-5 items-center w-full'>
              <div className='flex-grow border-t border-slate-600'></div>
              <span className='flex-shrink mx-4 text-slate-600'>
                Information
              </span>
              <div className='flex-grow border-t border-slate-600'></div>
            </div>
            <ul>
              <li>Rating: {CurrentMovieDetail[0].rating}</li>
              <li>Studio: {CurrentMovieDetail[0].studio}</li>
              <li>Release Date: {CurrentMovieDetail[0].date}</li>
              <li>Country: {CurrentMovieDetail[0].country}</li>
              <li>Runtime: {CurrentMovieDetail[0].runtime}min</li>
            </ul>
          </div>
          <button
            className='bg-slate-600 rounded px-2 w-40 h-8 text-stone-100 hover:font-bold hover:bg-slate-500'
            onClick={e => {
              console.log('call delete');
              deleteMovie();
              navigate('/');
            }}
          >
            Remove Movie
          </button>
        </div>
      ) : (
        <>loading</>
      )}
    </>
  );
};

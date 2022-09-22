import { useContext, useState } from 'react';
import { AppContext } from './App.js';

export const AddMovie = () => {
  const defaultMovieValues = {
    name: '',
    date: '',
    studio: '',
    country: '',
    runtime: '',
    rating: '',
    userAdded: true,
  };
  const { serverLocation, setTriggerFetch } = useContext(AppContext);
  const [addMovie, setAddMovie] = useState(defaultMovieValues);
  const [returnInfo, setReturnInfo] = useState([]);

  const postMovie = () => {
    console.log('Posting movie');
    fetch(`${serverLocation}/movies`, {
      method: 'POST',
      body: JSON.stringify([addMovie]),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('return from post', data);
        setReturnInfo(data);
        setAddMovie(defaultMovieValues);
        setTriggerFetch(prev => !prev);
      });
  };

  return (
    <div className='flex my-10 justify-center items-center flex-col p-10 bg-stone-200 rounded-lg gap-3'>
      <h2 className=' text-3xl mb-2'>Movie to Add</h2>
      <div className='relative flex py-5 items-center w-full'>
        <div className='flex-grow border-t border-slate-600'></div>
        <span className='flex-shrink mx-4 text-slate-600'>Info</span>
        <div className='flex-grow border-t border-slate-600'></div>
      </div>

      <label>
        <span className='mx-3'>Title:</span>
        <input
          type='text'
          className='rounded-lg px-3 border-slate-400 border-2'
          id='name'
          name='search'
          placeholder='name of movie'
          value={addMovie.name}
          onChange={e => {
            setAddMovie({ ...addMovie, name: e.target.value });
            console.log(addMovie);
          }}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              console.log(e.target.value);
            }
          }}
        />
      </label>
      <label>
        <span className='mx-3'>Date:</span>
        <input
          type='text'
          className='rounded-lg px-3 border-slate-400 border-2'
          id='name'
          name='search'
          placeholder='Release date of movie'
          value={addMovie.date}
          onChange={e => {
            setAddMovie({ ...addMovie, date: e.target.value });
            console.log(addMovie);
          }}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              console.log(e.target.value);
            }
          }}
        />
      </label>
      <label>
        <span className='mx-3'>Studio:</span>
        <input
          type='text'
          className='rounded-lg px-3 border-slate-400 border-2'
          id='name'
          name='search'
          placeholder='Studio of movie'
          value={addMovie.studio}
          onChange={e => {
            setAddMovie({ ...addMovie, studio: e.target.value });
            console.log(addMovie);
          }}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              console.log(e.target.value);
            }
          }}
        />
      </label>
      <label>
        <span className='mx-3'>Country:</span>
        <input
          type='text'
          className='rounded-lg px-3 border-slate-400 border-2'
          id='name'
          name='search'
          placeholder='Country of movie'
          value={addMovie.country}
          onChange={e => {
            setAddMovie({ ...addMovie, country: e.target.value });
            console.log(addMovie);
          }}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              console.log(e.target.value);
            }
          }}
        />
      </label>
      <label>
        <span className='mx-3'>Runtime:</span>
        <input
          type='text'
          className='rounded-lg px-3 border-slate-400 border-2'
          id='name'
          name='search'
          placeholder='Runtime of movie: Minutes'
          value={addMovie.runtime}
          onChange={e => {
            setAddMovie({ ...addMovie, runtime: e.target.value });
            console.log(addMovie);
          }}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              console.log(e.target.value);
            }
          }}
        />
      </label>
      <label>
        <span className='mx-3'>Rating:</span>
        <input
          type='text'
          className='rounded-lg px-3 border-slate-400 border-2'
          id='name'
          name='search'
          placeholder='Rating of movie "0-100"'
          value={addMovie.rating}
          onChange={e => {
            setAddMovie({ ...addMovie, rating: e.target.value });
            console.log(addMovie);
          }}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              console.log(e.target.value);
            }
          }}
        />
      </label>
      <button
        className='bg-slate-600 rounded px-2 w-40 h-8 text-stone-100 hover:font-bold hover:bg-slate-500'
        onClick={() => {
          console.log(addMovie);
          postMovie();
        }}
      >
        Submit
      </button>

      {returnInfo[0] === undefined ? null : (
        <>
          <div className='relative flex py-5 items-center w-full'>
            <div className='flex-grow border-t border-slate-600'></div>
            <span className='flex-shrink mx-4 text-slate-600'>Movie Added</span>
            <div className='flex-grow border-t border-slate-600'></div>
          </div>

          <span className='text-3xl'>{returnInfo[0].name}</span>
          <ul>
            <li>Rating: {returnInfo[0].rating}</li>
            <li>Studio: {returnInfo[0].studio}</li>
            <li>Release Date: {returnInfo[0].date}</li>
            <li>Country: {returnInfo[0].country}</li>
            <li>Runtime: {returnInfo[0].runtime}min</li>
          </ul>
        </>
      )}
    </div>
  );
};

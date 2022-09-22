const knex = require('knex')(require('../knexfile.js')['development']);

const getAllMovies = async () => {
  return knex('movies').select('*');
};

const postMovies = async props => {
  console.log('post movie', props);
  return knex('movies').insert(props, ['*']);
};

const deleteMovieByID = async id => {
  await knex('movies').where('id', id).del();
  return 'Movie deleted successfully';
};

module.exports = {
  getAllMovies,
  postMovies,
  deleteMovieByID,
};

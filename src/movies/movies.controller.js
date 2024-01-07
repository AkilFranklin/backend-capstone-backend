const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  const { movie_id } = request.params;
  const movie = await service.read(movie_id);
  if (movie) {
    response.locals.movie = movie;
    return next();
  }
  return next({ status: 404, message: `Movie cannot be found.` });
}

async function read(request, response, next) {
  // TODO: Add your code here
  const { movie } = response.locals;
  response.json({ data: movie });
}

async function list(request, response) {
  // TODO: Add your code here.
  const data = await service.list(request.query.is_showing);
  response.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
};

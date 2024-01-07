const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");
const mapProperties = require("../utils/map-properties");

async function reviewExists(request, response, next) {
  const { review_id } = request.params;
  const review = await service.read(review_id);
  if (review) {
    response.locals.review = review;
    return next();
  }
  return next({ status: 404, message: `Review cannot be found.` });
}

async function destroy(request, response) {
  // TODO: Write your code here 
  const { review_id } = request.params;
  await service.delete(review_id);
  response.sendStatus(204);
}

async function list(request, response) {
  // TODO: Write your code here
  const { movie_id } = request.params;
  const reviews = await service.list(movie_id);
  reviews.forEach(review => 
        review["critic"] = {
            "critic_id": review["critic_id"],
            "preferred_name": review["preferred_name"],
            "surname": review["surname"],
            "organization_name": review["organization_name"]
        }
  )

  response.json({data: reviews });
}

function hasmovie_idInPath(request, response, next) {
  if (request.params.movie_id) {
    return next();
  }
  methodNotAllowed(request, response, next);
}

function nomovie_idInPath(request, response, next) {
  if (request.params.movie_id) {
    return methodNotAllowed(request, response, next);
  }
  next();
}

async function update(request, response) {
  // TODO: Write your code here
  const updatedReview = {
    ...response.locals.review,
    ...request.body.data,
    review_id: response.locals.review.review_id,
  };
  const data = await service.update(updatedReview);
  response.json({ data });
}

module.exports = {
  delete: [
    nomovie_idInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: [hasmovie_idInPath, asyncErrorBoundary(list)],
  update: [
    nomovie_idInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
};

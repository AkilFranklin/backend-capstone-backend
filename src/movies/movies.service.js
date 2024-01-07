const db = require("../db/connection");

async function list(is_showing) {
  return db("movies")
    .select("movies.*")
    .modify((queryBuilder) => {
      if (is_showing) {
        queryBuilder
          .join(
            "movies_theaters",
            "movies.movie_id",
            "movies_theaters.movie_id"
          )
          .where({ "movies_theaters.is_showing": true })
          .groupBy("movies.movie_id");
      }
    });
}

// async function read(movie_id) {
//   // TODO: Add your code here
//   return db("movies as m")
//   .select(
//     "m.movie_id as id",
//     "m.title",
//     "m.runtime_in_minutes",
//     "m.rating",
//     "m.description",
//     "m.image_url",
//     ).where({ "m.movie_id": movie_id }).first();
// }

async function read(movie_id) {
  // TODO: Add your code here
  return db("movies as m")
  .select("*").where({ "m.movie_id": movie_id }).first();
}

module.exports = {
  list,
  read,
};

import { ObjectId } from "mongodb";

export default class MoviesDAO {
  static movies;

  static async injectDB(conn) {
    if (MoviesDAO.movies) {
      return;
    }
    try {
      MoviesDAO.movies = await conn
        .db(process.env.MOVIEREVIEWS_NS)
        .collection("movies");
    } catch (e) {
      console.error(`unable to connect in MovieDAO: ${e}`);
    }
  }

  static async getMovies({
    filters = null,
    page = 0,
    moviesPerPage = 20,
  } = {}) {
    const query = {
      $and: [{ poster: { $exists: true } }],
    };
    if (filters) {
      if ("title" in filters) {
        query.$and.push({ $text: { $search: filters.title } });
      } else if ("rated" in filters) {
        query.$and.push({ rated: { $eq: filters.rated } });
      }
    }

    let cursor;
    try {
      cursor = await MoviesDAO.movies
        .find(query)
        .limit(moviesPerPage)
        .skip(moviesPerPage * page);
      const moviesList = await cursor.toArray();
      const totalNumMovies = await MoviesDAO.movies.countDocuments(query);
      return { moviesList, totalNumMovies };
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { moviesList: [], totalNumMovies: 0 };
    }
  }

  static async getRatings() {
    let ratings = [];
    try {
      ratings = await MoviesDAO.movies.distinct("rated");
      return ratings;
    } catch (e) {
      console.error(`unable to get ratings,${e}`);
      return ratings;
    }
  }

  static async getMovieById(id) {
    try {
      return await MoviesDAO.movies
        .aggregate([
          {
            $match: {
              _id: new ObjectId(id),
            },
          },
          {
            $lookup: {
              from: "comments",
              localField: "_id",
              foreignField: "movie_id",
              as: "comments",
            },
          },
        ])
        .next();
    } catch (e) {
      console.error(`something went wrong in getMoviesById: ${e}`);
    }
  }
}

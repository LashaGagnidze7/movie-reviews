import MoviesController from "./MoviesController.js";
import CommentsController from "./CommentsController.js";
import UsersController from  "./UsersController.js";

export default class MoviesRoute {
  static configRoutes(router) {
    router.route("/").get(MoviesController.apiGetMovies);
    router.route("/id/:id").get(MoviesController.apiGetMovieById);
    router.route("/ratings").get(MoviesController.apiGetRatings);

    router.route("/review")
      .post(CommentsController.apiPostReview)
      .put(CommentsController.apiUpdateReview)
      .delete(CommentsController.apiDeleteReview);

    router.route("/users/:email").get(UsersController.apiLoginUser);

    //router.route("/register").post(UsersController.apiRegisterUser);
    return router;
  }
}

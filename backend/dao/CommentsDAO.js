import { ObjectId } from "mongodb";

export default class CommentsDAO {
  static reviews;

  static async injectDB(conn) {
    if (CommentsDAO.reviews) {
      return;
    }
    try {
      CommentsDAO.reviews = await conn
        .db(process.env.MOVIEREVIEWS_NS)
        .collection("comments");
    } catch (e) {
      console.error(`unable to establish connection handle in reviewDAO: ${e}`);
    }
  }

  static async addReview(movieId, user, review, date) {
    try {
      const reviewDoc = {
        name: user.name,
        user_id: user._id,
        date,
        review,
        movie_id: new ObjectId(movieId),
      };
      return await CommentsDAO.reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error(`unable to post review: ${e}`);
      return { error: e };
    }
  }

  static async updateReview(reviewId, userId, review, date) {
    try {
      return await CommentsDAO.reviews.updateOne(
        { user_id: userId, _id: new ObjectId(reviewId) },
        { $set: { review, date } }
      );
    } catch (e) {
      console.error(`unable to update review: ${e}`);
      return { error: e };
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      return await CommentsDAO.reviews.deleteOne({
        _id: new ObjectId(reviewId),
        user_id: userId,
      });
    } catch (e) {
      console.error(`unable to delete review: ${e}`);
      return { error: e };
    }
  }
}

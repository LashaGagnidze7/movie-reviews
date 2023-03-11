import mongodb from "mongodb";

export default class ReviewsDAO {
  static reviews;

  static ObjectId = mongodb.ObjectId;

  static async injectDB(conn) {
    if (ReviewsDAO.reviews) {
      return;
    }
    try {
      ReviewsDAO.reviews = await conn.db(process.env.MOVIEREVIEWS_NS).collection('comments');
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
        movie_id: new ReviewsDAO.ObjectId(movieId),
      };
      return await ReviewsDAO.reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error(`unable to post review: ${e}`);
      return {error: e};
    }
  }

  static async updateReview(reviewId, userId, review, date) {
    try {
      return await ReviewsDAO.reviews.updateOne(
        {user_id: userId, _id: new ReviewsDAO.ObjectId(reviewId)},
        {$set: {review, date}},
      );
    } catch (e) {
      console.error(`unable to update review: ${e}`);
      return {error: e};
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      return await ReviewsDAO.reviews.deleteOne({
        _id: new ReviewsDAO.ObjectId(reviewId),
        user_id: userId,
      });
    } catch (e) {
      console.error(`unable to delete review: ${e}`);
      return {error: e};
    }
  }
}
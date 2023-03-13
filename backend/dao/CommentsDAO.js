import { ObjectId } from "mongodb";

export default class CommentsDAO {
  static comments;

  static async injectDB(conn) {
    if (CommentsDAO.comments) {
      return;
    }
    try {
      CommentsDAO.comments = await conn
        .db(process.env.MOVIEREVIEWS_NS)
        .collection("comments");
    } catch (e) {
      console.error(`unable to establish connection handle in reviewDAO: ${e}`);
    }
  }

  static async addReview(data) {
    data.movie_id = new ObjectId(data.movie_id);
    try {
      await CommentsDAO.comments.insertOne(data);
    } catch (e) {
      console.error(`unable to post review: ${e}`);
    }
  }

  static async updateReview(reviewId, userId, review, date) {
    try {
      return await CommentsDAO.comments.updateOne(
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
      return await CommentsDAO.comments.deleteOne({
        _id: new ObjectId(reviewId),
        user_id: userId,
      });
    } catch (e) {
      console.error(`unable to delete review: ${e}`);
      return { error: e };
    }
  }
}

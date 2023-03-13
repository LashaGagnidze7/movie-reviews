import {ObjectId} from "mongodb";


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

  static async updateReview(data) {
    try {
      data._id = new ObjectId(data._id);
      await CommentsDAO.comments.updateOne(
        {_id: data._id},
        {$set: {text: data.text, date: data.date}}
      );
    } catch (e) {
      console.error(`unable to update review: ${e}`);
    }
  }

  static async deleteReview(data) {
    try {
      data._id = new ObjectId(data._id);
      await CommentsDAO.comments.deleteOne(data);
    } catch (e) {
      console.error(`unable to delete review: ${e}`);
    }
  }
}

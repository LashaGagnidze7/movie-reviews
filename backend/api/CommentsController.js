import CommentsDAO from "../dao/CommentsDAO.js";

export default class CommentsController {
  static async apiPostReview(req, res) {
    try {
      await CommentsDAO.addReview(req.body);
      res.json({status: "success"});
    } catch (e) {
      res.status(500).json({error: e.message});
    }
  }

  static async apiUpdateReview(req, res) {
    try {
      const reviewId = req.body.review_id;
      const {review} = req.body;

      const date = new Date();

      const ReviewResponse = await CommentsDAO.updateReview(
        reviewId,
        req.body.user_id,
        review,
        date
      );

      const {error} = ReviewResponse;
      if (error) {
        res.status.json({error});
      }

      if (ReviewResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update review. User may not be original poster"
        );
      }
      res.json({status: "success"});
    } catch (e) {
      res.status(500).json({error: e.message});
    }
  }

  static async apiDeleteReview(req, res) {
    try {
      await CommentsDAO.deleteReview(req.body);
      res.json({status: "success"});
    } catch (e) {
      res.status(500).json({error: e.message});
    }
  }
}

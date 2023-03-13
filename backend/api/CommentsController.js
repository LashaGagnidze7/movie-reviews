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
      await CommentsDAO.updateReview(req.body);
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

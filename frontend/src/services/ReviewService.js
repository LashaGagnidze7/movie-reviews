import axios from "axios";

export default class ReviewService {
  static async createReview(data) {
    await axios.post("http://localhost:5000/api/v1/movies/review", data);
  }

  static async deleteReview(data) {
    await axios.delete("http://localhost:5000/api/v1/movies/review", { data });
  }

  static async updateReview(data) {
    await axios.put("http://localhost:5000/api/v1/movies/review", data);
  }
}

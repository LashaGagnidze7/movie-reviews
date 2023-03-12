import axios from 'axios';

export default class UserService {
  static async getUserByEmail(email) {
    const res = await axios.get(`http://localhost:5000/api/v1/movies/users/${email}`);
    return res.data;
  }
}

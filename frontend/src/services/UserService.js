import axios from 'axios';

export default class UserService {
  static async getUserByEmail(email) {
    const res = await axios.get(`http://localhost:5000/api/v1/movies/users/email/${email}`).catch(_ => '');
    return res.data;
  }

  static async getUserByName(name) {
    const res = await axios.get(`http://localhost:5000/api/v1/movies/users/name/${name}`).catch(_ => '');
    return res.data;
  }

  static async registerUser(data) {
      await axios.post('http://localhost:5000/api/v1/movies/register', data);
    }
}

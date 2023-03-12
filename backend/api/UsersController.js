import UsersDAO from "../dao/UsersDAO.js";

export default class UsersController {
  static async apiLoginUser(req, res) {
    try {
      const email = req.params.email;
      const user = await UsersDAO.getUserByEmail(email);
      if (!user) {
        res.status(404).json({error: "not found"});
        return;
      }
      res.json(user);
    } catch (e) {
      console.log(`api,${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiRegisterUser(req, res) {

  }
}
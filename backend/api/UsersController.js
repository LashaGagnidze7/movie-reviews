import UsersDAO from "../dao/UsersDAO.js";

export default class UsersController {
  static async apiLoginUserByEmail(req, res) {
    try {
      const email = req.params.email;
      const user = await UsersDAO.getUserByEmail(email);
      if (!user) {
        res.status(404).json({ error: "not found" });
        return;
      }
      res.json(user);
    } catch (e) {
      console.log(`api,${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiLoginUserByName(req, res) {
    try {
      const name = req.params.name
        .split("_")
        .map((v) => v.charAt(0).toUpperCase() + v.slice(1))
        .join(" ");
      const user = await UsersDAO.getUserByName(name);
      if (!user) {
        res.status(404).json({ error: "not found" });
        return;
      }
      res.json(user);
    } catch (e) {
      console.log(`api,${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiRegisterUser(req, res) {
    try {
      const data = req.body;
      data.name = data.name
        .split("_")
        .map((v) => v.charAt(0).toUpperCase() + v.slice(1))
        .join(" ");
      await UsersDAO.registerUser(data);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}

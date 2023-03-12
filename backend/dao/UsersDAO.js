export default class UsersDAO {
  static users;

  static async injectDB(conn) {
    if (UsersDAO.users) {
      return;
    }
    try {
      UsersDAO.users = await conn
        .db(process.env.MOVIEREVIEWS_NS)
        .collection("users");
    } catch (e) {
      console.error(`unable to connect in UsersDAO: ${e}`);
    }
  }

  static async getUserByEmail(email) {
    try {
      const query = {email: email}
      return await UsersDAO.users.find(query).next();
    } catch (e) {
      console.error(`something went wrong in getUserByEmail: ${e}`);
    }
  }
}
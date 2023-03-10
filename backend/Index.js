import express from "express";
import cors from "cors";
import MoviesRoute from "./api/MoviesRoute.js";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import MoviesDAO from "./dao/MoviesDAO.js";
import CommentsDAO from "./dao/CommentsDAO.js";
import UsersDAO from "./dao/UsersDAO.js";

class Index {
  static app = express();
  static router = express.Router();

  static main() {
    dotenv.config();
    Index.setUpServer();
    Index.setUpDatabase();
  }

  static setUpServer() {
    Index.app.use(cors());
    Index.app.use(express.json());
    Index.app.use("/api/v1/movies", MoviesRoute.configRoutes(Index.router));
    Index.app.use("*", (req, res) => {
      res.status(404).json({ error: "not found" });
    });
  }

  static async setUpDatabase() {
    const client = new MongoClient(process.env.MOVIEREVIEWS_DB_URI);
    const port = process.env.PORT;

    try {
      await client.connect();
      await MoviesDAO.injectDB(client);
      await CommentsDAO.injectDB(client);
      await UsersDAO.injectDB(client);
      Index.app.listen(port, () => {
        console.log(`server is running on port: ${port}`);
      });
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }
}

Index.main();

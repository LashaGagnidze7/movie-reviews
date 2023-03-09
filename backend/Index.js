import express from 'express';
import cors from 'cors';
import MoviesRoute from './api/MoviesRoute.js';
import dotenv from 'dotenv';
import mongodb from 'mongodb';
import MoviesDAO from "./dao/MoviesDAO.js";

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
    Index.app.use('/api/v1/movies', MoviesRoute.configRoutes(Index.router));
    Index.app.use('*', (req, res) => {
      res.status(404).json({error: 'not found'});
    });
  }

  static async setUpDatabase() {
    const client = new mongodb.MongoClient(
      process.env.MOVIEREVIEWS_DB_URI,
    {
      useNewUrlParser: true, useUnifiedTopology: true
    }
  )
    ;
    const port = process.env.PORT || 8000;
    try {
      // Connect to the MongoDB cluster
      await client.connect();
      await MoviesDAO.injectDB(client);
      Index.app.listen(port, () => {
        console.log(`server is running on port:${port}`)
      })
    } catch (e) {
      console.error(e);
      process.exit(1);
    }

  }
}

Index.main();
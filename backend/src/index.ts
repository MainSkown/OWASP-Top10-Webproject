import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { SQLRepo } from "./sql_repo";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

const route = process.env.DEFAULT_ROUTE || "/api";

const repo = new SQLRepo(
    process.env.DATABASE_USER || 'root',
    process.env.DATABASE_PASSWORD || 'password',
    process.env.DATABASE_NAME || 'database',
    process.env.DATABASE_HOST || 'db',  
);

repo.getPosts().then((posts) => {
    console.log(posts);
})

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.get(`${route}`, (req: Request, res: Response) => {
  res.send("Hello World");
});

app.route(`${route}/`);

app.listen(port, () => {
  console.log(`Server is running on port ${port}${route}`);
});

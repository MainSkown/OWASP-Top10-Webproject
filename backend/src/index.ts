import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { SQLRepo } from "./sql_repo";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

const route = process.env.DEFAULT_ROUTE || "/api";

const repo = new SQLRepo(
  process.env.DATABASE_USER || "root",
  process.env.DATABASE_PASSWORD || "rootpassword",
  process.env.DATABASE_NAME || "OWASP_database",
  process.env.DATABASE_HOST || undefined,
  process.env.DATABASE_HOST ? undefined : 3306
);

repo.getPosts().then((posts) => {
  console.log(posts);
});

app.use(cors());

app.get(`${route}/posts`, async (req: Request, res: Response) => {
  const posts = await repo.getPosts();
  res.json(posts);
});

app.get(`${route}/posts/:id`, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const post = await repo.getPost(id);
  res.json(post);
});

app.get(`${route}/post/:id/comments`, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const comments = await repo.getPostComments(id);
  res.json(comments);
});

app.get(`${route}/users`, async (req: Request, res: Response) => {
  const users = await repo.getUsers();
  res.json(users);
});

app.get(`${route}/user/:id`, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = await repo.getUser(id);
  res.json(user);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}${route}`);
});

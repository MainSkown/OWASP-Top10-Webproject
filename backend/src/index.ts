import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { SQLRepo } from "./sql_repo";
import { generateToken, verifyToken } from "./tokenRepo";

dotenv.config();

const app: Express = express();
app.use(express.json());
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

/* Public routes */
// Get all posts
app.get(`${route}/posts`, async (req: Request, res: Response) => {
  try {
  const posts = await repo.getPosts();
  res.json(posts);
  } catch (e: any) {
    res.status(500).send(e.message);
    console.error(e);
  }
});

// Get post by id
app.get(`${route}/post/:id`, async (req: Request, res: Response) => {
  try {
  const id = parseInt(req.params.id);
  const post = await repo.getPost(id);
  res.json(post);
  } catch (e: any) {
    res.status(500).send(e.message);
    console.error(e);
  }
});

// Get all comments for a post
app.get(`${route}/post/:id/comments`, async (req: Request, res: Response) => {
  try {
  const id = parseInt(req.params.id);
  const comments = await repo.getPostComments(id);
  res.json(comments);
  } catch (e: any) {
    res.status(500).send(e.message);
    console.error(e);
  }
});

// Get all users
app.get(`${route}/users`, async (req: Request, res: Response) => {
  try {
  const users = await repo.getUsers();
  res.json(users);
  } catch (e: any) {
    res.status(500).send(e.message);
    console.error(e);
  }
});

// Get user by id
app.get(`${route}/user/:id`, async (req: Request, res: Response) => {
  try {
  const id = parseInt(req.params.id);
  const user = await repo.getUser(id);
  res.json(user);
  } catch (e: any) {
    res.status(500).send(e.message);
    console.error(e);
  }
});

// Register a new user
app.post(`${route}/user/register`, async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    await repo.createUser(username, password);
    res.sendStatus(201);
  } catch (e: any) {
    res.status(500).send(e.message);
    console.error(e);
  }
});

// Login a user
app.post(`${route}/user/login`, async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await repo.loginUser(username, password);
    res.json({
      token: generateToken(user.username, user.id, user.isAdmin ?? false),
    });
  } catch (e: any) {
    res.status(500).send(e.message);
    console.error(e);
  }
});

/* Protected routes */
// Route for comments
app
  .route(`${route}/post/:id/comment`)
  // Create a comment
  .post(async (req: Request, res: Response) => {
    const { content } = req.body;
    const id = parseInt(req.params.id);
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).send("Unauthorized");
      return;
    }

    const { user_id } = verifyToken(token);

    try {
      await repo.createComment(id, user_id, content);
      res.sendStatus(201);
    } catch (e: any) {
      res.status(500).send(e.message);
      console.error(e);
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}${route}`);
});

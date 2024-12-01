import mysql from "mysql2/promise";

export type Post = {
  id: number;
  title: string;
  content: string;
  user_id: number;
  date: string;
};

export type User = {
  id: number;
  username: string;
  password: string;
  isAdmin?: boolean;
  created_at: string;
};

export type Comment = {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  created_at: string;
};

export class SQLRepo {
  private pool: mysql.Pool;

  constructor(user: string, password: string, database: string, host: string | undefined, port: number | undefined) {
    this.pool = mysql.createPool({
      user: user,
      password: password,
      database: database,
      host: host,
      port: port,
    });
   
    console.log("Connected to database");
  }

  async getPosts(): Promise<Post[]> {
    const [rows] = await this.pool.query("SELECT * FROM posts");
    return rows as Post[];
  }

  async getPost(id: number): Promise<Post> {
    const [rows] = await this.pool.query<mysql.RowDataPacket[]>(
      "SELECT * FROM posts WHERE id = ?",
      [id]
    );
    return rows[0] as Post;
  }

  async getUsers(): Promise<User[]> {
    const [rows] = await this.pool.query("SELECT * FROM users");
    return rows as User[];
  }

  async getUser(id: number): Promise<User> {
    const [rows] = await this.pool.query<mysql.RowDataPacket[]>(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    return rows[0] as User;
  }

  async getComments(): Promise<Comment[]> {
    const [rows] = await this.pool.query("SELECT * FROM comments");
    return rows as Comment[];
  }

  async getComment(id: number): Promise<Comment> {
    const [rows] = await this.pool.query<mysql.RowDataPacket[]>(
      "SELECT * FROM comments WHERE id = ?",
      [id]
    );
    return rows[0] as Comment;
  }

  async getPostComments(post_id: number): Promise<Comment[]> {
    const [rows] = await this.pool.query(
      "SELECT * FROM comments WHERE post_id = ?",
      [post_id]
    );
    return rows as Comment[];
  }

  async createPost(
    title: string,
    content: string,
    user_id: number
  ): Promise<void> {
    // Niebezpieczne zapytanie SQL, które jest podatne na SQL Injection
    const query = `INSERT INTO posts (title, content, user_id) VALUES ('${title}', '${content}', ${user_id})`;
    await this.pool.query(query);
  }

  async createUser(username: string, password: string): Promise<void> {
    // Niebezpieczne zapytanie SQL, które jest podatne na SQL Injection
    const query = `INSERT INTO users (username, password, isAdmin) VALUES ('${username}', '${password}')`;
    await this.pool.query(query);
  }

  async createComment(
    post_id: number,
    user_id: number,
    content: string
  ): Promise<void> {
    // Niebezpieczne zapytanie SQL, które jest podatne na SQL Injection
    const query = `INSERT INTO comments (post_id, user_id, content) VALUES (${post_id}, ${user_id}, '${content}')`;
    await this.pool.query(query);
  }
}

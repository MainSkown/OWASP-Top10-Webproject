import mysql from "mysql2/promise";

export type post = {
  id: number;
  title: string;
  content: string;
  user_id: number;
  date: string;
};

export type user = {
  id: number;
  username: string;
  password: string;
  isAdmin?: boolean;
  created_at: string;
};

export type comment = {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  created_at: string;
};

export class SQLRepo {
  private pool: mysql.Pool;

  constructor(user: string, password: string, database: string, host: string) {
    this.pool = mysql.createPool({
      user: user,
      password: password,
      database: database,
      host: host,
    });
   
    console.log("Connected to database");
  }

  async getPosts(): Promise<post[]> {
    const [rows] = await this.pool.query("SELECT * FROM posts");
    return rows as post[];
  }

  async getPost(id: number): Promise<post> {
    const [rows] = await this.pool.query<mysql.RowDataPacket[]>(
      "SELECT * FROM posts WHERE id = ?",
      [id]
    );
    return rows[0] as post;
  }

  async getUsers(): Promise<user[]> {
    const [rows] = await this.pool.query("SELECT * FROM users");
    return rows as user[];
  }

  async getUser(id: number): Promise<user> {
    const [rows] = await this.pool.query<mysql.RowDataPacket[]>(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    return rows[0] as user;
  }

  async getComments(): Promise<comment[]> {
    const [rows] = await this.pool.query("SELECT * FROM comments");
    return rows as comment[];
  }

  async getComment(id: number): Promise<comment> {
    const [rows] = await this.pool.query<mysql.RowDataPacket[]>(
      "SELECT * FROM comments WHERE id = ?",
      [id]
    );
    return rows[0] as comment;
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

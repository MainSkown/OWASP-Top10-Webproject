import { Comment } from "vue";

export type Post = {
  id: number;
  title: string;
  content: string;
  user_id: number;
  created_at: string;
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

export type CommentData = Comment & {
    username: string
}
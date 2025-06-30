// src/types/Comment.ts
export interface Comment {
  id: number;
  content: string;
  author: {
    userName: string;
  };
}

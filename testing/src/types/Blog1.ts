// src/types/Blog.ts
export interface Blog {
  id: number;
  title: string;
  body: string;
  isPublic: boolean;
  author: {
    userName: string;
  };
  comments: {
    id: number;
    text: string;
    author: {
      userName: string;
    };
  }[];
}

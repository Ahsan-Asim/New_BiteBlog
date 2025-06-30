export interface Blog {
  id: number;
  title: string;
  body: string;
  author: {
    userName: string;
  };
}

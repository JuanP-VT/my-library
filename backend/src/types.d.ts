type book = {
  name: string;
  author: string;
  numOfPages: number;
  url: string;
  isRead: boolean;
};

type user = {
  name: string;
  password: string;
  email: string;
  library: book[];
};

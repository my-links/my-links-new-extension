type Category = {
  id: number;
  name: string;
  authorId: number;
  links?: Link[];
  createdAt: string;
  updatedAt: string;
};

type Link = {
  id: number;
  name: string;
  url: string;
  categoryId: number;
  category: Category;
  authorId: number;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
};

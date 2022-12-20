type Base = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
};

interface Category extends Base {
  category: string;
  image: Image;
}

interface Image {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

interface Product extends Base {
  image: Image;
  name: string;
  price: number;
  quantity: number;
  categories: Category[];
}


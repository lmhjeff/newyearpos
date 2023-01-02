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
  orderQty?: number;
}

interface Item extends Base {
  image: Image;
  name: string;
  price: number;
  orderQty?: number;
}

interface OrderItem {
  name: string;
  orderQty: number;
  image: Image;
  price: number;
}

interface Order extends Base {
  orderId: string;
  orderItems: OrderItem[];
  subTotal: number;
  discount: string;
  discountPrice: string;
  paymentMethod: string;
  total: number;
  preOrder: boolean;
  createdAt: Date;
  address?: string;
  remark?: string;
  status: string;
}

// enum OrderStatus {
//   Completed = "已完成",
//   PreOrder = "預訂貨品",
//   WaitingForDelivery = "等待發貨",
// }

interface Status extends Base {
  statusField: string;
}

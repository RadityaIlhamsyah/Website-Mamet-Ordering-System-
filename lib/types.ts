export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "coffee" | "non-coffee" | "snacks" | "meals";
  image: string;
  available: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  tableNumber: string;
  items: CartItem[];
  total: number;
  status: "pending" | "preparing" | "ready" | "completed" | "cancelled";
  createdAt: string;
  paymentMethod: "cash" | "qris";
}

export type OrderStatus = Order["status"];

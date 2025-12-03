import { ObjectId } from 'mongodb';

export interface MenuItemDoc {
  _id?: ObjectId;
  id: string;
  name: string;
  description: string;
  price: number;
  category: "coffee" | "non-coffee" | "snacks" | "meals";
  image: string;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderDoc {
  _id?: ObjectId;
  orderCode: string;
  customerName: string;
  tableNumber: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  total: number;
  status: "pending" | "preparing" | "ready" | "completed" | "cancelled";
  paymentMethod: "cash" | "qris";
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminDoc {
  _id?: ObjectId;
  username: string;
  password: string; // hashed
  email: string;
  createdAt: Date;
}

export interface SettingsDoc {
  _id?: ObjectId;
  storeName: string;
  storeAddress: string;
  storePhone: string;
  openingHours: string;
  qrisImage?: string;
  updatedAt: Date;
}

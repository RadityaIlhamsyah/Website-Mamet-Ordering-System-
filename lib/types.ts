export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Kopi' | 'Non-Kopi' | 'Cemilan' | 'Makanan';
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
  status: 'Tertunda' | 'Persiapan' | 'Siap' | 'Telah Selesai' | 'Dibatalkan';
  createdAt: string;
  paymentMethod: 'cash';
}

export type OrderStatus = Order['status'];

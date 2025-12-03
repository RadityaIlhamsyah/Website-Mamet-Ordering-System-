import { MenuItem } from "./types";

export const MENU_ITEMS: MenuItem[] = [
  // Coffee
  {
    id: "c1",
    name: "Kopi Tubruk",
    description: "Traditional unfiltered black coffee, strong and bold.",
    price: 8000,
    category: "coffee",
    image: "/kopi-tubruk.jpg",
    available: true,
  },
  {
    id: "c2",
    name: "Kopi Susu Gula Aren",
    description: "Iced coffee with milk and palm sugar.",
    price: 15000,
    category: "coffee",
    image: "/iced-coffee-milk.jpg",
    available: true,
  },
  {
    id: "c3",
    name: "Vietnam Drip",
    description: "Slow-dripped coffee with sweetened condensed milk.",
    price: 12000,
    category: "coffee",
    image: "/vietnam-drip-coffee.jpg",
    available: true,
  },
  {
    id: "c4",
    name: "Cappuccino",
    description: "Espresso with steamed milk and foam.",
    price: 18000,
    category: "coffee",
    image: "/frothy-cappuccino.png",
    available: true,
  },

  // Non-Coffee
  {
    id: "n1",
    name: "Es Teh Manis",
    description: "Sweet iced tea, a classic refreshment.",
    price: 5000,
    category: "non-coffee",
    image: "/iced-tea.png",
    available: true,
  },
  {
    id: "n2",
    name: "Soda Gembira",
    description: "Soda water with condensed milk and syrup.",
    price: 12000,
    category: "non-coffee",
    image: "/pink-soda-drink.jpg",
    available: true,
  },
  {
    id: "n3",
    name: "Wedang Jahe",
    description: "Hot ginger drink, perfect for warming up.",
    price: 10000,
    category: "non-coffee",
    image: "/ginger-tea.png",
    available: true,
  },

  // Snacks
  {
    id: "s1",
    name: "Pisang Goreng",
    description: "Fried banana fritters, crispy and sweet.",
    price: 10000,
    category: "snacks",
    image: "/fried-banana.jpg",
    available: true,
  },
  {
    id: "s2",
    name: "Roti Bakar Coklat Keju",
    description: "Toast with chocolate sprinkles and grated cheese.",
    price: 12000,
    category: "snacks",
    image: "/toast-chocolate-cheese.jpg",
    available: true,
  },
  {
    id: "s3",
    name: "Mendoan",
    description: "Half-cooked fried tempeh with green chili soy sauce.",
    price: 8000,
    category: "snacks",
    image: "/tempeh-mendoan.jpg",
    available: true,
  },

  // Meals
  {
    id: "m1",
    name: "Indomie Telur Kornet",
    description: "Indomie noodles with egg and corned beef.",
    price: 15000,
    category: "meals",
    image: "/indomie-noodles.jpg",
    available: true,
  },
  {
    id: "m2",
    name: "Nasi Goreng Gila",
    description: "Spicy fried rice with sausages, meatballs, and eggs.",
    price: 20000,
    category: "meals",
    image: "/fried-rice.png",
    available: true,
  },
];

export const CATEGORIES = [
  { id: "all", name: "All" },
  { id: "coffee", name: "Coffee" },
  { id: "non-coffee", name: "Non-Coffee" },
  { id: "snacks", name: "Snacks" },
  { id: "meals", name: "Meals" },
];

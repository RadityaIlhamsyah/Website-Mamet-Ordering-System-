import clientPromise from "./mongodb"
import type { MenuItemDoc, OrderDoc, AdminDoc, SettingsDoc } from "./models"
import { MENU_ITEMS } from "./data"
import { ObjectId } from "mongodb"

export async function isDatabaseAvailable(): Promise<boolean> {
  return clientPromise !== null
}

export async function getDatabase() {
  if (!clientPromise) {
    return null
  }
  try {
    const client = await clientPromise
    return client.db("warkop")
  } catch (e) {
    console.error("Failed to connect to database:", e)
    return null
  }
}

// Menu Items
export async function getMenuItems(): Promise<MenuItemDoc[]> {
  const db = await getDatabase()
  if (!db) {
    console.warn("[v0] Database not available, serving mock menu items")
    return MENU_ITEMS.map((item) => ({
      ...item,
      _id: new ObjectId(item.id), // Mock ObjectId
      createdAt: new Date(),
      updatedAt: new Date(),
    })) as unknown as MenuItemDoc[]
  }

  const items = await db.collection<MenuItemDoc>("menuItems").find({}).toArray()
  if (items.length === 0) {
    return MENU_ITEMS.map((item) => ({
      ...item,
      _id: new ObjectId(item.id),
      createdAt: new Date(),
      updatedAt: new Date(),
    })) as unknown as MenuItemDoc[]
  }

  return items
}

export async function seedMenuItems() {
  const db = await getDatabase()
  if (!db) return // Skip seeding if no DB

  const count = await db.collection("menuItems").countDocuments()

  if (count === 0) {
    const items = MENU_ITEMS.map((item) => ({
      ...item,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))
    await db.collection("menuItems").insertMany(items)
    console.log("[v0] Seeded menu items")
  }
}

export async function updateMenuItemAvailability(id: string, available: boolean) {
  const db = await getDatabase()
  if (!db) return // Skip update if no DB

  await db.collection("menuItems").updateOne({ id }, { $set: { available, updatedAt: new Date() } })
}

export async function createMenuItem(itemData: Omit<MenuItemDoc, "_id" | "createdAt" | "updatedAt">) {
  const db = await getDatabase()
  if (!db) throw new Error("Database not available")

  const result = await db.collection("menuItems").insertOne({
    ...itemData,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return result.insertedId.toString()
}

export async function updateMenuItem(id: string, itemData: Partial<MenuItemDoc>) {
  const db = await getDatabase()
  if (!db) throw new Error("Database not available")

  await db.collection("menuItems").updateOne({ id }, { $set: { ...itemData, updatedAt: new Date() } })
}

export async function deleteMenuItem(id: string) {
  const db = await getDatabase()
  if (!db) throw new Error("Database not available")

  await db.collection("menuItems").deleteOne({ id })
}

// Orders
export async function createOrder(orderData: Omit<OrderDoc, "_id" | "createdAt" | "updatedAt">) {
  const db = await getDatabase()
  if (!db) return // Skip creation if no DB

  const result = await db.collection("orders").insertOne({
    ...orderData,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return result.insertedId.toString()
}

export async function getOrders(): Promise<OrderDoc[]> {
  const db = await getDatabase()
  if (!db) {
    console.warn("[v0] Database not available, serving mock orders")
    return []
  }

  const orders = await db.collection<OrderDoc>("orders").find({}).sort({ createdAt: -1 }).toArray()
  return orders
}

export async function getOrderByCode(orderCode: string): Promise<OrderDoc | null> {
  const db = await getDatabase()
  if (!db) {
    console.warn("[v0] Database not available, serving mock order")
    return null
  }

  const order = await db.collection<OrderDoc>("orders").findOne({ orderCode })
  return order
}

export async function updateOrderStatus(orderCode: string, status: OrderDoc["status"]) {
  const db = await getDatabase()
  if (!db) return // Skip update if no DB

  await db.collection("orders").updateOne({ orderCode }, { $set: { status, updatedAt: new Date() } })
}

export async function getOrdersByDateRange(startDate: Date, endDate: Date): Promise<OrderDoc[]> {
  const db = await getDatabase()
  if (!db) {
    console.warn("[v0] Database not available, serving empty orders")
    return []
  }

  const orders = await db
    .collection<OrderDoc>("orders")
    .find({
      createdAt: { $gte: startDate, $lte: endDate },
    })
    .sort({ createdAt: -1 })
    .toArray()
  return orders
}

export async function getDailyRevenue(date: Date): Promise<OrderDoc[]> {
  const startDate = new Date(date)
  startDate.setHours(0, 0, 0, 0)
  const endDate = new Date(date)
  endDate.setHours(23, 59, 59, 999)
  return getOrdersByDateRange(startDate, endDate)
}

export async function getWeeklyRevenue(date: Date): Promise<OrderDoc[]> {
  const startDate = new Date(date)
  startDate.setDate(date.getDate() - date.getDay())
  startDate.setHours(0, 0, 0, 0)
  const endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + 6)
  endDate.setHours(23, 59, 59, 999)
  return getOrdersByDateRange(startDate, endDate)
}

export async function getMonthlyRevenue(year: number, month: number): Promise<OrderDoc[]> {
  const startDate = new Date(year, month, 1)
  const endDate = new Date(year, month + 1, 0)
  endDate.setHours(23, 59, 59, 999)
  return getOrdersByDateRange(startDate, endDate)
}

// Admin
export async function getAdminByUsername(username: string): Promise<AdminDoc | null> {
  const db = await getDatabase()
  if (!db) {
    console.warn("[v0] Database not available, serving mock admin")
    return null
  }

  const admin = await db.collection<AdminDoc>("admins").findOne({ username })
  return admin
}

export async function createDefaultAdmin() {
  const db = await getDatabase()
  if (!db) return // Skip creation if no DB

  const count = await db.collection("admins").countDocuments()

  if (count === 0) {
    // Default admin credentials
    // In production, you should hash the password properly
    const bcrypt = require("bcryptjs")
    const hashedPassword = await bcrypt.hash("admin123", 10)

    await db.collection("admins").insertOne({
      username: "admin",
      password: hashedPassword,
      email: "admin@warkop.com",
      createdAt: new Date(),
    })
    console.log("[v0] Created default admin user")
  }
}

// Settings
export async function getSettings(): Promise<SettingsDoc | null> {
  const db = await getDatabase()
  if (!db) {
    console.warn("[v0] Database not available, serving mock settings")
    return {
      storeName: "Warkop Kita",
      storeAddress: "Jl. Sudirman No. 123, Jakarta",
      storePhone: "+62 812-3456-7890",
      openingHours: "07:00 - 22:00",
      updatedAt: new Date(),
    }
  }

  const settings = await db.collection<SettingsDoc>("settings").findOne({})
  return settings
}

export async function updateSettings(data: Partial<SettingsDoc>) {
  const db = await getDatabase()
  if (!db) return // Skip update if no DB

  await db.collection("settings").updateOne({}, { $set: { ...data, updatedAt: new Date() } }, { upsert: true })
}

export async function seedDefaultSettings() {
  const db = await getDatabase()
  if (!db) return // Skip seeding if no DB

  const count = await db.collection("settings").countDocuments()

  if (count === 0) {
    await db.collection("settings").insertOne({
      storeName: "Warkop Kita",
      storeAddress: "Jl. Sudirman No. 123, Jakarta",
      storePhone: "+62 812-3456-7890",
      openingHours: "07:00 - 22:00",
      updatedAt: new Date(),
    })
    console.log("[v0] Seeded default settings")
  }
}

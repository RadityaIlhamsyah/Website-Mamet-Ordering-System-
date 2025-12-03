module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/mongodb [external] (mongodb, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongodb", () => require("mongodb"));

module.exports = mod;
}),
"[project]/lib/mongodb.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
;
const uri = process.env.MONGODB_URI;
if (!uri) {
    console.warn('⚠️  MONGODB_URI not found in environment variables.');
    console.warn('⚠️  Please create a .env.local file with:');
    console.warn('⚠️  MONGODB_URI=your_mongodb_connection_string');
    console.warn('⚠️  JWT_SECRET=your_secret_key');
}
const options = {};
let client = null;
let clientPromise = null;
if (uri) {
    if ("TURBOPACK compile-time truthy", 1) {
        // In development, use a global variable to preserve the client across hot reloads
        let globalWithMongo = /*TURBOPACK member replacement*/ __turbopack_context__.g;
        if (!globalWithMongo._mongoClientPromise) {
            client = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["MongoClient"](uri, options);
            globalWithMongo._mongoClientPromise = client.connect();
        }
        clientPromise = globalWithMongo._mongoClientPromise;
    } else //TURBOPACK unreachable
    ;
}
const __TURBOPACK__default__export__ = clientPromise;
}),
"[project]/lib/data.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CATEGORIES",
    ()=>CATEGORIES,
    "MENU_ITEMS",
    ()=>MENU_ITEMS
]);
const MENU_ITEMS = [
    // Coffee
    {
        id: "c1",
        name: "Kopi Tubruk",
        description: "Traditional unfiltered black coffee, strong and bold.",
        price: 8000,
        category: "coffee",
        image: "/kopi-tubruk.jpg",
        available: true
    },
    {
        id: "c2",
        name: "Kopi Susu Gula Aren",
        description: "Iced coffee with milk and palm sugar.",
        price: 15000,
        category: "coffee",
        image: "/iced-coffee-milk.jpg",
        available: true
    },
    {
        id: "c3",
        name: "Vietnam Drip",
        description: "Slow-dripped coffee with sweetened condensed milk.",
        price: 12000,
        category: "coffee",
        image: "/vietnam-drip-coffee.jpg",
        available: true
    },
    {
        id: "c4",
        name: "Cappuccino",
        description: "Espresso with steamed milk and foam.",
        price: 18000,
        category: "coffee",
        image: "/frothy-cappuccino.png",
        available: true
    },
    // Non-Coffee
    {
        id: "n1",
        name: "Es Teh Manis",
        description: "Sweet iced tea, a classic refreshment.",
        price: 5000,
        category: "non-coffee",
        image: "/iced-tea.png",
        available: true
    },
    {
        id: "n2",
        name: "Soda Gembira",
        description: "Soda water with condensed milk and syrup.",
        price: 12000,
        category: "non-coffee",
        image: "/pink-soda-drink.jpg",
        available: true
    },
    {
        id: "n3",
        name: "Wedang Jahe",
        description: "Hot ginger drink, perfect for warming up.",
        price: 10000,
        category: "non-coffee",
        image: "/ginger-tea.png",
        available: true
    },
    // Snacks
    {
        id: "s1",
        name: "Pisang Goreng",
        description: "Fried banana fritters, crispy and sweet.",
        price: 10000,
        category: "snacks",
        image: "/fried-banana.jpg",
        available: true
    },
    {
        id: "s2",
        name: "Roti Bakar Coklat Keju",
        description: "Toast with chocolate sprinkles and grated cheese.",
        price: 12000,
        category: "snacks",
        image: "/toast-chocolate-cheese.jpg",
        available: true
    },
    {
        id: "s3",
        name: "Mendoan",
        description: "Half-cooked fried tempeh with green chili soy sauce.",
        price: 8000,
        category: "snacks",
        image: "/tempeh-mendoan.jpg",
        available: true
    },
    // Meals
    {
        id: "m1",
        name: "Indomie Telur Kornet",
        description: "Indomie noodles with egg and corned beef.",
        price: 15000,
        category: "meals",
        image: "/indomie-noodles.jpg",
        available: true
    },
    {
        id: "m2",
        name: "Nasi Goreng Gila",
        description: "Spicy fried rice with sausages, meatballs, and eggs.",
        price: 20000,
        category: "meals",
        image: "/fried-rice.png",
        available: true
    }
];
const CATEGORIES = [
    {
        id: "all",
        name: "All"
    },
    {
        id: "coffee",
        name: "Coffee"
    },
    {
        id: "non-coffee",
        name: "Non-Coffee"
    },
    {
        id: "snacks",
        name: "Snacks"
    },
    {
        id: "meals",
        name: "Meals"
    }
];
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/lib/db-utils.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createDefaultAdmin",
    ()=>createDefaultAdmin,
    "createMenuItem",
    ()=>createMenuItem,
    "createOrder",
    ()=>createOrder,
    "deleteMenuItem",
    ()=>deleteMenuItem,
    "getAdminByUsername",
    ()=>getAdminByUsername,
    "getDailyRevenue",
    ()=>getDailyRevenue,
    "getDatabase",
    ()=>getDatabase,
    "getMenuItems",
    ()=>getMenuItems,
    "getMonthlyRevenue",
    ()=>getMonthlyRevenue,
    "getOrderByCode",
    ()=>getOrderByCode,
    "getOrders",
    ()=>getOrders,
    "getOrdersByDateRange",
    ()=>getOrdersByDateRange,
    "getSettings",
    ()=>getSettings,
    "getWeeklyRevenue",
    ()=>getWeeklyRevenue,
    "isDatabaseAvailable",
    ()=>isDatabaseAvailable,
    "seedDefaultSettings",
    ()=>seedDefaultSettings,
    "seedMenuItems",
    ()=>seedMenuItems,
    "updateMenuItem",
    ()=>updateMenuItem,
    "updateMenuItemAvailability",
    ()=>updateMenuItemAvailability,
    "updateOrderStatus",
    ()=>updateOrderStatus,
    "updateSettings",
    ()=>updateSettings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mongodb.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
;
;
;
async function isDatabaseAvailable() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"] !== null;
}
async function getDatabase() {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]) {
        return null;
    }
    try {
        const client = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"];
        return client.db("warkop");
    } catch (e) {
        console.error("Failed to connect to database:", e);
        return null;
    }
}
async function getMenuItems() {
    const db = await getDatabase();
    if (!db) {
        console.warn("[v0] Database not available, serving mock menu items");
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MENU_ITEMS"].map((item)=>({
                ...item,
                _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](item.id),
                createdAt: new Date(),
                updatedAt: new Date()
            }));
    }
    const items = await db.collection("menuItems").find({}).toArray();
    if (items.length === 0) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MENU_ITEMS"].map((item)=>({
                ...item,
                _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](item.id),
                createdAt: new Date(),
                updatedAt: new Date()
            }));
    }
    return items;
}
async function seedMenuItems() {
    const db = await getDatabase();
    if (!db) return; // Skip seeding if no DB
    const count = await db.collection("menuItems").countDocuments();
    if (count === 0) {
        const items = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MENU_ITEMS"].map((item)=>({
                ...item,
                createdAt: new Date(),
                updatedAt: new Date()
            }));
        await db.collection("menuItems").insertMany(items);
        console.log("[v0] Seeded menu items");
    }
}
async function updateMenuItemAvailability(id, available) {
    const db = await getDatabase();
    if (!db) return; // Skip update if no DB
    await db.collection("menuItems").updateOne({
        id
    }, {
        $set: {
            available,
            updatedAt: new Date()
        }
    });
}
async function createMenuItem(itemData) {
    const db = await getDatabase();
    if (!db) throw new Error("Database not available");
    const result = await db.collection("menuItems").insertOne({
        ...itemData,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    return result.insertedId.toString();
}
async function updateMenuItem(id, itemData) {
    const db = await getDatabase();
    if (!db) throw new Error("Database not available");
    await db.collection("menuItems").updateOne({
        id
    }, {
        $set: {
            ...itemData,
            updatedAt: new Date()
        }
    });
}
async function deleteMenuItem(id) {
    const db = await getDatabase();
    if (!db) throw new Error("Database not available");
    await db.collection("menuItems").deleteOne({
        id
    });
}
async function createOrder(orderData) {
    const db = await getDatabase();
    if (!db) return; // Skip creation if no DB
    const result = await db.collection("orders").insertOne({
        ...orderData,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    return result.insertedId.toString();
}
async function getOrders() {
    const db = await getDatabase();
    if (!db) {
        console.warn("[v0] Database not available, serving mock orders");
        return [];
    }
    const orders = await db.collection("orders").find({}).sort({
        createdAt: -1
    }).toArray();
    return orders;
}
async function getOrderByCode(orderCode) {
    const db = await getDatabase();
    if (!db) {
        console.warn("[v0] Database not available, serving mock order");
        return null;
    }
    const order = await db.collection("orders").findOne({
        orderCode
    });
    return order;
}
async function updateOrderStatus(orderCode, status) {
    const db = await getDatabase();
    if (!db) return; // Skip update if no DB
    await db.collection("orders").updateOne({
        orderCode
    }, {
        $set: {
            status,
            updatedAt: new Date()
        }
    });
}
async function getOrdersByDateRange(startDate, endDate) {
    const db = await getDatabase();
    if (!db) {
        console.warn("[v0] Database not available, serving empty orders");
        return [];
    }
    const orders = await db.collection("orders").find({
        createdAt: {
            $gte: startDate,
            $lte: endDate
        }
    }).sort({
        createdAt: -1
    }).toArray();
    return orders;
}
async function getDailyRevenue(date) {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    return getOrdersByDateRange(startDate, endDate);
}
async function getWeeklyRevenue(date) {
    const startDate = new Date(date);
    startDate.setDate(date.getDate() - date.getDay());
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    endDate.setHours(23, 59, 59, 999);
    return getOrdersByDateRange(startDate, endDate);
}
async function getMonthlyRevenue(year, month) {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    endDate.setHours(23, 59, 59, 999);
    return getOrdersByDateRange(startDate, endDate);
}
async function getAdminByUsername(username) {
    const db = await getDatabase();
    if (!db) {
        console.warn("[v0] Database not available, serving mock admin");
        return null;
    }
    const admin = await db.collection("admins").findOne({
        username
    });
    return admin;
}
async function createDefaultAdmin() {
    const db = await getDatabase();
    if (!db) return; // Skip creation if no DB
    const count = await db.collection("admins").countDocuments();
    if (count === 0) {
        // Default admin credentials
        // In production, you should hash the password properly
        const bcrypt = __turbopack_context__.r("[project]/node_modules/bcryptjs/umd/index.js [app-route] (ecmascript)");
        const hashedPassword = await bcrypt.hash("admin123", 10);
        await db.collection("admins").insertOne({
            username: "admin",
            password: hashedPassword,
            email: "admin@warkop.com",
            createdAt: new Date()
        });
        console.log("[v0] Created default admin user");
    }
}
async function getSettings() {
    const db = await getDatabase();
    if (!db) {
        console.warn("[v0] Database not available, serving mock settings");
        return {
            storeName: "Warkop Kita",
            storeAddress: "Jl. Sudirman No. 123, Jakarta",
            storePhone: "+62 812-3456-7890",
            openingHours: "07:00 - 22:00",
            updatedAt: new Date()
        };
    }
    const settings = await db.collection("settings").findOne({});
    return settings;
}
async function updateSettings(data) {
    const db = await getDatabase();
    if (!db) return; // Skip update if no DB
    await db.collection("settings").updateOne({}, {
        $set: {
            ...data,
            updatedAt: new Date()
        }
    }, {
        upsert: true
    });
}
async function seedDefaultSettings() {
    const db = await getDatabase();
    if (!db) return; // Skip seeding if no DB
    const count = await db.collection("settings").countDocuments();
    if (count === 0) {
        await db.collection("settings").insertOne({
            storeName: "Warkop Kita",
            storeAddress: "Jl. Sudirman No. 123, Jakarta",
            storePhone: "+62 812-3456-7890",
            openingHours: "07:00 - 22:00",
            updatedAt: new Date()
        });
        console.log("[v0] Seeded default settings");
    }
}
}),
"[project]/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSession",
    ()=>createSession,
    "deleteSession",
    ()=>deleteSession,
    "verifySession",
    ()=>verifySession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/jwt/sign.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/jwt/verify.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const secret = new TextEncoder().encode(JWT_SECRET);
async function createSession(username, email) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const token = await new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SignJWT"]({
        username,
        email
    }).setProtectedHeader({
        alg: 'HS256'
    }).setIssuedAt().setExpirationTime('7d').sign(secret);
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.set('session', token, {
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === 'production',
        expires: expiresAt,
        sameSite: 'lax',
        path: '/'
    });
    return token;
}
async function verifySession() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    const token = cookieStore.get('session')?.value;
    if (!token) {
        return null;
    }
    try {
        const verified = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jwtVerify"])(token, secret);
        return {
            username: verified.payload.username,
            email: verified.payload.email,
            expiresAt: new Date((verified.payload.exp || 0) * 1000)
        };
    } catch (error) {
        console.error('[v0] Session verification failed:', error);
        return null;
    }
}
async function deleteSession() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.delete('session');
}
}),
"[project]/app/api/admin/reports/weekly/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db-utils.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-route] (ecmascript)");
;
;
;
async function GET(request) {
    try {
        const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifySession"])();
        if (!session) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Unauthorized"
            }, {
                status: 401
            });
        }
        const { searchParams } = new URL(request.url);
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");
        if (!startDate || !endDate) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Missing startDate or endDate"
            }, {
                status: 400
            });
        }
        const orders = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getOrdersByDateRange"])(new Date(startDate), new Date(endDate));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(orders);
    } catch (error) {
        console.error("[v0] Get weekly report error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to fetch weekly report"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__744f8600._.js.map
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ShoppingBag, TrendingUp } from "lucide-react"
import type { OrderDoc } from "@/lib/models"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

export default function DailyReport() {
  const [orders, setOrders] = useState<OrderDoc[]>([])
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    completedOrders: 0,
  })
  const [hourlyData, setHourlyData] = useState<any[]>([])
  const [statusData, setStatusData] = useState<any[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDailyReport() {
      try {
        setLoading(true)
        const date = new Date(selectedDate)
        const startDate = new Date(date)
        startDate.setHours(0, 0, 0, 0)
        const endDate = new Date(date)
        endDate.setHours(23, 59, 59, 999)

        const response = await fetch(
          `/api/admin/reports/daily?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`,
        )
        if (response.ok) {
          const data: OrderDoc[] = await response.json()
          setOrders(data)

          // Calculate stats
          const totalRevenue = data.reduce((sum, order) => sum + order.total, 0)
          const completedOrders = data.filter((o) => o.status === "completed").length

          setStats({
            totalRevenue,
            totalOrders: data.length,
            averageOrderValue: data.length > 0 ? totalRevenue / data.length : 0,
            completedOrders,
          })

          // Process hourly data
          const hourly: { [key: number]: number } = {}
          data.forEach((order) => {
            const hour = new Date(order.createdAt).getHours()
            hourly[hour] = (hourly[hour] || 0) + order.total
          })

          const hourlyArray = Array.from({ length: 24 }, (_, i) => ({
            hour: `${i}:00`,
            revenue: hourly[i] || 0,
          }))
          setHourlyData(hourlyArray)

          // Process status data
          const statusCount = {
            pending: data.filter((o) => o.status === "pending").length,
            preparing: data.filter((o) => o.status === "preparing").length,
            ready: data.filter((o) => o.status === "ready").length,
            completed: data.filter((o) => o.status === "completed").length,
          }
          setStatusData(
            Object.entries(statusCount).map(([status, count]) => ({
              name: status.charAt(0).toUpperCase() + status.slice(1),
              value: count,
            })),
          )
        }
      } catch (error) {
        console.error("[v0] Failed to fetch daily report:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchDailyReport()
  }, [selectedDate])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const COLORS = ["#EF4444", "#F97316", "#22C55E", "#3B82F6"]

  if (loading) {
    return <div className="p-8 text-center">Loading daily report...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Daily Report</h1>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(stats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">Today's revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">Orders today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedOrders}</div>
            <p className="text-xs text-muted-foreground">Completed orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(stats.averageOrderValue)}</div>
            <p className="text-xs text-muted-foreground">Average value</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

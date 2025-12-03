"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ShoppingBag, TrendingUp } from "lucide-react"
import type { OrderDoc } from "@/lib/models"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function WeeklyReport() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    completedOrders: 0,
  })
  const [dailyData, setDailyData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWeeklyReport() {
      try {
        setLoading(true)
        const today = new Date()
        const startDate = new Date(today)
        startDate.setDate(today.getDate() - today.getDay())
        startDate.setHours(0, 0, 0, 0)
        const endDate = new Date(startDate)
        endDate.setDate(startDate.getDate() + 6)
        endDate.setHours(23, 59, 59, 999)

        const response = await fetch(
          `/api/admin/reports/weekly?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`,
        )
        if (response.ok) {
          const orders: OrderDoc[] = await response.json()

          const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
          const completedOrders = orders.filter((o) => o.status === "completed").length

          setStats({
            totalRevenue,
            totalOrders: orders.length,
            averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0,
            completedOrders,
          })

          // Process daily data
          const daily: { [key: string]: { revenue: number; count: number } } = {}
          const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

          orders.forEach((order) => {
            const date = new Date(order.createdAt)
            const dayName = days[date.getDay()]
            if (!daily[dayName]) {
              daily[dayName] = { revenue: 0, count: 0 }
            }
            daily[dayName].revenue += order.total
            daily[dayName].count += 1
          })

          const dailyArray = days.map((day) => ({
            day,
            revenue: daily[day]?.revenue || 0,
            orders: daily[day]?.count || 0,
          }))
          setDailyData(dailyArray)
        }
      } catch (error) {
        console.error("[v0] Failed to fetch weekly report:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchWeeklyReport()
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  if (loading) {
    return <div className="p-8 text-center">Loading weekly report...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Weekly Report</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(stats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">This week</p>
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

      <Card>
        <CardHeader>
          <CardTitle>Daily Revenue & Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#3B82F6" name="Revenue (IDR)" />
              <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#10B981" name="Orders" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

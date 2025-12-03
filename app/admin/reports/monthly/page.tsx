"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ShoppingBag, TrendingUp } from "lucide-react"
import type { OrderDoc } from "@/lib/models"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function MonthlyReport() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    completedOrders: 0,
  })
  const [weeklyData, setWeeklyData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))

  useEffect(() => {
    async function fetchMonthlyReport() {
      try {
        setLoading(true)
        const [year, month] = selectedMonth.split("-").map(Number)
        const startDate = new Date(year, month - 1, 1)
        const endDate = new Date(year, month, 0)
        endDate.setHours(23, 59, 59, 999)

        const response = await fetch(
          `/api/admin/reports/monthly?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`,
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

          // Process weekly data
          const weeks: { [key: number]: { revenue: number; count: number } } = {}

          orders.forEach((order) => {
            const date = new Date(order.createdAt)
            const weekNumber = Math.ceil(date.getDate() / 7)
            if (!weeks[weekNumber]) {
              weeks[weekNumber] = { revenue: 0, count: 0 }
            }
            weeks[weekNumber].revenue += order.total
            weeks[weekNumber].count += 1
          })

          const weeklyArray = Array.from({ length: 4 }, (_, i) => ({
            week: `Week ${i + 1}`,
            revenue: weeks[i + 1]?.revenue || 0,
            orders: weeks[i + 1]?.count || 0,
          }))
          setWeeklyData(weeklyArray)
        }
      } catch (error) {
        console.error("[v0] Failed to fetch monthly report:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchMonthlyReport()
  }, [selectedMonth])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  if (loading) {
    return <div className="p-8 text-center">Loading monthly report...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Monthly Report</h1>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
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
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">This month</p>
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
          <CardTitle>Weekly Revenue & Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
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

"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingBag, Users, TrendingUp, ArrowUpRight } from 'lucide-react';
import { OrderDoc } from "@/lib/models";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    activeOrders: 0,
    averageOrderValue: 0,
  });
  const [recentOrders, setRecentOrders] = useState<OrderDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/admin/orders');
        if (response.ok) {
          const orders: OrderDoc[] = await response.json();
          
          const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
          const activeOrders = orders.filter((o) =>
            ["pending", "preparing"].includes(o.status)
          ).length;

          setStats({
            totalRevenue,
            totalOrders: orders.length,
            activeOrders,
            averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0,
          });
          
          setRecentOrders(orders.slice(0, 5));
        }
      } catch (error) {
        console.error('[v0] Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return <div className="p-8 text-center">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(stats.totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              All time revenue
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              All time orders
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeOrders}</div>
            <p className="text-xs text-muted-foreground">
              Currently processing
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(stats.averageOrderValue)}
            </div>
            <p className="text-xs text-muted-foreground">
              Per order average
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentOrders.map((order) => (
                <div key={order.orderCode} className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      New order received
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Table {order.tableNumber} • {new Date(order.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  </div>
                </div>
              ))}
              {recentOrders.length === 0 && (
                <p className="text-sm text-muted-foreground">No recent orders</p>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Popular Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Placeholder for popular items logic */}
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Kopi Susu Gula Aren
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Most popular item
                  </p>
                </div>
                <div className="ml-auto font-medium">Top 1</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

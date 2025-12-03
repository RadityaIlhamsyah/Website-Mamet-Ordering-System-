"use client";

import { useEffect, useState } from "react";
import { OrderDoc } from "@/lib/models";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderDoc[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('[v0] Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // Poll for new orders every 30 seconds
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (orderCode: string, newStatus: string) => {
    try {
      const response = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderCode, status: newStatus }),
      });

      if (response.ok) {
        setOrders(orders.map(order => 
          order.orderCode === orderCode 
            ? { ...order, status: newStatus as any } 
            : order
        ));
      }
    } catch (error) {
      console.error('[v0] Failed to update status:', error);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 border-yellow-500/20";
      case "preparing":
        return "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/20";
      case "ready":
        return "bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/20";
      case "completed":
        return "bg-gray-500/15 text-gray-700 dark:text-gray-400 border-gray-500/20";
      case "cancelled":
        return "bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/20";
      default:
        return "bg-gray-500/15 text-gray-700";
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.customerName.toLowerCase().includes(search.toLowerCase()) ||
      order.orderCode.toLowerCase().includes(search.toLowerCase()) ||
      order.tableNumber.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <Button variant="outline" size="sm" onClick={fetchOrders} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Table</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    Loading orders...
                  </TableCell>
                </TableRow>
              ) : filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.orderCode}>
                    <TableCell className="font-mono text-xs">
                      {order.orderCode.split("-")[1]}
                    </TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.tableNumber}</TableCell>
                    <TableCell>
                      <div className="max-w-[200px] truncate text-sm text-muted-foreground">
                        {order.items
                          .map((i) => `${i.quantity}x ${i.name}`)
                          .join(", ")}
                      </div>
                    </TableCell>
                    <TableCell>{formatPrice(order.total)}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`capitalize ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        defaultValue={order.status}
                        onValueChange={(value) =>
                          updateStatus(order.orderCode, value)
                        }
                      >
                        <SelectTrigger className="w-[130px] h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="preparing">Preparing</SelectItem>
                          <SelectItem value="ready">Ready</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

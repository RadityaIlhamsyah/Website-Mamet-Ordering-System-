"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Coffee, Clock, ChefHat, UtensilsCrossed, Package } from "lucide-react"
import Link from "next/link"
import type { OrderDoc } from "@/lib/models"

export default function OrderConfirmationPage() {
  const params = useParams()
  const [order, setOrder] = useState<OrderDoc | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await fetch(`/api/orders/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setOrder(data)
          setLastUpdated(new Date())
        }
      } catch (error) {
        console.error("[v0] Failed to fetch order:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()

    // Poll every 5 seconds for real-time status updates
    const interval = setInterval(fetchOrder, 5000)
    return () => clearInterval(interval)
  }, [params.id])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const statusTimeline = [
    { status: "pending", label: "Menunggu", icon: Clock },
    { status: "preparing", label: "Diproses", icon: ChefHat },
    { status: "ready", label: "Siap", icon: UtensilsCrossed },
    { status: "completed", label: "Selesai", icon: Package },
  ]

  const currentStatusIndex = statusTimeline.findIndex((s) => s.status === order?.status)

  const getStatusMessage = () => {
    switch (order?.status) {
      case "pending":
        return "Pesanan Anda sedang menunggu untuk diproses. Terima kasih telah bersabar!"
      case "preparing":
        return "Pesanan Anda sedang disiapkan oleh tim kami. Akan segera siap!"
      case "ready":
        return "Pesanan Anda sudah siap! Silakan ambil dengan kode pesanan Anda."
      case "completed":
        return "Pesanan Anda telah selesai. Terima kasih telah berbelanja!"
      default:
        return "Status pesanan sedang dimuat..."
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <p className="text-muted-foreground">Loading order...</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">Order not found</p>
            <Button asChild>
              <Link href="/">Back to Menu</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-accent/20 p-3">
              <CheckCircle2 className="w-12 h-12 text-accent" />
            </div>
          </div>
          <CardTitle className="text-2xl">Pesanan Berhasil!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Order Code */}
          <div className="text-center p-6 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Kode Pesanan Anda</p>
            <p className="text-3xl font-bold font-mono tracking-wider">{order.orderCode.split("-")[1]}</p>
          </div>

          <div className="space-y-4">
            <p className="font-semibold text-sm">Status Pesanan</p>
            <div className="flex items-center justify-between gap-2">
              {statusTimeline.map((step, index) => {
                const Icon = step.icon
                const isCompleted = index <= currentStatusIndex
                const isActive = index === currentStatusIndex

                return (
                  <div key={step.status} className="flex flex-col items-center flex-1">
                    <div
                      className={`rounded-full p-3 mb-2 transition-all ${
                        isActive ? "bg-accent/30 ring-2 ring-accent" : isCompleted ? "bg-accent/20" : "bg-muted"
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isCompleted ? "text-accent" : "text-muted-foreground"}`} />
                    </div>
                    <p className="text-xs font-medium text-center">{step.label}</p>
                  </div>
                )
              })}
            </div>

            {/* Status Message */}
            <div
              className={`p-4 rounded-lg border ${
                order.status === "ready"
                  ? "bg-green-500/10 border-green-500/20"
                  : order.status === "completed"
                    ? "bg-blue-500/10 border-blue-500/20"
                    : "bg-accent/10 border-accent/20"
              }`}
            >
              <p className="text-sm font-medium">{getStatusMessage()}</p>
              {lastUpdated && (
                <p className="text-xs text-muted-foreground mt-2">
                  Terakhir diperbarui: {lastUpdated.toLocaleTimeString("id-ID")}
                </p>
              )}
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-3 border-t pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Nama</span>
              <span className="font-medium">{order.customerName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Meja</span>
              <span className="font-medium">{order.tableNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Pembayaran</span>
              <Badge variant="secondary" className="capitalize">
                {order.paymentMethod}
              </Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Status</span>
              <Badge variant="outline" className="capitalize">
                {order.status}
              </Badge>
            </div>
          </div>

          {/* Items */}
          <div className="border-t pt-4 space-y-2">
            <p className="font-semibold mb-3">Item Pesanan</p>
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="border-t pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span className="text-primary">{formatPrice(order.total)}</span>
            </div>
          </div>

          {/* Info Message */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <div className="flex gap-3">
              <Coffee className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-1">Langkah Selanjutnya?</p>
                <p className="text-muted-foreground">
                  Tunjukkan kode pesanan ini kepada kasir ketika pesanan Anda siap. Halaman ini akan otomatis
                  memperbarui status pesanan Anda setiap 5 detik.
                </p>
              </div>
            </div>
          </div>

          <Button asChild className="w-full" size="lg">
            <Link href="/">Kembali ke Menu</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

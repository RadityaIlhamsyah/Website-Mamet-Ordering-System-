"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, Plus } from "lucide-react"
import type { MenuItem } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

export default function MenuManagementPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "coffee" as MenuItem["category"],
    image: "",
    available: true,
  })

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const response = await fetch("/api/menu")
      if (!response.ok) throw new Error("Failed to fetch menu items")
      const data = await response.json()
      setMenuItems(data)
    } catch (error) {
      console.error("[v0] Fetch menu error:", error)
      toast({
        title: "Error",
        description: "Failed to load menu items",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleAvailability = async (id: string, available: boolean) => {
    try {
      const response = await fetch("/api/admin/menu", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, available }),
      })

      if (!response.ok) throw new Error("Failed to update availability")

      toast({
        title: "Success",
        description: "Item availability updated",
      })

      fetchMenuItems()
    } catch (error) {
      console.error("[v0] Toggle availability error:", error)
      toast({
        title: "Error",
        description: "Failed to update availability",
        variant: "destructive",
      })
    }
  }

  const handleOpenDialog = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        name: item.name,
        description: item.description,
        price: item.price.toString(),
        category: item.category,
        image: item.image,
        available: item.available,
      })
    } else {
      setEditingItem(null)
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "coffee",
        image: "",
        available: true,
      })
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const itemData = {
        ...formData,
        price: Number.parseFloat(formData.price),
      }

      let response
      if (editingItem) {
        // Update existing item
        response = await fetch("/api/admin/menu", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingItem.id, ...itemData }),
        })
      } else {
        // Create new item
        response = await fetch("/api/admin/menu", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(itemData),
        })
      }

      if (!response.ok) throw new Error("Failed to save item")

      toast({
        title: "Success",
        description: editingItem ? "Item updated successfully" : "Item created successfully",
      })

      setIsDialogOpen(false)
      fetchMenuItems()
    } catch (error) {
      console.error("[v0] Save item error:", error)
      toast({
        title: "Error",
        description: "Failed to save item",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return

    try {
      const response = await fetch(`/api/admin/menu?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete item")

      toast({
        title: "Success",
        description: "Item deleted successfully",
      })

      fetchMenuItems()
    } catch (error) {
      console.error("[v0] Delete item error:", error)
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading menu...</p>
      </div>
    )
  }

  const categories = ["coffee", "tea", "food", "drink"] as const

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Menu Management</h1>
          <p className="text-muted-foreground">Manage your menu items and availability</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="gap-2">
          <Plus className="w-4 h-4" />
          Add New Item
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <CardDescription className="mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(item)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Rp {item.price.toLocaleString()}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Available</span>
                  <Switch
                    checked={item.available}
                    onCheckedChange={(checked) => handleToggleAvailability(item.id, checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Menu Item" : "Add New Menu Item"}</DialogTitle>
            <DialogDescription>
              {editingItem ? "Update the details of your menu item" : "Create a new menu item for your warkop"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (Rp)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value as MenuItem["category"] })}
                >
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="/placeholder.svg?height=200&width=200"
              />
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="available"
                checked={formData.available}
                onCheckedChange={(checked) => setFormData({ ...formData, available: checked })}
              />
              <Label htmlFor="available">Available for order</Label>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{editingItem ? "Update" : "Create"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { CartItem, MenuItem } from "./types"

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: MenuItem) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("warkop-cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart data", error)
      }
    }
    setIsInitialized(true)
  }, [])

  // Save cart to localStorage whenever it changes, BUT only after initialization
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("warkop-cart", JSON.stringify(cart))
    }
  }, [cart, isInitialized])

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }
    setCart((prev) => prev.map((i) => (i.id === itemId ? { ...i, quantity } : i)))
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  const getItemCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}

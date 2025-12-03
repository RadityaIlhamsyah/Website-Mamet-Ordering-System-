"use client";

import { useCart } from "@/lib/cart-context";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import Image from "next/image";
import { useRouter } from 'next/navigation';

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { cart, updateQuantity, removeFromCart, getTotal } = useCart();
  const router = useRouter();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleCheckout = () => {
    onOpenChange(false);
    router.push("/checkout");
  };

  if (cart.length === 0) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Your cart is empty</p>
            <p className="text-sm text-muted-foreground mt-2">
              Add some items to get started
            </p>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart ({cart.length} items)</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm mb-1 truncate">
                  {item.name}
                </h4>
                <p className="text-sm text-primary font-semibold mb-2">
                  {formatPrice(item.price)}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="text-sm font-medium w-8 text-center">
                    {item.quantity}
                  </span>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 ml-auto"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="w-3 h-3 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <SheetFooter className="flex-col gap-4">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total:</span>
            <span className="text-primary">{formatPrice(getTotal())}</span>
          </div>
          <Button onClick={handleCheckout} size="lg" className="w-full">
            Proceed to Checkout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

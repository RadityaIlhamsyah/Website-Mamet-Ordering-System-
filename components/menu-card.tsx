"use client";

import { MenuItem } from "@/lib/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from 'lucide-react';
import Image from "next/image";
import { useCart } from "@/lib/cart-context";

interface MenuCardProps {
  item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-square">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover"
        />
        {!item.available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="secondary" className="text-sm">
              Sold Out
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 text-balance">{item.name}</h3>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
          {item.description}
        </p>
        <p className="text-lg font-bold text-primary">{formatPrice(item.price)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => addToCart(item)}
          disabled={!item.available}
          className="w-full"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { MenuCard } from '@/components/menu-card';
import { CategoryFilter } from '@/components/category-filter';
import { CartSheet } from '@/components/cart-sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Coffee, Lock } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import Link from 'next/link';
import { MenuItem } from '@/lib/types';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartOpen, setCartOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { getItemCount } = useCart();

  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await fetch('/api/menu');
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error('[v0] Failed to fetch menu:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  const filteredItems = selectedCategory === 'all' ? menuItems : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coffee className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold">Warkop Mamet</h1>
            </div>
            <Button variant="outline" size="icon" className="relative" onClick={() => setCartOpen(true)}>
              <ShoppingCart className="w-5 h-5" />
              {getItemCount() > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {getItemCount()}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
          <p className="text-muted-foreground">Order your favorite coffee and snacks</p>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        </div>

        {/* Menu Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading menu...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No items in this category</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t py-6 mt-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground mb-4">© 2025 Warkop Mamet. All rights reserved.</p>
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-primary">
              <Lock className="w-3 h-3 mr-1" />
              Admin Access
            </Button>
          </Link>
        </div>
      </footer>

      {/* Cart Sheet */}
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
}

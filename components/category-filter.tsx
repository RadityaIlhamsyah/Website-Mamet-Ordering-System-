"use client";

import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/data";

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {CATEGORIES.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectCategory(category.id)}
          className="whitespace-nowrap"
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}

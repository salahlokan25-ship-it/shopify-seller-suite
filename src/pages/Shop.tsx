import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { ProductCard } from "@/components/products/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const { data: products, isLoading } = useShopifyProducts(50);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [activeCategory, setActiveCategory] = useState(categoryParam || "all");

  const categories = [
    { label: "All", value: "all" },
    { label: "Cycling Gear", value: "cycling" },
    { label: "Fitness Equipment", value: "fitness" },
    { label: "Activewear", value: "activewear" },
    { label: "Accessories", value: "accessories" },
  ];

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let filtered = [...products];

    // Search filter
    if (search) {
      filtered = filtered.filter(p =>
        p.node.title.toLowerCase().includes(search.toLowerCase()) ||
        p.node.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter (basic keyword matching)
    if (activeCategory !== "all") {
      const categoryKeywords: Record<string, string[]> = {
        cycling: ["cycling", "jacket", "cap", "ride", "bike"],
        fitness: ["push-up", "resistance", "jump rope", "abs", "mat", "forearm", "weight"],
        activewear: ["compression", "tank", "leggings", "shirt", "pants", "running", "training"],
        accessories: ["strap", "grip", "bag", "shoes", "dry bag"],
      };
      const keywords = categoryKeywords[activeCategory] || [];
      filtered = filtered.filter(p =>
        keywords.some(kw =>
          p.node.title.toLowerCase().includes(kw) ||
          p.node.handle.toLowerCase().includes(kw) ||
          p.node.productType?.toLowerCase().includes(kw)
        )
      );
    }

    // Sort
    if (sortBy === "price-asc") {
      filtered.sort((a, b) => parseFloat(a.node.priceRange.minVariantPrice.amount) - parseFloat(b.node.priceRange.minVariantPrice.amount));
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => parseFloat(b.node.priceRange.minVariantPrice.amount) - parseFloat(a.node.priceRange.minVariantPrice.amount));
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.node.title.localeCompare(b.node.title));
    }

    return filtered;
  }, [products, search, sortBy, activeCategory]);

  return (
    <main className="py-8 md:py-12">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            SHOP <span className="text-gradient">ALL</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-secondary border-border"
            />
          </div>
          <div className="flex gap-3">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-44 bg-secondary border-border">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <Button
              key={cat.value}
              variant={activeCategory === cat.value ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat.value)}
              className={
                activeCategory === cat.value
                  ? "gradient-primary text-primary-foreground border-0 shrink-0"
                  : "border-border text-muted-foreground hover:text-foreground shrink-0"
              }
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Products grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No products found</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Shop;

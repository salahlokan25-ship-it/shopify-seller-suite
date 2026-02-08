import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { ProductCard } from "@/components/products/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const FeaturedProducts = () => {
  const { data: products, isLoading } = useShopifyProducts(8);

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              FEATURED <span className="text-gradient">GEAR</span>
            </h2>
            <p className="text-muted-foreground mt-2">Top picks for your next workout</p>
          </div>
          <Button asChild variant="ghost" className="hidden md:flex text-primary hover:text-primary">
            <Link to="/shop">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No products found. Products are being added to the store.</p>
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <Button asChild className="gradient-primary text-primary-foreground">
            <Link to="/shop">
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { type ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const { node } = product;

  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const comparePrice = node.compareAtPriceRange?.maxVariantPrice
    ? parseFloat(node.compareAtPriceRange.maxVariantPrice.amount)
    : null;
  const currency = node.priceRange.minVariantPrice.currencyCode;
  const hasDiscount = comparePrice && comparePrice > price;
  const discountPercent = hasDiscount ? Math.round((1 - price / comparePrice) * 100) : 0;

  const firstImage = node.images.edges[0]?.node;
  const firstVariant = node.variants.edges[0]?.node;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant) return;

    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    });

    toast.success("Added to cart!", {
      description: node.title,
      position: "top-center",
    });
  };

  return (
    <Link
      to={`/product/${node.handle}`}
      className="group block rounded-lg overflow-hidden bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-card"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {firstImage ? (
          <img
            src={firstImage.url}
            alt={firstImage.altText || node.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <ShoppingCart className="h-12 w-12" />
          </div>
        )}

        {/* Discount badge */}
        {hasDiscount && (
          <Badge className="absolute top-3 left-3 gradient-primary border-0 text-primary-foreground font-bold">
            -{discountPercent}%
          </Badge>
        )}

        {/* Quick add button */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            onClick={handleAddToCart}
            disabled={isLoading || !firstVariant}
            size="icon"
            className="gradient-primary shadow-glow h-10 w-10 rounded-full"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {node.title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">
            {currency} {price.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              {currency} {comparePrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

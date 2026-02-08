import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useShopifyProduct, useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "@/components/products/ProductCard";
import { ShoppingCart, Minus, Plus, Loader2, ChevronLeft, Truck, Shield, RotateCcw } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading } = useShopifyProduct(handle || "");
  const { data: allProducts } = useShopifyProducts(8);
  const addItem = useCartStore(state => state.addItem);
  const cartLoading = useCartStore(state => state.isLoading);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  if (isLoading) {
    return (
      <main className="py-8 md:py-12">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <Skeleton className="aspect-square rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="py-8 md:py-12">
        <div className="container text-center">
          <h1 className="text-2xl font-bold text-foreground">Product not found</h1>
          <Button asChild className="mt-4">
            <Link to="/shop">Back to Shop</Link>
          </Button>
        </div>
      </main>
    );
  }

  const { node } = product;
  const images = node.images.edges;
  const options = node.options.filter(o => o.name !== "Title");

  // Determine selected variant
  const selectedVariant = node.variants.edges.find(v =>
    v.node.selectedOptions.every(
      opt => !selectedOptions[opt.name] || selectedOptions[opt.name] === opt.value
    )
  )?.node || node.variants.edges[0]?.node;

  const price = selectedVariant ? parseFloat(selectedVariant.price.amount) : 0;
  const comparePrice = selectedVariant?.compareAtPrice
    ? parseFloat(selectedVariant.compareAtPrice.amount)
    : null;
  const currency = selectedVariant?.price.currencyCode || "GBP";
  const hasDiscount = comparePrice && comparePrice > price;

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions,
    });
    toast.success("Added to cart! 🔥", {
      description: `${node.title} × ${quantity}`,
      position: "top-center",
    });
  };

  const relatedProducts = allProducts?.filter(p => p.node.id !== node.id).slice(0, 4) || [];

  return (
    <main className="py-8 md:py-12">
      <div className="container">
        {/* Breadcrumb */}
        <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ChevronLeft className="h-4 w-4" /> Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Image gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              {images[selectedImageIndex] ? (
                <img
                  src={images[selectedImageIndex].node.url}
                  alt={images[selectedImageIndex].node.altText || node.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <ShoppingCart className="h-16 w-16" />
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    className={cn(
                      "w-16 h-16 rounded-md overflow-hidden border-2 flex-shrink-0 transition-colors",
                      i === selectedImageIndex ? "border-primary" : "border-border hover:border-muted-foreground"
                    )}
                  >
                    <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">{node.title}</h1>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-3xl font-black text-primary">{currency} {price.toFixed(2)}</span>
                {hasDiscount && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">{currency} {comparePrice.toFixed(2)}</span>
                    <Badge className="gradient-primary border-0 text-primary-foreground">
                      SAVE {Math.round((1 - price / comparePrice) * 100)}%
                    </Badge>
                  </>
                )}
              </div>
            </div>

            {/* Options */}
            {options.map((option) => (
              <div key={option.name} className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  {option.name}: <span className="text-muted-foreground">{selectedOptions[option.name] || option.values[0]}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value) => (
                    <Button
                      key={value}
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedOptions(prev => ({ ...prev, [option.name]: value }))}
                      className={cn(
                        "border-border",
                        (selectedOptions[option.name] || option.values[0]) === value
                          ? "border-primary bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {value}
                    </Button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-md">
                <Button variant="ghost" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium text-foreground">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => setQuantity(q => q + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                onClick={handleAddToCart}
                disabled={cartLoading || !selectedVariant?.availableForSale}
                className="flex-1 gradient-primary text-primary-foreground font-bold shadow-glow"
                size="lg"
              >
                {cartLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
            </div>

            {/* Value props */}
            <div className="grid grid-cols-3 gap-3 py-4 border-t border-border">
              <div className="text-center">
                <Truck className="h-5 w-5 mx-auto text-primary mb-1" />
                <p className="text-xs text-muted-foreground">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="h-5 w-5 mx-auto text-primary mb-1" />
                <p className="text-xs text-muted-foreground">Quality Guaranteed</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-5 w-5 mx-auto text-primary mb-1" />
                <p className="text-xs text-muted-foreground">Easy Returns</p>
              </div>
            </div>

            {/* Description */}
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-3 border-t border-border text-foreground font-semibold">
                Description
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p className="text-sm text-muted-foreground leading-relaxed pb-4">
                  {node.description || "Premium quality fitness gear designed for peak performance."}
                </p>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 md:mt-24">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-8">
              YOU MAY ALSO <span className="text-gradient">LIKE</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.node.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ProductDetail;

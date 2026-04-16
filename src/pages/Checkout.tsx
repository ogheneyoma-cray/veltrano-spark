import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { Trash2, ArrowRight, ShoppingCart } from "lucide-react";

const Checkout = () => {
  const { items, removeItem, clearCart } = useCart();
  const { formatPrice, convertPrice, currency } = useCurrency();

  const totalUsd = items.reduce((sum, i) => sum + i.price, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-32 pb-20 md:pt-44 md:pb-32">
          <div className="container text-center max-w-xl">
            <ShoppingCart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-6" />
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Browse our courses and add something to get started.
            </p>
            <Button asChild size="lg">
              <Link to="/courses">
                Browse Courses <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20 md:pt-44 md:pb-32 grid-pattern hero-glow">
        <div className="container max-w-3xl">
          <h1 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-8">
            Checkout<span className="text-primary">.</span>
          </h1>

          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <div key={item.id} className="glass-card rounded-lg p-5 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-sm md:text-base font-semibold text-foreground truncate">
                    {item.title}
                  </h3>
                </div>
                <span className="font-display text-sm md:text-base font-bold text-primary whitespace-nowrap">
                  {formatPrice(item.price)}
                </span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="glass-card rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal ({items.length} course{items.length > 1 ? "s" : ""})</span>
              <span className="font-display font-bold text-foreground">{formatPrice(totalUsd)}</span>
            </div>
            <div className="border-t border-border/50 pt-4 flex items-center justify-between">
              <span className="font-display font-semibold text-foreground">Total</span>
              <span className="font-display text-xl font-bold text-primary">{formatPrice(totalUsd)}</span>
            </div>

            <Button className="w-full" size="lg">
              Complete Enrolment — {formatPrice(totalUsd)} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Payment processing coming soon. For now, email{" "}
              <a href="mailto:contact@veltranomtechnologies.com" className="text-primary hover:underline">
                contact@veltranomtechnologies.com
              </a>{" "}
              to complete your enrolment.
            </p>
          </div>

          <div className="flex items-center justify-between mt-6">
            <Button variant="ghost" size="sm" onClick={clearCart} className="text-muted-foreground hover:text-destructive">
              Clear Cart
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/courses">Continue Browsing</Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Checkout;

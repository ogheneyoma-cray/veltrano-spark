import { useCurrency, Currency } from "@/contexts/CurrencyContext";

const CurrencySwitcher = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="flex items-center rounded-full border border-border/50 bg-muted/30 p-0.5 text-xs font-medium">
      {(["USD", "NGN"] as Currency[]).map((c) => (
        <button
          key={c}
          onClick={() => setCurrency(c)}
          className={`px-3 py-1 rounded-full transition-all duration-200 ${
            currency === c
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {c === "USD" ? "$ USD" : "₦ NGN"}
        </button>
      ))}
    </div>
  );
};

export default CurrencySwitcher;

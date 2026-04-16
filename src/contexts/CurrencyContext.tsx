import { createContext, useContext, useState, ReactNode } from "react";

export type Currency = "USD" | "NGN";

const EXCHANGE_RATE = 1550; // 1 USD = ~1550 NGN

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (usdPrice: number) => string;
  convertPrice: (usdPrice: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>("USD");

  const convertPrice = (usdPrice: number) =>
    currency === "USD" ? usdPrice : Math.round(usdPrice * EXCHANGE_RATE);

  const formatPrice = (usdPrice: number) => {
    const converted = convertPrice(usdPrice);
    return currency === "USD"
      ? `$${converted.toLocaleString()}`
      : `₦${converted.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
};

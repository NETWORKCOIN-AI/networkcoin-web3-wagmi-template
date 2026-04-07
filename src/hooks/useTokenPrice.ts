import { useState, useEffect } from 'react';

/**
 * Mock token prices (USD). Replace with a real API call
 * (e.g. CoinGecko, CoinMarketCap) for production use.
 */
const MOCK_PRICES: Record<string, number> = {
  ETH: 3450.0,
  WETH: 3450.0,
  USDC: 1.0,
  USDT: 1.0,
  DAI: 1.0,
  WBTC: 68500.0,
  LINK: 18.5,
  UNI: 12.3,
};

interface UseTokenPriceResult {
  price: number | null;
  isLoading: boolean;
}

/**
 * Returns a mock price for the given token symbol.
 * Simulates a short loading delay to mirror real API behaviour.
 *
 * @param symbol - Token symbol (e.g. "ETH", "USDC")
 */
export function useTokenPrice(symbol: string): UseTokenPriceResult {
  const [price, setPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setPrice(null);

    const timer = setTimeout(() => {
      const normalized = symbol.toUpperCase();
      setPrice(MOCK_PRICES[normalized] ?? null);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [symbol]);

  return { price, isLoading };
}

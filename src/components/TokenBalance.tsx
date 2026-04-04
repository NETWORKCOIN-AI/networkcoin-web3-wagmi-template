import { useReadContract, useAccount } from 'wagmi';
import { formatUnits } from 'viem';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

// Standard ERC20 ABI for balanceOf and decimals
const ERC20_ABI = [
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

interface TokenBalanceProps {
  tokenAddress: `0x${string}`;
  tokenSymbol?: string;
  showCard?: boolean;
}

export function TokenBalance({ tokenAddress, tokenSymbol, showCard = true }: TokenBalanceProps) {
  const { address } = useAccount();

  // Read token decimals
  const { data: decimals } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'decimals',
    query: {
      staleTime: 60 * 60 * 1000, // 1 hour (decimals don't change)
    },
  });

  // Read token symbol
  const { data: symbol } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'symbol',
    query: {
      staleTime: 60 * 60 * 1000, // 1 hour (symbol doesn't change)
    },
  });

  // Read user balance
  const { data: balance, isLoading } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      staleTime: 30 * 1000, // 30 seconds
      refetchInterval: 30 * 1000, // Auto-refetch every 30s
    },
  });

  const formattedBalance = balance && decimals 
    ? formatUnits(balance, decimals) 
    : '0';

  const displaySymbol = tokenSymbol || symbol || 'TOKEN';

  if (!showCard) {
    return (
      <div className="flex items-center gap-2">
        <span className="font-mono text-lg">
          {isLoading ? '...' : parseFloat(formattedBalance).toFixed(4)}
        </span>
        <span className="text-muted-foreground">{displaySymbol}</span>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{displaySymbol} Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-mono font-bold">
          {isLoading ? (
            <span className="text-muted-foreground">Loading...</span>
          ) : (
            <>
              {parseFloat(formattedBalance).toFixed(4)}
              <span className="text-lg text-muted-foreground ml-2">{displaySymbol}</span>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

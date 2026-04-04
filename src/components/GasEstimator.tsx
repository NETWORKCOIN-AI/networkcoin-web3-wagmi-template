import { useEstimateGas, useGasPrice } from 'wagmi';
import { formatGwei, formatEther } from 'viem';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Zap } from 'lucide-react';

interface GasEstimatorProps {
  to?: `0x${string}`;
  data?: `0x${string}`;
  value?: bigint;
}

export function GasEstimator({ to, data, value }: GasEstimatorProps) {
  // Estimate gas for transaction
  const { data: gasEstimate } = useEstimateGas({
    to,
    data,
    value,
    query: {
      enabled: !!to,
      staleTime: 10 * 1000, // 10 seconds
    },
  });

  // Get current gas price
  const { data: gasPrice } = useGasPrice({
    query: {
      refetchInterval: 12 * 1000, // Refetch every 12 seconds (1 block)
      staleTime: 12 * 1000,
    },
  });

  if (!gasEstimate || !gasPrice) {
    return null;
  }

  const estimatedCost = gasEstimate * gasPrice;
  const gasPriceGwei = formatGwei(gasPrice);
  const costEth = formatEther(estimatedCost);

  return (
    <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Zap className="h-4 w-4 text-blue-600" />
          Gas Estimate
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Gas Limit:</span>
            <span className="font-mono">{gasEstimate.toString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Gas Price:</span>
            <span className="font-mono">{parseFloat(gasPriceGwei).toFixed(2)} Gwei</span>
          </div>
          <div className="flex justify-between pt-2 border-t">
            <span className="font-medium">Estimated Cost:</span>
            <span className="font-mono font-bold">
              {parseFloat(costEth).toFixed(6)} ETH
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { useWaitForTransactionReceipt, useChainId } from 'wagmi';
import { Card, CardContent } from './ui/card';
import { Loader2, CheckCircle2, XCircle, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

interface TransactionStatusProps {
  hash?: `0x${string}`;
  onSuccess?: () => void;
}

export function TransactionStatus({ hash, onSuccess }: TransactionStatusProps) {
  const chainId = useChainId();

  const { isLoading, isSuccess, isError, error } = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: !!hash,
    },
  });

  // Call onSuccess callback when transaction is confirmed
  if (isSuccess && onSuccess) {
    onSuccess();
  }

  if (!hash) return null;

  // Get block explorer URL
  const getExplorerUrl = () => {
    const baseUrl = chainId === 11155111 
      ? 'https://sepolia.etherscan.io'
      : chainId === 84532
      ? 'https://sepolia.basescan.org'
      : 'https://etherscan.io';
    return `${baseUrl}/tx/${hash}`;
  };

  return (
    <Card className={`
      ${isLoading && 'border-yellow-200 bg-yellow-50/50 dark:bg-yellow-950/20'}
      ${isSuccess && 'border-green-200 bg-green-50/50 dark:bg-green-950/20'}
      ${isError && 'border-red-200 bg-red-50/50 dark:bg-red-950/20'}
    `}>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          {/* Status Icon */}
          <div className="mt-1">
            {isLoading && <Loader2 className="h-5 w-5 animate-spin text-yellow-600" />}
            {isSuccess && <CheckCircle2 className="h-5 w-5 text-green-600" />}
            {isError && <XCircle className="h-5 w-5 text-red-600" />}
          </div>

          {/* Status Text */}
          <div className="flex-1 space-y-2">
            <p className="font-medium">
              {isLoading && 'Confirming transaction...'}
              {isSuccess && 'Transaction confirmed!'}
              {isError && 'Transaction failed'}
            </p>

            {isError && error && (
              <p className="text-sm text-red-600">
                {error.message}
              </p>
            )}

            <p className="text-xs text-muted-foreground font-mono break-all">
              {hash}
            </p>

            {/* View on Explorer Button */}
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              asChild
            >
              <a
                href={getExplorerUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                View on Explorer
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

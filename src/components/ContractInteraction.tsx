import { useState, useMemo } from 'react';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { formatEther, parseEther } from 'viem';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Loader2, Plus, Minus, RotateCcw } from 'lucide-react';
import { SIMPLE_STORAGE_ABI, CONTRACT_ADDRESSES } from '../lib/wagmi';
import { useAccount, useChainId } from 'wagmi';

// Query options for better caching
const QUERY_OPTIONS = {
  refetchInterval: false as const,
  staleTime: 30 * 1000,  // 30 seconds
  gcTime: 5 * 60 * 1000,  // 5 minutes
};

export function ContractInteraction() {
  const [newValue, setNewValue] = useState('');
  const { address } = useAccount();
  const chainId = useChainId();
  
  // Memoize contract address to prevent unnecessary recalculations
  const contractAddress = useMemo(() => {
    switch (chainId) {
      case 11155111: // Sepolia
        return CONTRACT_ADDRESSES.sepolia;
      case 84532: // Base Sepolia
        return CONTRACT_ADDRESSES.baseSepolia;
      case 1: // Mainnet
        return CONTRACT_ADDRESSES.mainnet;
      default:
        return CONTRACT_ADDRESSES.sepolia;
    }
  }, [chainId]);

  // Read current value with optimized caching
  const { data: currentValue, refetch } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: SIMPLE_STORAGE_ABI,
    functionName: 'getValue',
    query: QUERY_OPTIONS,
  });

  // Read owner with optimized caching
  const { data: owner } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: SIMPLE_STORAGE_ABI,
    functionName: 'owner',
    query: QUERY_OPTIONS,
  });

  // Write contract hooks
  const { writeContract, data: hash, isPending } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash });

  // Contract interaction functions
  const setValue = () => {
    if (!newValue) return;
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: SIMPLE_STORAGE_ABI,
      functionName: 'setValue',
      args: [BigInt(newValue)],
    });
  };

  const increment = () => {
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: SIMPLE_STORAGE_ABI,
      functionName: 'increment',
    });
  };

  const decrement = () => {
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: SIMPLE_STORAGE_ABI,
      functionName: 'decrement',
    });
  };

  const reset = () => {
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: SIMPLE_STORAGE_ABI,
      functionName: 'reset',
    });
  };

  const isOwner = address && owner && address.toLowerCase() === owner.toLowerCase();

  if (!address) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Contract Interaction</CardTitle>
          <CardDescription>
            Connect your wallet to interact with the smart contract
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (contractAddress === '0x0000000000000000000000000000000000000000') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Contract Not Deployed</CardTitle>
          <CardDescription>
            Deploy your contract first to interact with it
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Simple Storage Contract</CardTitle>
        <CardDescription>
          Interact with your deployed smart contract
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Value Display */}
        <div className="text-center p-6 bg-muted rounded-lg">
          <h3 className="text-2xl font-bold mb-2">Current Value</h3>
          <p className="text-4xl font-mono text-primary">
            {currentValue?.toString() || '0'}
          </p>
        </div>

        {/* Contract Info */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <p><strong>Contract:</strong> {contractAddress}</p>
          <p><strong>Owner:</strong> {owner}</p>
          <p><strong>You are owner:</strong> {isOwner ? 'Yes' : 'No'}</p>
        </div>

        <Separator />

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={increment}
            disabled={isPending || isConfirming}
            className="flex items-center gap-2"
          >
            {isPending || isConfirming ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            Increment
          </Button>
          
          <Button
            onClick={decrement}
            disabled={isPending || isConfirming}
            variant="outline"
            className="flex items-center gap-2"
          >
            {isPending || isConfirming ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Minus className="h-4 w-4" />
            )}
            Decrement
          </Button>
        </div>

        {/* Set Custom Value */}
        <div className="space-y-2">
          <Label htmlFor="newValue">Set Custom Value</Label>
          <div className="flex gap-2">
            <Input
              id="newValue"
              type="number"
              placeholder="Enter new value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              disabled={isPending || isConfirming}
            />
            <Button
              onClick={setValue}
              disabled={!newValue || isPending || isConfirming}
            >
              {isPending || isConfirming ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Set Value'
              )}
            </Button>
          </div>
        </div>

        {/* Owner Actions */}
        {isOwner && (
          <>
            <Separator />
            <div className="space-y-2">
              <Label>Owner Actions</Label>
              <Button
                onClick={reset}
                disabled={isPending || isConfirming}
                variant="destructive"
                className="w-full flex items-center gap-2"
              >
                {isPending || isConfirming ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RotateCcw className="h-4 w-4" />
                )}
                Reset to 0
              </Button>
            </div>
          </>
        )}

        {/* Transaction Status */}
        {hash && (
          <div className="space-y-2 p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium">Transaction Status:</p>
            {isConfirming && (
              <p className="text-sm text-yellow-600 flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Confirming transaction...
              </p>
            )}
            {isConfirmed && (
              <p className="text-sm text-green-600">
                ✅ Transaction confirmed!
              </p>
            )}
            <p className="text-xs text-muted-foreground break-all">
              Hash: {hash}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

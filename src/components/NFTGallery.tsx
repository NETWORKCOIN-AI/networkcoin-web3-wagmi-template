import { useAccount, useReadContract } from 'wagmi';

const ERC721_BALANCE_OF_ABI = [
  {
    inputs: [{ name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

interface NFTGalleryProps {
  contractAddress: `0x${string}`;
}

export function NFTGallery({ contractAddress }: NFTGalleryProps) {
  const { address } = useAccount();

  const { data: balance, isLoading, isError } = useReadContract({
    address: contractAddress,
    abi: ERC721_BALANCE_OF_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  if (!address) {
    return (
      <div className="rounded-xl border border-gray-700 bg-gray-900 p-8 text-center text-gray-400">
        Connect your wallet to view your NFTs.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-xl border border-gray-700 bg-gray-900 p-8 text-center text-gray-400">
        Loading NFT balance...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-800 bg-gray-900 p-8 text-center text-red-400">
        Failed to load NFT data.
      </div>
    );
  }

  const count = balance ? Number(balance) : 0;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">
        Your NFTs ({count})
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {Array.from({ length: count }, (_, i) => (
          <div
            key={i}
            className="flex aspect-square items-center justify-center rounded-xl border border-gray-700 bg-gray-800 text-gray-400 transition hover:border-blue-500"
          >
            <span className="text-sm">NFT #{i + 1}</span>
          </div>
        ))}
        {count === 0 && (
          <div className="col-span-full py-8 text-center text-gray-500">
            No NFTs found for this collection.
          </div>
        )}
      </div>
    </div>
  );
}

import { useEnsName, useEnsAvatar } from 'wagmi';
import { normalize } from 'viem/ens';

export function useENS(address?: `0x${string}`) {
  // Get ENS name
  const { data: ensName } = useEnsName({
    address,
    query: {
      enabled: !!address,
      staleTime: 60 * 60 * 1000, // 1 hour
    },
  });

  // Get ENS avatar
  const { data: ensAvatar } = useEnsAvatar({
    name: ensName ? normalize(ensName) : undefined,
    query: {
      enabled: !!ensName,
      staleTime: 60 * 60 * 1000, // 1 hour
    },
  });

  // Format address for display (0x1234...5678)
  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : '';

  return {
    ensName,
    ensAvatar,
    displayName: ensName || shortAddress,
    shortAddress,
  };
}

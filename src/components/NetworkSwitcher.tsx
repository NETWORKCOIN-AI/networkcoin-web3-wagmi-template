import { useAccount, useChains, useSwitchChain } from 'wagmi';

export function NetworkSwitcher() {
  const { chain } = useAccount();
  const chains = useChains();
  const { switchChain, isPending } = useSwitchChain();

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-400">
        Network:
      </span>
      <select
        className="rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        value={chain?.id ?? ''}
        disabled={isPending}
        onChange={(e) => {
          const chainId = Number(e.target.value);
          if (chainId) {
            switchChain({ chainId });
          }
        }}
      >
        {!chain && <option value="">Not connected</option>}
        {chains.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      {isPending && (
        <span className="text-xs text-yellow-400">Switching...</span>
      )}
    </div>
  );
}

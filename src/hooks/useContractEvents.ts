import { useWatchContractEvent } from 'wagmi';
import { useState } from 'react';
import type { Log } from 'viem';

interface ContractEvent {
  eventName: string;
  args: any;
  blockNumber: bigint | null;
  transactionHash: `0x${string}` | null;
  timestamp: number;
}

// Extended log type with decoded args
type DecodedLog = Log & {
  args?: Record<string, any>;
};

interface UseContractEventsProps {
  address: `0x${string}`;
  abi: any;
  eventName: string;
  onEvent?: (event: ContractEvent) => void;
}

export function useContractEvents({
  address,
  abi,
  eventName,
  onEvent,
}: UseContractEventsProps) {
  const [events, setEvents] = useState<ContractEvent[]>([]);
  const [latestEvent, setLatestEvent] = useState<ContractEvent | null>(null);

  // Watch for real-time contract events
  useWatchContractEvent({
    address,
    abi,
    eventName,
    onLogs(logs: DecodedLog[]) {
      const newEvents = logs.map((log) => ({
        eventName,
        args: log.args || {},
        blockNumber: log.blockNumber,
        transactionHash: log.transactionHash,
        timestamp: Date.now(),
      }));

      setEvents((prev) => [...newEvents, ...prev].slice(0, 50)); // Keep last 50 events
      
      if (newEvents.length > 0) {
        const latest = newEvents[0];
        setLatestEvent(latest);
        onEvent?.(latest);
      }
    },
  });

  return {
    events,
    latestEvent,
    eventCount: events.length,
  };
}

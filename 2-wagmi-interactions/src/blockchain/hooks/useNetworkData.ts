'use client';

import { useAccount } from 'wagmi';
import { wagmiConfig } from '../config';
import { getBalance } from '@wagmi/core'

import { getNetwork } from '../networks/network';
import { Network } from '@/lib/types/network';

const useNetworkData = (): Network => {
  const { chainId } = useAccount();
  const networkData = getNetwork(chainId);
  return networkData as Network;
};

const balance = getBalance(wagmiConfig, {
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
})

export default useNetworkData;
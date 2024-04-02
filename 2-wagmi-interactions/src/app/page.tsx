'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { formatUnits, parseUnits } from 'viem';
import ConnectButton from '@/components/shared/ConnectButton';
import { useTokenRead, useTokenWrite } from '@/blockchain/hooks';
import useToast from '@/hooks/useToast';

export default function Home() {
  const toast = useToast();
  const { address } = useAccount();
  const [recipient, setRecipient] = useState('');
  const tokenName = useTokenRead<string>('name');
  const tokenBalance = useTokenRead<bigint>('balanceOf', [address]);
  const tokenDecimals = useTokenRead<bigint>('decimals');
  const tokenSymbol = useTokenRead<string>('symbol');

  const tokenTransfer = useTokenWrite('transfer', {
    onSuccess(data) {
      console.log('data: transfer write ', data);
    },
  });

  const tokenNameData = tokenName.data;
  const tokenDecimalsData = Number(tokenDecimals.data);
  const tokenBalanceData = formatUnits(tokenBalance.data || BigInt(0), tokenDecimalsData);
  const tokenSymbolData = tokenSymbol.data as string;

  const handleTransfer = async () => {
    if (!recipient) return toast('Please enter recipient address', 'error');
    const amount = parseUnits('10', tokenDecimalsData);
    await tokenTransfer.write([recipient, amount]);
    toast('Transfer successful', 'success');
  };

  return (
    <main className="h-screen w-full flex justify-center items-center bg-black text-white">
      <div className="flex flex-col gap-5 items-center">
        <ConnectButton />
      </div>
    </main>
  );
}
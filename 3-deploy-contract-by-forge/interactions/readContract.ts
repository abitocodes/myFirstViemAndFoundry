
import { mainnet } from 'viem/chains'

import { publicClient } from './config/client'
import { abi } from './abi/QuickAcaciaTokenAbi'
 
const name = await publicClient.readContract({
  address: '0x838953C09885E324A976E047141BC81037B501D5',
  abi: abi,
  functionName: 'name',
})

const symbol = await publicClient.readContract({
  address: '0x838953C09885E324A976E047141BC81037B501D5',
  abi: abi,
  functionName: 'symbol',
})

const message = await publicClient.readContract({
    address: '0x838953C09885E324A976E047141BC81037B501D5',
    abi: abi,
    functionName: 'getMessage',
})

console.log('name:', name)
console.log('symbol:', symbol)
console.log('message:', message)
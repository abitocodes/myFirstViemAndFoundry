export RPC_URL=https://rpc.ankr.com/polygon_mumbai

cast call 0x838953C09885E324A976E047141BC81037B501D5 "name()(string)" --rpc-url $RPC_URL
cast call 0x838953C09885E324A976E047141BC81037B501D5 "symbol()(string)" --rpc-url $RPC_URL
cast call 0x838953C09885E324A976E047141BC81037B501D5 "getMessage()(string)" --rpc-url $RPC_URL

wallet_address
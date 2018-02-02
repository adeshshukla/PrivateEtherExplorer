# SampleDapp
Blockchain Explorer for my private ethereum block.

This is a block chain explorer for my private network created through geth.
This project is inspired from etherscan.io

# Running the app
1. Run your private ethereum network. Change --rpcaddr "a.b.c.d" as per IP addr of the system running the private network.
        geth --identity "NodeName" --networkid 888 --rpc --rpcport "8545" --rpccorsdomain "*" --rpcaddr "a.b.c.d" --datadir "./chaindata/" --port "30330" --nodiscover --rpcapi "db,eth,net,web3,personal"

2. Edit "serverConfig.js"
        Set "ChainIpAddr" property equal to IP addr of the system running the private network.
        You can also set other configurations also.

3. Run "npm start".
        The app is running on "localhost:port" defined in "serverConfig.js" (default : localhost:8546).        

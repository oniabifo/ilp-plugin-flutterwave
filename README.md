"# ilp-plugin-flutterwave" 


Using flutterwave to move Naira into ILP. 

It works by sending NGN from a verve card into your wallet on moneywave

You can register through moneywave, create a wallet through the GUI, and get your
API KEY and SECRET KEY from the account settings.

https://moneywave.flutterwave.com/login

Edit line 17 of index.js and of wallet_balance.js.

TO SEND FUNDS INTO YOUR WALLET 
run the following command
"node index 5000"
You can see the transaction show up under https://moneywave.flutterwave.com/transfers/card

TO CHECK YOUR WALLET BALANCE
run the following command
"node wallet_balance"

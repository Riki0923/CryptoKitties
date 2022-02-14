# CryptoKitties

This is a CryptoKitty smartcontract where you can create/mint Kitty NFT-s from an ERC721 contract, add them to your catalouge, breed them and also sell it on marketplace with other cryptokitty lovers.

Languages used for this project: Solidity, Javascript, CSS, HTML. Truffle has been used as terminal for setting up a local test blockchain.

## How to run it:

- You will need to set up a localhost, I personally used python for this, use the following code in powershell:

- cd "the folder where the index.html file can be found".
- run python3 -m http.server 8000

With this your localhost has been set up, all you need to do now is migrate in truffle and set up a metamask. I highly recommend to add 2 accounts so you will be able to see the buy & sell part in the contract.

In truffle run: truffle migrate ( or truffle migrate --reset )
- Change the addresses in index.js, catalouge.js, marketplace.js and breed.js file for the addresses the migrate gives out to you. 
- if you want some test addresses with ETH, you can run truffle develop to get some private keys and addresses out and you can add them to a metamask, also the RPC URL which truffle gives.

## Frontent part:
- Once you run the localhost you will get to the kitty Factory page, this is where you can create any cat with some cat attribute and color variaties. 
- Once you think your Kitty looks good, just press the createKitty button.
- After this you can check it on your catalouge page where you can sell it to a marketplace or remove the offer if you change your mind.
- If you have 2 or more kitties you can breed them to get some new generation kitties.
- You can play around with multiple addresses, buy and sell some cats.
- Happy breeding

Any question, turn to: bartariki@gmail.com

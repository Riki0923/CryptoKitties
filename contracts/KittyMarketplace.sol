//SPDX-License-Identifier: MIT

pragma solidity ^0.5.12;

import "./Kittycontract.sol";
import "./Ownable.sol";
import "./IKittyMarketplace.sol";

contract KittyMarketPlace is Ownable, IKittyMarketPlace  {
    Kittycontract private _Kittycontract; // This is pointing to the Kitty Contract's address


    struct Offer {
        address payable seller;
        uint256 price;
        uint256 index;
        uint256 tokenId;
        bool active;
    }


    Offer [] offers;

    mapping(uint256 =>Offer) tokenIdToOffer;

    event MarketTransaction(string TxType, address owner, uint256 tokenId);

    constructor(address _KittyContractAddress) public {
        setKittyContract(_KittyContractAddress);
    }

    function setKittyContract(address _kittyContractAddress) onlyOwner public{
        _Kittycontract = Kittycontract(_kittyContractAddress);

    }


        /**
    * Get the details about a offer for _tokenId. Throws an error if there is no active offer for _tokenId.
     */
    function getOffer(uint256 _tokenId) external view returns (address seller, uint256 price, uint256 index, uint256 tokenId, bool active){
        Offer storage offer = tokenIdToOffer[_tokenId];

        return 
        (offer.seller,
         offer.price,
         offer.index,
         offer.tokenId,
         offer.active);
    }

   function getAllTokenOnSale() external view  returns(uint256[] memory listOfOffers){
       if(offers.length == 0){
           return new uint256[](0);
       }
       else {
        uint256[] memory _listOfOffers = new uint[](offers.length);
        uint256 counter = 0;
        for(uint i = 0; i < offers.length; i++){
            if(offers[i].active == true){
                _listOfOffers[counter] = offers[i].tokenId;
                counter ++;
            }
        }

        return _listOfOffers; 
       }
}

    function _ownCat(address _address, uint256 _tokenId) public view returns(bool){
        return (_Kittycontract.ownerOf(_tokenId) == _address);
    }

    function setOffer(uint256 _price, uint256 _tokenId) public {
        require(_ownCat(msg.sender, _tokenId) , "You must own this cat in order to sell it!");
        require(tokenIdToOffer[_tokenId].active == false, "This token is already on an active offer");
        require(_Kittycontract.isApprovedForAll(msg.sender, address(this)), "Contract has to be an operator in order to set the offer!");

        uint256 index;
        Offer memory newOffer = Offer({
            seller: msg.sender,
            price: _price,
            active: true,
            tokenId : _tokenId,
            index: index
        });
        tokenIdToOffer[_tokenId] = newOffer;
        offers.push(newOffer);
   
        index ++;

        emit MarketTransaction("Create offer", msg.sender, _tokenId);

    }

    function removeOffer(uint256 _tokenId) public {
        require(tokenIdToOffer[_tokenId].seller == msg.sender, "Only the owner of this Id can remove the Offer!");
        require(tokenIdToOffer[_tokenId].active == true, "You cannot remove this offer as it is already removed or nonactive!");
        tokenIdToOffer[_tokenId].active = false;

        emit MarketTransaction("Remove offer", msg.sender, _tokenId);
    }

    function buyKitty(uint256 _tokenId) public payable {
        Offer memory offer = tokenIdToOffer[_tokenId];
        require(msg.value == offer.price, "The msg.value has to be equal to the tokenId's price!");
        require(tokenIdToOffer[_tokenId].active == true, "You can only buy active tokenIds!");
        require(tokenIdToOffer[_tokenId].seller != msg.sender, "Marketplace: Cannot by your own token!");


        delete tokenIdToOffer[_tokenId];
        offers[tokenIdToOffer[_tokenId].index].active = false;

        if(offer.price > 0){
            offer.seller.transfer(offer.price);
        }

        _Kittycontract._transfer(offer.seller, msg.sender, _tokenId);

        emit MarketTransaction("Buy", msg.sender, _tokenId);
    }

}
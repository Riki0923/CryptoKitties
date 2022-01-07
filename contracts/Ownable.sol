// SPDX-License-Identifier: MIT

pragma solidity  ^0.5.12;


contract Ownable {

    address owner;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(owner == msg.sender , "This is only executable by the owner!");
        _;
    }
}
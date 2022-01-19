//SPDX-License-Identifier: MIT

pragma solidity ^0.5.12;

import "./IERC721.sol";
import "./Ownable.sol";
import "./IERC721Receiver.sol";

contract Kittycontract is IERC721, Ownable {


    string public constant tokenName = "RikiKitties";
    string public constant tokenSymbol = "RK";
    bytes4 internal constant MAGIC_ERC721_RECEIVED = bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
    uint256 public constant Creation_Limit_Gen = 10;
    uint256 public gencounter = 0;
    bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd;
    bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;


    event Birth(
        address owner, 
        uint256 kittenId, 
        uint256 mumId, 
        uint256 dadId, 
        uint256 genes);
    
    event approvalForAll(address indexed owner, address indexed operator, bool approved);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);

    struct Kitty {
        uint256 genes;
        uint64 birthTime;
        uint32 mumId;
        uint32 dadId;
        uint16 generation;
    }

    Kitty [] kitties;

    mapping(address => uint256) ownershipTokenCount; // how many token this address has
    mapping(uint256 => address) ownerOfToken; // who owns this token
    mapping(uint256 => address) public kittyIndexToApproved; // Who has ownership of the given token
    mapping(address => mapping(address => bool)) private _operatorApprovals; // MYADDR => OPERATORADDR => True/False

  /*  function breed(uint256 _mumId, uint256 _dadId) public returns (uint256){
        require(_own(msg.sender, _dadId));
        require(_own(msg.sender, _mumId));
        //You got the DNA

        (uint256 dadDna,,,,uint256 DadGeneration) = getKitty(_dadId);
        (uint256 mumDna,,,,uint256 MumGeneration) = getKitty(_mumId);

        _mixDna(_dadId, _mumId);

        uint256 kidGeneration = 0;
        if(DadGeneration < MumGeneration){
            kidGeneration = MumGeneration + 1;
            kidGeneration /=2;
        }
        else if(DadGeneration > MumGeneration){
            kidGeneration = DadGeneration + 1;
            kidGeneration /= 2;
        }
        else {
            kidGeneration = MumGeneration + 1;
        }
        //Figure out the Generation
        _createKitty(_mumId, _dadId, kidGeneration, newDna, msg.sender);  //Create a new cat with the new properties, give it to the msg.sender

    }*/
    

    function supportsInterface(bytes4 _interfaceId) public view returns (bool){
        return (_interfaceId == _INTERFACE_ID_ERC721 || _interfaceId == _INTERFACE_ID_ERC165);
    }

    function createKittyGen0(uint256 _genes) public onlyOwner returns(uint256){
        //require(gencounter < Creation_Limit_Gen);

        //gencounter++;
        
        return _createKitty(0,0,0,_genes,msg.sender);

    }

    function getKitty(uint256 _id
    ) public view returns(
        uint256 genes,
        uint256 birthTime,
        uint256 mumId,
        uint256 dadId,
        uint256 generation
    ){
        Kitty storage kitty = kitties[_id];

        birthTime = uint256(kitty.birthTime);
        mumId = uint256(kitty.mumId);
        dadId = uint256(kitty.dadId);
        generation = uint256(kitty.generation);
        genes = uint256(kitty.genes);
    }

    function _createKitty(
        uint256 _mumId,
        uint256 _dadId,
        uint256 _generation,
        uint256 _genes,
        address owner
    ) private returns(uint256){
        Kitty memory _kitty = Kitty({
            genes: _genes,
            birthTime: uint64(block.timestamp),
            mumId: uint32(_mumId),
            dadId: uint32(_dadId),
            generation: uint16(_generation)
        });
        uint newKittenId = kitties.push(_kitty) - 1;

        emit Birth(owner, newKittenId, _mumId, _dadId, _genes);

       _transfer(address(0), owner, newKittenId);


       return newKittenId;
    }

    function balanceOf(address owner) external view returns (uint256){
        return ownershipTokenCount[owner];
    }

    function totalSupply()  external view returns (uint256){
        return kitties.length;
    }

    function name() external  view returns (string memory){
        return tokenName;
    }

    function symbol() external  view returns (string memory){
        return tokenSymbol;
    }

    function ownerOf(uint256 tokenId) external  view returns (address){
        return ownerOfToken[tokenId];
    }

    function transfer(address to, uint256 tokenId) external  {
        require(msg.sender != to, "you cannot send a tokenId to yourself!");
        require(msg.sender != address(0),"sender address cannot be 0!");
        require(_own(msg.sender, tokenId), "You are not the owner of this token!");
        
        _transfer(msg.sender, to, tokenId);       
    }

    function _own(address _claimant, uint256 _tokenId) public view returns(bool){
        if(ownerOfToken[_tokenId] == _claimant)
        return true;      
    }

    function _transfer(address from, address to, uint _tokenId) internal{

        ownerOfToken[_tokenId] = to;

        if(from != address(0)){
            ownershipTokenCount[from]--;
        }      
        ownershipTokenCount[to]++;
        delete kittyIndexToApproved[_tokenId];

        emit Transfer(from, to, _tokenId);
    }

    function approve (address _approved, uint256 _tokenId) external {
        require(_own(msg.sender, _tokenId), "You need to own this token in order to approve it!");

        _approve(_approved, _tokenId);
        emit Approval(msg.sender, _approved, _tokenId);
    }

    function setApprovalForAll(address _operator, bool _approved) external{
        require(address(0)!= msg.sender, "sender address cannot be 0!");
        require(_operatorApprovals[msg.sender][_operator] == false, "This operator already got approval!");
        require(_operator != msg.sender ,"Operator account cannot be the same as msg.sender!");

        _operatorApprovals[msg.sender][_operator] = _approved;

        emit approvalForAll(msg.sender, _operator, _approved);
    }

    function getApproved(uint256 _tokenId) external view returns(address){
        require(_tokenId >= kitties.length, "This is not a valid NFT!");

        return kittyIndexToApproved[_tokenId];
    }

    function isApprovedForAll(address _owner, address _operator) public view returns(bool){
        return _operatorApprovals[_owner][_operator];
    }

    function _approve(address _approved, uint256 _tokenId) internal {
        kittyIndexToApproved[_tokenId] = _approved;
    }

    function transferFrom(address _from, address _to,uint256 _tokenId) external{
        require(_own(_from, _tokenId), "msg.sender is not the current owner!");
        require(isApprovedForAll(_from, msg.sender) || _approvedFor(msg.sender, _tokenId)  || msg.sender == _from);
        require(address(0)!= _to, "receiver cannot be 0 address!");
        require(_tokenId < kitties.length);

        _transfer(_from, _to, _tokenId);

        emit Transfer(_from, _to, _tokenId);

    }

    function _approvedFor(address _claimant, uint256 _tokenId) internal view returns (bool){
        return kittyIndexToApproved[_tokenId] == _claimant;
    }
    function _checkERC721Support(address _from, address _to, uint256 _tokenId, bytes memory _data)internal returns (bool){
        if(!_isContract(_to) ){
            return true;
        }
        //Call onERC721Received in the _to contract
        bytes4 returnData = IERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data);
        return returnData == MAGIC_ERC721_RECEIVED;

        //Check return value
    }
    function _isContract(address _to) view internal returns (bool){
        uint32 size;
        assembly{
            size := extcodesize(_to)
        }
        return size > 0;
    }
    
    function _safeTransfer(address _from, address _to, uint256 _tokenId, bytes memory _data) internal{
        _transfer(_from, _to, _tokenId);
        require(_checkERC721Support(_from, _to, _tokenId, _data) );
    }
    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes calldata data) external {
        require(_own(_from, _tokenId), "msg.sender is not the current owner!");
        require(isApprovedForAll(_from, msg.sender) || _approvedFor(msg.sender, _tokenId)  || msg.sender == _from);
        require(address(0)!= _to, "receiver cannot be 0 address!");
        require(_tokenId < kitties.length);

        _safeTransfer(_from, _to, _tokenId, data);
    }
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) public{
        safeTransferFrom(_from, _to, _tokenId);
    }

    function _mixDna(uint256 _dadDna, uint256 _mumDna) internal returns (uint256){
        // dadDna:11 22 33 44 55 66 77 88
        // mumDna:88 77 66 55 44 33 22 11

        uint256 firstHalf = _dadDna / 100000000; //11223344 
        uint256 secondHalf = _mumDna % 100000000; // 44332211

        uint newDna = firstHalf * 100000000;
        newDna = newDna + secondHalf; // 1122334444332211
        return newDna;

        // 

        //10 + 20
        // 10 * 100 = 1000
        // 1000 + 20 = 1020

    }
}

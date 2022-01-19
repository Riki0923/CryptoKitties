var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0x32737333C3AA9EC83a205016FC5fC4c5FE65ACb4";

$(document).ready(function(){
    window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]});
        user = accounts[0];

        console.log(instance);
    })

})
   function createKitty(){
    var dnaStr = getDna();
    console.log(dnaStr);
    instance.methods.createKittyGen0(dnaStr).send({}, function(err, txHash){
        if(err)
        console.log(err);
        else
            console.log(txHash);
        })
    instance.events.Birth().on('data', function(event){
        console.log(event);
        let owner = event.returnValues.owner;
        console.log(owner);
        let kittenId = event.returnValues.kittenId;
        console.log(kittenId);
        let mumId = event.returnValues.mumId;
        console.log(mumId);
        let dadId = event.returnValues.dadId;
        console.log(dadId);
        let genes = event.returnValues.genes;
        console.log(genes);
        

        $('#kittyCreated').css({"display": "flex", "font-size": "1rem", 
                                "background-color": "lightgreen","font-style": "italic",
                                "justify-content": "flex-start", "align-items": "center", 
                                });
        $('#kittyCreated').text("Kitty Created!!! " +
                                "\n Kitten ID: " + kittenId +
                                "\n Owner: " +owner +
                                "\n mumId: " +mumId +
                                "\n dadId: " +dadId +
                                "\n generation: "+ genes);
                }).on("error", console.error);
        
    }
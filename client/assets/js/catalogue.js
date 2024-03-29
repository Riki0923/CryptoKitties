
var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0x2D64F7ca84cEb3b76847B3a2626f898475C9300e";
var mktAddress = "0xE312d15534369a97b8CefB5E2Df9Dbf157851182";

$(document).ready(function(){
    window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]});
        user = accounts[0];

        console.log(instance);

        mkt = new web3.eth.Contract(abimkt, mktAddress, {from: accounts[0]});
        console.log(mkt);
        printAllCats();
    })
})

$("#buttonSell").click(sellCat);

async function printAllCats(){
    var Owner;
    var item;
    var currentUser = ethereum.selectedAddress;
    let items = [];
    var allCatsId = [];
    var catsCount = await instance.methods.totalSupply().call();
    console.log("CATS COUNT: " + catsCount);

    for(let i = 0; i < catsCount; i++){
        Owner = await instance.methods._own(currentUser, i).call();
        //console.log(Owner);
        if(Owner){
            allCatsId.push(i);
        }
    }
    
    for(let i = 0; i < allCatsId.length; i++){
        let kittenId = allCatsId[i];
        //console.log("Current Kitten Id: " + kittenId);
        let object = await instance.methods.getKitty(allCatsId[i]).call();
        let catGenes = object.genes;
        //console.log("Current genes: " + catGenes);
        let catBirthday = object.birthTime;
        //console.log("Current Birthday: " + new Date(catBirthday * 1000));
        let catMumId = object.mumId;
        //console.log("Current MumId: " + catMumId);
        let catDadId = object.dadId;
        //console.log("Current DadId: " + catDadId);
        let catGeneration = object.generation;
        //console.log("Current Generation: " + catGeneration);

        createCatBox(kittenId, catGenes, catGeneration);
        //items.push(getItem(catGenes));
    }

    function createCatBox(id, catDetails, catGeneration){
        let bodyDna = catDetails.substring(0,2);
        //console.log("BODYDNA " + bodyDna);
        let mouthDna = catDetails.substring(2,4);
        //console.log(mouthDna);
        let eyesDna = catDetails.substring(4,6);
        //console.log(eyesDna);
        let earsDna = catDetails.substring(6,8);
        //console.log(earsDna);
        let eyeShape = catDetails.substring(8,9);
        //console.log(eyeShape);
        let decoShape = catDetails.substring(9,10);
        //console.log(decoShape);
        let decoMidColor = catDetails.substring(10,12);
        //console.log(decoMidColor);
        let decoSideColor = catDetails.substring(12,14);
        //console.log(decoSideColor);
        let animDna = catDetails.substring(14,15);
        //console.log(animDna);
        let lastDna = catDetails.substring(15,16);
        //console.log(lastDna);
        //console.log("Bodycolor: " + colors[earsDna]);
        let catGen = catGeneration;
        //console.log("catGen is: " +  catGen);

        item =  `<div class="col-lg-3 catBox m-5 light-b-shadow style="width:250px">
        <div class="cat" id="cat" style="min-height:266px">
            <div class="cat__ear">
                <div id="leftEar" class="` + (animDna == 2 ?'cat__ear--left movingEarLeft' : 'cat__ear--left') + `" style="background:#` + colors[earsDna] + `">
                    <div class="cat__ear--left-inside"></div>
                </div>
                <div id="rightEar" class="` + (animDna == 2 ?'cat__ear--right movingEarRight' : 'cat__ear--right') + `" style="background:#` + colors[earsDna] + `">
                    <div class="cat__ear--right-inside"></div>
                </div>
            </div>
           
            <div id="head" class="` + (animDna == 1 ? 'cat__head movingHead' : 'cat__head') + `" style="background:#` + colors[bodyDna] + `" >
                <div id="midDot" class="cat__head-dots" style="
                ${decoShape == 3 ? `
                transform: rotate(0deg); 
                height: 55px;
                width: 18px;
                top: 1px;
                border-radius: 0 0 50% 50%; `: ""}">
                    <div id="leftDot" class="cat__head-dots_first" style="
                    ${decoShape == 2 ?`
                    transform: rotate(20deg);
                    height: 35px; 
                    width: 14px; 
                    top: 1px; 
                    border-radius: 50% 0 50% 50%;`: ""
                    }"></div>
                    <div id="rightDot" class="cat__head-dots_second" style="
                    ${decoShape == 2 ? `
                    transform: rotate(-20deg);
                    height: 35px; 
                    width: 14px; 
                    top: 1px; 
                    border-radius: 0 50% 50% 50%;` : ""}"></div>
                </div>
                <div class="cat__eye">
                    <div class="cat__eye--left">
                        <span class="pupil-left" style="background:#` + colors[eyesDna] + `;
                        ${eyeShape == 2 ?`
                        border-top: 15px solid;
                        border-right: none;
                        border-bottom: none;
                        border-left: none;
                        border-image: initial;`: ""
                    }"></span>
                    </div>
                    <div class="cat__eye--right" >
                        <span class="pupil-right" style="background:#` + colors[eyesDna] + `;   
                        ${eyeShape == 2 ?`    
                        border-top: 15px solid;
                        border-right: none;
                        border-bottom: none;
                        border-left: none;
                        border-image: initial;`: "" }"></span>
                    </div>
                </div>
                <div class="cat__nose"></div>

                <div class="cat__mouth-contour"></div>
                <div class="cat__mouth-left"></div>
                <div class="cat__mouth-right"></div>

                <div class="cat__whiskers-left"></div>
                <div class="cat__whiskers-right"></div>
            </div>

            <div class="cat__body">

                <div class="cat__chest" style="background:#` + colors[bodyDna] + `"></div>

                <div class="cat__chest_inner" style="background:#` + colors[mouthDna] + `"></div>


                <div class="cat__paw-left" style="background:#` + colors[earsDna] + `"></div>
                <div class="cat__paw-left_inner" style="background:#` + colors[earsDna] + `"></div>


                <div class="cat__paw-right" style="background:#` + colors[earsDna] + `"></div>
                <div class="cat__paw-right_inner" style="background:#` + colors[earsDna] + `"></div>


                <div id="tail" class="cat__tail" style="background:#` + colors[mouthDna] + `"></div>
            </div>
        </div>
        <br>
        <div class="dnaDiv" id="catDNA">

            <b>
                DNA:
                <!-- Colors -->
                 <span id="dnabody">` + catDetails + `</span>
                 <span id="dnamouth"></span>
                 <span id="dnaeyes"></span>
                 <span id="dnaears"></span>
                
                 <!-- Cattributes -->
                 <span id="dnashape"></span>
                 <span id="dnadecoration"></span>
                 <span id="dnadecorationMid"></span>
                 <span id="dnadecorationSides"></span>
                 <span id="dnadanimation"></span>
                 <span id="dnaspecial"></span>
            </b>
        </div>
        <div>
        <ul>
        <li>
        ${animDna == 1 ? "Moving Head" : "Moving Ears"}
        </li>
        <li>
        ${eyeShape == 1 ? "Chill Eye" : "Basic Eye"}
        </li>
        <li>
        ${decoShape == 1 ? "Basic Decoration" :(decoShape == 2 ? "Degreed Dots": "Big MidDot")}
        </li>
        <li>
        ${"GEN: " + catGen}
        </li>
        </ul>
        </div>
        <button class="btn btn-primary" type="button" data-toggle="modal" id="catId" data-target="#exampleModal" onclick="setId(` + id +`)" >Sell this cat</button>
        <button class="btn btn-primary" type="button" onclick="removeOffer(` + id +`)" >Remove offer</button>
    </div>`;

        items.push(item);
    }
    
    $(".row").append(items.join(""));
}

var cat = null;

function setId(id){ // This just sets the id for the cat for the sellcat and removeCat function
    cat = id;
}

async function sellCat(){
    let price = $("#priceInput").val();
    console.log("Price in ETH is: " + price);
    let user = web3.currentProvider.selectedAddress;
    console.log("User Address is: " + user);
    let tokenId = cat;
    console.log("catId you want to set offer for is: " + tokenId);
    let approve = await instance.methods.isApprovedForAll(user, mktAddress).call();
    if(approve == false){
        await instance.methods.setApprovalForAll(mktAddress, true).send();

        approve = await instance.methods.isApprovedForAll(user, mktAddress).call();
        console.log("Mkt Address is now approved");
        approve = await instance.methods.isApprovedForAll(user, contractAddress).call();
        console.log("Contract address is also approved now");
    }
    let isOnSale = await mkt.methods.getOffer(tokenId).call();
    console.log("IsOnSale Status: " + isOnSale.active);
    if(isOnSale.active == true){
        alert("this cat is already on the offer list, cannot be offered again");
    }
    else {
        await mkt.methods.setOffer(web3.utils.toWei(price, "ether"), tokenId).send();
        alert("Offer created, check it on marketplace");
        console.log("price is: " + price);
    }

}

async function removeOffer(id){
    let idToRemove = id;
    console.log("id you want to Remove is: " + idToRemove);
    let user = web3.currentProvider.selectedAddress;
    console.log("user address is" + user);
    let catOnOffer = await mkt.methods.getOffer(idToRemove).call();
    if(catOnOffer.active == false){
        alert("You cannot remove this cat from list as it was not offered to Marketplace yet!");

    }
    else {
        await mkt.methods.removeOffer(idToRemove).send();
        alert("You succesfully removed this cat from Marketplace offer")
    }

}
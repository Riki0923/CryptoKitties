var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var kittyAddress = "0x2D64F7ca84cEb3b76847B3a2626f898475C9300e";
var marketAddress = "0xE312d15534369a97b8CefB5E2Df9Dbf157851182";


$(document).ready(function (){
    window.ethereum.enable().then(function(accounts){
        market = new web3.eth.Contract(abimkt, marketAddress, {from: accounts[0]});
        user = accounts[0];

        console.log(market);

        instance = new web3.eth.Contract(abi, kittyAddress, {from: accounts[0]});
        console.log(instance);
        printAllCats();
    })
})


async function printAllCats(){

 var offered;
 var item;
 var currentUser = ethereum.selectedAddress;
 let items = [];
 var allCatsforSale = [];
 var priceArray = [];
 var marketCatsCount = await instance.methods.totalSupply().call();
 console.log("Cat number on Market is: " + marketCatsCount);

 for(let i = 0; i < marketCatsCount; i++){

    offered = await market.methods.getOffer(i).call();
    if(offered.active == true){
        allCatsforSale.push(i);
    }
 }

 for(let i = 0; i < allCatsforSale.length; i ++){

     let saleId = allCatsforSale[i];
     //console.log("Current sale Id is: " + saleId);
     let offer = await market.methods.getOffer(allCatsforSale[i]).call();
     //console.log(offer);
     let sellPrice = offer.price;
     //console.log(sellPrice);
     let object = await instance.methods.getKitty(allCatsforSale[i]).call();
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

     createCatBox(saleId, catGenes, catGeneration, sellPrice);
     //items.push(getItem(catGenes));
 }

    function createCatBox(id, catDetails, catGeneration, price){
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
       // let priceForSell = price / 1000000000000000000;
      //  console.log("PriceForSell is:" + priceForSell);


        item = `<div class="col-lg-3 catBox m-5 light-b-shadow style="width:250px">
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
        <li>
        ${"Price: " + price / 1000000000000000000 + " ETH" }
        </li>
        </ul>
        </div>
        <button class="btn btn-primary" type="button" onclick="buyCat(` + id +`)" >Buy me</button>
    </div>`;

        items.push(item);
    }

    $(".row").append(items.join("")); // "" This mark will get rid of the , between the boxes 

}

var catOnSale = null;

function setId(id){ // This just sets the id for the cat for the sellcat and removeCat function
    catOnSale = id;
}


async function buyCat(id){
 let user = web3.currentProvider.selectedAddress;
 //console.log("User that wants to buy the cat is: " + user);
 let idToBuy = id;
 //console.log("The cat Id you want to buy is: " + idToBuy);
 let isApproved = await instance.methods.isApprovedForAll(user, marketAddress).call();
 let offerOfCat = await market.methods.getOffer(idToBuy).call();
 //console.log(offerOfCat);
 let priceOfCat = offerOfCat.price;
 //console.log(priceOfCat);

 if(offerOfCat.seller == web3.currentProvider.selectedAddress){ // muti meg gellértnek
     alert("You cannot buy your own kitty!");
 }

 else if(isApproved == false){
     await instance.methods.setApprovalForAll(marketAddress, true).send();
     //console.log("Market Address is now Approved for buy");
     isApproved = await instance.methods.isApprovedForAll(user, marketAddress).call();
     //console.log("is now approved: " + isApproved);   
 }
 else {
     //console.log("Market Address is already approved to Buy");
     await market.methods.buyKitty(idToBuy).send({value: priceOfCat});
     alert("Kittie bought! Check it on your Catalouge page")
 }
}

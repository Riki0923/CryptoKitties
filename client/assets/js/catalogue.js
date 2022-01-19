var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0x32737333C3AA9EC83a205016FC5fC4c5FE65ACb4";

$(document).ready(function(){
    window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]});
        user = accounts[0];

        //console.log(instance);
        printAllCats();
    })
})

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

        createCatBox(kittenId, catGenes);
    }

    function createCatBox(id, catDetails){
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

        item =  `<div class="col-lg-4 catBox m-3 light-b-shadow"` + id + `">
        <div class="cat" id="cat` + id + `">
            <div class="cat__ear` + id + `">
                <div id="leftEar` + id + `" class="cat__ear--left" style="background:#` + colors[earsDna] + `">
                    <div class="cat__ear--left-inside"></div>
                </div>
                <div id="rightEar` + id + `" class="cat__ear--right" style="background:#` + colors[earsDna] + `">
                    <div class="cat__ear--right-inside"></div>
                </div>
            </div>
           
            <div id="head` + id + `" class="cat__head" style="background:#` + colors[bodyDna] + `">
                <div id="midDot` + id + `" class="cat__head-dots" style="background:#` + colors[decoMidColor] + `">
                    <div id="leftDot` + id + `" class="cat__head-dots_first" style="background:#` + colors[decoSideColor] + `"></div>
                    <div id="rightDot` + id + `" class="cat__head-dots_second" style="background:#` + colors[decoSideColor] + `"></div>
                </div>
                <div class="cat__eye">
                    <div class="cat__eye--left" style="background:#` + colors[eyesDna] + `">
                        <span class="pupil-left"></span>
                    </div>
                    <div class="cat__eye--right" style="background:#` + colors[earsDna] + `">
                        <span class="pupil-right"></span>
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
                <div class="cat__paw-left_inner"></div>


                <div class="cat__paw-right" style="background:#` + colors[earsDna] + `"></div>
                <div class="cat__paw-right_inner"></div>


                <div id="tail` + id + `" class="cat__tail" style="background:#` + colors[mouthDna] + `"></div>
            </div>
        </div>
        <br>
        <div class="dnaDiv" id="catDNA` + id + `">

            <b>
                DNA:
                <!-- Colors -->
                 <span id="dnabody` + id + `">` + catDetails + `</span>
                 <span id="dnamouth` + id + `"></span>
                 <span id="dnaeyes` + id + `"></span>
                 <span id="dnaears` + id + `"></span>
                
                 <!-- Cattributes -->
                 <span id="dnashape` + id + `"></span>
                 <span id="dnadecoration` + id + `"></span>
                 <span id="dnadecorationMid` + id + `"></span>
                 <span id="dnadecorationSides` + id + `"></span>
                 <span id="dnadanimation` + id + `"></span>
                 <span id="dnaspecial` + id + `"></span>
            </b>
        </div>
    </div>`;

        items.push(item);
    }
    $(".row").append(items.join());
}
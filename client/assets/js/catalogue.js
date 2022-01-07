var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0xB7822fE8f0056AEED695EF309EeA446173E1B8BA";

$(document).ready(function(){
    window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]});
        user = accounts[0];

        console.log(instance);
        printAllCats();
    })
})

async function printAllCats(){
    var Owner;
    var item;
    let items = [];
    let currentUser = ethereum.selectedAddress;
    var allCatsId = [];
    var catsCount = await instance.methods.totalSupply().call();
    console.log("CATS COUNT: " + catsCount);

    for(let i = 0; i < catsCount; i++){
        Owner = await instance.methods._own(currentUser, i).call();
        if(Owner){
            allCatsId.push(i);
        }
    }

    for(let i = 0; i < allCatsId.length; i++){
        let kittenId = allCatsId[i];
        console.log("Current Kitten Id: " + kittenId);
        let object = await instance.methods.getKitty(allCatsId[i]).call();
        let catGenes = object.genes;
        console.log("Current genes: " + catGenes);
        let catBirthday = object.birthTime;
        console.log("Current Birthday: " + new Date(catBirthday * 1000));
        let catMumId = object.mumId;
        console.log("Current MumId: " + catMumId);
        let catDadId = object.dadId;
        console.log("Current DadId: " + catDadId);
        let catGeneration = object.generation;
        console.log("Current Generation: " + catGeneration);

        createCatBox(kittenId, catGenes);
    }

    function createCatBox(id, catDetails){
        let bodyDna = catDetails.substring(0,2);

        let mouthDna = catDetails.substring(2,4);

        let eyesDna = catDetails.substring(4,6);

        let earsDna = catDetails.substring(6,8);

        let eyeShape = catDetails.substring(8,9);

        let decoShape = catDetails.substring(9,10);

        let decoMidColor = catDetails.substring(10,12);

        let decoSideColor = catDetails.substring(12,14);

        let animDna = catDetails.substring(14,15);

        let lastDna = catDetails.substring(0,2);

        console.log("Bodycolor: " + colors[earsDna]);

        item =  `<div class="col-lg-4 catBox m-2 light-b-shadow" id="box` + id + `">
        <div class="cat" id="cat` + id + `">
            <div class="cat__ear">
                <div id="leftEar` + id + `" class="cat__ear--left" style="background:#` + colors[earsDna] + `">
                    <div class="cat__ear--left-inside"></div>
                </div>
                <div id="rightEar` + id + `" class="cat__ear--right" style="background:#` + colors[earsDna] + `">
                    <div class="cat__ear--right-inside"></div>
                </div>
            </div>
           
            <div id="head` + id `" class="` + (animDna == 1 ? 'cat__head movingHead' : 'cat__head') + `" style="background:#` + colors[bodyDna] + `">
                <div id="midDot` + id + `" class="'cat__head-dots'>
                    <div id="leftDot` + id + `" class="cat__head-dots_first"></div>
                    <div id="rightDot` + id + `" class="cat__head-dots_second"></div>
                </div>
                <div class="cat__eye` + id + `">
                    <div class="cat__eye--left">
                        <span class="pupil-left"></span>
                    </div>
                    <div class="cat__eye--right">
                        <span class="pupil-right"></span>
                    </div>
                </div>
                <div class="cat__nose"></div>

                <div class="cat__mouth-contour" style="background:#` + colors[mouthDna] + `"></div>
                <div class="cat__mouth-left"></div>
                <div class="cat__mouth-right"></div>

                <div class="cat__whiskers-left"></div>
                <div class="cat__whiskers-right"></div>
            </div>

            <div class="cat__body">

                <div class="cat__chest" style="background:#` + colors[bodyDna] + `"></div>

                <div class="cat__chest_inner" style="background:#` + colors[mouthDna] + `"></div>


                <div class="cat__paw-left"` + id +  `" style="background:#` + colors[earsDna] + `" ></div>
                <div class="cat__paw-left_inner"></div>


                <div class="cat__paw-right` + id  + `" style="background:#` + colors[earsDna] + `" ></div>
                <div class="cat__paw-right_inner"></div>


                <div id="tail" class="cat__tail"` + id + `" style="background:#` + colors[mouthDna] + `"></div>
            </div>
        </div>
        <br>
        <div class="dnaDiv" id="catDNA` + id + `">

            <b>
                DNA:
                <!-- Colors -->
                 <span id="dnabody` + id + `">` + kittenId + `</span>
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

var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0x2D64F7ca84cEb3b76847B3a2626f898475C9300e";

var momId;
var dadId;
var type;



$(document).ready(function(){
    window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]});
        user = accounts[0];

        console.log(instance);
    })



})
$('#myModal').on('show.bs.modal', async function (e) {
    $("#myModal .modal-body").empty();
    await printAllCats(type == "mom" ? dadId : momId)
        $("div.cat").click(async function(e){
            console.log(this.id);
            const kittyId = this.id.split("_")[1];
            console.log(this.id.split("_"));
            if(type == "mom"){
                momId = kittyId;
                console.log("momId is: " + momId);
                let object = await instance.methods.getKitty(momId).call();
                let catGen = object.generation;
                const momImg = $("#momImg");
                momImg.empty();
                momImg.append(createCatBox(momId, object.genes, catGen));
            }
            else {
                dadId = kittyId;
                console.log("dadId is: " + dadId);
                let object = await instance.methods.getKitty(dadId).call();
                let catGen = object.generation;
                const dadImg = $("#dadImg");
                dadImg.empty();
                dadImg.append(createCatBox(dadId, object.genes, catGen));
            }

      })
    /*printAllCats().then(() => {
        $("div.cat").click(function(e){
            console.log(this);
      })
    });*/
})





     async function printAllCats(exception = null){
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
            if(exception == kittenId){
                continue;
            }
            console.log("Current Kitten Id: " + kittenId);
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
    
            
            items.push(createCatBox(kittenId, catGenes, catGeneration));
            //items.push(getItem(catGenes));
        }
         $("#myModal .modal-body").append(items.join(""));

    }

    $("#dadImg").click(() =>{
        $("#hideableContent2").hide();
    })
    
    $("#momImg").click(() =>{
        $("#hideableContent1").hide();
    })

        
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

        let item =  `<div class="col-lg-11 catBox m-3 style="width:250px height:165px">
        <div class="cat" id="cat_${id}" style="min-height:266px">
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
        ${"GEN: " + catGeneration}
        </li>
        </ul>
        </div>
        <button class="button" id="dame ` + id +`" onclick="setDame(`+ id +`)">Choose as Dame</button>
        <button class="button" id="sire ` + id +`" onclick="setSire(`+ id +`)">Choose as Sire</button>
    </div>`;

        return item;

    }

var dame = null;
var sire = null;

async function setDame(id){
 dame = id;
 $("#dameId").html(id);
}

async function setSire(id){
sire = id;
$("#sireId").html(id);
}

$("#BreedButton").click(async function(){
    let momData = await instance.methods.getKitty(dame).call();
    console.log(momData);
    let momGenes = momData.genes;
    console.log("the mom Genes should be" + momGenes);
    let dadData = await instance.methods.getKitty(sire).call();
    console.log( dadData);
    let dadGenes = dadData.genes;
    console.log("the dad Genes should be" + dadGenes);
    var newDnaMix = dadGenes.slice(0,8) + momGenes.slice(8,16);
    console.log("the new Dna mix should be" + newDnaMix);
    await instance.methods.breed(sire,dame).send();
    alert("Go back to your Catalouge page to see your new Kitty!");
});
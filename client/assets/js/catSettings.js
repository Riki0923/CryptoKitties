
var colors = Object.values(allColors())

var defaultDNA = {
    "headcolor" : 10,
    "mouthColor" : 13,
    "eyesColor" : 96,
    "earsColor" : 10,
    //Cattributes
    "eyesShape" : 1,
    "decorationPattern" : 1,
    "decorationMidcolor" : 13,
    "decorationSidescolor" : 13,
    "animation" :  1,
    "lastNum" :  1
    }

// when page load
$( document ).ready(function() {
  $('#dnabody').html(defaultDNA.headColor);
  $('#dnamouth').html(defaultDNA.mouthColor);
  $('#dnaeyes').html(defaultDNA.eyesColor);
  $('#dnaears').html(defaultDNA.earsColor);
    
  $('#dnashape').html(defaultDNA.eyesShape)
  $('#dnadecoration').html(defaultDNA.decorationPattern)
  $('#dnadecorationMid').html(defaultDNA.decorationMidcolor)
  $('#dnadecorationSides').html(defaultDNA.decorationSidescolor)
  $('#dnaanimation').html(defaultDNA.animation)
  $('#dnaspecial').html(defaultDNA.lastNum)

  renderCat(defaultDNA)
});

function getDna(){
    var dna = ''
    dna += $('#dnabody').html()
    dna += $('#dnamouth').html()
    dna += $('#dnaeyes').html()
    dna += $('#dnaears').html()
    dna += $('#dnashape').html()
    dna += $('#dnadecoration').html()
    dna += $('#dnadecorationMid').html()
    dna += $('#dnadecorationSides').html()
    dna += $('#dnaanimation').html()
    dna += $('#dnaspecial').html()

    return parseInt(dna)
}

function renderCat(dna){
    headColor(colors[dna.headcolor],dna.headcolor)
    $('#bodycolor').val(dna.headcolor)

    mouthColor(colors[dna.mouthColor],dna.mouthColor)
    $('#mouthcolor').val(dna.mouthColor)

    eyeColor(colors[dna.eyesColor],dna.eyesColor)
    $('#eyecolor').val(dna.eyesColor)

    earsColor(colors[dna.earsColor],dna.earsColor)
    $('#earcolor').val(dna.earsColor)

    eyeVariation(dna.eyesShape)
    $('#eyeshape').val(dna.eyesShape)

    decorationVariation(dna.decorationPattern)
    $('#decorationPattern').val(dna.decorationMidcolor)

    animationVariation(dna.animation)
    $('#animation').val(dna.animation)


}

// Changing cat colors
$('#bodycolor').change(()=>{
    var colorVal = $('#bodycolor').val()
    headColor(colors[colorVal],colorVal)
})
$('#mouthcolor').change(()=>{
  var colorVal = $('#mouthcolor').val()
  mouthColor(colors[colorVal],colorVal)
})
$('#eyecolor').change(()=>{
  var colorVal = $('#eyecolor').val()
  eyeColor(colors[colorVal],colorVal)
})
$('#earcolor').change(()=>{
  var colorVal = $('#earcolor').val()
  earsColor(colors[colorVal],colorVal)
})
$('#eyeshape').change(()=>{
  var shape = parseInt($('#eyeshape').val())
  eyeVariation(shape)
})
$('#decoration').change(()=>{
  var decoration = parseInt($('#decoration').val())
  decorationVariation(decoration)
}) 

$('#decorationPattern').change(()=>{
  var shape = parseInt($('#decorationPattern').val())
  decorationVariation(shape)
}) 
$('#animation').change(()=>{
  var animationVal = parseInt($('#animation').val())
  animationVariation(animationVal)
})

$("#catColors").click(() =>{

  $("#eyeShapes").hide();
  $("#decorationPattern").hide();
  $("#animationShapes").hide();

  $("#headGroup").show();
  $("#mouthGroup").show();
  $("#eyeGroup").show();
  $("#earGroup").show();

})
$("#catAttributes").click(()=>{
  $("#eyeShapes").show();
  $("#decorationPattern").show();
  $("#animationShapes").show();

  $("#headGroup").hide();
  $("#mouthGroup").hide();
  $("#eyeGroup").hide();
  $("#earGroup").hide();
})

$("#default").click(()=>{
  $("#eyeShapes").show();
  $("#decorationPattern").show();
  $("#animationShapes").show();
  $("#headGroup").show();
  $("#mouthGroup").show();
  $("#eyeGroup").show();
  $("#earGroup").show();

headColor(colors[defaultDNA.headcolor], defaultDNA.headcolor)
$("#bodycolor").val(defaultDNA.headcolor)

mouthColor(colors[defaultDNA.mouthColor],defaultDNA.mouthColor)
$("#mouthcolor").val(defaultDNA.mouthColor)

eyeColor(colors[defaultDNA.eyesColor],defaultDNA.eyesColor)
$("#eyecolor").val(defaultDNA.eyesColor)

earsColor(colors[defaultDNA.earsColor],defaultDNA.earsColor)
$("#earcolor").val(defaultDNA.earsColor)

eyeVariation(defaultDNA.eyesShape)
$("#eyeshape").val(defaultDNA.eyesShape)

decorationVariation(defaultDNA.decorationPattern)
$("#decorationPattern").val(defaultDNA.decorationPattern)

animationVariation(defaultDNA.animation)
$("#animation").val(defaultDNA.animation)
})

$("#random").click(() =>{
  var randomColor = Math.floor(Math.random() * 89)+ 10;
  headColor(colors[randomColor],randomColor)
  $("#bodycolor").val(randomColor)

  var randomColor = Math.floor(Math.random() * 89) + 10;
  mouthColor(colors[randomColor], randomColor)
  $("#bodycolor").val(randomColor)

  var randomColor = Math.floor(Math.random() * 89) + 10;
  eyeColor(colors[randomColor], randomColor)
  $("#eyecolor").val(randomColor)

  var randomColor = Math.floor(Math.random() * 89) + 10;
  earsColor(colors[randomColor], randomColor)
  $("#earcolor").val(randomColor)

  var randomShape = Math.floor(Math.random() * 2) + 1;
  eyeVariation(randomShape)
  $("#eyeshape").val(randomShape)

  var randomShape = Math.floor(Math.random() * 3) + 1;
  decorationVariation(randomShape)
  $("#decorationPattern").val(randomShape)

  var randomShape = Math.floor(Math.random() * 2) + 1;
  animationVariation(randomShape)
  $("#animation").val(randomShape)
})


/*$("#CreateKitty").click(() =>{
    var dnaStr = getDna();
    instance.methods.createKittyGen0(dnaStr).send({}, function (error, txHash){

    if(error)
      console.log(error);
      else{
        console.log(txHash);
      }
    })
      Kittycontract.events.Birth({
      filter: {kittenId: [0,1], owner: "0x6Fe0d95e351D9d2041e7DDf31D8BC3cc74C60183"},

    }, function(error,event){ 
      if(error)
      console.log(error);
      else{
        console.log(event);
      }
       });

      $.on("KittyCreated", function(_mumId){
        console.log(_mumId);
      })
      
    
  })*/
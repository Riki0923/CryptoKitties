
//Random color
function getColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor
}

function genColors(){
    var colors = []
    for(var i = 10; i < 99; i ++){
      var color = getColor()
      colors[i] = color
    }
    return colors
}

//This function code needs to modified so that it works with Your cat code.
function headColor(color,code) {
    $('.cat__head, .cat__chest').css('background', '#' + color)  //This changes the color of the cat
    $('#headcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnabody').html(code) //This updates the body color part of the DNA that is displayed below the cat
}
function mouthColor(color,code) {
    $('.cat__mouth-contour, .cat__tail, .cat__chest_inner').css('background', '#' + color)  //This changes the color of the cat
    $('#mouthcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnamouth').html(code) //This updates the body color part of the DNA that is displayed below the cat
}
function eyeColor(color,code) {
    $('.pupil-left, .pupil-right').css('background', '#' + color)  //This changes the color of the cat
    $('#eyecode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnaeyes').html(code) //This updates the body color part of the DNA that is displayed below the cat
}
function earsColor(color,code) {
    $('.cat__ear--left, .cat__ear--right, .cat__paw-left, .cat__paw-right, .cat__paw-left_inner,.cat__paw-right_inner').css('background', '#' + color)  //This changes the color of the cat
    $('#earscode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnaears').html(code) //This updates the body color part of the DNA that is displayed below the cat
}


//###################################################
//Functions below will be used later on in the project
//###################################################
function eyeVariation(num) {

    $('#dnashape').html(num)
    switch (num) {
        case 1:
            $('#eyeName').html('Basic')
            normalEyes()
            break;
        case 2:
            $('#eyeName').html('Chill')
            eyesType1()
            break;
           
    }
}

function decorationVariation(num) {
    $('#dnadecoration').html(num)
    switch (num) {
        case 1:
            normaldecoration()
            $('#dotName').html('Basic')
            dotType0()
            break;
        case 2:
            $('#dotName').html('Degreed')
            dotType1()
            break;
        case 3:
            $('#dotName').html('BigMidDot')
            dotType2()
            break;
    }
}
function animationVariation(num){
    $('#dnaanimation').html(num);
    switch(num){
        case 1:
            $('#animationName').html('movingHead')
            animationType1();
            break;
        case 2:
            $('#animationName').html('movingEarLeft')
            $('#animationName').html('movingEarRight')
            animationType2();
            break;
    }
}

function animationType1(){
    resetAnimation();
    $('#head').addClass("movingHead");
}
function animationType2(){
    resetAnimation();
    $('#leftEar').addClass("movingEarLeft");
    $('#rightEar').addClass("movingEarRight");
}

function resetAnimation(){
    $("#head").removeClass("movingHead");
    $("#leftEar").removeClass("movingEarLeft");
    $("#rightEar").removeClass("movingEarRight");
}

function normalEyes() {
 $('.cat__eye').find('span').css('border', 'none');
}

function eyesType1(){
 $('.cat__eye').find('span').css('border-top', '15px solid')
}

function normaldecoration() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

function dotType0(){
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
}

function dotType1(){
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(20deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(-20deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}
function dotType2(){
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "55px", "width": "18px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}
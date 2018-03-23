$(document).ready(function(){
    toggleMenu();
    takeTour();
    cancelTour();
    showPage('#pricing_link');
    showPage('#contact_link');
    showPage('#contact_btn');
    closePage('#pricing_close');
    closePage('#contact_close');
});

function toggleMenu() {
    $('.menu-icon').on('click', function(){
        $(this).next('ul').toggleClass('hidden-phone');
    });
    $(".landing-page-wrapper").on("click", function (e) {
        var elem = e.target;
        if (!$(elem).parents(".menu-part").length) {
            $('.menu-icon').next('ul').addClass('hidden-phone');
        }
    });
}

function myFunction() {
    var video = document.getElementById("myVideo");
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function takeTour() {
    $('#take_tour').on('click', function(){
        $('.app-video').removeClass('hidden');
        myFunction();
    });
}

function cancelTour() {
    var video = document.getElementById("myVideo");
    $('#close_video').on('click', function () {
        $('.app-video').addClass('hidden');
        video.pause();
    });
}

function showPage(link) {
    var showPage = link.split("_")[0];
    $(link).on('click', function(){
        $(showPage).removeClass('hidden');
        $('.landing-page-wrapper').addClass('remove-scroll');
    });
}

function closePage(link) {
    var hidePage = link.split("_")[0];
    $(link).on('click', function () {
        $(hidePage).addClass('hidden');
        $('.landing-page-wrapper').removeClass('remove-scroll');
    });
}
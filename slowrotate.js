var bodyHeight = $("body").height()-$(window).height();
window.onscroll = function() {
    var deg = -$(window).scrollTop()*(360/bodyHeight);
    $(".slowrotate").css({
        "transform": "rotate("+deg+"deg)",
    });
};
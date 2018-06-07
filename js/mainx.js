/*global document, $, parseInt, window, console*/
$(document).ready(function () {

    var hasVideo = (!!document.createElement('video').canPlayType);
    var videoAspectRatio = 1080 / 1920;
    var video = $('.video-container video');
    if (hasVideo) {
        video.removeClass('hidden');
    }

    function scaleVideo() {

        var wHeight = $(window).height();
        var wWidth = $(window).width();

        if (wWidth > (wHeight / videoAspectRatio)) {
            var unitWidth = parseInt(wWidth) + 'px';
            video.css('width', unitWidth);
            var unitHeight = parseInt(wWidth * videoAspectRatio);
            video.css('height', unitHeight);

        } else {
            video.css('width', '');
            video.css('height', '');
        }
    }

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 57)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });


    if (hasVideo) {
        scaleVideo();

        $(window).on('resize', function () {
            scaleVideo();
        });
    }

    // Collapse Navbar
    var mainNav = $('#mainNav');
    var navbarCollapse = function () {
        if (mainNav.offset().top > 150) {
            if (!mainNav.hasClass("navbar-shrink")) {
                mainNav.fadeOut(function () {
                    mainNav.addClass("navbar-shrink");
                    mainNav.fadeIn();
                });
            }

        } else {
            if (mainNav.hasClass("navbar-shrink")) {
                mainNav.fadeOut(function () {
                    mainNav.removeClass("navbar-shrink");
                    mainNav.fadeIn();
                });
            }
        }
    };
    // Collapse now if page is not at top
    //navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(function () {
        console.log("scroll...");
        navbarCollapse();
    });


    function getUrlVars() {
        var vars = [],
            hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    var theParams = getUrlVars();

    if (theParams.success) {
        $(".form-float").fadeIn();
        setTimeout(function () {
            $(".form-float").fadeOut();
        }, 3000);
    }
    if (theParams.errors) {
        alert(theParams.errors);
    }


});
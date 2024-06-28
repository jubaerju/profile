(function($) {
    "use strict";

    /*================================================================= 
        pre loader 
    ==================================================================*/
    $('.js-preloader').preloadinator({
        animation: 'fadeOut',
        animationDuration: 1500
    });



    /*================================================================= 
        Isotope initialization 
    ==================================================================*/
    var $grid = $('.grid').isotope({
        // options
    });
    // layout Isotope after each image loads
    $grid.imagesLoaded().progress(function() {
        $grid.isotope('layout');
    });

    // filter items on button click
    $('.filter-button-group').on('click', 'button', function() {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({
            filter: filterValue
        });
    });

    /* checking active filter */
    // change is-checked class on buttons
    var buttonGroups = document.querySelectorAll('.button-group');
    for (var i = 0, len = buttonGroups.length; i < len; i++) {
        var buttonGroup = buttonGroups[i];
        radioButtonGroup(buttonGroup);
    }

    function radioButtonGroup(buttonGroup) {
        buttonGroup.addEventListener('click', function(event) {
            // only work with buttons
            if (!matchesSelector(event.target, 'button')) {
                return;
            }
            buttonGroup.querySelector('.active').classList.remove('active');
            event.target.classList.add('active');
        });
    }


    /*================================================================= 
        Testimonial carousel
    ==================================================================*/
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        breakpoints: {
            1200: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 1
            },
        },
        //slidesPerView: 3,
        spaceBetween: 24,
        loop: true,
        autoplay: {
            delay: 5000,
        },


        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },

    });


    /*================================================================= 
        Partner carousel
    ==================================================================*/
    const swiper2 = new Swiper('.partnerCarousel', {
        // Optional parameters
        breakpoints: {
            1200: {
                slidesPerView: 6,
            },
            992: {
                slidesPerView: 4,
            },
            576: {
                slidesPerView: 3
            },
            320: {
                slidesPerView: 2
            },
        },
        //slidesPerView: 6,
        spaceBetween: 24,
        loop: true,
        autoplay: {
            delay: 5000,
        },

    });


    /*================================================================= 
        Map
    ==================================================================*/
    var map = L.map('mapwrapper').setView([-37.817160, 144.955937], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    var greenIcon = L.icon({
        iconUrl: "image/location.png",

        iconSize: [48, 48], // size of the icon
    });

    L.marker([-37.817160, 144.955937], {
        icon: greenIcon
    }).addTo(map);



    /*================================================================= 
        Navbar fixed top
    ==================================================================*/
    $(document).ready(function() {

        var menu = $('.site-header nav');
        var origOffsetY = $('.hero-area').height();

        function scroll() {
            if ($(window).scrollTop() >= origOffsetY) {
                $('.site-header nav').addClass('fixed-top');

            } else {
                $('.site-header nav').removeClass('fixed-top');

            }
        }

        document.onscroll = scroll;

    });


    /*================================================================= 
        Contact form 
    ==================================================================*/
    $(function() {
        // Here is the form
        var form = $('#fungi-contact');

        // Getting the messages div
        var formMessages = $('.form-message p');


        // Setting up an event listener for the contact form
        $(form).submit(function(event) {
            // Stopping the browser to submit the form
            event.preventDefault();

            // Serializing the form data
            var formData = $(form).serialize();

            // Submitting the form using AJAX
            $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            }).done(function(response) {

                // Making the formMessages div to have the 'success' class
                $(formMessages).removeClass('error');
                $(formMessages).addClass('success');

                // Setting the message text
                $(formMessages).text(response);

                // Clearing the form after successful submission 
                $('#inputName').val('');
                $('#inputEmail').val('');
                $('#inputPhone').val('');
                $('#inputMessage').val('');
            }).fail(function(data) {

                // Making the formMessages div to have the 'error' class
                $(formMessages).removeClass('success');
                $(formMessages).addClass('error');

                // Setting the message text
                if (data.responseText !== '') {
                    $(formMessages).text(data.responseText);
                } else {
                    $(formMessages).text('Oops! An error occured and your message could not be sent.');
                }
            });

        });

    });

    /*================================================================= 
        Animating numbers
    ==================================================================*/
    $('.counter').counterUp({
        delay: 10,
        time: 3000
    });


    /*================================================================= 
        Progress bar animation
    ==================================================================*/
    var waypoint = new Waypoint({
        element: document.getElementById('skill-section'),
        handler: function() {
            $('.progress .progress-bar').css("width", function() {
                return $(this).attr("aria-valuenow") + "%";
            })
        },
        //offset: 'bottom-in-view',
        offset: 700,
    })


    /*================================================================= 
        Animate on scroll initialization
    ==================================================================*/
    AOS.init({
        once: true,
    });

})(jQuery);


// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed

$(document).ready(function() {
    AOS.init({
        // uncomment below for on-scroll animations to played only once
        // once: true  
    }); // initialize animate on scroll library
});

// Smooth scroll for links with hashes
$('a.smooth-scroll')
    .click(function(event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });



    // Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed

$(document).ready(function() {
    AOS.init({
        // uncomment below for on-scroll animations to played only once
        // once: true  
    }); // initialize animate on scroll library
});

// Smooth scroll for links with hashes
$('a.smooth-scroll')
    .click(function(event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });

            // $('.portfolio-item').isotope({
        //  	itemSelector: '.item',
        //  	layoutMode: 'fitRows'
        //  });
        $('.portfolio-menu ul li').click(function(){
            $('.portfolio-menu ul li').removeClass('active');
            $(this).addClass('active');
            
            var selector = $(this).attr('data-filter');
            $('.portfolio-item').isotope({
                filter:selector
            });
            return  false;
        });
        $(document).ready(function() {
        var popup_btn = $('.popup-btn');
        popup_btn.magnificPopup({
        type : 'image',
        gallery : {
            enabled : true
        }
        });
        });
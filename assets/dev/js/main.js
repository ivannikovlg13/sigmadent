(function ($) {

    'use strict';

    // Extend jQuery easings with easeOutCubic
    $.easing = Object.assign({}, $.easing, {
        easeInOutCubic: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        },
        easeInOutQuart: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        },
    })

    // $(document).bind('mousewheel', function (e) {
    //     const nt = $(document.body).scrollTop() - (e.deltaY * e.deltaFactor * 100);
    //     e.preventDefault();
    //     e.stopPropagation();
    //     $(document.body).stop().animate({
    //         scrollTop: nt
    //     }, 500, 'easeInOutCubic');
    // });

    function initMobMenu() {
        if (window.matchMedia('(max-width: 991px)').matches) {
            $('.header .navigation__sub').prependTo('.mobile__navi .top-nav');
            $('.mobile__navi .icon-svg-question').remove();
            $('.mobile__navi .btn__bordered').insertBefore('.mobile__navi .lang-menu');
            $('.header .navigation').appendTo('.mobile__navi .navi-wrapper');
            $('.section__hero .block__contacts').clone().appendTo('.mobile__navi .contacts-wrapper');
            $('.mobile__navi .contacts-wrapper > .col').appendTo('.mobile__navi .block__contacts');
            $('.section__trigger .reception-girl').wrap('<div class="reception-girl__wrapper" />');
            $('.section__footer-contacts').prependTo('.section__footer-copyright .copyright');
        }
        if (window.matchMedia('(min-width: 1200px)').matches) {
            $('.arrow-wrapper .icon-svg-btn-arrow-right').clone().appendTo('.arrow-wrapper');
        }
    }

    $(document).ready(function () {

        initMobMenu();

        $(window).bind('resize orientationchange', function () {
            initMobMenu();
            window.location.reload();
        });

        $('.btn__hamburger').on('click', function () {
            $('html').addClass('no-scroll');
            $('.mobile__navi').addClass('shown scroll-on');
        });

        $('.mobile__navi .btn__close').on('click', function () {
            $('html').removeClass('no-scroll');
            $('.mobile__navi').removeClass('shown scroll-on');
        });

        if ($('.navigation>ul>li').has('ul')) {
            $('.navigation>ul>li>ul').addClass('dropdown');
        }

        const dropdown = $('.navigation .dropdown');
        const dropdownLiA = dropdown.find('li>a');
        dropdown.each(function () {
            if (window.matchMedia('(min-width: 992px)').matches) {
                $(this).css('width', $(this).width() + 3);
            }
            $(this).parent('li').addClass('dropdown-container');
        });

        $('.mobile__navi .dropdown-container').each(function () {
            $(this).prepend('<button class="btn btn__dropdown"></button>');
        });

        $('.btn__dropdown').click(function () {
            $('.btn__dropdown').not(this).each(function () {
                $(this).removeClass('shown').parent().removeClass('shown').find('.dropdown').slideUp(500, 'easeInOutQuart');
            });
            $(this).toggleClass('shown').parent().toggleClass('shown').find('.dropdown').slideToggle(500, 'easeInOutQuart');
        });

        let maxWidth = 0;
        let widestA = null;
        let currentA;
        dropdownLiA.each(function () {
            currentA = $(this).parent();
            if (currentA.width() > maxWidth) {
                maxWidth = currentA.width();
                widestA = currentA;
                currentA.addClass('overflow');
            } else {
                currentA.removeClass('overflow');
            }
        });

        $('.header .navigation .dropdown-container').on('mouseover', function () {
            $(this).addClass('shown');
        }).on('mouseout', function () {
            $(this).removeClass('shown');
        });

        if ($(window).scrollTop() >= 10) {
            $('body').addClass('scrolled');
        }

        $(window).scroll(function () {
            let windowScrollTop = $(window).scrollTop();
            if (windowScrollTop >= 10) {
                $('body').addClass('scrolled');
            } else {
                $('body').removeClass('scrolled');
            }
        });
        $('.accordion__title').on('click', function () {
            if ($('.accordion__wrapper').hasClass('one')) {
                $('.accordion__title').not($(this)).removeClass('active');
                $('.accordion__text').not($(this).next()).slideUp(350);
            }
            $(this).toggleClass('active').next().slideToggle(350);


        })
    });

})(jQuery);
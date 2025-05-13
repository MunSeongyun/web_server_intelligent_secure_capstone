$(function () {
    //Pop Up
    $(".conTop>a, .conBottom>button").click(function (){
        $(".popup").css("display","none");
    })

    // Main Banner
    var showBanner = 0;
    //첫번째 배너를 복사하여 배너의 마지막에 붙이기
    var obj = $(".banner>.b1").clone();
    $(".banner").append(obj);

    //배너이동와 버튼 변경
    function moveBanner() {
        $(".banner").stop().animate({
            marginLeft: -showBanner * 100 + "%"
        }, 700)
    }

    //오른쪽 버튼을 클릭하면
    $(".rightBtn").click(function () {
        console.log(showBanner);

        if (showBanner == 4) {
            showBanner = 0;
            $(".banner").css("margin-left", 0);
        }
        showBanner++;
        moveBanner();
    })

    //왼쪽 버튼을 클릭하면
    $(".leftBtn").click(function () {
        if (showBanner == 0) {
            showBanner = 4;
            $(".banner").css("margin-left", -100 * showBanner + "%")
        }
        showBanner--;
        moveBanner();
    })

    //자동으로 배너가 움직이도록
    var time = setInterval(function () {
        $(".rightBtn").trigger("click");
    }, 4000)

    //playStop을 클릭하면
    //베너가 멈추도록
    //addClass주기
    $(".playStop").click(function () {
        if ($(this).hasClass("on")) {
            time = setInterval(function () {
                $(".rightBtn").trigger("click");
            }, 4000)
            $(this).removeClass("on");
        } else {
            $(this).addClass("on");
            clearInterval(time);
        }
    })

    // 배너에 마우스 mouseenter, mouseleave 시에 움직임 멈춤
    $("#mainBanner>.banner").on({
        "mouseenter": function () {
            clearInterval(time);
        },
        "mouseleave": function () {
            time = setInterval(() => {
                $(".rightBtn").trigger("click");
            }, 4000);
        }
    })

    // Mobile Nav
    $(".ham").click(function () {
        $(this).toggleClass("active");
        if ($(".ham").hasClass("active")) {
            $("#mNav").stop().animate({
                left: 0
            }, 700);
        }
        else {
            $("#mNav").stop().animate({
                left: "-100%"
            }, 700);
        }
    });
    $(".mNav>li").click(function () {
        $(this).children(".sub").stop().slideToggle(500)
        $(this).siblings("li").children(".sub").stop().slideUp(500);

    })
    $(".mNav>li>.temp").click(function () {
        $(this).toggleClass("mobileActive")
        .siblings().removeClass("mobileActive");
    })

    //QuickMenu Scroll Event
    var quickMenu = $('.quickFixed');
    var quickTop = 400;

    quickMenu.css('top', $(window).height());
    $(document).ready(function () {
        quickMenu.animate({ "top": $(document).scrollTop() + quickTop + "px" }, 500);
        $(window).scroll(function () {
            quickMenu.stop();
            quickMenu.animate({ "top": $(document).scrollTop() + quickTop + "px" }, 500);
        });
    });

    // Up Button Slide
    $(".upBtn").click(function(){
        $("html").animate({
            "scrollTop": 0
        },700);
    })

});

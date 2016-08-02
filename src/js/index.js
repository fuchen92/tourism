$(document).ready(function () {
    $(window).one("scroll", function () {
        alert("温馨提示：本网页不支持低版本浏览器，请使用火狐谷歌或Edge浏览器浏览本网页");
    });
    /* 滚动屏幕 */
    var idx = 0, canSwitch = true;
    var oWinwidth = $(window).width();
    var oWinheight = $(window).height();

    setTimeout(function () {
        $("html, body").scrollTop(0);
    }, 100);

    $(window).scroll(function () {
        var top = $(document).scrollTop();
        if (top > 1) {
            $("#logo").css("display", "none");
            $("header").css("background", "transparent");
        } else {
            $("#logo").css("display", "inline-block");
            $("header").css("background", "#fff");
        }
    });
    // 定义判断鼠标向上还是向下滑动的函数
    function scrollFun (e) {
        var direct = null;      // 方向标识
        var ev = window.event || arguments[0];
        if (e.wheelDelta) {
            /* IE/Opera/Chrome中，如果wheelDelta > 0,则向上滚动，否则向下 */
            direct = e.wheelDelta > 0 ? "up" : "down";
        } else if (e.detail) {
            /* 火狐中，如果detail > 0,则向下滚动，否则向上，与Chrome相反 */
            direct = e.detail > 0 ? "down" : "up";
        }
        pageSwitch(direct);
    }
    // 给页面绑定鼠标滑轮滚动事件（火狐）
    if (document.addEventListener) {
        document.addEventListener("DOMMouseScroll", scrollFun, false);
    }
    // 滚动滑轮出发scrollFun方法
    window.onmousewheel = scrollFun;

    // 页面切换
    function pageSwitch (direct) {
        if (direct == "up") {
            pageUp();
        } else if (direct == "down") {
            pageDown();
        }
    }
    function pageDown () {
        if (canSwitch) {
            canSwitch = false;
            idx++;

            if (idx > 8) {
                idx = 8;
                canSwitch = true;
                return false;
            }
            pageNow(idx);
        }
    }
    function pageUp () {
        if (canSwitch) {
            canSwitch = false;
            idx--;

            if (idx < 0) {
                idx = 0;
                canSwitch = true;
                return false;
            }
            pageNow(idx);
        }
    }
    // 当前屏的效果
    function pageNow (idx) {
        $(".side_item").eq(idx).addClass("active").siblings().removeClass("active");
        $("html, body").stop().animate({ scrollTop: idx * oWinheight }, 600, function () { canSwitch = true; });
        switch (idx) {
            case 1:
                $(".intro_item").addClass("hide");
                showIntro(0);
                showIntro(1);
                showIntro(2);
                break;
            case 2:
                showFeel();
                break;
            case 3:
                $(".schedule_item").addClass("hide");
                showSchedule(0);
                showSchedule(1);
                showSchedule(2);
                showSchedule(3);
                showSchedule(4);
                showSchedule(5);
                break;
            case 4:
                $(".reward_item").addClass("hide");
                showReward(0);
                showReward(1);
                break;
            case 5:
                $(".judge_item").addClass("hide");
                showJudge(0);
                showJudge(1);
                showJudge(2);
                break;
            case 6:
                $(".partner_logo").addClass("hide");
                showPartner(0);
                showPartner(1);
                setTimeout(function () {
                    showPartner(2);
                    showPartner(3);
                }, 200);
                setTimeout(function () {
                    showPartner(4);
                }, 200);
                break;
            case 8:
                $(".map_container").addClass("hide");
                showMap();
                break;
        }
    }
    // Intro部分
    function showIntro (num) {
        setTimeout(function () {
            $(".intro_item").eq(num).addClass("intro_animate");
            $(".intro_item").eq(num).on("animationend webkitAnimationEnd mozAnimationEnd", function () {
                $(this).removeClass("intro_animate hide");
            });
        }, (num + 1) * 200);
    }
    // Feel部分视频和文字
    function showFeel () {
        $(".feel_video").addClass("feel_video_animate");
        $(".feel_video").on("animationend webkitAnimationEnd mozAnimationEnd", function () {
            $(this).removeClass("feel_video_animate");
        });
        $(".feel_text").addClass("feel_text_animate").on("animationend webkitAnimationEnd mozAnimationEnd", function () {
            $(this).removeClass("feel_text_animate");
        });
    }
    // Schedule部分
    function showSchedule (num) {
        setTimeout(function () {
            $(".schedule_item").eq(num).addClass("schedule_item_animate");
            $(".schedule_item").eq(num).on("animationend webkitAnimationEnd mozAnimationEnd", function () {
                $(this).removeClass("schedule_item_animate hide");
            });
        }, (num + 1) * 200);

    }
    // Reward部分
    function showReward (num) {
        setTimeout(function () {
            $(".reward_item").eq(num).addClass("reward_animate");
            $(".reward_item").eq(num).on("animationend webkitAnimationEnd mozAnimationEnd", function () {
                $(this).removeClass("hide reward_animate");
            });
        }, (num + 1) *200);
    }
    // 评委 Judge部分
    function showJudge (num) {
        setTimeout(function () {
            $(".judge_item").eq(num).addClass("judge_item_animate");
            $(".judge_item").eq(num).on("animationend webkitAnimationEnd mozAnimationEnd", function () {
                $(this).removeClass("hide judge_item_animate");
            });
        }, (num + 1) * 200);
    }
    // 主办方 合作伙伴 Partner
    function showPartner (num) {
        setTimeout(function () {
            $(".partner_logo").eq(num).addClass("partner_logo_animate");
            $(".partner_logo").eq(num).on("animationend webkitAnimationEnd mozAnimationEnd", function () {
                $(this).removeClass("partner_logo_animate hide");
            });
        }, (num + 1) *200);
    }
    // Map
    function showMap () {
        setTimeout(function () {
            $(".map_container").addClass("map_animate").on("animationend webkitAnimationEnd mozAnimationEnd", function () {
                $(this).removeClass("map_animate hide");
            });
        }, 200);
    }

    /* 侧边栏导航 */
    $(".side_item").click(function () {
        idx = $(this).index();
        pageNow(idx);
    });

    /* 汉堡菜单 */
    $(".hamburger").click(function () {
        if ($(this).hasClass("ham_click")) {
            $(this).removeClass("ham_click");
            $(".nav_mask").removeClass("mask_active");
        } else {
            $(this).addClass("ham_click");
            $(".nav_mask").addClass("mask_active");
        }
    });

    /* 感受部分轮播 */
    var index = 0, timer = null;
    if (oWinwidth > 640) {
        $(".feel_dots span").hover(function () {
            clearInterval(timer);
            index = $(this).index();
            $(this).addClass("active").siblings().removeClass("active");
            $(".feel_item").eq(index).fadeIn(500).siblings().removeClass("active").fadeOut();
        }, function () {
            auto();
        });
        auto();
    }
    // 自动轮播
    function auto () {
        timer = setInterval(function () {
            index++;
            if (index > 3) { index = 0; }
            $(".feel_dots span").eq(index).addClass("active").siblings().removeClass("active");
            $(".feel_item").eq(index).fadeIn(500).siblings().removeClass("active").fadeOut(500);
        }, 3000);
    }
    // 视频播放
    var canPlay = true;
    $("#feelVideo").bind({
        click : function () {
            if (canPlay) {
                $(".video_bg").css("display", "none");
                document.getElementById("feelVideo").play();
                canPlay = false;
            } else {
                document.getElementById("feelVideo").pause();
                canPlay = true;
            }
        }
    });
    /* 日程安排 */
    if (oWinwidth < 640) {
        $(".schedule_details").unbind("click");
    } else {
        $(".schedule_details").click(function () {
            var schedule_arrow = $(this).children(".icon_more");
            if (schedule_arrow.hasClass("icon_click")) {
                schedule_arrow.removeClass("icon_click");
                $(this).next(".schedule_time").slideUp();
            } else {
                schedule_arrow.addClass("icon_click");
                $(this).next().slideDown();
                $(this).parent().siblings().find(".icon_more").removeClass("icon_click");
                $(this).parent().siblings().find(".schedule_time").slideUp();
            }
        });
    }


    /* 联系我们 */
    $(".lianxi").click(function () {
        $(".hamburger").removeClass("ham_click");
        $(".nav_mask").removeClass("mask_active");
        idx = 8;
        pageNow(idx);
    });

    /* 评委简介 */
    $(".judge_photo").click(function () {
        var index = $(this).parent().index();
        $(".infomation_item").eq(index).addClass("active").siblings().removeClass("active");
        $(".judge_infomation").animate({ top : 0 }, 400);
    });
    $(".judge_close").bind("click", function () {
        $(".judge_infomation").animate({ top : "-100%" }, 400);
    });
});

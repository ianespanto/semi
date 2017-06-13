"use strict";function scrollTop(){return document.documentElement.scrollTop||document.body.scrollTop}function hasScrolled(){var e=scrollTop();animatedElems.length>0&&showAnimatedElem(e),lastScrollTop=e}function showAnimatedElem(e){var o=void 0;[].slice.call(animatedElems).forEach(function(t){var n=Math.min(t.clientHeight/2,300);o=viewport().height+e-getOffsetTop(t),o>=n?t.classList.add("in-view"):o<=0&&t.classList.contains("in-view")&&t.classList.remove("in-view")})}function viewport(){var e=window,o="inner";return"innerWidth"in window||(o="client",e=document.documentElement||document.body),{width:e[o+"Width"],height:e[o+"Height"]}}function getOffsetTop(e){var o=0;do{isNaN(e.offsetTop)||(o+=e.offsetTop)}while(e=e.offsetParent);return o}function scrollTo(e,o){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:600,n=scrollTop(),l=o-n,i=0;!function e(){i+=5;var o=Math.easeInOutQuad(i,n,l,t);document.documentElement.scrollTop=o,document.body.scrollTop=o,i<t&&setTimeout(e,5)}()}var animatedElems=document.querySelectorAll(".animated"),didScroll=!1,lastScrollTop=0;if(window.onpageshow=function(e){e.persisted&&location.reload()},window.addEventListener("scroll",function(){didScroll=!0}),window.addEventListener("resize",function(){showAnimatedElem(scrollTop())}),setInterval(function(){didScroll&&(hasScrolled(),didScroll=!1)},100),animatedElems.length>0&&showAnimatedElem(scrollTop()),null!=document.querySelector(".home")){var arrow=document.querySelector(".down-arrow");arrow.onclick=function(){var e=getOffsetTop(document.querySelector(".home__partners"));scrollTo(document,e)}}Math.easeInOutQuad=function(e,o,t,n){return(e/=n/2)<1?t/2*e*e+o:(e--,-t/2*(e*(e-2)-1)+o)};
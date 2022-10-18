
feather.replace()
// AOS 

// 

function getParamer(param=''){
  let url_string = window.location.href;
  let url = new URL(url_string);
  let paramer = url.searchParams.get(param);
  return paramer;
}


$(document).ready(function () {

  // loading loading
  const loading = $('#loading-web');
  setTimeout( function(){
   loading.css('display', 'none');
 },1200 )
  AOS.init();

  var swiper = new Swiper(".bannerSwiper",
  {

    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    loop: true,
    effect: "fade",
    navigation: {
      nextEl: ".banner-button-next",
      prevEl: ".banner-button-prev",
    },
  } );

});
  // check scroll
  let lastScrollTop = 10;
  const header_ = $('header');
  $(window).scroll(function(event){
    const window_w = window.innerWidth;

    if(window_w > 992){
      let st = $(this).scrollTop();
      if (st > lastScrollTop){
       header_.css({
         background: '#ffffffe6',
         transition: '0.5s',
         "box-shadow": "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
         "backdrop-filter": "blur(5px)"
       });
     } else {
       header_.css({
         background: '#f1f1f100',
         transition: '0.5s',
         "box-shadow": 'none',
         "backdrop-filter": "none"
       });
     }
   }

 });
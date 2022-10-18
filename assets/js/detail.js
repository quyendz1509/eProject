
$(document).ready(function() {
     // lấy dữ liệu về
     let id = getParamer('id');
     getDetailProduct(id);
     async function getDetailProduct(id){
        let url = `http://localhost:3000/products?id=${id}`;
        let res = await fetch(url);
        let data = await res.json();
        let detailWraper = $('.detailSwiper .swiper-wrapper');
        let detail_thumb_Wraper = $('.mySwiperThumber .swiper-wrapper');
        let title = $('.text-title-load'); // title
        let price = $('.detail-price-load');
        let description = $('.description-load');
        let size = $('#size-detail');
        let smalldes = $('.small-des');
        let noidung = '';
        let typerload = $('#typer-load');
        let price_handle = ( data[0].sale == 1 ) ? `<strong class="text-custom-danger">$${new Intl.NumberFormat().format(data[0].salePrice)}</strong> - <strong class="text-decoration-line-through">$${new Intl.NumberFormat().format(data[0].price)}</strong>` : `<strong class="text-custom-primary">$${new Intl.NumberFormat().format(data[0].price)}</strong>`;
        let typer = ( data[0].type == 'hot' ) ? `<span class='badge bg-danger' style="z-index:1;">HOT</span>` : `<span class='badge bg-primary position-absolute' style="z-index:1;">NEW</span>`;

        data[0].images_list.map( (res)=>{
            noidung += ` <div class="swiper-slide">
            <img src="${res}" alt="Madam’s Boutique" />
            </div>`;
        } )
        // load typer
        typerload.html(typer);
        // small des
        smalldes.html( data[0].smalldes);
        // big image
        detailWraper.html(noidung);
        // title
        title.html( data[0].name );
        // price
        price.html(`${price_handle}` );
        // descript
        description.html( data[0].description);
            // thumbnail
            detail_thumb_Wraper.html(noidung);
        // size
        data[0].sizing.map( (res)=>{
            size.append(`<option value="${res}">${res.toUpperCase()}</option>`);
        } )
        // recall swipper
        let swiper_thumb_re =  new Swiper(".mySwiperThumber", {
           loop: true,
           slidesPerView: 4,
           freeMode: true,
           watchSlidesProgress: true,
       });
        new Swiper(".detailSwiper", {
         lazy: true,
         loop: true,
         navigation: {
          nextEl: ".carou-button-next",
          prevEl: ".carou-button-prev",
      },
      thumbs: {
          swiper: swiper_thumb_re,
      },
  });

    }

});
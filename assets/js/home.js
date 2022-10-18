  const cate_sec = $('#load-data-categories');
  const recomd_sec = $('#load-data-recommend');
  const sale_sec = $('#load-data-sale');
  const newarrival_sec =$('#load-data-newarrival');
// Load dữ liệu về 
$.ajax({
  url: 'http://localhost:3000/categories',
  type: 'GET'
})
.done(function(res) {
    let noidung = ``; // khởi tạo biến nội dung trước
// Chạy vòng lặp
res.map( (value)=>{
  noidung += (`
    <div class="col-3 col-md-3 col-lg-3 col-xl-3 mb-3 animate__fadeIn animate__animated ">
    <a href="./categories.html?ctrl=${value['slug']}" class="link-categogries">
    <div class="img-card">
    <img src="${value['images']}" width="100%" alt="${value['title']}">
    </div>
    <h6 class="m-0 text-center">${value['title']}</h6>
    </a>             
    </div>

    `);

});

let noidungform = `<div class="container">
<div class="row">
${noidung}
</div>
</div>`; // khung nội dung

cate_sec.html(noidungform); // load nội dung
}).fail(function() {
  alert("Không thể kết nối tới server");
});
  // Load dữ liệu về sản phẩm Sale
  $.ajax({
    url: 'http://localhost:3000/products?sale=1&_limit=7',
    type: 'GET'
  })
  .done(function(res) {
    let noidung = `  <div class="col-12 col-lg-5 mb-3">
    <div class="card-custom">
    <div class="card-custom-wishlist">
    <button><i data-feather='heart'></i></button>
    <button class="btn-add-to-cart" data-id="${res[0]['id']}"><i data-feather='shopping-cart'></i></button>

    </div>
    <a href="./detail.html?id=${res[0]['id']}">
    <div class="card-custom-img">
    <img src="${res[0]['images']}" width="100%" alt="${res[0]['name']}">
    </div>
    <div class="card-custom-content newa-content">
    <h3 class="fw-bold m-0">${res[0]['name']}</h3>
    <p class="m-0">${res[0]['smalldes']}</p>
    </div>
    </a>
    </div>
        </div>`; // khởi tạo biến nội dung trước
        let noidung2 = ``;
// Chạy vòng lặp
for (var i = 1; i < res.length; i++) {
  noidung2 += `   <!-- item -->
  <div class="col-6 col-lg-4 mb-4">
  <div class="card-custom">
  <div class="card-custom-wishlist">
  <button><i data-feather='heart'></i></button>
  <button class="btn-add-to-cart" data-id="${res[i]['id']}"><i data-feather='shopping-cart'></i></button>

  </div>
  <a href="./detail.html?id=${res[i]['id']}">
  <div class="card-custom-img">
  <img src="${res[i]['images']}" width="100%" alt="${res[i]['name']}">
  </div>
  <div class="card-custom-content newa-content">
  <h6 class="fw-bold m-0">${res[i]['name']}</h6>
  <span>Sale</span>
  <p class="m-0 fw-bold fs-6"><strong class="text-danger">$${new Intl.NumberFormat().format(res[i]['salePrice'])}</strong> - <strong class="text-decoration-line-through">$${new Intl.NumberFormat().format(res[i]['salePrice'])}</strong></p>
  </div>
  </a>
  </div>
  </div>
  <!-- end -->`; 
}

let noidungform = `<div class="container">
<div class="row">
${noidung}
<div class="col-12 col-lg-7">
<div class="row">
${noidung2}
<div class="col-12">
<a href="./categories.html" class="btn-custom-primary w-100 d-block text-center text-uppercase btn-custom-hover">View More Sale Product</a>
</div>
</div>
</div>
</div>
</div>`; // khung nội dung

sale_sec.html(noidungform); // load nội dung
}).fail(function() {
  alert("Không thể kết nối tới server");
});
 //Kết thúc load SALE
 //
 // Load dữ liệu về sản phẩm New Arrival
 $.ajax({
  url: 'http://localhost:3000/products?type=new&_limit=7&_order=asc&_sort=id',
  type: 'GET'
})
 .done(function(res) {
  let noidung = `  <div class="col-12 col-lg-5 mb-3">
  <div class="card-custom">
  <div class="card-custom-wishlist">
  <button><i data-feather='heart'></i></button>
  <button class="btn-add-to-cart" data-id="${res[0]['id']}"><i data-feather='shopping-cart'></i></button>

  </div>
  <a href="./detail.html?id=${res[0]['id']}">
  <div class="card-custom-img">
  <img src="${res[0]['images']}" width="100%" alt="${res[0]['name']}">
  </div>
  <div class="card-custom-content newa-content">
  <h3 class="fw-bold m-0">${res[0]['name']}</h3>
  <p class="m-0">${res[0]['smalldes']}</p>
  </div>
  </a>
  </div>
        </div>`; // khởi tạo biến nội dung trước
        let noidung2 = ``;
// Chạy vòng lặp
for (var i = 1; i < res.length; i++) {
  noidung2 += `   <!-- item -->
  <div class="col-6 col-lg-4 mb-4">
  <div class="card-custom">
  <div class="card-custom-wishlist">
  <button><i data-feather='heart'></i></button>
  <button class="btn-add-to-cart" data-id="${res[i]['id']}"><i data-feather='shopping-cart'></i></button>

  </div>
  <a href="./detail.html?id=${res[i]['id']}">
  <div class="card-custom-img">
  <img src="${res[i]['images']}" width="100%" alt="${res[i]['name']}">
  </div>
  <div class="card-custom-content newa-content">
  <h6 class="fw-bold m-0">${res[i]['name']}</h6>
  <span>New</span>
  <p class="m-0 fw-bold fs-6"><strong>$${new Intl.NumberFormat().format(res[i]['salePrice'])}</strong></p>
  </div>
  </a>
  </div>
  </div>
  <!-- end -->`; 
}

let noidungform = `<div class="container">
<div class="row">
${noidung}
<div class="col-12 col-lg-7">
<div class="row">
${noidung2}
<div class="col-12">
<a href="./categories.html" class="btn-custom-primary w-100 d-block text-center text-uppercase btn-custom-hover">View More NEW ARRIVALS</a>
</div>
</div>
</div>
</div>
</div>`; // khung nội dung

newarrival_sec.html(noidungform); // load nội dung
}).fail(function() {
  alert("Không thể kết nối tới server");
});
 //Kết thúc load SALE
  // Load dữ liệu recomand
  $.ajax({
    url: 'http://localhost:3000/products?recommended=true',
    type: 'GET'
  })
  .done(function(res) {
    let noidung = ``; // khởi tạo biến nội dung trước
// Chạy vòng lặp
res.map( (value)=>{
  noidung += (` <!-- item -->
   <div class="swiper-slide">
   <div class="card-custom">
   <div class="card-custom-wishlist">
   <button><i data-feather='heart'></i></button>
   <button class="btn-add-to-cart" data-id="${value['id']}"> <i data-feather="shopping-cart"></i></button>
   </div>
   <a href="./detail.html?id=${value['id']}">
   <div class="card-custom-img">
   <img src="${value['images']}" width="100%" alt="${value['name']}">
   </div>
   <div class="card-custom-content">
   <h3 class="fs-6 mb-1">${value['name']}</h3>
   <strong class="fs-5">$ ${new Intl.NumberFormat().format(value['price'])}</strong>
   </div>
   </a>
   </div>
   </div>
   <!-- item -->`);

});

let noidungform = `
<div class="container">
<div class="swiper forYouSwiper">
<div class="swiper-wrapper">
${noidung}
</div>
<div class="recomend-button-next button-next button-slider-nav"><i data-feather="chevron-right"></i></div>
<div class="recomend-button-prev button-prev button-slider-nav"><i data-feather="chevron-left"></i></div>
</div>
</div>`; // khung nội dung

recomd_sec.html(noidungform); // load nội dung
feather.replace();
var swiper2 = new Swiper(".forYouSwiper", {
 watchSlidesProgress: true,
 slidesPerView: 2,
 spaceBetween: 10,
 navigation: {
  nextEl: ".recomend-button-next",
  prevEl: ".recomend-button-prev",
},
breakpoints: {

  768: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  1024: {
    slidesPerView: 4,
    spaceBetween: 30,
  },
},
});
}).fail(function() {
  alert("Không thể kết nối tới server");
});
// ------------------------------------ ///

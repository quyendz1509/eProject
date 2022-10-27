$(document).ready(function () {
  $("#sizing-search")
    .find('input[type="checkbox"]')
    .on("change", function () {
      $("#sizing-search")
        .find('input[type="checkbox"]')
        .not(this)
        .prop("checked", false);
    });
  $("#type-search")
    .find('input[type="checkbox"]')
    .on("change", function () {
      $("#type-search")
        .find('input[type="checkbox"]')
        .not(this)
        .prop("checked", false);
    });
  const list_item_cate = $("#list-item-cate");

  let url_cate = `http://localhost:3000/categories`;
  loadCate(url_cate, list_item_cate);
  // load dữ liệu về
  async function loadCate(url_cate, ul_item) {
    let test = getParamer("ctrl");
    let res = await fetch(url_cate);
    let data = await res.json();
    let noidung = ` <li class="nav-item me-1 mb-1">
		<button class="item-cate-cart ${
      test == null || test == "" ? "active" : ""
    }" data-slug="">All</button>
		</li>`;
    data.map(function (elem) {
      noidung += ` <li class="nav-item me-1 mb-1">
			<button class="item-cate-cart ${
        elem.slug == test ? "active" : ""
      }" data-slug="${elem.slug}">${elem.title}</button>
			</li>`;
    });
    ul_item.html(noidung);
  }
  /////
  loadProductCate(getParamer("ctrl"));
  ////
  function template(data) {
    let html = "";
    data.map((element) => {
      let sizer = element.sizing;
      let sizer_vl = "Size: ";
      sizer.map((vaizer) => {
        sizer_vl += `<span class="me-2 badge border text-dark text-uppercase">${vaizer}</span>`;
      });
      sizer_vl += "";
      let price =
        element.sale == 1
          ? `<strong class="text-custom-danger">$${new Intl.NumberFormat().format(
              element.salePrice
            )}</strong> - <strong class="text-decoration-line-through">$${new Intl.NumberFormat().format(
              element.price
            )}</strong>`
          : `<strong class="text-custom-primary">$${new Intl.NumberFormat().format(
              element.price
            )}</strong>`;
      let typer =
        element.type == "hot"
          ? `<span class='badge bg-danger position-absolute start-0 top-0' style="z-index:1;">HOT</span>`
          : `<span class='start-0 top-0 badge bg-primary position-absolute' style="z-index:1;">NEW</span>`;
      html += `
			<div class="col-6 col-lg-4 mb-4">
			<!-- item -->
			<div class="card-custom position-relative">
			${typer}
			<div class="card-custom-wishlist">
			<button class="btn-add-to-cart" data-id="${element.id}"><i data-feather='shopping-cart'></i></button>

			</div>
			
			<div class="card-custom-img">
			<a href="./detail.html?id=${element.id}"><img src="${element.images}" width="100%" alt="${element.name}"></a>
			<button class="compare" data-id="${element.id}">Compare</button>
			</div>
			<div class="card-custom-content newa-content">
			<a href="./detail.html?id=${element.id}"><h6 class="fw-bold m-0">${element.name}</h6></a>
			<span>${element.categories} -  ${element.type}</span>
			<p class="m-0"> ${sizer_vl}</p>
			<p class="m-0 fw-bold fs-5">${price}</p>
			</div>
			
			</div>

			<!-- end -->
			</div>
			`;
    });
    return html;
  }
  //  check click search
  async function loadProductCate(
    slug = null,
    name = null,
    sizing = null,
    type = null
  ) {
    let test_slug = slug != "" && slug != null ? `?categories=${slug}` : ""; // kiểm tra slug
    let test_name =
      name != "" && name != null
        ? `${test_slug == "" ? "?" : "&"}name_like=${name}`
        : ""; // kiểm tra slug
    let test_sizing =
      sizing != null
        ? `${
            test_slug == "" && test_name == "" ? "?" : "&"
          }sizing_like=${sizing}`
        : ""; // kiểm tra slug
    let test_type =
      type != null
        ? `${
            test_slug == "" && test_sizing == "" && test_name == "" ? "?" : "&"
          }type=${type}`
        : ""; // kiểm tra slug

    url = `http://localhost:3000/products${test_slug}${test_name}${test_sizing}${test_type}`;
    let total = await fetch(url);
    let dataer = await total.json();
    $("#pagination-product").pagination({
      dataSource: dataer,
      locator: "items",
      pageSize: 9,
      totalNumber: dataer.length,
      callback: function (data, pagination) {
        let pageStart = (pagination.pageNumber - 1) * pagination.pageSize;
        let pageEnd = pageStart + pagination.pageSize;
        let pageItems = dataer.slice(pageStart, pageEnd);
        let html = template(pageItems);
        $("#product-incate").html(html);
        feather.replace();
      },
    });
  }
  // check clikc search cate
  $("#list-item-cate").on("click", "li>button", function (event) {
    event.preventDefault();
    /* Act on the event */
    let noidung = $("#search-form input").val();
    let slug = $(this).data("slug");
    let sizing_checked = $("#sizing-search").find("input:checked").data("size");
    let type_checked = $("#type-search").find("input:checked").data("type");
    $("#list-item-cate").find("li>button").removeClass("active");
    $(this).addClass("active");
    loadProductCate(slug, noidung, sizing_checked, type_checked);
  });
  // find by size
  $("#sizing-search").on("click", "input", function (event) {
    /* Act on the event */
    let isChecked = $(this).is(":checked");
    let size = $(this).data("size");
    let size_send = isChecked ? size : null;
    let type_checked = $("#type-search").find("input:checked").data("type");
    let slug = $("#list-item-cate li>button.active").data("slug");
    let noidung = $("#search-form input").val();
    loadProductCate(slug, noidung, size_send, type_checked);
  });
  // find by size
  $("#type-search").on("click", "input", function (event) {
    /* Act on the event */
    let isChecked = $(this).is(":checked");
    let type = $(this).data("type");
    let type_send = isChecked ? type : null;
    let size_checked = $("#sizing-search").find("input:checked").data("size");
    let slug = $("#list-item-cate li>button.active").data("slug");
    let noidung = $("#search-form input").val();

    loadProductCate(slug, noidung, size_checked, type_send);
  });
  // search name
  $("#search-form input").keyup(function (event) {
    /* Act on the event */
    let noidung = $(this).val();
    let sizing_checked = $("#sizing-search").find("input:checked").data("size");
    let type_checked = $("#type-search").find("input:checked").data("type");
    let slug = $("#list-item-cate li>button.active").data("slug");
    loadProductCate(slug, noidung, sizing_checked, type_checked);
  });
  // compare add
  let compare = [];
  let compare_value_render = $("#compare-mini");
  let compare_value_render_large = $("#compare-large");

  $("#product-incate").on("click", ".compare", function (event) {
    event.preventDefault();
    /* Act on the event */
    let id = $(this).data("id");
    let test = callProductId(id);
    // fetdata
    test.then((val) => {
      if (compare.length > 1) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "You can only add up to 2 products.",
          showConfirmButton: true,
          confirmButtonColor: "#7c3aed",
        });
      } else {
        compare.push(val); // đưa dữ liệu vào mảng tạm thời
        renderCompare(compare, compare_value_render);
      }
    });

    // fetch data
  });

  let renderCompare = (compare, compare_value_render) => {
    if (compare.length < 1) {
      compare_value_render.html("");
    } else {
      let noidung = `<div class="container">
			<div class="row pt-3 pb-3">
			<div class="col-3"></div>
			<div class="col-6">
			<div class="row">
			`;

      compare.map((valer, index) => {
        noidung += `<div class="col-6 text-center">
				<div class="item-compare">
				<img src="${valer.images}" width='100%' class="card-img-top rounded-3 shadow-sm" alt="${valer.name}">
				<button data-index="${index}"><i data-feather="x-circle"></i></button>
				</div>
				</div>

				`;
      });
      noidung += `
			</div>
			</div>
			<div class="col-3"></div>
			<div class="col-12 mt-3 text-center">
			<button class="btn-custom-primary compare-submit">Compare</button>
			</div>
			</div></div>`;
      compare_value_render.html(noidung);
      feather.replace();
    }
  };

  let renderCompareLarge = (compare, compare_value_render) => {
    if (compare.length < 1) {
      compare_value_render.html("");
    } else {
      let noidung = `
			<div class="container-fluid">
			<div class="row pt-3 pb-3">

			<div class="col-12">
			<div class="item-compare-large card">
			<div class="card-header">
			<div class="d-flex justify-content-between align-items-center">
			<h6 class="m-0">Product Comparision</h6>
			<button class="btn-close-danger close-compare"><i data-feather="x"></i></button>
			</div>
			</div>
			<div class="card-body pt-3 pb-3 table-responsive">
			<table class="table table-bordered w-100">
			<tr></tr>
			`;
      const propertyNames = Object.keys(compare[0]);

      propertyNames.map((val_1, key) => {
        switch (val_1) {
          case "images_list":
            noidung += "";
            break;
          case "description":
            noidung += "";
            break;
          case "recommended":
            noidung += "";

            break;
          case "sale":
            noidung += "";

            break;
          case "smalldes":
            noidung += "";
            break;
          default:
            noidung += `<tr>
					<th>${val_1}</th>
					`;
            // chạy vòng lặp sản phẩm
            compare.map((val_2) => {
              const tester = Object.values(val_2);
              if (val_1 == "images") {
                noidung += `<td><img src="${tester[key]}" width="120px"alt="Madam's Boutique"></td>`;
              } else if (val_1 == "price" || val_1 == "salePrice") {
                noidung += `<td>$${new Intl.NumberFormat().format(
                  tester[key]
                )}</td>`;
              } else if (val_1 == "type") {
                noidung += `<td>${
                  tester[key] == "hot"
                    ? '<span class="badge bg-danger">HOT</span>'
                    : '<span class="badge bg-primary">NEW</span>'
                }</td>`;
              } else if (val_1 == "sizing") {
                noidung += `<td>`;
                tester[key].map((sz) => {
                  noidung += `<span class='me-2 badge border text-dark text-uppercase'>${sz}</span>`;
                });
                noidung += `</td>`;
              } else {
                noidung += `<td>${tester[key]}</td>`;
              }
            });

            noidung += `</tr>`;
            break;
        }
      });

      noidung += `
			</table>
			</div>
			</div>
			</div>
			</div>
			</div>`;
      compare_value_render.html(noidung);
      feather.replace();
    }
  };
  let callProductId = async (id) => {
    let url = "http://localhost:3000/products/" + id;
    let res = await fetch(url);
    let datab = await res.json();
    return datab;
  };
  // remove compare
  $("#compare-mini").on("click", ".item-compare button", function (event) {
    event.preventDefault();
    /* Act on the event */
    let indexer = $(this).data("index");
    compare.splice(indexer, 1);
    renderCompare(compare, compare_value_render);
  });
  $("#compare-mini").on("click", ".compare-submit", function (event) {
    event.preventDefault();
    if (compare.length < 2) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "You need add 2 product to compare.",
        showConfirmButton: true,
        confirmButtonColor: "#7c3aed",
      });
    } else {
      renderCompareLarge(compare, compare_value_render_large);
      compare_value_render_large.slideDown("500");
    }
  });
  $("#compare-large").on("click", ".close-compare", function (event) {
    event.preventDefault();
    /* Act on the event */
    compare_value_render_large.slideUp("500");
  });
});

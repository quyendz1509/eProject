$(document).ready(function() {
	$('#sizing-search').find('input[type="checkbox"]').on('change', function() {
		$('#sizing-search').find('input[type="checkbox"]').not(this).prop('checked', false);
	});
	$('#type-search').find('input[type="checkbox"]').on('change', function() {
		$('#type-search').find('input[type="checkbox"]').not(this).prop('checked', false);
	});
	const list_item_cate =   $('#list-item-cate');

	let url_cate = `http://localhost:3000/categories`;
	loadCate(url_cate,list_item_cate);
	// load dữ liệu về
	async	function loadCate(url_cate,ul_item){
		let test = getParamer('ctrl');
		let res = await fetch( url_cate );
		let data = await res.json();
		let noidung = ` <li class="nav-item me-1 mb-1">
		<button class="item-cate-cart ${ (test == null || test == '') ? 'active' : '' }" data-slug="">All</button>
		</li>`;
		data.map(function(elem) {
			noidung += ` <li class="nav-item me-1 mb-1">
			<button class="item-cate-cart ${ (elem.slug == test) ? 'active' : '' }" data-slug="${elem.slug}">${elem.title}</button>
			</li>`;
		})
		ul_item.html(noidung);
	}
	/////
	loadProductCate( getParamer('ctrl') );
	////
	function template(data){
		let html = '';
		data.map( (element)=>{
			let sizer = element.sizing;
			let sizer_vl = 'Size: ';
			sizer.map( (vaizer)=>{
				sizer_vl += `<span class="me-2 badge border text-dark text-uppercase">${vaizer}</span>`;
			} )
			sizer_vl += '';
			let price = ( element.sale == 1 ) ? `<strong class="text-custom-danger">$${new Intl.NumberFormat().format(element.salePrice)}</strong> - <strong class="text-decoration-line-through">$${new Intl.NumberFormat().format(element.price)}</strong>` : `<strong class="text-custom-primary">$${new Intl.NumberFormat().format(element.price)}</strong>`;
			let typer = ( element.type == 'hot' ) ? `<span class='badge bg-danger position-absolute start-0 top-0' style="z-index:1;">HOT</span>` : `<span class='start-0 top-0 badge bg-primary position-absolute' style="z-index:1;">NEW</span>`;
			html +=`
			<div class="col-6 col-lg-4 mb-4">
			<!-- item -->
			<div class="card-custom position-relative">
			${typer}
			<div class="card-custom-wishlist">
			<button><i data-feather='heart'></i></button>
			<button class="btn-add-to-cart" data-id="${element.id}"><i data-feather='shopping-cart'></i></button>

			</div>
			<a href="./detail.html?id=${element.id}">
			<div class="card-custom-img">
			<img src="${element.images}" width="100%" alt="${element.name}">
			</div>
			<div class="card-custom-content newa-content">
			<h6 class="fw-bold m-0">${element.name}</h6>
			<span>${element.categories} -  ${element.type}</span>
			<p class="m-0"> ${sizer_vl}</p>
			<p class="m-0 fw-bold fs-5">${price}</p>
			</div>
			</a>
			</div>

			<!-- end -->
			</div>
			`;
		} );
		return html;
	}
	//  check click search
	async	function loadProductCate(slug=null,name=null,sizing=null,type=null){
		let test_slug = (slug != '' && slug != null) ? `?categories=${slug}` : ''; // kiểm tra slug
		let test_name = (name != '' && name != null) ? `${  (test_slug == '') ? '?' : '&'  }name_like=${name}` : ''; // kiểm tra slug
		let test_sizing = (sizing != null) ? `${ (test_slug == '' && test_name =='') ? '?' : '&'  }sizing_like=${sizing}` : ''; // kiểm tra slug
		let test_type = (type != null) ? `${  (test_slug == '' && test_sizing == '' && test_name == '') ? '?' : '&'  }type=${type}` : ''; // kiểm tra slug

		url = `http://localhost:3000/products${test_slug}${test_name}${test_sizing}${test_type}`;
		let total = await fetch( url );
		let dataer =  await total.json();
		$('#pagination-product').pagination( {
			dataSource: dataer,
			locator: 'items',
			pageSize: 9,
			totalNumber: dataer.length,
			callback: function(data, pagination) {
				let pageStart = (pagination.pageNumber - 1) * pagination.pageSize;
				let pageEnd = pageStart + pagination.pageSize;
				let  pageItems = dataer.slice(pageStart, pageEnd);
				let html = template(pageItems);
				$('#product-incate').html(html);
				feather.replace();

			}
		})
	}
	// check clikc search cate
	$('#list-item-cate').on('click', 'li>button', function(event) {
		event.preventDefault();
		/* Act on the event */
		let noidung = $('#search-form input').val();
		let slug = $(this).data('slug');
		let sizing_checked =  $('#sizing-search').find('input:checked').data('size');
		let type_checked =  $('#type-search').find('input:checked').data('type');
		$('#list-item-cate').find('li>button').removeClass('active');
		$(this).addClass('active');
		loadProductCate(slug,noidung,sizing_checked,type_checked);
		
	});
	// find by size
	$('#sizing-search').on('click', 'input', function(event) {
		/* Act on the event */
		let isChecked = $(this).is(':checked');
		let size = $(this).data('size');
		let size_send = ( isChecked ) ?  size : null;
		let type_checked =  $('#type-search').find('input:checked').data('type');
		let slug = $('#list-item-cate li>button.active').data('slug');
		let noidung = $('#search-form input').val();
		loadProductCate(slug,noidung,size_send,type_checked);

	});
	// find by size
	$('#type-search').on('click', 'input', function(event) {
		/* Act on the event */
		let isChecked = $(this).is(':checked');
		let type = $(this).data('type');
		let type_send = ( isChecked ) ?  type : null;
		let size_checked =  $('#sizing-search').find('input:checked').data('size');
		let slug = $('#list-item-cate li>button.active').data('slug');
		let noidung = $('#search-form input').val();

		loadProductCate(slug,noidung,size_checked,type_send);

	});
	// search name
	$('#search-form input').keyup( function(event) {
		/* Act on the event */
		let noidung = $(this).val();
		let sizing_checked =  $('#sizing-search').find('input:checked').data('size');
		let type_checked =  $('#type-search').find('input:checked').data('type');
		let slug = $('#list-item-cate li>button.active').data('slug');
		loadProductCate(slug,noidung,sizing_checked,type_checked);

	});

});

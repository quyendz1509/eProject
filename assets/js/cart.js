	const bdge_cart = $('.total-cart-quantity'); // badge đếm cart :3
	const content_cart_header = $('#cart-header ul'); // lấy phần này để xíu cào dữ liệu bỏ vô :3 
	const total_cost = $('.total-cost'); // total
	$(document).ready(function () {
	// Đầu tiên và cần thiết đó là call lấy dữ liệu từ server về
	// const sessionCartGet = JSON.parse(sessionStorage.getItem("cart"));
	let amount_cart = 0;

	// lấy dữ liệu về để đỡ mất công về sau phải call nhiều lần. Lưu ý tốt nhất là cứ cho refresh chứ đừng chơi lưu
	var cart = (sessionStorage.getItem("cart")) ? JSON.parse(sessionStorage.getItem("cart")) : new Array();
	// 
	//////////////////////////////////////////
	// lúc đầu cứ gọi dữ liệu về để load đã //
	//////////////////////////////////////////

	if (cart.length < 1) {
		content_cart_header.html(`<li class="nav-item w-100 text-center">
			<p class="m-0">Empty Cart 📪 </p>
			
			</li>`);
	}else{
		let value_total_cost = 0;
		cart.map( values =>{
			content_cart_header.append(`
				<!-- Start item cart -->
				<li class="nav-item item-cart-${values.id}">
				<div class="row align-items-center">
				<div class="col-4">
				<a href="./detail.html?id=${values.id}"><img src="${values.images}" width="100%" alt="${values.name}"></a>
				</div>
				<div class="col-6">
				<a href="./detail.html?id=${values.id}">
				<h6 class="fw-bolder item-cart-title mb-0">${values.name}</h6>	</a>
				<h6 class="m-0">Qty: <strong class="text-custom-info">${values.quyti}</strong></h6>
				<h6 class="m-0">Cost: <strong class="text-custom-success">$${new Intl.NumberFormat().format(values.quyti * values.price)}</strong></h6>

				</div>
				<div class="col-2">
				<a href="#" class="text-custom-danger remove-item-cart" data-id="${values.id}"><i data-feather="x-circle"></i></a>
				</div>
				</div>  

				</li>
				<!-- End item cart -->
				`);
			value_total_cost += values.quyti * values.price;
			amount_cart += parseInt(values.quyti);
		})
		total_cost.html(`$${new Intl.NumberFormat().format(value_total_cost)}`);
		bdge_cart.html(amount_cart);
		feather.replace();
	}

	///	//////////////////////////////////////////
	// lúc đầu cứ gọi dữ liệu về để load đã //
	//////////////////////////////////////////
	// Hàm cào dữ liệu về 
	$('body').on('click', '.btn-add-to-cart', function(event) {
		event.preventDefault();
		let __cart = (sessionStorage.getItem("cart")) ? JSON.parse(sessionStorage.getItem("cart")) : new Array();
		let _amount_cart = 0;
		/* Act on the event */
		let id = $(this).data('id');
		let url = `http://localhost:3000/products/${id}`;
		$.ajax({
			url: url,
			type: 'GET',
		})
		.done(function(res) {
			addToCart(res,1,__cart,_amount_cart);
		})

		.fail(function() {
			console.log("error");
		});
	});


	// remove khỏi cart
	$('body').on('click', '.remove-item-cart', function(event) {
		event.preventDefault();
		let id = $(this).data('id');
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'rgb(124 58 237)',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			if (result.isConfirmed) {
				delCart(id);
			}
		})
	});


});
	let tong = 0;
// hàm xóa cart
const delCart = (id) =>{
	_amount_cart = 0;
	let cart_store = JSON.parse(sessionStorage.getItem("cart"));
	objIndex = cart_store.findIndex( obj => obj.id == id );
	cart_store.splice(objIndex,1);
	sessionStorage.setItem("cart", JSON.stringify(cart_store));
	$(`.item-cart-${id}`).remove();
				// vòng lặp để chạy lại total
				let value_total_cost = 0;
				cart_store.map( values=>{
					value_total_cost += values.quyti * values.price;
					_amount_cart += parseInt(values.quyti);

				} )
				total_cost.html(`$${new Intl.NumberFormat().format(value_total_cost)}`);
				bdge_cart.html(`${_amount_cart}`);

			}
	// hàm add to cart
	const addToCart = (res,quyti_def=1,__cart,_amount_cart,sizing='')=>{
		objIndex = __cart.findIndex((obj => obj.id == res.id));
		let key_size = ( sizing == '' ) ? res.sizing[0] : sizing;
		let arr_size = [key_size];
		let sp = {
			"id": res.id,
			"name": res.name,
			"quyti": quyti_def,
			"price": (res.sale == 1) ? res.salePrice :  res.price,
			"images": res.images,
			"sizing": arr_size,
		};

		if (objIndex == -1) {
			__cart.push(sp);	
			tong += res.price;
		}else{
			__cart[objIndex].quyti += quyti_def;
			array_size = __cart[objIndex].sizing;
			array_size.push( key_size);
			tong += __cart[objIndex].quyti * __cart[objIndex].price;
		}

		sessionStorage.setItem("cart", JSON.stringify(__cart));
		let cart_store = JSON.parse(sessionStorage.getItem("cart"));
		let noidung = ``;
		let value_total_cost = 0;
		cart_store.map( values =>{
			noidung += `<!-- Start item cart -->
			<li class="nav-item item-cart-${values.id}">
			<div class="row align-items-center">
			<div class="col-4">
			<a href="./detail.html?id=${values.id}"><img src="${values.images}" width="100%" alt="${values.name}"></a>
			</div>
			<div class="col-6">
			<a href="./detail.html?id=${values.id}">
			<h6 class="fw-bolder item-cart-title mb-0">${values.name}</h6>
			</a>
			<h6 class="m-0">Qty: <strong class="text-custom-info">${values.quyti}</strong></h6>
			<h6 class="m-0">Cost: <strong class="text-custom-success">$${new Intl.NumberFormat().format(values.quyti * values.price)}</strong></h6>
			</div>
			<div class="col-2">
			<a href="#" class="text-custom-danger remove-item-cart" data-id="${values.id}"><i data-feather="x-circle"></i></a>
			</div>
			</div>  

			</li>
			<!-- End item cart -->`;
			value_total_cost += values.quyti * values.price;
			_amount_cart += parseInt(values.quyti);

		} );
		bdge_cart.html(_amount_cart);
		total_cost.html(`$${new Intl.NumberFormat().format(value_total_cost)}`);
		content_cart_header.html(noidung);
		feather.replace();

	}
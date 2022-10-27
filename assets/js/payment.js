$(document).ready(function() {

	const loadNoidung = () =>{
		let card =  JSON.parse( sessionStorage.getItem('cart'));
		let total_item = 0;
		let value_total_cost =0;
		card.map( (value,key)=>{
			value_total_cost += value.quyti * value.price;
			total_item += parseInt(value.quyti);
		});
		let noidung = '';
		        // left
		        noidung += `<div class="text-center col-12 mb-3">
		        <h3 class="text-uppercase fw-bold">Cofirm Your Order</h3>	
		        <!-- col-start -->
		        <div class="card">
		        <!-- col-start -->
		        <div class="card-header d-flex justify-content-between">
		        <h5 class="m-0 text-uppercase">Order summary</h5>
		        <h5 class="fw-bold  m-0">${total_item} Items</h5>
		        </div>
		        <!-- col-start -->
		        <!-- col-start -->
		        <div class="card-body">
		        <div class="row">
		        <!-- item -->
		        <div class="col-6 mb-2 mb-2">
		        <p class="m-0 text-start">ORDER TOTAL</p>
		        </div>
		        <div class="col-6 mb-2 mb-2">
		        <p  class="m-0 text-end fw-bold text-custom-primary">$${new Intl.NumberFormat().format(value_total_cost)}</p>
		        </div>
		        <div class="col-12 mb-2 mb-2">

		        </div>

		        <!-- End item -->
		        </div>
		        <div>

		        </div>
		        <!--  -->
		        </div>
		        <!-- col-start -->
		        <div class="card-footer pt-3 pb-3">
		        <div class="d-flex justify-content-between mb-3 align-items-center">
		        <p class="m-0">YOUR BILL: </p>
		        <h4 class="m-0 fw-bold text-custom-primary">$${new Intl.NumberFormat().format(value_total_cost)}</h4>


		        </div>
		        <!-- col-start -->
		        </div> `;

		        $('#load-info-cart').html(noidung);
		    };
		    loadNoidung();
		    $('#payment').submit(function(event) {
		    	/* Act on the event */
		    	event.preventDefault();
		    	let first = $(this).find('input[name="first"]').val();
		    	let last = $(this).find('input[name="last"]').val();
		    	let email = $(this).find('input[name="email"]').val();
		    	let phone = $(this).find('input[name="phone"]').val();
		    	let address = $(this).find('textarea[name="address"]').val();
		    	let payment = $(this).find('select[name="payment"]').val();
		    	let card =  JSON.parse( sessionStorage.getItem('cart'));
		    	let total_item = 0;
		    	let value_total_cost =0;
		    	card.map( (value,key)=>{
		    		value_total_cost += value.quyti * value.price;
		    		total_item += parseInt(value.quyti);
		    	});
		    	if (first == '' || last == '' || email == '' || phone == '' || address == '') {
		    		Swal.fire({
		    			icon: 'error',
		    			title: 'Oops...',
		    			html: 'information cannot be left blank'
		    		})
		    	}else if(payment == '' ){
		    		Swal.fire({
		    			icon: 'error',
		    			title: 'Oops...',
		    			html: 'Please choose a form of payment'
		    		})
		    	}else{
		    		noidung = `Thank You ${first} ${last} ! For payment<strong class="text-custom-success"> ${total_item}</strong> items : <strong class="text-custom-success">$${new Intl.NumberFormat().format(value_total_cost)}</strong>
		    		With: <strong>${payment}</strong>
		    		`;
		    		Swal.fire({
		    			icon: 'success',
		    			title: 'Success...',
		    			html: noidung
		    		}).then((result) => {
		    			if (result.isConfirmed) {
		    				sessionStorage.clear();
		    				window.location="./";
		    			}
		    		})
		    	}

		    });
		});
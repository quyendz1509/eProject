        const load_table_cart = $('#load-table-cart');
        $(document).ready(function() {
        // load sản phẩm
        const loadNoidung = () =>{
            let value_total_cost = 0;
            let total_item = 0;
            let card =  JSON.parse( sessionStorage.getItem('cart'));
            let noidung = `<div class="text-left col-12">
            <h5 class="fw-bold text-uppercase">Your cart items</h5>
            </div> `; 

            // right
            noidung += `
            <div class='col-12 col-md-8'>
            <div class="table-responsive">
            <table class="table table-bordered w-100" id="table-cart">
            <thead class="text-uppercase">
            <tr>

            <th>Images</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Subtotal</th>
            <th></th>
            </tr>
            </thead>
            <tbody>`;
            card.map( (value,key)=>{
                noidung += `
                <tr class="align-middle">
                <td><a href="./detail.html?id=${value.id}"><img src="${value.images}" width="80px" alt="Madam’s Boutique"></a></td>
                <td><a href="./detail.html?id=${value.id}">${value.name}</a></td>
                <td>$${new Intl.NumberFormat().format(value.price)}</td>
                <td><input type="number" class="form-control" data-id="${value.id}" value="${value.quyti}"></td>
                <td>$${new Intl.NumberFormat().format(value.quyti * value.price)}</td>
                <td> <button class="btn btn-sm bg-custom-danger del-cart" data-index=${key}>Delete</button></td>
                </tr>
                `;
                value_total_cost += value.quyti * value.price;
                total_item += parseInt(value.quyti);
            } )
            noidung += ` </tbody>
            </table>
            </div>
            </div>
            `;
            // left
            noidung += `<div class="text-center col-12 col-md-4">
            <!-- col-start -->
            <div class="card shadow-sm">
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
            <p class="m-0 text-start"> Item(s) subtotal</p>
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
            <p class="m-0">ORDER TOTAL</p>
            <h4 class="m-0 fw-bold text-custom-primary">$${new Intl.NumberFormat().format(value_total_cost)}</h4>

            </div>
            <button class="btn-custom-success w-100"><i data-feather="credit-card"></i> PAYMENT</button>
            </div>
            </div>
            <!-- col-start -->
            </div> `;

            load_table_cart.html(noidung);
            $('#table-cart').DataTable();
        }

        loadNoidung();

        $('#load-table-cart').on('change', '#table-cart input', function(event) {
            event.preventDefault();
            /* Act on the event */
            let data = $(this).val();
            let id = $(this).data('id');
            if (data == '' || data < 1 ) {
                data = 1;
                $(this).val(data);
            }
            // giờ là cập nhật lại giỏ hàng nè
            let __cart = JSON.parse( sessionStorage.getItem("cart") );
            objIndex =  __cart.findIndex((obj => obj.id == id));
            __cart[objIndex].quyti = data;
            sessionStorage.setItem("cart", JSON.stringify(__cart));
            loadNoidung();

        });
        $('#load-table-cart').on('click', '#table-cart .del-cart', function(event) {
            event.preventDefault();
            let indexer = $(this).data('index');
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
                 let card =  JSON.parse( sessionStorage.getItem('cart'));
                 card.splice(indexer,1);
                 sessionStorage.setItem("cart", JSON.stringify(card));
                 loadNoidung();
             }
         })
        });
    });

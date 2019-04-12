$(function refreshList() {
    
   
    let productName = $('#productName')
    let productPrice = $('#productPrice')
    let productQty = $('#productQty')
    let vendorid = $('#vendorList')
    console.log(productName.value)
    $('#addProduct').click( function () {
        console.log("clicked")
        addProduct(
            productName.val(),
            productPrice.val(),
            productQty.val(),
            vendorid.val(),
            function(addProduct){
                window.alert("Product added "+addProduct.name)
                formProductsTable()
            })
    })
    getVendors()
    formProductsTable()
})




function getVendors(){
    let vendorList = $('#vendorList')

    fetchVendors(function(vendors) {
        for(vendor of vendors) {
            var opt = document.createElement('option');
            opt.value = vendor.id;
            opt.innerHTML = vendor.name;
            vendorList.append(opt);
            
        }
    })
}

function fetchVendors(done){
    $.get('/vendors', function (data) {
        done(data)
    })
}

function fetchProducts(done){
    $.get('/products', function (data) {
        done(data)
    })
}

function createProductCard(product){

    return $(
        `<tr>
        <th scope="row">${product.id}</th>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.quantity}</td>
        <td> <button type="button" id="${product.id}" onclick="deleteElement(${product.id})" class="btn btn-primary">Delete</button></td>
      </tr>`
    )

}

function deleteElement(id){
    $.ajax({
        url: '/products',
        type: 'DELETE',
        data: {
            id:id
        },
        success: function(result) {
            formProductsTable()
        }
    });
}

function formProductsTable(){
    let productList = $('#product-list')

    fetchProducts(function(products) {
        productList.empty()
        for(product of products) {
            productList.append(createProductCard(product))
        }
    })
}

function addProduct(name,price,quantity,vendorId,done){
    console.log("in addProduct name:- "+name+" price:- "+price+" quantity:- "+quantity+" vendorId:- "+vendorId)
    $.post('/products',{
        name: name,
        quantity: quantity,
        price: price,
        vendorId: vendorId
    }, function (data) {
        done(data)
    })
}






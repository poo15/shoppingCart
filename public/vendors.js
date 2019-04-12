$(function refreshList() {
    let vendorName = $('#vendorName')
    console.log(vendorName.value)
    $('#addVendor').click( function () {
        console.log("clicked")
        addVendor(
            vendorName.val(),
            function(addVendor){
                window.alert("Vendor added "+addVendor.name)
                getVendors()
            })
    })
    getVendors()
})


function getVendors(){
    let vendorList = $('#vendorList')
    vendorList.empty()
    fetchVendors(function(vendors) {
        for(vendor of vendors) {
           
            vendorList.append(
                `<tr>
                <th scope="row">${vendor.id}</th>
                <td>${vendor.name}</td>
                <td> <button type="button" id="${vendor.id}" onclick="deleteVendor(${vendor.id})" class="btn btn-primary">Delete</button</td>
            </tr>`
            );
            
        }
    })
}

function fetchVendors(done){
    $.get('/vendors', function (data) {
        done(data)
    })
}


function deleteVendor(id){
    console.log(id)
    $.ajax({
        url: '/vendors',
        type: 'DELETE',
        data: {
            id:id
        },
        success: function(result) {
            window.alert("Vendor delted ")
                getVendors()
        }
    });
}


function addVendor(name,done){
    console.log("in addProduct name:- "+name)
    $.post('/vendors',{
        name: name
    }, function (data) {
        done(data)
    })
}

var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCat = document.getElementById("productCat");
var productDesc = document.getElementById("productDesc");
var addProductBtn = document.getElementById("addProductBtn");
var updateProductBtn = document.getElementById("updateProductBtn");
var temVar; //temporary  variable
var productListKey = "productListkey"

var productList = [];
if (localStorage.getItem(productListKey) != null) {
    var productList = JSON.parse(localStorage.getItem(productListKey))
    displayProducts(productList);
}

function addProducts() {
    if (validateProductName() == true && validateProductPrice() == true && validateProductCategory() == true && validateProductDescription()==true ) {
        var product = {
            name: productName.value,
            price: productPrice.value,
            description: productDesc.value,
            category: productCat.value
        }
        productList.push(product)
        localStorage.setItem(productListKey, JSON.stringify(productList))
        displayProducts(productList);

        updatedFormValues();
    }
else{
    console.log("error");
}

}
function displayProducts(list) {
    var cartona = '';
    for (var i = 0; i < list.length; i++) {
        cartona += `<tr>
        <td>${i + 1}</td>
<td>${list[i].newName ? list[i].newName : list[i].name}</td>
<td>${list[i].price}</td>
<td>${list[i].category}</td>
<td>${list[i].description}</td>
<td><button class="btn btn-warning btn-sm" onclick="getUpdatedData(${i})"> Update</button></td>
<td><button class="btn btn-danger btn-sm" onclick="deleteProducts(${i})" > Delete</button></td>
</tr>`
    }
    document.getElementById("tbody").innerHTML = cartona;
    temVar = i;
}

function deleteProducts(index) {
    productList.splice(index, 1);
    localStorage.setItem(productListKey, JSON.stringify(productList))
    displayProducts(productList);

}

function searchByName(term) {
    var foundedItems = []
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
            productList[i].newName = productList[i].name.toLowerCase().replace(term.toLowerCase(), `<span class="text-danger">${term}</span>`)
            foundedItems.push(productList[i]);
            displayProducts(foundedItems)
        }
    }
}
function getUpdatedData(index) {
    addProductBtn.classList.add("d-none");
    updateProductBtn.classList.replace("d-none", "d-block")
    temVar = index;
    scroll(
        {
            top: 0,
            behavior: "smooth",
        }
    )
    updatedFormValues(productList[index]);


}
function updatedFormValues(flag) {
    productName.value = flag ? flag.name : ""
    productPrice.value = flag ? flag.price : ""
    productDesc.value = flag ? flag.description : ""
    productCat.value = flag ? flag.category : ""
}

function updatedProducts() {
    var productNameValue = document.getElementById("productName")
    var productPriceValue = document.getElementById("productPrice")
    var productCatValue = document.getElementById("productCat")
    var productDescValue = document.getElementById("productDesc")

    var product = {
        name: productNameValue.value,
        price: productPriceValue.value,
        category: productCatValue.value,
        description: productDescValue.value
    }
    productList[temVar] = product
    localStorage.setItem(productListKey, JSON.stringify(productList));
    displayProducts(productList);
    addProductBtn.classList.replace("d-none", "d-block")
    updateProductBtn.classList.replace("d-block", "d-none")
    updatedFormValues();
}

function validateProductName() {
    var regex = /^[A-Z][a-z]{3,10}$/;
    if (regex.test(productName.value) == true) {
        productName.style.border = "none"
        productName.style.border="1px solid #dee2e6"     
        document.getElementById("wrongName").classList.add("d-none")
        return true
    }
    else {
        document.getElementById("wrongName").classList.remove("d-none")
        productName.style.border = "4px solid red"
        return false
    }
}
function validateProductPrice() {
    var regex = /^([1-9][0-9]{3}|10000)$/

    if (regex.test(productPrice.value) == true) {
        document.getElementById("wrongPrice").classList.add("d-none")
        productPrice.style.border = "none"
        productPrice.style.border="1px solid #dee2e6"     
        return true
    }
    else {
        document.getElementById("wrongPrice").classList.remove("d-none")
        productPrice.style.border = "4px solid red"
        return false;
    }
}
function validateProductCategory(){
    var regex =/^Tv|Mobile|Laptop$/gmi
    if(regex.test(productCat.value)==true){
        productCat.style.border="none"
        productCat.style.border="1px solid #dee2e6"     
        document.getElementById("wrongCategory").classList.add("d-none")
        return true
    }
    else{
        productCat.style.border="4px solid red"
        document.getElementById("wrongCategory").classList.remove("d-none")
        return false
    }
}

function validateProductDescription(){
     var regex =/^[A-Za-z]{250,}$/gmi
    if (regex.test(productDesc.value) == true) {
        document.getElementById("wrongDesc").classList.add("d-none");
        productDesc.style.border="none"
        productDesc.style.border="1px solid #dee2e6"     
        return true
}
else{
    document.getElementById("wrongDesc").classList.remove("d-none");
    productDesc.style.border="4px solid red"
    return false
}

}
const ORDER_ASC_BY_PRICE = "Precio";
const ORDER_DESC_BY_PRICE = "PrecioMenor";
const ORDER_BY_PROD_REL = "Vendidos";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            let aPrice = a.cost;
            let bPrice = b.cost;

            if (aPrice < bPrice) { return -1; }
            if (aPrice > bPrice) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            let aPrice = a.cost;
            let bPrice = b.cost;

            if (aPrice > bPrice) { return -1; }
            if (aPrice < bPrice) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_REL) {
        result = array.sort(function (a, b) {
            let aSold = a.soldCount;
            let bSold = b.soldCount;

            if (aSold > bSold) { return -1; }
            if (aSold < bSold) { return 1; }
            return 0;
        });
    }

    return result;
}

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showProductsList(array) {
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) { 
        let product = array[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {

            htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row shadow-sm custom-card cursor-active" onclick="sendID(${product.id})">
                <div class="col-3">
                    <img src=" ${product.image} " alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4> ${product.name} - ${product.currency} ${product.cost} </h4> 
                        <p> ${product.description} </p> 
                        </div>  
                        <small class="text-muted"> ${product.soldCount} vendidos</small> 
                    </div>
                </div>
            </div>
        </div>
        `
            document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
        }
    }
}



function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenados
    showProductsList(productsArray);
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(catproduct_url).then(function (resultObj) {
        document.getElementById("a").innerHTML = "Verás aquí todos los productos de la categoría " + resultObj.data.catName;
        if (resultObj.status === "ok") {
            productsArray = resultObj.data.products;

            showProductsList(productsArray);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_PRICE, productsArray);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_PRICE, productsArray);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_REL, productsArray);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList(productsArray);
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) > 0) {
            minCount.soldCount = parseInt(minCount);
        }
        else {
            minCount.soldCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) > 0) {
            maxCount.soldCount = parseInt(maxCount);
        }
        else {
            maxCount.soldCount = undefined;
        }

        showProductsList(productsArray);
    });
    const nombre = document.getElementById("perfil");
    nombre.innerHTML = localStorage.getItem("text");

})


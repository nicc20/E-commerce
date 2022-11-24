const nombre_prod = document.getElementById("nombre_prod");
const precio_prod = document.getElementById("precio_prod");
const descripcion_prod = document.getElementById("desc_prod");
const category_prod = document.getElementById("cat_prod");
const cant_vendidos = document.getElementById("cant_vend");

//Al cargar la página muestro en pantalla el nombre, precio, descripción, categoría y cantidad de vendidos del producto
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(INFO_PRODUCTO_AMPLIADO).then(function (resultObj) {
        nombre_prod.innerHTML = resultObj.data.name;
        precio_prod.innerHTML = resultObj.data.cost + ` ` + resultObj.data.currency;
        descripcion_prod.innerHTML = resultObj.data.description;
        category_prod.innerHTML = resultObj.data.category;
        cant_vendidos.innerHTML = resultObj.data.soldCount;
        if (resultObj.status === "ok") {

            imagenes = resultObj.data.images;
            ImagenesProductos(imagenes);

            prod_relacionado = resultObj.data.relatedProducts;
            
             showRelatedProd(prod_relacionado);
        }
    });

    getJSONData(COMENTARIOS).then(function (resultObj) {
        if (resultObj.status === "ok") {

            comentarios = resultObj.data
            VerComentarios(comentarios);
        }
        
    })



}
)

//Muestro el array de imágenes usando el DOM
function ImagenesProductos(array) {
    for (let i = 0; i < array.length; i++) {

        let imagenes = array[i]
        document.getElementById("ilustrative-images").innerHTML += `<li><a data-target="#pic" data-toggle="tab"><img src="${imagenes}" style="width: 20.20rem; display: flex;" alt="product image" class="img-thumbnail"></a></li> `
    }
}

//Muestro el array de comentarios
function VerComentarios(array) {
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let comentario = array[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <p> <b>${comentario.user} </b> - ${comentario.dateTime} 
                            `
        for (let j = 0; j <= 4; j++) {
            if (j <= comentario.score - 1)
                
                htmlContentToAppend += `<span class="fa fa-star checked"></span>`
            
            else
                
                htmlContentToAppend += `<span class="fa fa-star"></span>`
        }

        htmlContentToAppend += `</p> 
                        <p> ${comentario.description} </p> 
                        </div>  
                    </div>
                </div>
            </div>
        </div>
        `
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

const nombre = document.getElementById("perfil");
nombre.innerHTML = localStorage.getItem("text");

//Funcion que nos muestra el product-info del producto relacionado seleccionado
function showRelatedProd(relatedProducts){
    let htmlContentToAppend = "";

    for(let i = 0; i < relatedProducts.length; i++){ 
        let relatedProduct = relatedProducts[i];
        htmlContentToAppend += `
    
            <div class="card" style="width: 200px; margin-right: 20px;">
                <div class="card card-custom bg-white border-white border-0 cursor-active" onclick="sendID(${relatedProduct.id})" >
                    <img class="card-img-top img-fluid" src="${relatedProduct.image}" alt="Card Columns" style="width: 200px;" >
                    <div class="card-body">
                    <h3 class="card-title">${relatedProduct.name}</h3>
                    </div>
                    
                </div>
            </div>
        `
        document.getElementById("related").innerHTML = htmlContentToAppend;    }
    }




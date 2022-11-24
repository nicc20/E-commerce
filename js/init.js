const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const catproduct_url = `https://japceibal.github.io/emercado-api/cats_products/` + localStorage.getItem("catID") + `.json`;
const clearSession = document.getElementById("sessionEnd");
const INFO_PRODUCTO_AMPLIADO = `https://japceibal.github.io/emercado-api/products/` + localStorage.getItem("id_producto") + `.json`;
const COMENTARIOS = `https://japceibal.github.io/emercado-api/products_comments/` + localStorage.getItem("id_producto") + `.json`;
const CART = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

function getJSONData(url) {

  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};
//Para ingresar solamente si hay un item en el local storage, o sea, que el usuario haya ingresado su mail, sino redirigir al login
document.addEventListener("DOMContentLoaded", function () {
  const name = document.getElementById("perfil")
  name.innerHTML = localStorage.getItem("text")
  if (!localStorage.getItem("text")) {
    window.location = "login.html"
  }
});

clearSession.addEventListener("click", function() {
  localStorage.clear()
})


function sendID(id) {
  localStorage.setItem("id_producto", id);
  window.location = "product-info.html"
}


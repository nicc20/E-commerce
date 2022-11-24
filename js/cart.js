const subtotal = document.getElementById("subtotal");
const sendCost = document.getElementById("sendCost");
const total = document.getElementById("total");
let percent = 15;
let sendBtn = document.getElementById("sendBtn");
let modalBtn = document.getElementById("selectModal");
let radioCard = document.getElementById("creditCard");
let radioAccount = document.getElementById("bankTransfer");

document.addEventListener("DOMContentLoaded", function () {
    getJSONData(CART).then(function (resultObj) {
        if (resultObj.status === "ok") {
            products = resultObj.data.articles;
            showPurchases(products)
        }
    })
})
//Function to view the purchase
function showPurchases(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let purchaseProd = array[i];
        htmlContentToAppend += `
        
        <tr>
        <th scope="row"><img id="fotoVentas" src="${purchaseProd.image}"></th>
        <td>${purchaseProd.name}</td>
        <td>${purchaseProd.currency} ${purchaseProd.unitCost}</td>
        <td><button type="button" id="subtract" class="btn btn-light">-</button> <input id="inp" value="1" type="number" style="width:30px" min="1"> <button type="button" id="add" class="btn btn-light">+</button></td>
        <th id="subtotal"> ${purchaseProd.currency}  ${purchaseProd.unitCost} </th>
        </tr>
        
        `
        subtotal.innerHTML = purchaseProd.currency + ' ' + purchaseProd.unitCost;
        sendCost.innerHTML = purchaseProd.currency + ' ' + ((purchaseProd.unitCost * percent) / 100);
        total.innerHTML = purchaseProd.currency + (parseInt(purchaseProd.unitCost) + parseInt(((purchaseProd.unitCost * percent) / 100)));

        document.getElementById("purchaseProd").innerHTML = htmlContentToAppend;

        // Subtract a unit with the button and display on screen in real-time
        document.getElementById("subtract").onclick = function () {
            if (document.getElementById("inp").value >= 1) {
                document.getElementById("inp").value -= 1;
                document.getElementById("subtotal").innerHTML = purchaseProd.currency + ' ' + parseInt(document.getElementById("inp").value) * purchaseProd.unitCost;
                prodValue = parseInt(document.getElementById("inp").value) * purchaseProd.unitCost;
                subtotal.innerHTML = purchaseProd.currency + ' ' + prodValue;

                sendCost.innerHTML = purchaseProd.currency + ' ' + ((prodValue * percent) / 100);
                total.innerHTML = purchaseProd.currency + ' ' + (parseInt(prodValue) + parseInt(((prodValue * percent) / 100)));
            }

        }

        // Add a unit with the button and display on screen in real-time
        document.getElementById("add").onclick = function () {
            document.getElementById("inp").value = 1 + parseInt(document.getElementById("inp").value);
            document.getElementById("subtotal").innerHTML = purchaseProd.currency + ' ' + parseInt(document.getElementById("inp").value) * purchaseProd.unitCost;

            prodValue = parseInt(document.getElementById("inp").value) * purchaseProd.unitCost;
            subtotal.innerHTML = purchaseProd.currency + ' ' + prodValue;
            sendCost.innerHTML = purchaseProd.currency + ' ' + ((prodValue * percent) / 100);
            total.innerHTML = purchaseProd.currency + ' ' + (parseInt(prodValue) + parseInt(((prodValue * percent) / 100)));
        }

        // Real-time update of the percentage when changing it to 15%
        document.getElementById("checkPremium").onclick = function () {
            percent = 15;
            prodValue = parseInt(document.getElementById("inp").value) * purchaseProd.unitCost;
            subtotal.innerHTML = purchaseProd.currency + ' ' + prodValue;

            sendCost.innerHTML = purchaseProd.currency + ' ' + ((prodValue * percent) / 100);
            total.innerHTML = purchaseProd.currency + ' ' + (parseInt(prodValue) + parseInt(((prodValue * percent) / 100)));
        }
        // Real-time update of the percentage when changing it to 7%
        document.getElementById("checkExpress").onclick = function () {
            percent = 7;
            prodValue = parseInt(document.getElementById("inp").value) * purchaseProd.unitCost;
            subtotal.innerHTML = purchaseProd.currency + ' ' + prodValue;

            sendCost.innerHTML = purchaseProd.currency + ' ' + ((prodValue * percent) / 100);
            total.innerHTML = purchaseProd.currency + ' ' + (parseInt(prodValue) + parseInt(((prodValue * percent) / 100)));
        }

        // Real-time update of the percentage when changing it to 5%
        document.getElementById("checkBassic").onclick = function () {
            percent = 5;
            prodValue = parseInt(document.getElementById("inp").value) * purchaseProd.unitCost;
            subtotal.innerHTML = purchaseProd.currency + ' ' + prodValue;

            sendCost.innerHTML = purchaseProd.currency + ' ' + ((prodValue * percent) / 100);
            total.innerHTML = purchaseProd.currency + ' ' + (parseInt(prodValue) + parseInt(((prodValue * percent) / 100)));
        }

    }
}
//From grupal work
(function () {
    'use strict'
    let form = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(form)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()
//Begin disable and enable
document.getElementById("creditCard").addEventListener("click", function () {
    document.getElementById("accountNum").setAttribute("disabled", "true")
    document.getElementById("cardNum").removeAttribute("disabled")
    document.getElementById("securityCod").removeAttribute("disabled")
    document.getElementById("expiration").removeAttribute("disabled")
})

document.getElementById("bankTransfer").addEventListener("click", function () {
    document.getElementById("accountNum").removeAttribute("disabled")
    document.getElementById("cardNum").setAttribute("disabled", "true")
    document.getElementById("securityCod").setAttribute("disabled", "true")
    document.getElementById("expiration").setAttribute("disabled", "true")
})
//End disable and enable

//event to 
sendBtn.addEventListener("click", checkModal);
function checkModal() {
    let card = document.getElementById("cardNum").value
    let secCod = document.getElementById("securityCod").value
    let expirationCard = document.getElementById("expiration").value
    let account = document.getElementById("accountNum").value

    if ((radioCard.checked || radioAccount.checked) && ((card.length > 0 && secCod.length > 0 && expirationCard.length > 0) || account.length > 0)) {
        modalBtn.classList.add("is-valid");
        modalBtn.classList.remove("is-invalid");
        modalBtn.classList.remove("text-danger");
    } else {
        modalBtn.classList.add("is-invalid");
        modalBtn.classList.add("text-danger");
        modalBtn.classList.remove("is-valid");
    }
};











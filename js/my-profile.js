let name1 = document.getElementById("name1");
let name2 = document.getElementById("name2");
let lastName1 = document.getElementById("lastName1");
let lastName2 = document.getElementById("lastName2");
let email = document.getElementById("email");
let phone = document.getElementById("phone");

(function () {
    'use strict'
    let form = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(form)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                    validate()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()

//Al cargar la página muestra el mail y los otros datos guardados en el local storage
document.addEventListener("DOMContentLoaded", function () {
    email.value = localStorage.getItem("text")
    email.setAttribute("disabled", "true")
    if (localStorage.getItem("name1")) {
        name1.value = localStorage.getItem("name1")
        lastName1.value = localStorage.getItem("lastName1")
        phone.value = localStorage.getItem("phone")
    }
    if (localStorage.getItem("name2")) {
        name2.value = localStorage.getItem("name2");
    }
    if (localStorage.getItem("lastName2")) {
        lastName2.value = localStorage.getItem("lastName2");
    }
})

//Función para validar form y guardar items en el local storage
function validate() {
    let name1Value = document.getElementById("name1").value;
    let lastname1Value = document.getElementById("lastName1").value;
    let phoneValue = document.getElementById("phone").value;
    if ((name1Value.length > 0) && (lastname1Value.length > 0) && (phoneValue.length > 0 && phoneValue.length < 10)) {
        document.getElementById("alertProfile").classList.add("show")
        localStorage.setItem("name1", name1Value)
        localStorage.setItem("lastName1", lastname1Value)
        localStorage.setItem("phone", phoneValue)
    }
}
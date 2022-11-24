const usuario = document.getElementById("usuario");

function submitEventHandler(evento) { // Se ejecuta cuando se haga el submit
  evento.preventDefault(); // Evita que se haga la petición al servidor enviando los datos
  localStorage.setItem("text",(usuario.value));
  window.location.href = 'index.html';// redirige al index.html
  
  

  
 

  
  







}



document.getElementById("loginFORM").addEventListener('submit', submitEventHandler);
//agrega el evento para cuando se haga el submit

























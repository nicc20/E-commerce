
function login() {

 
  
  let usuario = document.getElementById('nombre_usuario').value;
  let contraseña = document.getElementById('password').value;
 

  if ((usuario.length > 0) && (contraseña.length > 0)) {
    
   
    window.location="index.html";
  }
  else  
    swal("Error al iniciar sesión", "Debe ingresar su usuario y contraseña", "error");
  
}








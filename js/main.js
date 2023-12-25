




document.addEventListener("DOMContentLoaded", function() {
    // Establecer un temporizador para mostrar el modal después de 10 segundos (10000 milisegundos)
    setTimeout(mostrarModal, 1000);
  
    // Agregar evento de clic a la "X" para cerrar el modal
    var cerrarBoton = document.getElementById("cerrarBoton");
    cerrarBoton.addEventListener("click", cerrarModal);
  });
  
  function mostrarModal() {
    var modal = document.getElementById("miModal");
    modal.style.display = "block";
  }
  
  function cerrarModal() {
    var modal = document.getElementById("miModal");
    modal.style.display = "none";
  }
  



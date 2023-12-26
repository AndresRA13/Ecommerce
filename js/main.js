




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

  /*OPEN Y CLOSE BARS NAV */
  const openBars = document.querySelector('#open_bars');
  const closeBars = document.querySelector('#close_bars');
  const nav = document.querySelector('.nav');
  openBars.addEventListener('click', (e) =>{
    openBars.classList.add('ocultar');
    closeBars.classList.add('mostrar');
    nav.classList.add('ver');
  });
  closeBars.addEventListener('click', (e) =>{
    console.log('funcionando');
    openBars.classList.remove('ocultar');
    closeBars.classList.remove('mostrar');
    nav.classList.remove('ver');
  })

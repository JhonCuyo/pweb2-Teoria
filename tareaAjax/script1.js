function getSeleccionRegiones() {
    const checkboxes = document.querySelectorAll('input[name="region"]:checked');
    const regiones = [];
    checkboxes.forEach(cb => regiones.push(cb.value));
    return regiones;
  }
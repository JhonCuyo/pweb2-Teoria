function getSeleccionRegiones() {
    const checkboxes = document.querySelectorAll('input[name="region"]:checked');
    const regiones = [];
    checkboxes.forEach(cb => regiones.push(cb.value));
    return regiones;
  }
  function mostrarTabla(){
    fetch('/data')
    .then(response => response.json())
    .then(data => {
    const regionSeleccionada = getSeleccionRegiones();
    const conteo = {};

    regionSeleccionada.forEach(region => {
        conteo[region] = data.filter(u => u.region === region).length;
      });
const contenedor=document.getElementById("contenedor");
contenedor.innerHTML="";

const tabla=document.createElement("table");
table.border="1";

const thead = document.createElement('thead');
thead.innerHTML = '<tr><th>Región</th><th>Cantidad</th></tr>';
tabla.appendChild(thead);

  }
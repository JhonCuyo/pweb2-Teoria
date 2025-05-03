function cargarRegiones() {
    console.log("cargando regiones");
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            const regionesUnicas = [...new Set(data.map(u => u.region))]; 
            const container = document.getElementById("checkbox-container");
            selector.innerHTML = ''; 
            regionesUnicas.forEach(region => {
                const label = document.createElement("label");
                label.style.display = "block";
                label.innerHTML = `<input type="checkbox" value="${region}" class="region-checkbox"> ${region}`;
                selector.appendChild(option);
            });
        })
        .catch(error => console.error("error al cargar las regiones:", error));
}


function getSeleccionRegiones() {
    const checkboxes = document.querySelectorAll('.region-checkbox:checked');
    const regionesSeleccionadas = Array.from(checkboxes).map(checkbox => checkbox.value);
    return regionesSeleccionadas;
  }
function mostrarTabla(){
    fetch('/data')
    .then(response => response.json())
    .then(data => {
    const regionSeleccionada = getSeleccionRegiones();
    const conteo = {};

    regionSeleccionada.forEach(region => {
    const cantidad = data.filter(u => u.region === region).length;
    conteo[region] = cantidad || 0; 
    });
    const contenedor=document.getElementById("contenedor");
    contenedor.innerHTML="";

    const tabla=document.createElement("table");
    tabla.border="1";

    const thead = document.createElement('thead');
    thead.innerHTML = '<tr><th>Región</th><th>Cantidad</th></tr>';
    tabla.appendChild(thead);

    const tbody = document.createElement('tbody');
    for (let region in conteo) {
        const fila = document.createElement('tr');
        fila.innerHTML = `<td>${region}</td><td>${conteo[region]}</td>`;
        tbody.appendChild(fila);
    }
    tabla.appendChild(tbody);
    contenedor.appendChild(tabla);
    });
}
document.addEventListener("DOMContentLoaded",()=>{
    console.log("DOM cargado");
    cargarRegiones();
})
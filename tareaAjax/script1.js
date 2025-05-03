function cargarRegiones() {
    console.log("cargando regiones");
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            const regionesUnicas = [...new Set(data.map(u => u.region))]; 
            const selector = document.getElementById('selector');
            selector.innerHTML = ''; 
            regionesUnicas.forEach(region => {
                const option = document.createElement('option');
                option.value = region;
                option.textContent = region;
                selector.appendChild(option);
            });
            selector.multiple = true;
        })
        .catch(error => console.error("error al cargar las regiones:", error));
}


function getSeleccionRegiones() {
    const selector = document.getElementById("selector");
    const regionesSeleccionadas = Array.from(selector.selectedOptions).map(option => option.value);
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
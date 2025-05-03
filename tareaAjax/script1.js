function cargarRegiones() {
    console.log("cargando regiones");
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            const regionesUnicas = [...new Set(data.map(u => u.region))]; 
            const container = document.getElementById("checkbox-container");
            container.innerHTML = ''; 
            regionesUnicas.forEach(region => {
                const label = document.createElement("label");
                label.style.display = "block";
                label.innerHTML = `<input type="checkbox" value="${region}" class="region-checkbox"> ${region}`;
                container.appendChild(label);
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
    const regionesSeleccionadas = getSeleccionRegiones();
    const contenedor = document.getElementById("contenedor");
            contenedor.innerHTML = ""; 

            if (regionesSeleccionadas.length === 0) {
                contenedor.innerHTML = "<p>Por favor, selecciona al menos una región.</p>";
                return;
            }

            const datosFiltrados = data.filter(u => regionesSeleccionadas.includes(u.region));

            const diasUnicos = [...new Set(datosFiltrados.flatMap(u => u.confirmed.map(c => c.date)))]
                    .sort((a, b) => new Date(a) - new Date(b));

            const tabla = document.createElement("table");
            tabla.border = "1";

            const thead = document.createElement("thead");
            let encabezadoHTML = "<tr><th>Región</th>";
            diasUnicos.forEach(dia => {
                encabezadoHTML += `<th>${dia}</th>`;
            });
            encabezadoHTML += "</tr>";
            thead.innerHTML = encabezadoHTML;
            tabla.appendChild(thead);

            const tbody = document.createElement("tbody");
            datosFiltrados.forEach(regionData => {
                const fila = document.createElement("tr");
                let filaHTML = `<td>${regionData.region}</td>`;
                diasUnicos.forEach(dia => {
                    const diaData = regionData.confirmed.find(c => c.date === dia);
                    filaHTML += `<td>${diaData ? diaData.value : 0}</td>`;
                });
                fila.innerHTML = filaHTML;
                tbody.appendChild(fila);
            });
            tabla.appendChild(tbody);

            contenedor.appendChild(tabla);
        })
        .catch(error => console.error("Error al mostrar la tabla:", error));
}
document.addEventListener("DOMContentLoaded",()=>{
    console.log("DOM cargado");
    cargarRegiones();
})
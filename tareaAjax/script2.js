const { response } = require("express");

function cargarTabla(){
    fetch("/data")
        .then(response => response.json())
        .then(data =>{
            const contenedor = document.getElementById("contenedor");
            contenedor.innerHTML = ""; 

            const datosFiltrados= data.filter(u =>u.region !== "Lima" && u.region !== "Callao");

            if(datosFiltrados.length === 0){
                contenedor.innerHTML = "<p>no hay datos disponibles.</p>";
                return;
            }
            const diasUnicos = [...new Set(datosFiltrados.flatMap(u => u.confirmed.map(c => c.date)))]
                    .sort((a, b) => new Date(a) - new Date(b));

            const tabla = document.createElement("table");
            tabla.border = "1";

            const thead = document.createElement("thead");
            let encabezadoHTML="<tr><th>Región</th>";
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
            contenedor.appendChild(tabla);
        })
        .catch(error => console.error("Error al cargar la tabla:", error));
}
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM cargado");
    cargarTabla();
})

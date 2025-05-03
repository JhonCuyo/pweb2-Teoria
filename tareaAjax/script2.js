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

        }

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
        }

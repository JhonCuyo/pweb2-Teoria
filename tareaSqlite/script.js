$(document).ready(function () {
    $("#btn").click(function () {
        $.ajax({
            url: "cgi-bin/peliculas.py",
            type: "GET",
            dataType: "json",
            success: function (data) {
                $("#resultado").empty();
                if (Array.isArray(data)) {
                    data.forEach(function (p){
                        $("#resultado").append(
                            `<p><strong>${p.Title}</strong> (${p.Year}) - Score: ${p.Score}</p>`
                        );
                    });
                } else {
                    $("#resultado").append("<p>La respuesta no es un arreglo.</p>");
                }
            },
            error: function (xhr, status, error) {
                console.error("Error al obtener los datos:", status, error);
                $("#resultado").html("<p>Error al obtener los datos.</p>")
            }
        });
    });
});

$(document).ready(function () {
    $("#boton").click(function () {
        $.ajax({
            url: "cgi-bin/peliculas.py",
            type: "GET",
            dataType: "json",
            success: function (data) {
                $("#resultado").empty();
                    data.forEach(function (p){
                        let actores = p.Actors.join(", ");
                        $("#resultado").append(
                            `<div>
                            <p><strong>${p.Title}</strong> (${p.Year}) - Score: ${p.Score}</p>
                            <p><em>Actores:</em> ${actores}</p>
                            </div><hr>`
                        );
                    });
            },
            error: function (xhr, status, error) {
                console.error("Error al obtener los datos:", status, error);
                $("#resultado").html("<p>Error al obtener los datos.</p>")
            }
        });
    });
});

$(document).ready(function () {
    $("#btn").click(function () {
        $.ajax({
            url: "cgi-bin/peliculas.py",
            type: "GET",
            dataType: "json",
            success: function (data) {
                $("#resultado").empty();
            }
        });
    });
});

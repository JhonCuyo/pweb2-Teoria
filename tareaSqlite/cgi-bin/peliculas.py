#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sqlite3
import json
data = sqlite3.connect("imdb.db")
cursor = data.cursor()

cursor.execute("""
SELECT Movie.Title, Movie.Year, Movie.Score, Actor.Name
FROM Movie
JOIN Casting ON Movie.MovieID = Casting.MovieID
JOIN Actor ON Casting.ActorId = Actor.ActorId
ORDER BY Movie.Title, Casting.Ordinal
""")
filas = cursor.fetchall()

peliculas = [{"Title": fila[0], "Year": fila[1], "Score": fila[2]} for fila in filas]

print("Content-Type: application/json\n")
print(json.dumps(peliculas))
data.close()
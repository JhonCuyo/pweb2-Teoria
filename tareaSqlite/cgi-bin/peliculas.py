#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sqlite3
import json
data = sqlite3.connect("imdb.db")
cursor = data.cursor()

cursor.execute("SELECT Title, Year, Score From Movie")
filas = cursor.fetchall()

peliculas = [{"Title": fila[0], "Year": fila[1], "Score": fila[2]} for fila in filas]

print("Content-Type: application/json\n")
print(json.dumps(peliculas))
data.close()
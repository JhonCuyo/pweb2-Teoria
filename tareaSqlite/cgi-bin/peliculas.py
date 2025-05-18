#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sqlite3
import json
data = sqlite3.connect("imdb.db")
cursor = data.cursor()

cursor.execute("SELECT Title, Year, Score From Movie")
filas = cursor.fetchall()
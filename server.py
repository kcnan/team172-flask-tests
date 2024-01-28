from flask import Flask, request, redirect, send_file, flash, send_from_directory, url_for
from hashlib import sha256
import sqlite3
import os

app = Flask(__name__)
app.config["SECRET_KEY"] = "very secret key"
db = sqlite3.connect(":memory:")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "GET":
        flash("YOU USED A GET REQUEST >:( LOSERRRRRRR")
        return send_file("login.html")

    if request.form["username"] == "cool_user":
        if request.form["password"] == "yes":
            return redirect("/success")
    return redirect("/failure")

@app.route("/failure")
def failure():
    return "L BOZO GET RATIOED NOOB SKILL ISSUE"

@app.route("/success")
def success():
    return "hooray :)"

@app.route("/upload", methods=["GET", "POST"])
def upload():
    if "myFileInput" in request.files:
        f = request.files["myFileInput"]
        f.save(f.filename)
        return "yippeeeeeeeee", 200
    if request.method == "GET":
        filestr = "<ul>"
        for file in os.listdir("."):
            filestr += "<li>"
            filestr += file
            filestr += "</li>"
        filestr += "</ul>"
        return filestr
    return "WHERE'S FILE BROOOOOO WHEEEEEERRRRREEE", 400


@app.route("/<name>")
def loadfile(name):
    return send_from_directory(".", name)
if __name__ == "__main__":
    app.run("0.0.0.0", 8000, debug=True)

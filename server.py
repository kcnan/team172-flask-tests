from flask import Flask, request, redirect, send_file, flash, send_from_directory, url_for
from flask_cors import CORS
#from hashlib import sha256
#import sqlite3
import os
import json

def json_managment(data):
    with open("all_events.json", "r") as file:
        existing_data = json.load(file)
    existing_data.extend(data)
    with open("all_events.json", "w") as file:
        json.dump(existing_data, file)
    #with open('all_events.json', 'w') as file:
        #file.write(data)
        #json.dump(prev_data, file)
    

app = Flask(__name__)
app.config["SECRET_KEY"] = "very secret key"
#db = sqlite3.connect(":memory:")

CORS(app)

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

@app.route("/cal_upload", methods=["GET", "POST"])
def cal_upload():
    if request.method == "GET":
        return send_file("upload_calendar.html")
    if request.method == "POST":
        data = request.get_json()
        print(data)
        json_managment(data)
        return "got it"

@app.route("/get_event")
def get_event():
    if request.method == "GET":
        with open("all_events.json") as file:
            data = json.load(file)
        return data
    else:
        flash("cannot post to here")

@app.route("/<name>")
def loadfile(name):
    return send_from_directory(".", name)
if __name__ == "__main__":
    app.run("0.0.0.0", 8000, debug=True)
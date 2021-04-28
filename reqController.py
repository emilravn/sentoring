from flask import Flask, redirect, url_for, render_template, request, jsonify 
#from testproject.spiders.testspider import QuotesSpider
from APIreq import APIHandler, DataHandler
import pandas as pd

app = Flask(__name__)
api_handler = APIHandler()
data_handler = DataHandler()
sentiment = []

data2 = {'data_list': [], 'current_state': 0}
#current = {'current_state': 0}



"""
@app.route("/", methods=["POST", "GET"])
def home():
    
    if request.method == "POST":
        user = request.form["nm"]
        query_result = api_handler.runHandler(user)
        data2['data_list'] = data_handler.runHandler(query_result)
        
        
    return render_template("index.html", data_t=data2, current_t = current)

"""
@app.route('/test2', methods=["POST", "GET"])
def test2():
    
    data2['current_state'] = 0
    if request.method == "POST":
        user = request.form["nm"]
        query_result = api_handler.runHandler(user)
        data2['data_list'] = data_handler.runHandler(query_result)
        data2['current_state'] = 1
        return render_template("index2.html", data_t=data2, text=user)
    
    
    return render_template("index2.html", data_t=data2)



@app.route("/login", methods=["POST", "GET"])
def login():
    if request.method == "POST":
        user = request.form["nm"]
        query_result = api_handler.runHandler(user)
        sentiment = data_handler.runHandler(query_result)

        return render_template("result.html", content=sentiment)
    else:
        return render_template("login.html")

@app.route("/<usr>")
def user(usr):
    return f"<h1>{usr}</h1>"




if __name__ == "__main__":
    app.run(debug=True)
from flask import Flask, redirect, url_for, render_template, request, jsonify 
from APIreq import APIHandler, DataHandler
import pandas as pd

app = Flask(__name__)
api_handler = APIHandler()
data_handler = DataHandler()


data = {'data_list': [], 'current_state': 0}




#connects index page with the backend
@app.route('/', methods=["POST", "GET"])
def test2():
    
    data['current_state'] = 0
    if request.method == "POST":
        user_search = request.form["nm"]
        query_result = api_handler.runHandler(user_search)
        data['data_list'] = data_handler.runHandler(query_result)
        data['current_state'] = 1
        return render_template("index.html", data_t=data, text=user_search)
    
    
    return render_template("index.html", data_t=data)

@app.route('/about')
def about():
    return render_template("about-us.html")





@app.route("/<usr>")
def user(usr):
    return f"<h1>{usr}</h1>"




if __name__ == "__main__":
    app.run(debug=True)
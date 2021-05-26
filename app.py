from flask import Flask, redirect, url_for, render_template, request, jsonify
from api_request import APIHandler, DataHandler

app = Flask(__name__)
api_handler = APIHandler()
data_handler = DataHandler()

# connects index page with the backend
@app.route('/', methods=["POST", "GET"])
def analyzer():
    data = {"tweet_data": {}, "current_state": 0}
    if request.method == "POST":
        user_search = request.form["nm"]
        query_result = api_handler.runHandler(user_search)
        data['tweet_data'] = data_handler.runHandler(query_result)
        data['current_state'] = 1
        return render_template("index.html", data_t=data, text=user_search)
    return render_template("index.html", data_t=data)

@app.route('/about')
def about():
    return render_template("about-us.html")

if __name__ == "__main__":
    app.run(debug=True)

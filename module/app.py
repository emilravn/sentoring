from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return 'Sentoring is now alive with Python Flask!'

if __name__ == '__main__':
    app.run()
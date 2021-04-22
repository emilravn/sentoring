from flask import Flask, render_template

app = Flask(__name__, template_folder="static/templates")

@app.route("/")
def homepage():
    return render_template('index.html')

host = "0.0.0.0"
port = 5010

# Kør direkte fra Python uden at initiere flask
if __name__ == "__main__":
    print(f"Serveren kører på localhost på port {port}.")
    app.run(host=host, port=port,debug=True) # Vi sætter i debug mode for ikke at skulle genstarte programmet hver gang vi laver en ændring
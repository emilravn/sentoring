# Sentoring
Sentoring is a sentiment analysis tool for conducting analysis on tweets made by users on Twitter. The tool retrieves a large sets of comments based on keywords given by the user. The retrieved data is then fed into a sentimental model for analysis, determining positive, negative, and neutral sentiment from these tweets. It will then present the analysis as graphical representations in the form of charts, tables and diagrams, giving the user an overview of the sentiment about the keyword(s) they searched for.

# Running the application
- Verify that you have the latest version of Python (Python 3.9.5)
- Clone the repository to your device and CD into the root folder.
- Create a new virtual environment for this project. On Linux, this is by running `python3 -m venv .env`.
- Activate the environment. On Linux, this is done by running `source .env/bin/activate/` in the same folder you created the environment.
- Rebuild the required packages into the environment as listed in the `requirements.txt` file by running `pip install -r requirements.txt`.
- To start the application, run `python app.py` in the root folder.
- Navigate to the IP address depicted by your terminal. Usually at http://127.0.0.1:PORT

## External libraries used
- Flask: https://github.com/pallets/flask
- Tweepy:https://github.com/tweepy/tweepy
- vaderSentiment: https://github.com/cjhutto/vaderSentiment
import tweepy as tw
import pandas as pd
import json
from datetime import datetime, timedelta
import re
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from matplotlib import pyplot as plt


class APIHandler:
    """
    This class handles the connection with the twitter API
    """

    __tweet_content = pd.DataFrame()

    def __loadCredentials(self):
        # Load credentials from json file
        with open("twitter_credentials.json", "r") as file:
            creds = json.load(file)

        auth = tw.OAuthHandler(creds["CONSUMER_KEY"], creds["CONSUMER_SECRET"])
        auth.set_access_token(creds["ACCESS_TOKEN"], creds["ACCESS_SECRET"])
        api = tw.API(auth, wait_on_rate_limit=True)
        return api

    def queryAPI(self, search_words):
        today = datetime.today()
        week = today - timedelta(days=7)

        tweets = tw.Cursor(
            self.__loadCredentials().search,
            q=search_words + " -filter:retweets",
            lang="en",
            since=week.date(),
        ).items(15)
        users_locs = [
            [tweet.text, tweet.user.screen_name, tweet.user.location, tweet.created_at]
            for tweet in tweets
        ]

        self.__tweet_content = pd.DataFrame(
            data=users_locs, columns=["tweet", "user", "location", "date"]
        )

    def runHandler(self, search_words):
        self.queryAPI(search_words)
        return self.__tweet_content


class DataHandler:

    """
    This class handles the data extracted from twitter
    """

    __processed_data = {}

    def __processData(self, dataframe):
        id_count = 0
        for t in range(len(dataframe)):
            self.__processed_data[str(id_count)] = [
                dataframe.iloc[id_count][0],
                dataframe.iloc[id_count][2],
                0,
            ]

            id_count += 1

    def __remove_url(self, text):
        return " ".join(re.sub("([^0-9A-Za-z \t])|(\w+:\/\/\S+)", "", text).split())

    def __sentiment_analyzer_scores(self, sentence):
        analyser = SentimentIntensityAnalyzer()
        score = analyser.polarity_scores(sentence)
        return score.get("compound")

    def __cleanText(self):
        for t in self.__processed_data:
            self.__processed_data[t][0] = self.__remove_url(self.__processed_data[t][0])

    def __analyzeText(self):
        for t in self.__processed_data:
            self.__processed_data[t][2] = self.__sentiment_analyzer_scores(
                self.__processed_data[t][0]
            )

    def runHandler(self, tweets):
        self.__processData(tweets)
        self.__cleanText()
        self.__analyzeText()
        return self.__processed_data

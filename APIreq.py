import os
import tweepy as tw
import pandas as pd
import csv
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



    
    def loadCredentials(self): 
        # Load credentials from json file
        with open("twitter_credentials.json", "r") as file:
            creds = json.load(file)

        auth = tw.OAuthHandler(creds['CONSUMER_KEY'], creds['CONSUMER_SECRET'])
        auth.set_access_token(creds['ACCESS_TOKEN'], creds['ACCESS_SECRET'])
        api = tw.API(auth, wait_on_rate_limit=True)
        return api

    def queryAPI(self, search_words):
        today = datetime.today()
        week = today - timedelta(days=7)
        
        tweets = tw.Cursor(self.loadCredentials().search,
              q=search_words,
              lang="en",
              since=week.date()).items(100)
        users_locs = [[tweet.text, tweet.user.screen_name, tweet.user.location] for tweet in tweets]

        self.__tweet_content = pd.DataFrame(data=users_locs, 
                    columns=['tweet', 'user', "location"])

    def extractText(self): 
        tweet_text = []

        for t in self.__tweet_content['tweet']: 
            tweet_text.append(t)
        return tweet_text
    
    def runHandler(self, search_words):
        self.queryAPI(search_words)
        tweets = self.extractText()
        return tweets


class DataHandler: 

    """
    This class handles the data extracted from twitter 
    """

    __cleaned_tweets = []
    __tweet_sentiment_score = []

    def __remove_url(self, text):
        return " ".join(re.sub("([^0-9A-Za-z \t])|(\w+:\/\/\S+)", "", text).split())

    def __sentiment_analyzer_scores(self, sentence):
        analyser = SentimentIntensityAnalyzer()
        score = analyser.polarity_scores(sentence)
        return score.get('compound')

    def cleanText(self, tweets):
        self.__cleaned_tweets = [self.__remove_url(tweet) for tweet in tweets]
        
    def analyzeText(self):
        tweet_sentiment_score = [self.__sentiment_analyzer_scores(tweet) for tweet in self.__cleaned_tweets]
        return tweet_sentiment_score

    def presentData(self):
        categories = [0, 0, 0]
        categories_labels = ['Negative', 'Neutral', 'Positive']
        explode = (0.1, 0.1, 0.1)

        for t in self.__tweet_sentiment_score:
            print(t)
            if t >= 0.05:
                categories[2] += 1
            elif t > -0.05 and t < 0.05:
                categories[1] += 1
            elif t <= -0.05:
                categories[0] += 1

        plt.hist(self.__tweet_sentiment_score, facecolor='peru', edgecolor='blue', bins=10)
        plt.show()
        plt.pie(categories, labels=categories_labels, wedgeprops={'edgecolor': 'black'}, explode=explode, autopct='%.2f')
        plt.show()

    def runHandler(self, tweets):
        self.cleanText(tweets) 
        sentiment_score = self.analyzeText()
        return sentiment_score
    
#The following code runs the program        




import pandas as pd
import random
import os


class TourBot:
    def __init__(self):
        dir_path = os.path.dirname(os.path.realpath(__file__))
        self.__df = pd.read_csv(f'{dir_path}/Datasets/example0.csv')
        self.__atlist = pd.unique(self.__df['attraction'])
    def getans(self, query_data = ''):
        return random.choice(self.__atlist)
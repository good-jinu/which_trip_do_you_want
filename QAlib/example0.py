import pandas as pd
import random
import os
import pickle
from konlpy.tag import Okt

class TourBot:
    def __init__(self):
        dir_path = os.path.dirname(os.path.realpath(__file__))
        self.__okt = Okt()
        self._region_lst = ['부산','서울','제주도','제주','인천','대구','대전']
        with open(f'{dir_path}/Datasets/word_count_rank.pickle', 'rb') as handle:
            self.__word_rank = pickle.load(handle)
    def getans(self, query_data = ''):
        region_filter = []
        for i in self._region_lst:
            if i in query_data:
                query_data = query_data.replace(i, '')
                if i == '제주도':
                    i = '제주'
                region_filter.append(i)
                break
        if not region_filter:
            region_filter = self.__word_rank.keys()
        tokens=self.__okt.morphs(query_data)
        print(tokens)
        maxpool_lst = {}
        maxpool_tmp = 1000
        for i in region_filter:
            for j in self.__word_rank[i].keys():
                maxpool_tmp = 1000
                for t in tokens:
                    try:
                        maxpool_tmp = min(maxpool_tmp, self.__word_rank[i][j][t])
                    except:
                        continue
                if maxpool_tmp < 1000:
                    maxpool_lst[(i, j)] = maxpool_tmp
        ans = sorted(list(maxpool_lst.items()), key=lambda x: x[1])
        if ans:
            return f"{ans[0][0][0]}에 {ans[0][0][1]} 어떤가요?"
        else:
            return '죄송합니다. 적합한 관광지를 찾지 못했어요.'
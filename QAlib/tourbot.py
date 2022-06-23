import pandas as pd
import random
import os
import pickle
from konlpy.tag import Okt
import re
import math

class TourBot:
    def __init__(self):
        dir_path = os.path.dirname(os.path.realpath(__file__))
        self.__okt = Okt()
        with open(f'{dir_path}/Datasets/word_count_rank.pickle', 'rb') as handle:
            self.__word_rank = pickle.load(handle)
        self._region_lst = ['제주도'] + list(self.__word_rank.keys())
        self.__stopwords=set(['은','는','이','가','를','들','에게','의','을','도','으로','만','라서',
                              '정말','진짜','너무','추천','장소','사람','좋다','가다','같다','곳','꼭',
                              '않다','년','월','일','하다','있다','이다','에','한','수','되다','에서',
                              '고','인','라고','과','적','로','와','보다','보이다','에는','가면','때',
                              '볼','분','에도','근처','하고','주변','좀','많다','말다','같이','가기',
                              '해주다','이랑','알다','어디가'])

    def __min_score(self, region_filter, tokens):
        #각 attraction에 대해 score값 계산 (score 값이 낮을 수록 관련성이 높음)
        score_dct = {}
        weight = []
        for i in region_filter:
            for j in self.__word_rank[i].keys():
                score_tmp = 1.0
                for t in tokens:
                    try:
                        score_tmp *= self.__word_rank[i][j][t]
                    except:
                        #단어가 존재하지 않는다면 score값을 증가시켜서 비용증가
                        score_tmp *= 2.5
                #score 값이 1.0보다 작으면 score리스트에 값 추가
                if score_tmp < 0.5:
                    score_dct[(i, j)] = score_tmp
                    weight.append(math.pow(1 / score_tmp, 0.75))
        # score값을 오름차순 정렬
        ans_rand = []
        while len(ans_rand) < 5 and len(ans_rand) < len(score_dct):
            choice = random.choices(list(score_dct.items()), weights = weight, k = 1)
            if choice not in ans_rand:
                ans_rand.append(choice)
        ans = sorted(list(score_dct.items()), key=lambda x: x[1])
        print(len(ans))
        return ans, ans_rand

    def getans(self, query_data = '', is_random = False):
        #지역 필터링
        query_data = re.sub('[^가-힣]', ' ', query_data)  # 한글 제외한 문자 삭제
        query_data = re.sub('\s{2,}', ' ', query_data)    
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

        #입력값을 토큰화
        tokens = self.__okt.morphs(query_data, stem=True)
        tokens = set(tokens) - self.__stopwords
        print(tokens)

        ans, ans_rand = self.__min_score(region_filter = region_filter, tokens = tokens)
        if ans:
            if len(ans)>5:
                if is_random:
                    for i in range(5):
                        return [f"{j[i][0][0]}, {j[i][0][1]}" for j in ans_rand]
                else:
                    ans = ans[:5]
            return [f"{i[0][0]}, {i[0][1]}" for i in ans]
        else:
            return ['죄송합니다. 적합한 관광지를 찾지 못했어요.']


if __name__ == '__main__':
    a = TourBot()
    print(a.getans('산책하기 좋은 공원'))
    print(a.getans('친구들이랑 같이 가기 좋은 놀이공원'))
    print(a.getans('재미있는 놀이기구가 있는 곳'))
    print(a.getans('데이트 장소 추천해줘'))
    print(a.getans('데이트 코스 어디가 좋아?'))
    print(a.getans('코스 알려줘'))
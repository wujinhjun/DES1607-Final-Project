#!/usr/bin/env python
# coding: utf-8

# In[6]:


# -*- coding:utf-8 -*-
import time
import json
import jieba
from collections import Counter


with open("唐诗三百首-简体.json","r",encoding="utf-8") as f:
    L=json.load(f)
    global list3
    list3=[]
    for j in range(0,len(L)):
        list2=[]
        for i in range(0,len(L[j]["paragraphs"])):
            #print(L[j]["paragraphs"][i])
            word2=L[j]["paragraphs"][i]
            seg_list = list(jieba.cut(word2, cut_all=True))

            for x in seg_list:
                if (x=="，"):
                    seg_list.remove(x)
            for x in seg_list:
                if (x=="。"):
                    seg_list.remove(x)
            for x in seg_list:
                if (x=="？"):
                    seg_list.remove(x)
            list2=list2+seg_list
            
        res= Counter(list2)
        list3.append(dict(res))
    print(list3)

with open("唐诗三百首-预处理.json","w",encoding='utf-8') as fw:
    json.dump(list3,fw,ensure_ascii=False)


# In[ ]:





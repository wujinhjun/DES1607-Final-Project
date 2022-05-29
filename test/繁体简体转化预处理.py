#!/usr/bin/env python
# coding: utf-8

# In[1]:


import time
import json
from collections import Counter
from zhconv import convert

with open("唐诗三百首.json","r",encoding="utf-8") as f:
    L=json.load(f)
for x in range(0,len(L)):
    L[x]["author"]=convert(L[x]["author"], 'zh-cn')
    L[x]["title"]=convert(L[x]["title"], 'zh-cn')
    for i in range(0,len(L[x]["paragraphs"])):
        s = L[x]["paragraphs"][i]
        s1 = convert(s, 'zh-cn')
        L[x]["paragraphs"][i]=s1

with open("唐诗三百首-简体.json","w",encoding='utf-8') as fw:
    json.dump(L,fw,ensure_ascii=False)


# In[ ]:





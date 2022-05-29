#!/usr/bin/env python
# coding: utf-8

# In[4]:


import asyncio
import time
import json
import requests
import jieba
import websockets
from tkinter import *
from tkinter.messagebox import *
from tkinter import ttk
from collections import Counter

userName = 'wujinhjun'
userPassword = "kaimozhenhao"

with open("唐诗三百首-预处理.json", "r", encoding="utf-8") as f0:
    L = json.load(f0)

with open("唐诗三百首-简体.json", "r", encoding="utf-8") as f1:
    L2 = json.load(f1)


# 检测客户端权限，用户名密码通过才能退出循环
async def check_permit(websocket):
    while True:
        recv_str = await websocket.recv()
        cred_dict = recv_str.split(":")
        if cred_dict[0] == userName and cred_dict[1] == userPassword:
            response_str = "已连接到服务器\r\n可以开始发送信息"
            await websocket.send(response_str)
            return True
        else:
            response_str = "认证失败"
            await websocket.send(response_str)


# 接收客户端消息并处理，这里只是简单把客户端发来的返回回去
async def recv_msg(websocket):
    while True:
        recv_text = await websocket.recv()

        response_text = f"服务器收到: {recv_text}"
        # 把信息发回
        await websocket.send(search(recv_text))


# 服务器端主逻辑
# websocket和path是该函数被回调时自动传过来的，不需要自己传
async def main_logic(websocket, path):
    await check_permit(websocket)

    await recv_msg(websocket)


def search(word0):
    seg_list = list(jieba.cut(word0, cut_all=True))
    res = Counter(seg_list)
    a = dict(res)
    list5 = []

    for i in range(0, len(L)):
        list4 = []
        lst1 = list(L[i].keys())
        lst2 = list(a.keys())
        d = set(lst1)  # 转成元祖
        b = set(lst2)
        c = (d & b)  # 集合c和b中都包含了的元素
        for m in c:
            list4.append(m)
        list5.append(list4)

    D = dict()
    for i in range(0, len(list5)):
        D[i] = len(list5[i])

    max_key = max(D, key=D.get)
    s = ""
    s = L2[max_key]["title"] + "\n" + L2[max_key]["author"] + "\n"

    for i in range(0, len(L2[max_key]["paragraphs"])):
        s = s + L2[max_key]["paragraphs"][i] + "\n"
    s = s + "关键词: " + x + "\n"
    return s


def main():
    start_server = websockets.serve(main_logic, 'localhost', 5678)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()


if __name__ == "__main__":
    main()

# # 把ip换成自己本地的ip
# start_server = websockets.serve(main_logic, 'localhost', 5678)
# # 如果要给被回调的main_logic传递自定义参数，可使用以下形式
# # 一、修改回调形式
# # import functools
# # start_server = websockets.serve(functools.partial(main_logic, other_param="test_value"), '10.10.6.91', 5678)
# # 修改被回调函数定义，增加相应参数
# # async def main_logic(websocket, path, other_param)
#
# asyncio.get_event_loop().run_until_complete(start_server)
# asyncio.get_event_loop().run_forever()


# In[ ]:

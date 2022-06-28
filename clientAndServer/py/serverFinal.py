import asyncio
import json
import os
from collections import Counter

import jieba
import websockets

userName = 'wujinhjun'
userPassword = "kaimozhenhao"

file_path6 = r"poem_simplified/"
file_path7 = r"poem_dispose/"
folders6 = os.listdir(file_path6)
folders7 = os.listdir(file_path7)


# 检测客户端权限，用户名密码通过才能退出循环
async def check_permit(websocket):
    while True:
        recv_str = await websocket.recv()
        cred_dict = recv_str.split(":")
        if cred_dict[0] == userName and cred_dict[1] == userPassword:
            response_str = "已连接到服务器\r\n可以开始发送信息"
            await websocket.send(response_str)
            print(response_str)
            return True
        else:
            response_str = "认证失败"
            await websocket.send(response_str)


# 接收客户端消息并处理，这里只是简单把客户端发来的返回回去
async def recv_msg(websocket):
    while True:
        recv_text = await websocket.recv()

        # response_text = f"服务器收到: {recv_text}"
        # 把信息发回
        response_text = search(recv_text)
        await websocket.send(response_text)


# 服务器端主逻辑
async def main_logic(websocket, path):
    await check_permit(websocket)

    await recv_msg(websocket)


def search(word0):
    seg_list = list(jieba.cut(word0, cut_all=True))
    res = Counter(seg_list)
    global a
    a = dict(res)

    list6 = []
    for file7 in folders7:
        with open(os.path.join(file_path7, file7), "r", encoding="utf-8") as f7:
            L = json.load(f7)

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
            list6.append(list5)

    D1 = dict()
    list7 = []
    for j in range(0, len(list6)):
        D = dict()
        for x in range(0, len(list6[j])):
            D[x] = len(list6[j][x])
        max_key = max(D, key=D.get)
        list7.append(D)
        D1[j] = D[max_key]
    max_key1 = max(D1, key=D1.get)

    max_key2 = max(list7[max_key1], key=list7[max_key1].get)

    s = ""
    poem = ""
    with open(os.path.join(file_path6, folders6[max_key1]), "r", encoding="utf-8") as f6:
        L2 = json.load(f6)
        s = L2[max_key2]["title"] + "\n" + L2[max_key2]["author"] + "\n"

        for i in range(0, len(L2[max_key2]["paragraphs"])):
            s = s + L2[max_key2]["paragraphs"][i] + "\n"
        poem = s.split('\n', 2)[2]
        # print(poem)
        s = s + "#\n" + "关键词：" + "\n"

    with open(os.path.join(file_path7, folders7[max_key1]), "r", encoding="utf-8") as f0:
        L2 = json.load(f0)
        lst1 = list(L2[max_key2].keys())
        lst2 = list(a.keys())
        d = set(lst1)  # 转成元祖
        b = set(lst2)
        c = (d & b)  # 集合c和b中都包含了的元素
        for x in c:
            s = s + x + " "
        s = s + "\n"
    resp_temp = f"{s}#\n{poem}"
    print(resp_temp)
    return resp_temp


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
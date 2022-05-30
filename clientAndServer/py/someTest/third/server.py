import asyncio

import websockets

connections = {}
userIds = []


# 注册用，注册结束后退出循环
async def login(websocket):
    recvStr = await websocket.recv()
    loginMsgDict = recvStr.split(":")
    userId = loginMsgDict[0]
    while userId not in userIds:
        userIds.append(userId)
        print(userId)
        print(connections)
        if loginMsgDict[1] == "name":
            connections[userId] = websocket
            await websocket.send("congratulation")
            return True
        else:
            print("continue")
            # print(connections)
            # await dealMsg(userId)


# 发送信息
async def dealMsg(userId):
    while True:
        websocket = connections[userId]
        recvText = await websocket.recv()

        responseText = f"服务器收到来自{userId}的：{recvText}"
        print(responseText)
        await websocket.send(responseText)


#
# async def hello(userId):
#     websocket = connections[userId]
#     name = await websocket.recv()
#     print(f"<<< {name}")
#
#     greeting = f"服务器收到： {name}!"
#
#     await websocket.send(greeting)
#     print(f">>> {greeting}")


async def handler(websocket):
    await login(websocket)
    for uid in userIds:
        await dealMsg(uid)
    # userId = await websocket.recv()


async def main():
    async with websockets.serve(handler, "localhost", 5678):
        await asyncio.Future()  # run forever
    # start_server = websockets.serve(handler, 'localhost', 5678)
    # asyncio.get_event_loop().run_until_complete(start_server)
    # asyncio.get_event_loop().run_forever()


if __name__ == "__main__":
    # main()
    asyncio.run(main())

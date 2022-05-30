import asyncio

import websockets

nameInput = "client_02"


# 注册一下
async def login(websocket):
    while True:
        # nameInput = input("please edit your name")
        loginText = f"{nameInput}:name"
        await websocket.send(loginText)
        response_str = await websocket.recv()
        # print("yes?")
        if "congratulation" in response_str:
            print(f"收到{response_str}")
            return True


# 发送信息
async def sendMsg(websocket):
    while True:
        text = input("please enter your context: ");
        if text == "exit":
            print("goodbye")
            await websocket.close(reason="user exit")
            return False
        textRespon = f"{nameInput}:{text}"
        await websocket.send(textRespon)
        print(f"{nameInput}:{text}")

        greeting = await websocket.recv()
        print(f"{greeting}")


# 初始函数
async def mainLogic():
    url = "ws://localhost:5678"
    # while True:
    async with websockets.connect(url) as websocket:
        # print("hello")
        # await login(websocket)
        await sendMsg(websocket)


def main():
    asyncio.get_event_loop().run_until_complete(mainLogic())


if __name__ == "__main__":
    main()

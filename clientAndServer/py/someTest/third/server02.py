import asyncio

import websockets

connections = {}


async def hello(websocket):
    recvText = await websocket.recv()
    name = recvText.split(":")[0]
    message = recvText.split(":")[1]
    # print(recvText)
    connections[name] = websocket
    # print(connections)
    # await sendMsg(name)
    # message = await websocket.recv()
    # message = f"服务器收到{message}"
    # print(message)
    # await websocket.send(message)
    try:
        await sendMsg(name, message)
        await websocket.wait_closed()
    finally:
        del connections[name]


async def sendMsg(uid, message):
    websocket = connections[uid]
    # message = await websocket.recv()
    message = f"服务器收到{message}"
    print(message)
    await websocket.send(message)
    # print(f"<<< {name}")
    #
    # greeting = f"Hello {name}!"
    #
    # await websocket.send(greeting)
    # print(f">>> {greeting}")


async def main():
    async with websockets.serve(hello, "localhost", 5678):
        # print(connections)
        # for i in connections.keys():
        #     await sendMsg(i)
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    asyncio.run(main())

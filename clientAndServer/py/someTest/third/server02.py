import asyncio

import websockets

connections = {}


async def hello(websocket):
    # while True:
    recvText = await websocket.recv()
    name = recvText.split(":")[0]
    message = recvText.split(":")[1]
    connections[name] = websocket
    # if message == "exit":
    #     print("goodbye")
    #     break
    try:
        await sendMsg(name, message)
    finally:
        await websocket.wait_closed()
        del connections[name]


async def sendMsg(uid, message):
    websocket = connections[uid]
    # message = await websocket.recv()
    message = f"服务器收到{message}"
    print(message)
    await websocket.send(message)


def main():
    start_server = websockets.serve(hello, 'localhost', 5678)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()
    # async with websockets.serve(hello, "localhost", 5678):
    #     # print(connections)
    #     # for i in connections.keys():
    #     #     await sendMsg(i)
    #     await asyncio.Future()  # run forever


if __name__ == "__main__":
    # asyncio.run(main())
    main()

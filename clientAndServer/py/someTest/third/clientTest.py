import asyncio

import websockets

uid = "clientTest"


# async def


async def hello():
    uri = "ws://localhost:5678"
    async with websockets.connect(uri) as websocket:
        name = input("What's your name? ")
        text = f"{uid}:{name}"
        await websocket.send(text)
        print(f">>> {text}")

        greeting = await websocket.recv()
        print(f"<<< {greeting}")


if __name__ == "__main__":
    asyncio.run(hello())

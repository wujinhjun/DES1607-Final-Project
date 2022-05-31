import asyncio

import websockets

uid = "clientTest"


# async def


async def hello():
    uri = "ws://localhost:5678"
    async with websockets.connect(uri) as websocket:
        while True:
            content = input("What's your content? ")
            text = f"{uid}:{content}"
            await websocket.send(text)
            if content == "exit":
                print("goodbye")
                break

            print(f">>> {text}")

            greeting = await websocket.recv()
            print(f"<<< {greeting}")


if __name__ == "__main__":
    asyncio.run(hello())
#     asyncio.get_event_loop().run_until_complete(hello())
# def main():
#     asyncio.get_event_loop().run_until_complete(hello())
#
#
# if __name__ == "__main__":
#     main()

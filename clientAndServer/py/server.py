import asyncio

import websockets

userName = 'wujinhjun'
userPassword = "kaimozhenhao"


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
        # recv_text： 接受信息
        #
        response_text = f"服务器收到: {recv_text}"
        # 把信息发回
        await websocket.send(response_text)


# 服务器端主逻辑
# websocket和path是该函数被回调时自动传过来的，不需要自己传
async def main_logic(websocket, path):
    await check_permit(websocket)

    await recv_msg(websocket)


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

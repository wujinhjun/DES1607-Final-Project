var app = require('http').createServer();
var io = require("socket.io")(app);

var port = 3000

app.listen(port);
var clientCount = 0
io.on('connection', function (socket) {
    clientCount++
    socket.nickname = 'user' + clientCount
    //io针对所有的连接对象,即广播
    //单个socket对象仅针对当前连接对象
    io.emit('enter', socket.nickname + ' comes in')

    socket.on('message', function (str) {
        io.emit('message', socket.nickname + ' says: ' + str)
    })

    socket.on('disconnect', function () {
        io.emit('leave', socket.nickname + ' left')
    })
})

console.log('websocket server listening on port ' + port)
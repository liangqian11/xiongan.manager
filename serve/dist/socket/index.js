'use strict';

var http = require('http');
var SocketIO = require('socket.io');

var log = require('../plugin/util/log');

app.server = http.createServer(app.callback());
app.listen = function listen() {
  app.server.listen.apply(app.server, arguments);
  return app.server;
};
global.io = new SocketIO(app.server);

exports.listen = function () {
  io.on('connection', function (socket) {
    log.warn('连入');
    socket.emit('linked', { msg: '连接Socket成功' });

    socket.on('join', function (data) {
      log.info(data);
      socket.join(data.room);
      log.info('加入房间成功');
      socket.emit('joined', { msg: '加入房间成功，房间号：' + data.room });
    });

    socket.on('disconnect', function () {
      log.warn('退出');
    });
  });
};
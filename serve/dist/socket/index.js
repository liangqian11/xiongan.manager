//---------------------------------------------------------------------------- Package
const http = require('http');
const SocketIO = require('socket.io');
//---------------------------------------------------------------------------- Plugin
const log = require('../plugin/util/log');
//---------------------------------------------------------------------------- Object
app.server = http.createServer(app.callback());
app.listen = function listen() {
  app.server.listen.apply(app.server, arguments);
  return app.server;
};
global.io = new SocketIO(app.server);
//---------------------------------------------------------------------------- Socket
exports.listen = function () {
  io.on('connection', socket => {
    log.warn('连入');
    socket.emit('linked', { msg: '连接Socket成功' });

    // 进入空间与房间
    socket.on('join', data => {
      log.info(data);
      socket.join(data.room);
      log.info('加入房间成功');
      socket.emit('joined', { msg: '加入房间成功，房间号：' + data.room });
    });

    // 退出处理
    socket.on('disconnect', () => {
      log.warn('退出');
    });
  });
};
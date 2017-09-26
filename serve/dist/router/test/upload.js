//---------------------------------------------------------------------------- Config
const { MYSQL } = require('../../config');
//---------------------------------------------------------------------------- Plugin
const Upload = require('../../plugin/io/upload');
const mysql = require('../../plugin/util/mysql');
const sheet = require('../../plugin/util/sheet');
//---------------------------------------------------------------------------- GET
exports.post = {
  /**
   * 上传接口
   */
  '/upload': async (ctx, next) => {
    let upload = new Upload(ctx);
    ctx.body = upload.working();
  }
};
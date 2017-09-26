module.exports = {
  paging: {
    default: {                  // { 默认分页类型 }
      number: {                   // 全局数字设置
        item: 3,                    // 每页显示的数据条目数
        link: 5                     // 显示的链接条目数
      },
      info: {                     // 显示信息（共*条*页，当前第*页）
        enabled: false,              // 是否启用
        type: ''                    // 显示类型，暂时未定义
      },
      select: {                   // 选择框设置
        enabled: false               // 是否启用
      },
      home: {                     // 首页设置
        enabled: true,              // 是否启用
        type: 'hidden',             // 不可点或不存在时的显示方式，可选hidden, gray两种样式
        text: '首页'              // 文本
      },
      pre: {                      // 上一页设置
        enabled: true,              // 是否启用
        type: 'hidden',             // 不可点或不存在时的显示方式，可选hidden, gray两种样式
        text: '上页'                // 文本
      },
      next: {                     // 下一页设置
        enabled: true,              // 是否启用
        type: 'hidden',             // 不可点或不存在时的显示方式，可选hidden, gray两种样式
        text: '下页'                // 文本
      },
      last: {                     // 尾页设置
        enabled: true,              // 是否启用
        type: 'hidden',             // 不可点或不存在时的显示方式，可选hidden, gray两种样式
        text: '尾页'                // 文本
      }
    }
  }
}
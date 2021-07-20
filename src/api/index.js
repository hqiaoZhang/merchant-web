

export const fetchGetOrders = {
  url: '/order/getOrders',
  enableMock: true, // 是否使用本地假数据
  config: {
    method: 'POST'
  },
  mock: {
    "code": 0, 
    "error": "", 
    "trace": "", 
    "result": [
        {
            "orderId": "0dc0d41184dc405686f1a838e1aa3fcb", 
            "orderName": "融合订单001", 
            "describe": "数据融合平台1号客户的1号订单，服务内容华盛顿大学卫生统计评估研究所的模型预测显示，今年春季，新冠疫情可能会在加利福尼亚州、佛罗里达州等地再次恶化", 
            "orgName": "数据融合平台1号客户", 
            "createTime": "2021-02-01 15:31:29", 
            "jobs": "13", 
            "tables": "42"
        }, 
        {
            "orderId": "a768dfd1097b4a67be5c546dcad5212c", 
            "orderName": "融合订单0407", 
            "describe": "", 
            "orgName": "融合客户0402", 
            "createTime": "2021-04-07 16:11:41", 
            "jobs": "0", 
            "tables": "5"
        }, 
        {
            "orderId": "7a7b410af0ff454cbcc7ba3b9e00738f", 
            "orderName": "数据平台测试订单", 
            "describe": "数据平台测试订单", 
            "orgName": "数据融合平台测试客户", 
            "createTime": "2021-02-01 11:40:03", 
            "jobs": "0", 
            "tables": "0"
        }, 
        {
            "orderId": "75f8330900ba40079b32d8b7a9e2d585", 
            "orderName": "融合平台订单0402", 
            "describe": "", 
            "orgName": "融合客户0402", 
            "createTime": "2021-04-02 13:25:18", 
            "jobs": "0", 
            "tables": "0"
        }
    ], 
    "successful": true
  }
}

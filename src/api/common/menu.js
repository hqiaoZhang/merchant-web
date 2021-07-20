/*
 * @Author: zhanghongqiao@hiynn.com
 * @Date: 2018-03-30 10:13:23
 * @Description: 左边菜单
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2021-07-20 11:49:02
 */

export default {
  mock: {
    "code": 0, 
    "error": "", 
    "trace": "", 
    "result": { 
        "500005": [ 
            {
                "childList": null, 
                "haveChildren": false, 
                "icon": "", 
                "id": "500005100001", 
                "menuName": "调用方管理", 
                "menuNameEn": "Data Consumer", 
                "menuType": 5, 
                "menuUrl": "/merchant-web/#/manage", 
                "orderNo": 4, 
                "parentId": "500005"
            }, 
            {
                "childList": null, 
                "haveChildren": false, 
                "icon": "", 
                "id": "a5e9ffff0c62445eb25cf04e84c88f35", 
                "menuName": "API管理", 
                "menuNameEn": "API", 
                "menuType": 5, 
                "menuUrl": "/merchant-web/#/apiManage", 
                "orderNo": 6, 
                "parentId": "500005"
            }, 
        ],  
        "javascript:void(0)": "500006",    
        "/merchant-web/#/manage": "500005",  
        "first": [
            {
                "childList": null, 
                "haveChildren": false, 
                "icon": "", 
                "id": "500001", 
                "menuName": "首页", 
                "menuNameEn": "Index", 
                "menuType": 5, 
                "menuUrl": "/merchant-web/#/index", 
                "orderNo": 1, 
                "parentId": null
            }, 
            {
              "childList": null, 
              "haveChildren": true, 
              "icon": "", 
              "id": "500005", 
              "menuName": "数据服务", 
              "menuNameEn": "DATA SERVICE", 
              "menuType": 5, 
              "menuUrl": "javascript:void(0)", 
              "orderNo": 36, 
              "parentId": null
            },  
            {
                "childList": null, 
                "haveChildren": true, 
                "icon": "", 
                "id": "500003", 
                "menuName": "数据资产", 
                "menuNameEn": "Project Data", 
                "menuType": 5, 
                "menuUrl": "javascript:void(0)", 
                "orderNo": 3, 
                "parentId": null
            }, 
            {
                "childList": null, 
                "haveChildren": true, 
                "icon": "", 
                "id": "500004", 
                "menuName": "数据开发", 
                "menuNameEn": "Data Development", 
                "menuType": 5, 
                "menuUrl": "javascript:void(0)", 
                "orderNo": 4, 
                "parentId": null
            }, 
            
        ],  
    }, 
    "successful": true
}
}

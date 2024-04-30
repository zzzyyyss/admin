const menu = {
    list() {
        return [
            {
              "type": "0",
              "typename": "管理员",
              "backMenu": [
                {
                  "menu": "用户管理",
                  "iconClass":"el-icon-user",
                  "child": [
                    {
                      "menu": "用户添加",
                      "routerName": "usersadd",
                      "iconClass":"el-icon-circle-plus",
                    },
                    {
                      "menu": "用户列表",
                      "routerName": "usersmana",
                      "iconClass":"el-icon-menu",
                    },
                    {
                      "menu": "修改密码",
                      "routerName": "UpdatePassword",
                      "iconClass":"el-icon-edit-outline",
                    },
                    {
                      "menu": "修改资料",
                      "routerName": "center",
                      "iconClass":"el-icon-s-check",
                    }
                  ]
                },
                {
                  "menu": "轮播图管理",
                  "iconClass":"el-icon-s-flag",
                  "child": [
                    {
                      "menu": "轮播图添加",
                      "routerName": "lunboadd"
                    },
                    {
                      "menu": "轮播图列表",
                      "routerName": "lunbomana"
                    }
                  ]
                },
                {
                  "menu": "公告管理",
                  "iconClass":"el-icon-s-platform",
                  "child": [
                    {
                      "menu": "公告添加",
                      "routerName": "gonggaoadd"
                    },
                    {
                      "menu": "公告列表",
                      "routerName": "gonggaomana"
                    },
                    {
                      "menu": "公告评论列表",
                      "routerName": "pinglunmana"
                    },
                  ]
                },
                {
                  "menu": "商品评价管理",
                  "iconClass":"el-icon-setting",
                  "child": [
                    {
                      "menu": "商品评价添加",
                      "routerName": "chanpinpingjiaadd"
                    },
                    {
                      "menu": "商品评价列表",
                      "routerName": "chanpinpingjiamana"
                    },
                  ]
                },
                {
                  "menu": "订单管理",
                  "iconClass":"el-icon-setting",
                  "child": [
                    {
                      "menu": "订单添加",
                      "routerName": "dingdanadd"
                    },
                    {
                      "menu": "订单列表",
                      "routerName": "dingdanmana"
                    },
                  ]
                },
                {
                  "menu": "订单项管理",
                  "iconClass":"el-icon-setting",
                  "child": [
                    {
                      "menu": "订单项添加",
                      "routerName": "dingdanxiangadd"
                    },
                    {
                      "menu": "订单项列表",
                      "routerName": "dingdanxiangmana"
                    },
                  ]
                },
                {
                  "menu": "付款方式管理",
                  "iconClass":"el-icon-setting",
                  "child": [
                    {
                      "menu": "付款方式添加",
                      "routerName": "fukuanfangshiadd"
                    },
                    {
                      "menu": "付款方式列表",
                      "routerName": "fukuanfangshimana"
                    },
                  ]
                },
                {
                  "menu": "购物车管理",
                  "iconClass":"el-icon-setting",
                  "child": [
                    {
                      "menu": "购物车添加",
                      "routerName": "gouwucheadd"
                    },
                    {
                      "menu": "购物车列表",
                      "routerName": "gouwuchemana"
                    },
                  ]
                },
                {
                  "menu": "配送管理",
                  "iconClass":"el-icon-setting",
                  "child": [
                    {
                      "menu": "配送添加",
                      "routerName": "peisongadd"
                    },
                    {
                      "menu": "配送列表",
                      "routerName": "peisongmana"
                    },
                  ]
                },
                {
                  "menu": "评价管理",
                  "iconClass":"el-icon-setting",
                  "child": [
                    {
                      "menu": "评价添加",
                      "routerName": "pingjiaadd"
                    },
                    {
                      "menu": "评价列表",
                      "routerName": "pingjiamana"
                    },
                  ]
                },
                {
                  "menu": "商品管理",
                  "iconClass":"el-icon-setting",
                  "child": [
                    {
                      "menu": "商品添加",
                      "routerName": "shangpinadd"
                    },
                    {
                      "menu": "商品列表",
                      "routerName": "shangpinmana"
                    },
                  ]
                },
                {
                  "menu": "商品收藏管理",
                  "iconClass":"el-icon-setting",
                  "child": [
                    {
                      "menu": "商品收藏添加",
                      "routerName": "shoucangadd"
                    },
                    {
                      "menu": "商品收藏列表",
                      "routerName": "shoucangmana"
                    },
                  ]
                },
                {
                  "menu": "收货地址管理",
                  "iconClass":"el-icon-setting",
                  "child": [
                    {
                      "menu": "收货地址添加",
                      "routerName": "shouhuodizhiadd"
                    },
                    {
                      "menu": "收货地址列表",
                      "routerName": "shouhuodizhimana"
                    },
                  ]
                },
                {
                  "menu": "分类管理",
                  "iconClass":"el-icon-setting",
                  "child": [
                    {
                      "menu": "分类添加",
                      "routerName": "zhongleiadd"
                    },
                    {
                      "menu": "分类列表",
                      "routerName": "zhongleimana"
                    },
                  ]
                },

                {
                  "menu": "系统管理",
                  "iconClass":"el-icon-setting",
                  "child": [
                    {
                      "menu": "友情链接添加",
                      "routerName": "lianjieadd"
                    },
                    {
                      "menu": "友情链接列表",
                      "routerName": "lianjiemana"
                    },
                    {
                      "menu": "介绍添加",
                      "routerName": "dxadd"
                    },
                    {
                      "menu": "介绍列表",
                      "routerName": "dxmana"
                    },
                    {
                      "menu": "留言列表",
                      "routerName": "liuyanmana"
                    }
                  ]
                }
              ]
            },
          ]
    }
}
export default menu;

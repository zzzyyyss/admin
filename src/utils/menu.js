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
                  }
                ]
              },
              {
                "menu": "商品管理",
                "iconClass":"el-icon-s-goods",
                "child": [
                  {
                    "menu": "分类添加",
                    "routerName": "zhongleiadd"
                  },
                  {
                    "menu": "分类列表",
                    "routerName": "zhongleimana"
                  },
                  
                  {
                    "menu": "商品添加",
                    "routerName": "shangpinadd"
                  },
                  {
                    "menu": "商品列表",
                    "routerName": "shangpinmana"
                  },
                  {
                    "menu": "收藏列表",
                    "routerName": "shoucangmana"
                  },
                  {
                    "menu": "评论列表",
                    "routerName": "chanpinpingjiamana"
                  }
                ]
              },
              {
                "menu": "订单管理",
                "iconClass":"el-icon-s-order",
                "child": [
                  {
                    "menu": "订单列表",
                    "routerName": "dingdanmana"
                  },
                 
                ]
              },
              {
                "menu": "付款方式管理",
                "iconClass":"el-icon-s-claim",
                "child": [
                  {
                    "menu": "付款方式添加",
                    "routerName": "fukuanfangshiadd"
                  },
                  {
                    "menu": "付款方式列表",
                    "routerName": "fukuanfangshimana"
                  }
                ]
              },
              {
                "menu": "配送评价管理",
                "iconClass":"el-icon-s-claim",
                "child": [
                
                  {
                    "menu": "配送评价列表",
                    "routerName": "pingjiamana"
                  }
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
          {
            "type": "4",
            "typename": "食堂管理员",
            "backMenu": [
              {
                "menu": "用户管理",
                "iconClass":"el-icon-user",
                "child": [
                 
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
                "menu": "商品管理",
                "iconClass":"el-icon-s-goods",
                "child": [
                  {
                    "menu": "分类添加",
                    "routerName": "zhongleiadd"
                  },
                  {
                    "menu": "分类列表",
                    "routerName": "zhongleimana"
                  },
                  
                  {
                    "menu": "商品添加",
                    "routerName": "shangpinadd"
                  },
                  {
                    "menu": "商品列表",
                    "routerName": "shangpinmana"
                  },
                  {
                    "menu": "收藏列表",
                    "routerName": "shoucangmana"
                  },
                  {
                    "menu": "评论列表",
                    "routerName": "chanpinpingjiamana"
                  }
                ]
              },
              {
                "menu": "订单管理",
                "iconClass":"el-icon-s-order",
                "child": [
                  {
                    "menu": "订单列表",
                    "routerName": "dingdanmana"
                  },
                 
                ]
              },
              {
                "menu": "付款方式管理",
                "iconClass":"el-icon-s-claim",
                "child": [
                  {
                    "menu": "付款方式添加",
                    "routerName": "fukuanfangshiadd"
                  },
                  {
                    "menu": "付款方式列表",
                    "routerName": "fukuanfangshimana"
                  }
                ]
              },
              {
                "menu": "配送评价管理",
                "iconClass":"el-icon-s-claim",
                "child": [
                
                  {
                    "menu": "配送评价列表",
                    "routerName": "pingjiamana"
                  }
                ]
              },
              
              
            ]
          },
           {
            "type": "1",
            "typename": "商家",
            "backMenu": [
              {
                "menu": "用户管理",
                "iconClass":"el-icon-user",
                "child": [
               
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
                "menu": "商品管理",
                "iconClass":"el-icon-s-goods",
                "child": [
                  
                  {
                    "menu": "商品添加",
                    "routerName": "shangpinadd"
                  },
                  {
                    "menu": "商品列表",
                    "routerName": "shangpinmanamy"
                  },
                  {
                    "menu": "收藏列表",
                    "routerName": "shoucangmanamybyshangpin"
                  },
                  {
                    "menu": "评论列表",
                    "routerName": "chanpinpingjiamanamybyshangpin"
                  }
                ]
              },
              {
                "menu": "订单管理",
                "iconClass":"el-icon-s-order",
                "child": [
                  {
                    "menu": "订单列表",
                    "routerName": "dingdanmanamy"
                  },
                 
                ]
              },
            
              // {
              //   "menu": "配送管理",
              //   "iconClass":"el-icon-s-order",
              //   "child": [
              //     {
              //       "menu": "配送详情列表",
              //       "routerName": "peisongmanamybydingdan"
              //     },
                 
              //   ]
              // },
             
            ]
          },
          {
            "type": "3",
            "typename": "配送员",
            "backMenu": [
              {
                "menu": "用户管理",
                "iconClass":"el-icon-user",
                "child": [
               
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
                "menu": "配送管理",
                "iconClass":"el-icon-s-goods",
                "child": [
                  
                 
                  {
                    "menu": "配送列表",
                    "routerName": "peisongchakanmy"
                  },
                ]
              },
            
            
            
             
            ]
          },
          {
            "type": "2",
            "typename": "用户",
            "backMenu": [
              {
                "menu": "用户管理",
                "iconClass":"el-icon-s-flag",
                "child": [
                  {
                    "menu": "修改密码",
                    "routerName": "UpdatePassword"
                  },
                  {
                    "menu": "修改资料",
                    "routerName": "center"
                  }
                ]
              },
              {
                "menu": "商品管理",
                "iconClass":"el-icon-s-flag",
                "child": [
                  {
                    "menu": "查看我的收藏",
                    "routerName": "shoucangchakanmy"
                  },
                  {
                    "menu": "查看我的评论",
                    "routerName": "chanpinpingjiachakanmy"
                  }
                ]
              },
              {
                "menu": "订单管理",
                "iconClass":"el-icon-s-flag",
                "child": [
                  {
                    "menu": "查看我的订单",
                    "routerName": "dingdanchakanmy"
                  }
                ]
              },
           
              {
                "menu": "配送管理",
                "iconClass":"el-icon-s-claim",
                "child": [
                
                  {
                    "menu": "配送查询",
                    "routerName": "peisongmanamybydingdan"
                  }
                ]
              },
              {
                "menu": "地址管理",
                "iconClass":"el-icon-s-claim",
                "child": [
                  {
                    "menu": "地址添加",
                    "routerName": "shouhuodizhiadd"
                  },
                  {
                    "menu": "我的地址查询",
                    "routerName": "shouhuodizhimanamy"
                  }
                ]
              },
              {
                "menu": "系统管理",
                "iconClass":"el-icon-setting",
                "child": [
                  {
                    "menu": "我的留言查询",
                    "routerName": "liuyanchakanmy"
                  }
                ]
              }
            ]
          }
        ]
  }
}
export default menu;

import Vue from 'vue';
//配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//1.创建组件
import Index from '@/views/index'
import Home from '@/views/home'
import Login from '@/views/login'
import NotFound from '@/views/404'
import UpdatePassword from '@/views/update-password'
import register from '@/views/register'
import center from '@/views/center'
import chanpinpingjiachakan from '@/views/modules/chanpinpingjia/chakan'
import chanpinpingjiamana from '@/views/modules/chanpinpingjia/mana'
import chanpinpingjiaadd from '@/views/modules/chanpinpingjia/chanpinpingjia-add'
import chanpinpingjiachakanmy from '@/views/modules/chanpinpingjia/chakanmy'
import chanpinpingjiamanamy from '@/views/modules/chanpinpingjia/manamy'
import chanpinpingjiamanamybyshangpin from '@/views/modules/chanpinpingjia/manamybyshangpin'
import dingdanchakan from '@/views/modules/dingdan/chakan'
import dingdanmana from '@/views/modules/dingdan/mana'
import dingdanadd from '@/views/modules/dingdan/dingdan-add'
import dingdanchakanmy from '@/views/modules/dingdan/chakanmy'
import dingdanmanamy from '@/views/modules/dingdan/manamy'
import dingdanmanamybyshouhuodizhi from '@/views/modules/dingdan/manamybyshouhuodizhi'
import dingdanxiangchakan from '@/views/modules/dingdanxiang/chakan'
import dingdanxiangmana from '@/views/modules/dingdanxiang/mana'
import dingdanxiangadd from '@/views/modules/dingdanxiang/dingdanxiang-add'
import dingdanxiangchakanmy from '@/views/modules/dingdanxiang/chakanmy'
import dingdanxiangmanamy from '@/views/modules/dingdanxiang/manamy'
import dingdanxiangmanamybyshangpin from '@/views/modules/dingdanxiang/manamybyshangpin'
import dingdanxiangmanamybydingdan from '@/views/modules/dingdanxiang/manamybydingdan'
import dxchakan from '@/views/modules/dx/chakan'
import dxmana from '@/views/modules/dx/mana'
import dxadd from '@/views/modules/dx/dx-add'
import fukuanfangshichakan from '@/views/modules/fukuanfangshi/chakan'
import fukuanfangshimana from '@/views/modules/fukuanfangshi/mana'
import fukuanfangshiadd from '@/views/modules/fukuanfangshi/fukuanfangshi-add'
import gonggaochakan from '@/views/modules/gonggao/chakan'
import gonggaomana from '@/views/modules/gonggao/mana'
import gonggaoadd from '@/views/modules/gonggao/gonggao-add'
import gouwuchechakan from '@/views/modules/gouwuche/chakan'
import gouwuchemana from '@/views/modules/gouwuche/mana'
import gouwucheadd from '@/views/modules/gouwuche/gouwuche-add'
import gouwuchechakanmy from '@/views/modules/gouwuche/chakanmy'
import gouwuchemanamy from '@/views/modules/gouwuche/manamy'
import gouwuchemanamybyshangpin from '@/views/modules/gouwuche/manamybyshangpin'
import lianjiechakan from '@/views/modules/lianjie/chakan'
import lianjiemana from '@/views/modules/lianjie/mana'
import lianjieadd from '@/views/modules/lianjie/lianjie-add'
import liuyanchakan from '@/views/modules/liuyan/chakan'
import liuyanmana from '@/views/modules/liuyan/mana'
import liuyanadd from '@/views/modules/liuyan/liuyan-add'
import liuyanchakanmy from '@/views/modules/liuyan/chakanmy'
import liuyanmanamy from '@/views/modules/liuyan/manamy'
import lunbochakan from '@/views/modules/lunbo/chakan'
import lunbomana from '@/views/modules/lunbo/mana'
import lunboadd from '@/views/modules/lunbo/lunbo-add'
import peisongchakan from '@/views/modules/peisong/chakan'
import peisongmana from '@/views/modules/peisong/mana'
import peisongadd from '@/views/modules/peisong/peisong-add'
import peisongchakanmy from '@/views/modules/peisong/chakanmy'
import peisongmanamy from '@/views/modules/peisong/manamy'
import peisongmanamybydingdan from '@/views/modules/peisong/manamybydingdan'
import pingjiachakan from '@/views/modules/pingjia/chakan'
import pingjiamana from '@/views/modules/pingjia/mana'
import pingjiaadd from '@/views/modules/pingjia/pingjia-add'
import pingjiachakanmy from '@/views/modules/pingjia/chakanmy'
import pingjiamanamy from '@/views/modules/pingjia/manamy'
import pingjiamanamybypeisong from '@/views/modules/pingjia/manamybypeisong'
import shangpinchakan from '@/views/modules/shangpin/chakan'
import shangpinmana from '@/views/modules/shangpin/mana'
import shangpinadd from '@/views/modules/shangpin/shangpin-add'
import shangpinchakanmy from '@/views/modules/shangpin/chakanmy'
import shangpinmanamy from '@/views/modules/shangpin/manamy'
import shoucangchakan from '@/views/modules/shoucang/chakan'
import shoucangmana from '@/views/modules/shoucang/mana'
import shoucangadd from '@/views/modules/shoucang/shoucang-add'
import shoucangchakanmy from '@/views/modules/shoucang/chakanmy'
import shoucangmanamy from '@/views/modules/shoucang/manamy'
import shoucangmanamybyshangpin from '@/views/modules/shoucang/manamybyshangpin'
import shouhuodizhichakan from '@/views/modules/shouhuodizhi/chakan'
import shouhuodizhimana from '@/views/modules/shouhuodizhi/mana'
import shouhuodizhiadd from '@/views/modules/shouhuodizhi/shouhuodizhi-add'
import shouhuodizhichakanmy from '@/views/modules/shouhuodizhi/chakanmy'
import shouhuodizhimanamy from '@/views/modules/shouhuodizhi/manamy'
import userschakan from '@/views/modules/users/chakan'
import usersmana from '@/views/modules/users/mana'
import usersadd from '@/views/modules/users/users-add'
import zhongleichakan from '@/views/modules/zhonglei/chakan'
import zhongleimana from '@/views/modules/zhonglei/mana'
import zhongleiadd from '@/views/modules/zhonglei/zhonglei-add'


//2.配置路由   注意：名字
const routes = [{
  path: '/index',
  name: '首页',
  component: Index,
  children: [{
    // 这里不设置值，是把main作为默认页面
    path: '/',
    name: '首页',
    component: Home,
    meta: { icon: '', title: 'center' }
  }
  , {
    path: '/updatePassword',
    name: '修改密码',
    component: UpdatePassword,
    meta: { icon: '', title: 'updatePassword' }
  }, {
    path: '/center',
    name: '修改资料',
    component: center,
    meta: { icon: '', title: 'center' }
  }
  , {
    path: '/chanpinpingjiachakan',
    name: '商品评价查看',
    component: chanpinpingjiachakan
  }
  , {
    path: '/chanpinpingjiamana',
    name: '商品评价查询',
    component: chanpinpingjiamana
  }
  , {
    path: '/chanpinpingjiaadd',
    name: '商品评价添加',
    component: chanpinpingjiaadd
  }
  , {
    path: '/chanpinpingjiachakanmy',
    name: '查看我的商品评价',
    component: chanpinpingjiachakanmy
  }
  , {
    path: '/chanpinpingjiamanamy',
    name: '管理我的商品评价',
    component: chanpinpingjiamanamy
  }
  , {
    path: '/chanpinpingjiamanamybyshangpin',
    name: '管理我的商品评价',
    component: chanpinpingjiamanamybyshangpin
  }
  , {
    path: '/dingdanchakan',
    name: '订单查看',
    component: dingdanchakan
  }
  , {
    path: '/dingdanmana',
    name: '订单查询',
    component: dingdanmana
  }
  , {
    path: '/dingdanadd',
    name: '订单添加',
    component: dingdanadd
  }
  , {
    path: '/dingdanchakanmy',
    name: '查看我的订单',
    component: dingdanchakanmy
  }
  , {
    path: '/dingdanmanamy',
    name: '管理我的订单',
    component: dingdanmanamy
  }
  , {
    path: '/dingdanmanamybyshouhuodizhi',
    name: '管理我的订单',
    component: dingdanmanamybyshouhuodizhi
  }
  , {
    path: '/dingdanxiangchakan',
    name: '订单项查看',
    component: dingdanxiangchakan
  }
  , {
    path: '/dingdanxiangmana',
    name: '订单项查询',
    component: dingdanxiangmana
  }
  , {
    path: '/dingdanxiangadd',
    name: '订单项添加',
    component: dingdanxiangadd
  }
  , {
    path: '/dingdanxiangchakanmy',
    name: '查看我的订单项',
    component: dingdanxiangchakanmy
  }
  , {
    path: '/dingdanxiangmanamy',
    name: '管理我的订单项',
    component: dingdanxiangmanamy
  }
  , {
    path: '/dingdanxiangmanamybyshangpin',
    name: '管理我的订单项',
    component: dingdanxiangmanamybyshangpin
  }
  , {
    path: '/dingdanxiangmanamybydingdan',
    name: '管理我的订单项',
    component: dingdanxiangmanamybydingdan
  }
  , {
    path: '/dxchakan',
    name: '信息介绍查看',
    component: dxchakan
  }
  , {
    path: '/dxmana',
    name: '信息介绍查询',
    component: dxmana
  }
  , {
    path: '/dxadd',
    name: '信息介绍添加',
    component: dxadd
  }
  , {
    path: '/fukuanfangshichakan',
    name: '付款方式查看',
    component: fukuanfangshichakan
  }
  , {
    path: '/fukuanfangshimana',
    name: '付款方式查询',
    component: fukuanfangshimana
  }
  , {
    path: '/fukuanfangshiadd',
    name: '付款方式添加',
    component: fukuanfangshiadd
  }
  , {
    path: '/gonggaochakan',
    name: '公告查看',
    component: gonggaochakan
  }
  , {
    path: '/gonggaomana',
    name: '公告查询',
    component: gonggaomana
  }
  , {
    path: '/gonggaoadd',
    name: '公告添加',
    component: gonggaoadd
  }
  , {
    path: '/gouwuchechakan',
    name: '购物车查看',
    component: gouwuchechakan
  }
  , {
    path: '/gouwuchemana',
    name: '购物车查询',
    component: gouwuchemana
  }
  , {
    path: '/gouwucheadd',
    name: '购物车添加',
    component: gouwucheadd
  }
  , {
    path: '/gouwuchechakanmy',
    name: '查看我的购物车',
    component: gouwuchechakanmy
  }
  , {
    path: '/gouwuchemanamy',
    name: '管理我的购物车',
    component: gouwuchemanamy
  }
  , {
    path: '/gouwuchemanamybyshangpin',
    name: '管理我的购物车',
    component: gouwuchemanamybyshangpin
  }
  , {
    path: '/lianjiechakan',
    name: '友情链接查看',
    component: lianjiechakan
  }
  , {
    path: '/lianjiemana',
    name: '友情链接查询',
    component: lianjiemana
  }
  , {
    path: '/lianjieadd',
    name: '友情链接添加',
    component: lianjieadd
  }
  , {
    path: '/liuyanchakan',
    name: '留言反馈查看',
    component: liuyanchakan
  }
  , {
    path: '/liuyanmana',
    name: '留言反馈查询',
    component: liuyanmana
  }
  , {
    path: '/liuyanadd',
    name: '留言反馈添加',
    component: liuyanadd
  }
  , {
    path: '/liuyanchakanmy',
    name: '查看我的留言反馈',
    component: liuyanchakanmy
  }
  , {
    path: '/liuyanmanamy',
    name: '管理我的留言反馈',
    component: liuyanmanamy
  }
  , {
    path: '/lunbochakan',
    name: '轮播图查看',
    component: lunbochakan
  }
  , {
    path: '/lunbomana',
    name: '轮播图查询',
    component: lunbomana
  }
  , {
    path: '/lunboadd',
    name: '轮播图添加',
    component: lunboadd
  }
  , {
    path: '/peisongchakan',
    name: '配送查看',
    component: peisongchakan
  }
  , {
    path: '/peisongmana',
    name: '配送查询',
    component: peisongmana
  }
  , {
    path: '/peisongadd',
    name: '配送添加',
    component: peisongadd
  }
  , {
    path: '/peisongchakanmy',
    name: '查看我的配送',
    component: peisongchakanmy
  }
  , {
    path: '/peisongmanamy',
    name: '管理我的配送',
    component: peisongmanamy
  }
  , {
    path: '/peisongmanamybydingdan',
    name: '管理我的配送',
    component: peisongmanamybydingdan
  }
  , {
    path: '/pingjiachakan',
    name: '评价查看',
    component: pingjiachakan
  }
  , {
    path: '/pingjiamana',
    name: '评价查询',
    component: pingjiamana
  }
  , {
    path: '/pingjiaadd',
    name: '评价添加',
    component: pingjiaadd
  }
  , {
    path: '/pingjiachakanmy',
    name: '查看我的评价',
    component: pingjiachakanmy
  }
  , {
    path: '/pingjiamanamy',
    name: '管理我的评价',
    component: pingjiamanamy
  }
  , {
    path: '/pingjiamanamybypeisong',
    name: '管理我的评价',
    component: pingjiamanamybypeisong
  }
  , {
    path: '/shangpinchakan',
    name: '商品查看',
    component: shangpinchakan
  }
  , {
    path: '/shangpinmana',
    name: '商品查询',
    component: shangpinmana
  }
  , {
    path: '/shangpinadd',
    name: '商品添加',
    component: shangpinadd
  }
  , {
    path: '/shangpinchakanmy',
    name: '查看我的商品',
    component: shangpinchakanmy
  }
  , {
    path: '/shangpinmanamy',
    name: '管理我的商品',
    component: shangpinmanamy
  }
  , {
    path: '/shoucangchakan',
    name: '商品收藏查看',
    component: shoucangchakan
  }
  , {
    path: '/shoucangmana',
    name: '商品收藏查询',
    component: shoucangmana
  }
  , {
    path: '/shoucangadd',
    name: '商品收藏添加',
    component: shoucangadd
  }
  , {
    path: '/shoucangchakanmy',
    name: '查看我的商品收藏',
    component: shoucangchakanmy
  }
  , {
    path: '/shoucangmanamy',
    name: '管理我的商品收藏',
    component: shoucangmanamy
  }
  , {
    path: '/shoucangmanamybyshangpin',
    name: '管理我的商品收藏',
    component: shoucangmanamybyshangpin
  }
  , {
    path: '/shouhuodizhichakan',
    name: '收货地址查看',
    component: shouhuodizhichakan
  }
  , {
    path: '/shouhuodizhimana',
    name: '收货地址查询',
    component: shouhuodizhimana
  }
  , {
    path: '/shouhuodizhiadd',
    name: '收货地址添加',
    component: shouhuodizhiadd
  }
  , {
    path: '/shouhuodizhichakanmy',
    name: '查看我的收货地址',
    component: shouhuodizhichakanmy
  }
  , {
    path: '/shouhuodizhimanamy',
    name: '管理我的收货地址',
    component: shouhuodizhimanamy
  }
  , {
    path: '/userschakan',
    name: '用户查看',
    component: userschakan
  }
  , {
    path: '/usersmana',
    name: '用户查询',
    component: usersmana
  }
  , {
    path: '/usersadd',
    name: '用户添加',
    component: usersadd
  }
  , {
    path: '/zhongleichakan',
    name: '分类查看',
    component: zhongleichakan
  }
  , {
    path: '/zhongleimana',
    name: '分类查询',
    component: zhongleimana
  }
  , {
    path: '/zhongleiadd',
    name: '分类添加',
    component: zhongleiadd
  }

  ]
},
{
  path: '/login',
  name: 'login',
  component: Login,
  meta: { icon: '', title: 'login' }
},
{
  path: '/register',
  name: 'register',
  component: register,
  meta: { icon: '', title: 'register' }
},
{
  path: '/',
  name: '首页',
  redirect: '/index'
}, /*默认跳转路由*/
{
  path: '*',
  component: NotFound
}
]
//3.实例化VueRouter  注意：名字
const router = new VueRouter({
  mode: 'hash',
  /*hash模式改为history*/
  routes // （缩写）相当于 routes: routes
})

//路由导航冗余报错（路由重复）
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router;

<template>
  <div class="dy-admin-router-view-div">
    <template v-if="showFlag">
      <!--搜索表单区域-->
      <el-form :inline="true" :model="searchForm" class="dy-list-search-el-form">
        <el-row class="dy-list-search-el-form-row">
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">用户名称</label>
            <el-input style="width: auto;" suffix-icon="el-icon-search" v-model="searchForm.loginname" placeholder="请输入用户名称" clearable></el-input>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">类型名称</label>
            <el-input style="width: auto;" suffix-icon="el-icon-search" v-model="searchForm.typename" placeholder="请输入类型名称" clearable></el-input>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">姓名</label>
            <el-input style="width: auto;" suffix-icon="el-icon-search" v-model="searchForm.xingming" placeholder="请输入姓名" clearable></el-input>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">性别</label>
            <el-select v-model="searchForm.xingbie" placeholder="请选择性别">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="(item, index) in xingbieOptions" v-bind:key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">年龄</label>
            <el-input style="width: auto;" suffix-icon="el-icon-search" v-model="searchForm.nianling" placeholder="请输入年龄" clearable></el-input>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">地址</label>
            <el-input style="width: auto;" suffix-icon="el-icon-search" v-model="searchForm.address" placeholder="请输入地址" clearable></el-input>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">电话</label>
            <el-input style="width: auto;" suffix-icon="el-icon-search" v-model="searchForm.dianhua" placeholder="请输入电话" clearable></el-input>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">审核</label>
            <el-select v-model="searchForm.shenhe" placeholder="请选择审核">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="(item, index) in shenheOptions" v-bind:key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </div>

          <el-button class="dy-list-search-button" icon="el-icon-search" type="success" @click="search">查{{ '\u3000' }}询</el-button>
        </el-row>
        <!-- <el-row class="dy-list-search-el-form-row-2"'>
            <el-button class="dy-list-batchdelete-button" :disabled="dataListSelections.length <= 0" type="danger" icon="el-icon-delete" @click="usersDeleteHandler()">批量删除</el-button>
        </el-row> -->
      </el-form>
      <!--数据列表区域-->
      <el-table class="dy-list-el-table" :stripe='true' :data="dataList" v-loading="dataListLoading"
      @selection-change="selectionChangeHandler" :border="true">
        <el-table-column v-if="false" type="selection" width="60"></el-table-column>
        <el-table-column label="序号" v-if="true" type="index" width="70" />
          <el-table-column label="用户名称">
            <template slot-scope="scope">
              {{ scope.row.loginname }}
            </template>
          </el-table-column>
          <el-table-column label="密码">
            <template slot-scope="scope">
              {{ scope.row.loginpw }}
            </template>
          </el-table-column>
          <el-table-column label="类型">
            <template slot-scope="scope">
              {{ scope.row.type }}
            </template>
          </el-table-column>
          <el-table-column label="类型名称">
            <template slot-scope="scope">
              {{ scope.row.typename }}
            </template>
          </el-table-column>
          <el-table-column label="姓名">
            <template slot-scope="scope">
              {{ scope.row.xingming }}
            </template>
          </el-table-column>
          <el-table-column label="性别">
            <template slot-scope="scope">
              {{ scope.row.xingbie }}
            </template>
          </el-table-column>
          <el-table-column label="年龄">
            <template slot-scope="scope">
              {{ scope.row.nianling }}
            </template>
          </el-table-column>
          <el-table-column label="地址">
            <template slot-scope="scope">
              {{ scope.row.address }}
            </template>
          </el-table-column>
          <el-table-column label="电话">
            <template slot-scope="scope">
              {{ scope.row.dianhua }}
            </template>
          </el-table-column>
          <el-table-column label="审核">
            <template slot-scope="scope">
              {{ scope.row.shenhe }}
            </template>
          </el-table-column>

        <el-table-column width="350" label="操作">
          <template slot-scope="scope">
              <!-- <el-button class="dy-list-shehe-button" type="primary" icon="el-icon-edit-outline" size="mini" @click="usersSet(scope.row.id,scope.row.shenhe == 'no' ? '审核' : '取消审核','shenhe',scope.row.shenhe == 'no' ? 'yes' : 'no')">{{scope.row.shenhe == 'no' ? '审核' : '取消审核' }}</el-button> -->


            <el-button class="dy-list-detail-button" type="success" icon="el-icon-info" size="mini" @click="usersDetailHandler(scope.row.id)">详情</el-button>
            <!-- <el-button class="dy-list-update-button" type="primary" icon="el-icon-edit" size="mini" @click="usersSetHandler(scope.row.id)">修改</el-button> -->
            <!-- <el-button class="dy-list-delete-button" type="danger" icon="el-icon-delete" size="mini" @click="usersDeleteHandler(scope.row.id)">删除</el-button> -->
              <!-- <el-button class="dy-list-chakan-button" type="success" icon="el-icon-tickets" size="mini" @click="chanpinpingjiaChakanHandler(scope.row.id)">商品评价查看</el-button> -->
              <!-- <el-button class="dy-list-add-button" type="success" icon="el-icon-circle-plus" size="mini" @click="chanpinpingjiaAddHandler(scope.row.id, scope.row.loginname)">商品评价添加</el-button> -->
              <!-- <el-button class="dy-list-chakan-button" type="success" icon="el-icon-tickets" size="mini" @click="dingdanChakanHandler(scope.row.id)">订单查看</el-button> -->
              <!-- <el-button class="dy-list-add-button" type="success" icon="el-icon-circle-plus" size="mini" @click="dingdanAddHandler(scope.row.id, scope.row.loginname)">订单添加</el-button> -->
              <!-- <el-button class="dy-list-chakan-button" type="success" icon="el-icon-tickets" size="mini" @click="dingdanxiangChakanHandler(scope.row.id)">订单项查看</el-button> -->
              <!-- <el-button class="dy-list-add-button" type="success" icon="el-icon-circle-plus" size="mini" @click="dingdanxiangAddHandler(scope.row.id, scope.row.loginname)">订单项添加</el-button> -->
              <!-- <el-button class="dy-list-chakan-button" type="success" icon="el-icon-tickets" size="mini" @click="gouwucheChakanHandler(scope.row.id)">购物车查看</el-button> -->
              <!-- <el-button class="dy-list-add-button" type="success" icon="el-icon-circle-plus" size="mini" @click="gouwucheAddHandler(scope.row.id, scope.row.loginname)">购物车添加</el-button> -->
              <!-- <el-button class="dy-list-chakan-button" type="success" icon="el-icon-tickets" size="mini" @click="liuyanChakanHandler(scope.row.id)">留言反馈查看</el-button> -->
              <!-- <el-button class="dy-list-add-button" type="success" icon="el-icon-circle-plus" size="mini" @click="liuyanAddHandler(scope.row.id, scope.row.loginname)">留言反馈添加</el-button> -->
              <!-- <el-button class="dy-list-chakan-button" type="success" icon="el-icon-tickets" size="mini" @click="peisongChakanHandler(scope.row.id)">配送查看</el-button> -->
              <!-- <el-button class="dy-list-add-button" type="success" icon="el-icon-circle-plus" size="mini" @click="peisongAddHandler(scope.row.id, scope.row.loginname)">配送添加</el-button> -->
              <!-- <el-button class="dy-list-chakan-button" type="success" icon="el-icon-tickets" size="mini" @click="pingjiaChakanHandler(scope.row.id)">评价查看</el-button> -->
              <!-- <el-button class="dy-list-add-button" type="success" icon="el-icon-circle-plus" size="mini" @click="pingjiaAddHandler(scope.row.id, scope.row.loginname)">评价添加</el-button> -->
              <!-- <el-button class="dy-list-chakan-button" type="success" icon="el-icon-tickets" size="mini" @click="shangpinChakanHandler(scope.row.id)">商品查看</el-button> -->
              <!-- <el-button class="dy-list-add-button" type="success" icon="el-icon-circle-plus" size="mini" @click="shangpinAddHandler(scope.row.id, scope.row.loginname)">商品添加</el-button> -->
              <!-- <el-button class="dy-list-chakan-button" type="success" icon="el-icon-tickets" size="mini" @click="shoucangChakanHandler(scope.row.id)">商品收藏查看</el-button> -->
              <!-- <el-button class="dy-list-add-button" type="success" icon="el-icon-circle-plus" size="mini" @click="shoucangAddHandler(scope.row.id, scope.row.loginname)">商品收藏添加</el-button> -->
              <!-- <el-button class="dy-list-chakan-button" type="success" icon="el-icon-tickets" size="mini" @click="shouhuodizhiChakanHandler(scope.row.id)">收货地址查看</el-button> -->
              <!-- <el-button class="dy-list-add-button" type="success" icon="el-icon-circle-plus" size="mini" @click="shouhuodizhiAddHandler(scope.row.id, scope.row.loginname)">收货地址添加</el-button> -->

          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <el-pagination class="dy-list-el-pagination" :layout="layouts.join()" @size-change="sizeChangeHandle" @current-change="currentChangeHandle"
      :current-page="pageIndex" :page-sizes="[8, 10, 20, 30, 50]" :page-size="pageSize" :total="totalPage" prev-text="<上一页" next-text="下一页>"></el-pagination>
    </template>
    <!-- 用户修改-->
    <users-set v-if="usersSetFlag" :parent="this" ref="usersSet"></users-set>
    <!-- 用户详情-->
    <users-detail v-if="usersDetailFlag" :parent="this" ref="usersDetail"></users-detail>
    <!-- 用户商品评价查看-->
    <users-chanpinpingjia-chakan v-if="usersChanpinpingjiaChakanFlag" :parent="this" ref="usersChanpinpingjiaChakan"></users-chanpinpingjia-chakan>
    <!-- 用户商品评价添加-->
    <users-chanpinpingjia-add v-if="usersChanpinpingjiaAddFlag" :parent="this" ref="usersChanpinpingjiaAdd"></users-chanpinpingjia-add>
    <!-- 用户订单查看-->
    <users-dingdan-chakan v-if="usersDingdanChakanFlag" :parent="this" ref="usersDingdanChakan"></users-dingdan-chakan>
    <!-- 用户订单添加-->
    <users-dingdan-add v-if="usersDingdanAddFlag" :parent="this" ref="usersDingdanAdd"></users-dingdan-add>
    <!-- 用户订单项查看-->
    <users-dingdanxiang-chakan v-if="usersDingdanxiangChakanFlag" :parent="this" ref="usersDingdanxiangChakan"></users-dingdanxiang-chakan>
    <!-- 用户订单项添加-->
    <users-dingdanxiang-add v-if="usersDingdanxiangAddFlag" :parent="this" ref="usersDingdanxiangAdd"></users-dingdanxiang-add>
    <!-- 用户购物车查看-->
    <users-gouwuche-chakan v-if="usersGouwucheChakanFlag" :parent="this" ref="usersGouwucheChakan"></users-gouwuche-chakan>
    <!-- 用户购物车添加-->
    <users-gouwuche-add v-if="usersGouwucheAddFlag" :parent="this" ref="usersGouwucheAdd"></users-gouwuche-add>
    <!-- 用户留言反馈查看-->
    <users-liuyan-chakan v-if="usersLiuyanChakanFlag" :parent="this" ref="usersLiuyanChakan"></users-liuyan-chakan>
    <!-- 用户留言反馈添加-->
    <users-liuyan-add v-if="usersLiuyanAddFlag" :parent="this" ref="usersLiuyanAdd"></users-liuyan-add>
    <!-- 用户配送查看-->
    <users-peisong-chakan v-if="usersPeisongChakanFlag" :parent="this" ref="usersPeisongChakan"></users-peisong-chakan>
    <!-- 用户配送添加-->
    <users-peisong-add v-if="usersPeisongAddFlag" :parent="this" ref="usersPeisongAdd"></users-peisong-add>
    <!-- 用户评价查看-->
    <users-pingjia-chakan v-if="usersPingjiaChakanFlag" :parent="this" ref="usersPingjiaChakan"></users-pingjia-chakan>
    <!-- 用户评价添加-->
    <users-pingjia-add v-if="usersPingjiaAddFlag" :parent="this" ref="usersPingjiaAdd"></users-pingjia-add>
    <!-- 用户商品查看-->
    <users-shangpin-chakan v-if="usersShangpinChakanFlag" :parent="this" ref="usersShangpinChakan"></users-shangpin-chakan>
    <!-- 用户商品添加-->
    <users-shangpin-add v-if="usersShangpinAddFlag" :parent="this" ref="usersShangpinAdd"></users-shangpin-add>
    <!-- 用户商品收藏查看-->
    <users-shoucang-chakan v-if="usersShoucangChakanFlag" :parent="this" ref="usersShoucangChakan"></users-shoucang-chakan>
    <!-- 用户商品收藏添加-->
    <users-shoucang-add v-if="usersShoucangAddFlag" :parent="this" ref="usersShoucangAdd"></users-shoucang-add>
    <!-- 用户收货地址查看-->
    <users-shouhuodizhi-chakan v-if="usersShouhuodizhiChakanFlag" :parent="this" ref="usersShouhuodizhiChakan"></users-shouhuodizhi-chakan>
    <!-- 用户收货地址添加-->
    <users-shouhuodizhi-add v-if="usersShouhuodizhiAddFlag" :parent="this" ref="usersShouhuodizhiAdd"></users-shouhuodizhi-add>

  </div>
</template>
<script>
import UsersSet from "./users-set"
import UsersDetail from "./users-detail"
import UsersChanpinpingjiaChakan from './users-chanpinpingjia-chakan'
import UsersChanpinpingjiaAdd from './users-chanpinpingjia-add'
import UsersDingdanChakan from './users-dingdan-chakan'
import UsersDingdanAdd from './users-dingdan-add'
import UsersDingdanxiangChakan from './users-dingdanxiang-chakan'
import UsersDingdanxiangAdd from './users-dingdanxiang-add'
import UsersGouwucheChakan from './users-gouwuche-chakan'
import UsersGouwucheAdd from './users-gouwuche-add'
import UsersLiuyanChakan from './users-liuyan-chakan'
import UsersLiuyanAdd from './users-liuyan-add'
import UsersPeisongChakan from './users-peisong-chakan'
import UsersPeisongAdd from './users-peisong-add'
import UsersPingjiaChakan from './users-pingjia-chakan'
import UsersPingjiaAdd from './users-pingjia-add'
import UsersShangpinChakan from './users-shangpin-chakan'
import UsersShangpinAdd from './users-shangpin-add'
import UsersShoucangChakan from './users-shoucang-chakan'
import UsersShoucangAdd from './users-shoucang-add'
import UsersShouhuodizhiChakan from './users-shouhuodizhi-chakan'
import UsersShouhuodizhiAdd from './users-shouhuodizhi-add'

export default {
  data() {
    return {
      searchForm: {
        key: ""
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 8,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      showFlag: true,
      usersSetFlag: false,
      usersDetailFlag: false,
      usersChanpinpingjiaChakanFlag: false,
      usersChanpinpingjiaAddFlag: false,
      usersDingdanChakanFlag: false,
      usersDingdanAddFlag: false,
      usersDingdanxiangChakanFlag: false,
      usersDingdanxiangAddFlag: false,
      usersGouwucheChakanFlag: false,
      usersGouwucheAddFlag: false,
      usersLiuyanChakanFlag: false,
      usersLiuyanAddFlag: false,
      usersPeisongChakanFlag: false,
      usersPeisongAddFlag: false,
      usersPingjiaChakanFlag: false,
      usersPingjiaAddFlag: false,
      usersShangpinChakanFlag: false,
      usersShangpinAddFlag: false,
      usersShoucangChakanFlag: false,
      usersShoucangAddFlag: false,
      usersShouhuodizhiChakanFlag: false,
      usersShouhuodizhiAddFlag: false,

      layouts: ["total", "prev", "pager", "next", "sizes", "jumper"],
      xingbieOptions: [],
      typeOptions: [],
      shenheOptions: [],

    };
  },
  created() {
    this.init();
    this.getDataList();
  },
  mounted() {
  },
  filters: {
    htmlfilter: function (val) {
      return val.replace(/<[^>]*>/g).replace(/undefined/g, '');
    }
  },
  components: {
    UsersSet,
    UsersDetail,
    UsersChanpinpingjiaChakan,
    UsersChanpinpingjiaAdd,
    UsersDingdanChakan,
    UsersDingdanAdd,
    UsersDingdanxiangChakan,
    UsersDingdanxiangAdd,
    UsersGouwucheChakan,
    UsersGouwucheAdd,
    UsersLiuyanChakan,
    UsersLiuyanAdd,
    UsersPeisongChakan,
    UsersPeisongAdd,
    UsersPingjiaChakan,
    UsersPingjiaAdd,
    UsersShangpinChakan,
    UsersShangpinAdd,
    UsersShoucangChakan,
    UsersShoucangAdd,
    UsersShouhuodizhiChakan,
    UsersShouhuodizhiAdd,

  },
  methods: {
    //pageSize触发
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    //currentPage触发
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandler(val) {
      this.dataListSelections = val;
    },
    // 下载
    download(fileUrl) {
      let url = this.$base.url + "/common/download?filename=" + fileUrl;
      url = encodeURI(url);
      window.open(url);
      // window.open(this.$base.url + fileUrl);
    },
    getFileSrc(fileUrl) {
      return this.$base.url + fileUrl;
    },
    //页面初始化
    init() {
      this.shenheOptions = "yes,no".split(',');
      this.xingbieOptions = "男,女".split(',');
      this.typeOptions = this.$userstypes;

    },

    //点击搜索按钮方法
    search() {
      this.pageIndex = 1;
      this.getDataList();
    },

    // 获取用户分页数据列表
    getDataList() {
      this.dataListLoading = true;
      let params = {
        pageNo: this.pageIndex, //页码
        pageSize: this.pageSize, //页大小
        sortProperty: 'id',      //排序列
      }
      //搜索表单数据组装
      if (this.searchForm.loginname != '' && this.searchForm.loginname != undefined) {
        params['loginname'] = this.searchForm.loginname
      }
      if (this.searchForm.type != '' && this.searchForm.type != undefined) {
        params['type'] = this.searchForm.type
      }
      if (this.searchForm.typename != '' && this.searchForm.typename != undefined) {
        params['typename'] = this.searchForm.typename
      }
      if (this.searchForm.xingming != '' && this.searchForm.xingming != undefined) {
        params['xingming'] = this.searchForm.xingming
      }
      if (this.searchForm.xingbie != '' && this.searchForm.xingbie != undefined) {
        params['xingbie'] = this.searchForm.xingbie
      }
      if (this.searchForm.nianling != '' && this.searchForm.nianling != undefined) {
        params['nianling'] = this.searchForm.nianling
      }
      if (this.searchForm.address != '' && this.searchForm.address != undefined) {
        params['address'] = this.searchForm.address
      }
      if (this.searchForm.dianhua != '' && this.searchForm.dianhua != undefined) {
        params['dianhua'] = this.searchForm.dianhua
      }
      if (this.searchForm.shenhe != '' && this.searchForm.shenhe != undefined) {
        params['shenhe'] = this.searchForm.shenhe
      }

      this.$http({
        url: "users/chakan",
        method: "get",
        params: params
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.data.records;
          this.totalPage = data.data.total;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },

    // 删除或批量删除用户方法
    usersDeleteHandler(id) {
      var ids = id
        ? [Number(id)]
        : this.dataListSelections.map(item => {
          return Number(item.id);
        });
      let confirmText = id ? "删除" : "批量删除";
      this.$confirm(`确定进行[${confirmText}]操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: "users/delete",
          method: "post",
          data: ids
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.search();
              }
            });
          } else {
            this.$message.error(data.message);
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消' + confirmText
        });
      });
    },

    //跳转到用户详情页面
    usersDetailHandler(id) {
      this.showFlag = false;
      this.usersDetailFlag = true;
      this.$nextTick(() => {
        this.$refs.usersDetail.init(id);
      });

    },

    //跳转到用户修改页面
    usersSetHandler(id) {
      this.showFlag = false;
      this.usersSetFlag = true;
      this.$nextTick(() => {
        this.$refs.usersSet.init(id);
      });
    },

    //更新用户信息操作方法
    usersSet(tid,tname,property,value) {
      let params = {};
      params['id'] = tid;
      params[property] = value;

      this.$confirm(`确定'${tname}'操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: `users/set`,
          method: "post",
          data: params
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.search();
              }
            });
          } else {
            this.$message.error(data.message);
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消' + tname + '操作'
        });
      });
    },


    //跳转到用户商品评价添加页面
    chanpinpingjiaAddHandler(id, loginname) {
      this.showFlag = false;
      this.usersChanpinpingjiaAddFlag = true;
      this.$nextTick(() => {
        this.$refs.usersChanpinpingjiaAdd.init(id, loginname);
      });
    },

    //跳转到用户商品评价查看页面
    chanpinpingjiaChakanHandler(id) {
      this.showFlag = false;
      this.usersChanpinpingjiaChakanFlag = true;
      this.$nextTick(() => {
        this.$refs.usersChanpinpingjiaChakan.init(id);
      });
    },
    //跳转到用户订单添加页面
    dingdanAddHandler(id, loginname) {
      this.showFlag = false;
      this.usersDingdanAddFlag = true;
      this.$nextTick(() => {
        this.$refs.usersDingdanAdd.init(id, loginname);
      });
    },

    //跳转到用户订单查看页面
    dingdanChakanHandler(id) {
      this.showFlag = false;
      this.usersDingdanChakanFlag = true;
      this.$nextTick(() => {
        this.$refs.usersDingdanChakan.init(id);
      });
    },
    //跳转到用户订单项添加页面
    dingdanxiangAddHandler(id, loginname) {
      this.showFlag = false;
      this.usersDingdanxiangAddFlag = true;
      this.$nextTick(() => {
        this.$refs.usersDingdanxiangAdd.init(id, loginname);
      });
    },

    //跳转到用户订单项查看页面
    dingdanxiangChakanHandler(id) {
      this.showFlag = false;
      this.usersDingdanxiangChakanFlag = true;
      this.$nextTick(() => {
        this.$refs.usersDingdanxiangChakan.init(id);
      });
    },
    //跳转到用户购物车添加页面
    gouwucheAddHandler(id, loginname) {
      this.showFlag = false;
      this.usersGouwucheAddFlag = true;
      this.$nextTick(() => {
        this.$refs.usersGouwucheAdd.init(id, loginname);
      });
    },

    //跳转到用户购物车查看页面
    gouwucheChakanHandler(id) {
      this.showFlag = false;
      this.usersGouwucheChakanFlag = true;
      this.$nextTick(() => {
        this.$refs.usersGouwucheChakan.init(id);
      });
    },
    //跳转到用户留言反馈添加页面
    liuyanAddHandler(id, loginname) {
      this.showFlag = false;
      this.usersLiuyanAddFlag = true;
      this.$nextTick(() => {
        this.$refs.usersLiuyanAdd.init(id, loginname);
      });
    },

    //跳转到用户留言反馈查看页面
    liuyanChakanHandler(id) {
      this.showFlag = false;
      this.usersLiuyanChakanFlag = true;
      this.$nextTick(() => {
        this.$refs.usersLiuyanChakan.init(id);
      });
    },
    //跳转到用户配送添加页面
    peisongAddHandler(id, loginname) {
      this.showFlag = false;
      this.usersPeisongAddFlag = true;
      this.$nextTick(() => {
        this.$refs.usersPeisongAdd.init(id, loginname);
      });
    },

    //跳转到用户配送查看页面
    peisongChakanHandler(id) {
      this.showFlag = false;
      this.usersPeisongChakanFlag = true;
      this.$nextTick(() => {
        this.$refs.usersPeisongChakan.init(id);
      });
    },
    //跳转到用户评价添加页面
    pingjiaAddHandler(id, loginname) {
      this.showFlag = false;
      this.usersPingjiaAddFlag = true;
      this.$nextTick(() => {
        this.$refs.usersPingjiaAdd.init(id, loginname);
      });
    },

    //跳转到用户评价查看页面
    pingjiaChakanHandler(id) {
      this.showFlag = false;
      this.usersPingjiaChakanFlag = true;
      this.$nextTick(() => {
        this.$refs.usersPingjiaChakan.init(id);
      });
    },
    //跳转到用户商品添加页面
    shangpinAddHandler(id, loginname) {
      this.showFlag = false;
      this.usersShangpinAddFlag = true;
      this.$nextTick(() => {
        this.$refs.usersShangpinAdd.init(id, loginname);
      });
    },

    //跳转到用户商品查看页面
    shangpinChakanHandler(id) {
      this.showFlag = false;
      this.usersShangpinChakanFlag = true;
      this.$nextTick(() => {
        this.$refs.usersShangpinChakan.init(id);
      });
    },
    //跳转到用户商品收藏添加页面
    shoucangAddHandler(id, loginname) {
      this.showFlag = false;
      this.usersShoucangAddFlag = true;
      this.$nextTick(() => {
        this.$refs.usersShoucangAdd.init(id, loginname);
      });
    },

    //跳转到用户商品收藏查看页面
    shoucangChakanHandler(id) {
      this.showFlag = false;
      this.usersShoucangChakanFlag = true;
      this.$nextTick(() => {
        this.$refs.usersShoucangChakan.init(id);
      });
    },
    //跳转到用户收货地址添加页面
    shouhuodizhiAddHandler(id, loginname) {
      this.showFlag = false;
      this.usersShouhuodizhiAddFlag = true;
      this.$nextTick(() => {
        this.$refs.usersShouhuodizhiAdd.init(id, loginname);
      });
    },

    //跳转到用户收货地址查看页面
    shouhuodizhiChakanHandler(id) {
      this.showFlag = false;
      this.usersShouhuodizhiChakanFlag = true;
      this.$nextTick(() => {
        this.$refs.usersShouhuodizhiChakan.init(id);
      });
    },


 
  }

};
</script>
<style lang="scss" scoped>

</style>

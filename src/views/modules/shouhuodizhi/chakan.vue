<template>
  <div class="dy-admin-router-view-div">
    <template v-if="showFlag">
      <!--搜索表单区域-->
      <el-form :inline="true" :model="searchForm" class="dy-list-search-el-form">
        <el-row class="dy-list-search-el-form-row">
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">收货人</label>
            <el-input style="width: auto;" suffix-icon="el-icon-search" v-model="searchForm.xingming" placeholder="请输入收货人" clearable></el-input>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">手机号码</label>
            <el-input style="width: auto;" suffix-icon="el-icon-search" v-model="searchForm.dianhua" placeholder="请输入手机号码" clearable></el-input>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">详情地址</label>
            <el-input style="width: auto;" suffix-icon="el-icon-search" v-model="searchForm.dizhi" placeholder="请输入详情地址" clearable></el-input>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">是否默认</label>
            <el-select v-model="searchForm.shenhe" placeholder="请选择是否默认">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="(item, index) in shenheOptions" v-bind:key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">用户</label>
            <el-select v-model="searchForm.usersid" placeholder="请选择用户">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="(item, index) in usersOptions" v-bind:key="item.id" :label="item.loginname" :value="item.id">
              </el-option>
            </el-select>
          </div>

          <el-button class="dy-list-search-button" icon="el-icon-search" type="success" @click="search">查{{ '\u3000' }}询</el-button>
        </el-row>
        <!-- <el-row class="dy-list-search-el-form-row-2"'>
            <el-button class="dy-list-batchdelete-button" :disabled="dataListSelections.length <= 0" type="danger" icon="el-icon-delete" @click="shouhuodizhiDeleteHandler()">批量删除</el-button>
        </el-row> -->
      </el-form>
      <!--数据列表区域-->
      <el-table class="dy-list-el-table" :stripe='true' :data="dataList" v-loading="dataListLoading"
      @selection-change="selectionChangeHandler" :border="true">
        <el-table-column v-if="false" type="selection" width="60"></el-table-column>
        <el-table-column label="序号" v-if="true" type="index" width="70" />
          <el-table-column label="收货人">
            <template slot-scope="scope">
              {{ scope.row.xingming }}
            </template>
          </el-table-column>
          <el-table-column label="手机号码">
            <template slot-scope="scope">
              {{ scope.row.dianhua }}
            </template>
          </el-table-column>
          <el-table-column label="详情地址">
            <template slot-scope="scope">
              {{ scope.row.dizhi }}
            </template>
          </el-table-column>
          <el-table-column label="是否默认">
            <template slot-scope="scope">
              {{ scope.row.shenhe }}
            </template>
          </el-table-column>
          <el-table-column label="用户">
            <template slot-scope="scope">
              <div v-if="scope.row.users && scope.row.users.loginname">{{ scope.row.users.loginname }}</div>
              <div v-else>--</div>
            </template>
          </el-table-column>

        <el-table-column width="350" label="操作">
          <template slot-scope="scope">
              <!-- <el-button class="dy-list-shehe-button" type="primary" icon="el-icon-edit-outline" size="mini" @click="shouhuodizhiSet(scope.row.id,scope.row.shenhe == 'no' ? '是否默认' : '取消是否默认','shenhe',scope.row.shenhe == 'no' ? 'yes' : 'no')">{{scope.row.shenhe == 'no' ? '是否默认' : '取消是否默认' }}</el-button> -->


            <el-button class="dy-list-detail-button" type="success" icon="el-icon-info" size="mini" @click="shouhuodizhiDetailHandler(scope.row.id)">详情</el-button>
            <!-- <el-button class="dy-list-update-button" type="primary" icon="el-icon-edit" size="mini" @click="shouhuodizhiSetHandler(scope.row.id)">修改</el-button> -->
            <!-- <el-button class="dy-list-delete-button" type="danger" icon="el-icon-delete" size="mini" @click="shouhuodizhiDeleteHandler(scope.row.id)">删除</el-button> -->
              <!-- <el-button class="dy-list-chakan-button" type="success" icon="el-icon-tickets" size="mini" @click="dingdanChakanHandler(scope.row.id)">订单查看</el-button> -->
              <!-- <el-button class="dy-list-add-button" type="success" icon="el-icon-circle-plus" size="mini" @click="dingdanAddHandler(scope.row.id, scope.row.xingming)">订单添加</el-button> -->

          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <el-pagination class="dy-list-el-pagination" :layout="layouts.join()" @size-change="sizeChangeHandle" @current-change="currentChangeHandle"
      :current-page="pageIndex" :page-sizes="[8, 10, 20, 30, 50]" :page-size="pageSize" :total="totalPage" prev-text="<上一页" next-text="下一页>"></el-pagination>
    </template>
    <!-- 收货地址修改-->
    <shouhuodizhi-set v-if="shouhuodizhiSetFlag" :parent="this" ref="shouhuodizhiSet"></shouhuodizhi-set>
    <!-- 收货地址详情-->
    <shouhuodizhi-detail v-if="shouhuodizhiDetailFlag" :parent="this" ref="shouhuodizhiDetail"></shouhuodizhi-detail>
    <!-- 收货地址订单查看-->
    <shouhuodizhi-dingdan-chakan v-if="shouhuodizhiDingdanChakanFlag" :parent="this" ref="shouhuodizhiDingdanChakan"></shouhuodizhi-dingdan-chakan>
    <!-- 收货地址订单添加-->
    <shouhuodizhi-dingdan-add v-if="shouhuodizhiDingdanAddFlag" :parent="this" ref="shouhuodizhiDingdanAdd"></shouhuodizhi-dingdan-add>

  </div>
</template>
<script>
import ShouhuodizhiSet from "./shouhuodizhi-set"
import ShouhuodizhiDetail from "./shouhuodizhi-detail"
import ShouhuodizhiDingdanChakan from './shouhuodizhi-dingdan-chakan'
import ShouhuodizhiDingdanAdd from './shouhuodizhi-dingdan-add'

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
      shouhuodizhiSetFlag: false,
      shouhuodizhiDetailFlag: false,
      shouhuodizhiDingdanChakanFlag: false,
      shouhuodizhiDingdanAddFlag: false,

      layouts: ["total", "prev", "pager", "next", "sizes", "jumper"],
      xingbieOptions: [],
      typeOptions: [],
      shenheOptions: [],
      usersOptions: [],

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
    ShouhuodizhiSet,
    ShouhuodizhiDetail,
    ShouhuodizhiDingdanChakan,
    ShouhuodizhiDingdanAdd,

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
      this.getUsersList();

    },

    //点击搜索按钮方法
    search() {
      this.pageIndex = 1;
      this.getDataList();
    },

    // 获取收货地址分页数据列表
    getDataList() {
      this.dataListLoading = true;
      let params = {
        pageNo: this.pageIndex, //页码
        pageSize: this.pageSize, //页大小
        sortProperty: 'id',      //排序列
      }
      //搜索表单数据组装
      if (this.searchForm.xingming != '' && this.searchForm.xingming != undefined) {
        params['xingming'] = this.searchForm.xingming
      }
      if (this.searchForm.dianhua != '' && this.searchForm.dianhua != undefined) {
        params['dianhua'] = this.searchForm.dianhua
      }
      if (this.searchForm.dizhi != '' && this.searchForm.dizhi != undefined) {
        params['dizhi'] = this.searchForm.dizhi
      }
      if (this.searchForm.shenhe != '' && this.searchForm.shenhe != undefined) {
        params['shenhe'] = this.searchForm.shenhe
      }
      if (this.searchForm.usersid != '' && this.searchForm.usersid != undefined) {
        params['usersid'] = this.searchForm.usersid
      }

      this.$http({
        url: "shouhuodizhi/chakan",
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

    // 删除或批量删除收货地址方法
    shouhuodizhiDeleteHandler(id) {
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
          url: "shouhuodizhi/delete",
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

    //跳转到收货地址详情页面
    shouhuodizhiDetailHandler(id) {
      this.showFlag = false;
      this.shouhuodizhiDetailFlag = true;
      this.$nextTick(() => {
        this.$refs.shouhuodizhiDetail.init(id);
      });

    },

    //跳转到收货地址修改页面
    shouhuodizhiSetHandler(id) {
      this.showFlag = false;
      this.shouhuodizhiSetFlag = true;
      this.$nextTick(() => {
        this.$refs.shouhuodizhiSet.init(id);
      });
    },

    //更新收货地址信息操作方法
    shouhuodizhiSet(tid,tname,property,value) {
      let params = {};
      params['id'] = tid;
      params[property] = value;

      this.$confirm(`确定'${tname}'操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: `shouhuodizhi/set`,
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


    //跳转到收货地址订单添加页面
    dingdanAddHandler(id, xingming) {
      this.showFlag = false;
      this.shouhuodizhiDingdanAddFlag = true;
      this.$nextTick(() => {
        this.$refs.shouhuodizhiDingdanAdd.init(id, xingming);
      });
    },

    //跳转到收货地址订单查看页面
    dingdanChakanHandler(id) {
      this.showFlag = false;
      this.shouhuodizhiDingdanChakanFlag = true;
      this.$nextTick(() => {
        this.$refs.shouhuodizhiDingdanChakan.init(id);
      });
    },


    //获取所有用户
    getUsersList() {
      this.$http({
        url: "users/all",
        method: "get",
        params: null
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.usersOptions = data.data;
        }
      });
    },
 
  }

};
</script>
<style lang="scss" scoped>

</style>

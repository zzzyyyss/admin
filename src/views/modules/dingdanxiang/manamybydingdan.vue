<template>
  <div class="dy-admin-router-view-div">
    <template v-if="showFlag">
      <!--搜索表单区域-->
      <el-form :inline="true" :model="searchForm" class="dy-list-search-el-form">
        <el-row class="dy-list-search-el-form-row">
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">订单</label>
            <el-select v-model="searchForm.dingdanid" placeholder="请选择订单" clearable>
              <el-option label="全部" value=""></el-option>
              <el-option v-for="(item, index) in dingdanOptions" v-bind:key="item.id" :label="item.bianhao" :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">商品</label>
            <el-select v-model="searchForm.shangpinid" placeholder="请选择商品" clearable>
              <el-option label="全部" value=""></el-option>
              <el-option v-for="(item, index) in shangpinOptions" v-bind:key="item.id" :label="item.mingcheng" :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">商品数量</label>
            <el-input style="width: auto;" suffix-icon="el-icon-search" v-model="searchForm.goumaishuliang" placeholder="请输入商品数量" clearable></el-input>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">用户</label>
            <el-select v-model="searchForm.usersid" placeholder="请选择用户" clearable>
              <el-option label="全部" value=""></el-option>
              <el-option v-for="(item, index) in usersOptions" v-bind:key="item.id" :label="item.loginname" :value="item.id">
              </el-option>
            </el-select>
          </div>

          <el-button class="dy-list-search-button" icon="el-icon-search" type="success" @click="search">查{{ '\u3000' }}询</el-button>
        </el-row>
        <el-row class="dy-list-search-el-form-row-2">
          <el-button class="dy-list-batchdelete-button" :disabled="dataListSelections.length <= 0" type="danger" icon="el-icon-delete" @click="dingdanxiangDeleteHandler()">批量删除</el-button>
        </el-row>
      </el-form>
      <!--数据列表区域-->
      <el-table class="dy-list-el-table" :stripe='true' :data="dataList" v-loading="dataListLoading"
      @selection-change="selectionChangeHandler" :border="true">
        <el-table-column v-if="true" type="selection" width="60"></el-table-column>
        <el-table-column label="序号" v-if="true" type="index" width="70" />
          <el-table-column label="订单">
            <template slot-scope="scope">
              <div v-if="scope.row.dingdan && scope.row.dingdan.bianhao">{{ scope.row.dingdan.bianhao }}</div>
              <div v-else>--</div>
            </template>
          </el-table-column>
          <el-table-column label="商品">
            <template slot-scope="scope">
              <div v-if="scope.row.shangpin && scope.row.shangpin.mingcheng">{{ scope.row.shangpin.mingcheng }}</div>
              <div v-else>--</div>
            </template>
          </el-table-column>
          <el-table-column label="商品数量">
            <template slot-scope="scope">
              {{ scope.row.goumaishuliang }}
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

            <el-button class="dy-list-detail-button" type="success" icon="el-icon-info" size="mini" @click="dingdanxiangDetailHandler(scope.row.id)">详情</el-button>
            <el-button class="dy-list-update-button" type="primary" icon="el-icon-edit" size="mini" @click="dingdanxiangSetHandler(scope.row.id)">修改</el-button>
            <el-button class="dy-list-delete-button" type="danger" icon="el-icon-delete" size="mini" @click="dingdanxiangDeleteHandler(scope.row.id)">删除</el-button>

          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <el-pagination class="dy-list-el-pagination" :layout="layouts.join()" @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[8, 10, 20, 30, 50]"
      :page-size="pageSize" :total="totalPage" prev-text="<上一页" next-text="下一页>"></el-pagination>
    </template>
    <!-- 订单项修改-->
    <dingdanxiang-set v-if="dingdanxiangSetFlag" :parent="this" ref="dingdanxiangSet"></dingdanxiang-set>
    <!-- 订单项详情-->
    <dingdanxiang-detail v-if="dingdanxiangDetailFlag" :parent="this" ref="dingdanxiangDetail"></dingdanxiang-detail>

  </div>
</template>
<script>
import DingdanxiangSet from "./dingdanxiang-set"
import DingdanxiangDetail from "./dingdanxiang-detail"

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
      dingdanxiangSetFlag: false,
      dingdanxiangDetailFlag: false,

      layouts: ["total", "prev", "pager", "next", "sizes", "jumper"],
      xingbieOptions: [],
      typeOptions: [],
      shenheOptions: [],
      dingdanOptions: [],
      shangpinOptions: [],
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
    DingdanxiangSet,
    DingdanxiangDetail,

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
      this.getDingdanList();
      this.getShangpinList();
      this.getUsersList();

    },

    //点击搜索按钮方法
    search() {
      this.pageIndex = 1;
      this.getDataList();
    },

    // 获取订单项分页数据列表
    getDataList() {
      this.dataListLoading = true;
      let params = {
        pageNo: this.pageIndex, //页码
        pageSize: this.pageSize, //页大小
        sortProperty: 'id',      //排序列
      }
      //搜索表单数据组装
      if (this.searchForm.dingdanid != '' && this.searchForm.dingdanid != undefined) {
        params['dingdanid'] = this.searchForm.dingdanid
      }
      if (this.searchForm.shangpinid != '' && this.searchForm.shangpinid != undefined) {
        params['shangpinid'] = this.searchForm.shangpinid
      }
      if (this.searchForm.goumaishuliang != '' && this.searchForm.goumaishuliang != undefined) {
        params['goumaishuliang'] = this.searchForm.goumaishuliang
      }
      if (this.searchForm.usersid != '' && this.searchForm.usersid != undefined) {
        params['usersid'] = this.searchForm.usersid
      }

      this.$http({
        url: "dingdanxiang/manamybydingdan",
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

    // 删除或批量删除订单项方法
    dingdanxiangDeleteHandler(id) {
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
          url: "dingdanxiang/delete",
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

    //跳转到订单项详情页面
    dingdanxiangDetailHandler(id) {
      this.showFlag = false;
      this.dingdanxiangDetailFlag = true;
      this.$nextTick(() => {
        this.$refs.dingdanxiangDetail.init(id);
      });

    },

    //跳转到订单项修改页面
    dingdanxiangSetHandler(id) {
      this.showFlag = false;
      this.dingdanxiangSetFlag = true;
      this.$nextTick(() => {
        this.$refs.dingdanxiangSet.init(id);
      });
    },

    //更新订单项信息操作方法
    dingdanxiangSet(tid,tname,property,value) {
      let params = {};
      params['id'] = tid;
      params[property] = value;

      this.$confirm(`确定'${tname}'操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: `dingdanxiang/set`,
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
          message: '已取消操作'
        });
      });
    },




    //获取订单
    getDingdanList() {
      this.$http({
        url: "dingdan/search?usersid="+this.$storage.get('usersid'),
        method: "get",
        params: null
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dingdanOptions = data.data;
        }
      });
    },
    //获取所有商品
    getShangpinList() {
      this.$http({
        url: "shangpin/all",
        method: "get",
        params: null
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.shangpinOptions = data.data;
        }
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

<template>
  <div class="dy-admin-router-view-div">
    <template v-if="showFlag">
      <!--搜索表单区域-->
      <el-form :inline="true" :model="searchForm" class="dy-list-search-el-form">
        <el-row class="dy-list-search-el-form-row">
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">支付方式</label>
            <el-input style="width: auto;" suffix-icon="el-icon-search" v-model="searchForm.mingcheng" placeholder="请输入支付方式" clearable></el-input>
          </div>

          <el-button class="dy-list-search-button" icon="el-icon-search" type="success" @click="search">查{{ '\u3000' }}询</el-button>
        </el-row>
        <!-- <el-row class="dy-list-search-el-form-row-2"'>
            <el-button class="dy-list-batchdelete-button" :disabled="dataListSelections.length <= 0" type="danger" icon="el-icon-delete" @click="fukuanfangshiDeleteHandler()">批量删除</el-button>
        </el-row> -->
      </el-form>
      <!--数据列表区域-->
      <el-table class="dy-list-el-table" :stripe='true' :data="dataList" v-loading="dataListLoading"
      @selection-change="selectionChangeHandler" :border="true">
        <el-table-column v-if="false" type="selection" width="60"></el-table-column>
        <el-table-column label="序号" v-if="true" type="index" width="70" />
          <el-table-column label="支付方式">
            <template slot-scope="scope">
              {{ scope.row.mingcheng }}
            </template>
          </el-table-column>

        <el-table-column width="350" label="操作">
          <template slot-scope="scope">

            <el-button class="dy-list-detail-button" type="success" icon="el-icon-info" size="mini" @click="fukuanfangshiDetailHandler(scope.row.id)">详情</el-button>
            <!-- <el-button class="dy-list-update-button" type="primary" icon="el-icon-edit" size="mini" @click="fukuanfangshiSetHandler(scope.row.id)">修改</el-button> -->
            <!-- <el-button class="dy-list-delete-button" type="danger" icon="el-icon-delete" size="mini" @click="fukuanfangshiDeleteHandler(scope.row.id)">删除</el-button> -->
              <!-- <el-button class="dy-list-chakan-button" type="success" icon="el-icon-tickets" size="mini" @click="dingdanChakanHandler(scope.row.id)">订单查看</el-button> -->
              <!-- <el-button class="dy-list-add-button" type="success" icon="el-icon-circle-plus" size="mini" @click="dingdanAddHandler(scope.row.id, scope.row.mingcheng)">订单添加</el-button> -->

          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <el-pagination class="dy-list-el-pagination" :layout="layouts.join()" @size-change="sizeChangeHandle" @current-change="currentChangeHandle"
      :current-page="pageIndex" :page-sizes="[8, 10, 20, 30, 50]" :page-size="pageSize" :total="totalPage" prev-text="<上一页" next-text="下一页>"></el-pagination>
    </template>
    <!-- 付款方式修改-->
    <fukuanfangshi-set v-if="fukuanfangshiSetFlag" :parent="this" ref="fukuanfangshiSet"></fukuanfangshi-set>
    <!-- 付款方式详情-->
    <fukuanfangshi-detail v-if="fukuanfangshiDetailFlag" :parent="this" ref="fukuanfangshiDetail"></fukuanfangshi-detail>
    <!-- 付款方式订单查看-->
    <fukuanfangshi-dingdan-chakan v-if="fukuanfangshiDingdanChakanFlag" :parent="this" ref="fukuanfangshiDingdanChakan"></fukuanfangshi-dingdan-chakan>
    <!-- 付款方式订单添加-->
    <fukuanfangshi-dingdan-add v-if="fukuanfangshiDingdanAddFlag" :parent="this" ref="fukuanfangshiDingdanAdd"></fukuanfangshi-dingdan-add>

  </div>
</template>
<script>
import FukuanfangshiSet from "./fukuanfangshi-set"
import FukuanfangshiDetail from "./fukuanfangshi-detail"
import FukuanfangshiDingdanChakan from './fukuanfangshi-dingdan-chakan'
import FukuanfangshiDingdanAdd from './fukuanfangshi-dingdan-add'

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
      fukuanfangshiSetFlag: false,
      fukuanfangshiDetailFlag: false,
      fukuanfangshiDingdanChakanFlag: false,
      fukuanfangshiDingdanAddFlag: false,

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
    FukuanfangshiSet,
    FukuanfangshiDetail,
    FukuanfangshiDingdanChakan,
    FukuanfangshiDingdanAdd,

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

    // 获取付款方式分页数据列表
    getDataList() {
      this.dataListLoading = true;
      let params = {
        pageNo: this.pageIndex, //页码
        pageSize: this.pageSize, //页大小
        sortProperty: 'id',      //排序列
      }
      //搜索表单数据组装
      if (this.searchForm.mingcheng != '' && this.searchForm.mingcheng != undefined) {
        params['mingcheng'] = this.searchForm.mingcheng
      }

      this.$http({
        url: "fukuanfangshi/chakan",
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

    // 删除或批量删除付款方式方法
    fukuanfangshiDeleteHandler(id) {
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
          url: "fukuanfangshi/delete",
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

    //跳转到付款方式详情页面
    fukuanfangshiDetailHandler(id) {
      this.showFlag = false;
      this.fukuanfangshiDetailFlag = true;
      this.$nextTick(() => {
        this.$refs.fukuanfangshiDetail.init(id);
      });

    },

    //跳转到付款方式修改页面
    fukuanfangshiSetHandler(id) {
      this.showFlag = false;
      this.fukuanfangshiSetFlag = true;
      this.$nextTick(() => {
        this.$refs.fukuanfangshiSet.init(id);
      });
    },

    //更新付款方式信息操作方法
    fukuanfangshiSet(tid,tname,property,value) {
      let params = {};
      params['id'] = tid;
      params[property] = value;

      this.$confirm(`确定'${tname}'操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: `fukuanfangshi/set`,
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


    //跳转到付款方式订单添加页面
    dingdanAddHandler(id, mingcheng) {
      this.showFlag = false;
      this.fukuanfangshiDingdanAddFlag = true;
      this.$nextTick(() => {
        this.$refs.fukuanfangshiDingdanAdd.init(id, mingcheng);
      });
    },

    //跳转到付款方式订单查看页面
    dingdanChakanHandler(id) {
      this.showFlag = false;
      this.fukuanfangshiDingdanChakanFlag = true;
      this.$nextTick(() => {
        this.$refs.fukuanfangshiDingdanChakan.init(id);
      });
    },


 
  }

};
</script>
<style lang="scss" scoped>

</style>

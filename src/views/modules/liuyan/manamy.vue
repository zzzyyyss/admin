<template>
  <div class="dy-admin-router-view-div">
    <template v-if="showFlag">
      <!--搜索表单区域-->
      <el-form :inline="true" :model="searchForm" class="dy-list-search-el-form">
        <el-row class="dy-list-search-el-form-row">
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">标题</label>
            <el-input style="width: auto;" suffix-icon="el-icon-search" v-model="searchForm.biaoti" placeholder="请输入标题" clearable></el-input>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">用户</label>
            <el-select v-model="searchForm.usersid" placeholder="请选择用户" clearable>
              <el-option label="全部" value=""></el-option>
              <el-option v-for="(item, index) in usersOptions" v-bind:key="item.id" :label="item.loginname" :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">回复</label>
            <el-input style="width: auto;" suffix-icon="el-icon-search" v-model="searchForm.huifu" placeholder="请输入回复" clearable></el-input>
          </div>

          <el-button class="dy-list-search-button" icon="el-icon-search" type="success" @click="search">查{{ '\u3000' }}询</el-button>
        </el-row>
        <el-row class="dy-list-search-el-form-row-2">
          <el-button class="dy-list-batchdelete-button" :disabled="dataListSelections.length <= 0" type="danger" icon="el-icon-delete" @click="liuyanDeleteHandler()">批量删除</el-button>
        </el-row>
      </el-form>
      <!--数据列表区域-->
      <el-table class="dy-list-el-table" :stripe='true' :data="dataList" v-loading="dataListLoading"
      @selection-change="selectionChangeHandler" :border="true">
        <el-table-column v-if="true" type="selection" width="60"></el-table-column>
        <el-table-column label="序号" v-if="true" type="index" width="70" />
          <el-table-column label="标题">
            <template slot-scope="scope">
              {{ scope.row.biaoti }}
            </template>
          </el-table-column>
          <el-table-column label="留言时间">
            <template slot-scope="scope">
              {{ scope.row.liuyanshijian }}
            </template>
          </el-table-column>
          <el-table-column label="用户">
            <template slot-scope="scope">
              <div v-if="scope.row.users && scope.row.users.loginname">{{ scope.row.users.loginname }}</div>
              <div v-else>--</div>
            </template>
          </el-table-column>
          <el-table-column label="回复">
            <template slot-scope="scope">
              {{ scope.row.huifu }}
            </template>
          </el-table-column>

        <el-table-column width="350" label="操作">
          <template slot-scope="scope">

            <el-button class="dy-list-detail-button" type="success" icon="el-icon-info" size="mini" @click="liuyanDetailHandler(scope.row.id)">详情</el-button>
            <el-button class="dy-list-update-button" type="primary" icon="el-icon-edit" size="mini" @click="liuyanSetHandler(scope.row.id)">回复</el-button>
            <el-button class="dy-list-delete-button" type="danger" icon="el-icon-delete" size="mini" @click="liuyanDeleteHandler(scope.row.id)">删除</el-button>

          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <el-pagination class="dy-list-el-pagination" :layout="layouts.join()" @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[8, 10, 20, 30, 50]"
      :page-size="pageSize" :total="totalPage" prev-text="<上一页" next-text="下一页>"></el-pagination>
    </template>
    <!-- 留言反馈修改-->
    <liuyan-set v-if="liuyanSetFlag" :parent="this" ref="liuyanSet"></liuyan-set>
    <!-- 留言反馈详情-->
    <liuyan-detail v-if="liuyanDetailFlag" :parent="this" ref="liuyanDetail"></liuyan-detail>

  </div>
</template>
<script>
import LiuyanSet from "./liuyan-set"
import LiuyanDetail from "./liuyan-detail"

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
      liuyanSetFlag: false,
      liuyanDetailFlag: false,

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
    LiuyanSet,
    LiuyanDetail,

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

    // 获取留言反馈分页数据列表
    getDataList() {
      this.dataListLoading = true;
      let params = {
        pageNo: this.pageIndex, //页码
        pageSize: this.pageSize, //页大小
        sortProperty: 'id',      //排序列
        usersid: this.$storage.get('usersid'),
      }
      //搜索表单数据组装
      if (this.searchForm.biaoti != '' && this.searchForm.biaoti != undefined) {
        params['biaoti'] = this.searchForm.biaoti
      }
      if (this.searchForm.usersid != '' && this.searchForm.usersid != undefined) {
        params['usersid'] = this.searchForm.usersid
      }
      if (this.searchForm.huifu != '' && this.searchForm.huifu != undefined) {
        params['huifu'] = this.searchForm.huifu
      }

      this.$http({
        url: "liuyan/manamy",
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

    // 删除或批量删除留言反馈方法
    liuyanDeleteHandler(id) {
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
          url: "liuyan/delete",
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

    //跳转到留言反馈详情页面
    liuyanDetailHandler(id) {
      this.showFlag = false;
      this.liuyanDetailFlag = true;
      this.$nextTick(() => {
        this.$refs.liuyanDetail.init(id);
      });

    },

    //跳转到留言反馈修改页面
    liuyanSetHandler(id) {
      this.showFlag = false;
      this.liuyanSetFlag = true;
      this.$nextTick(() => {
        this.$refs.liuyanSet.init(id);
      });
    },

    //更新留言反馈信息操作方法
    liuyanSet(tid,tname,property,value) {
      let params = {};
      params['id'] = tid;
      params[property] = value;

      this.$confirm(`确定'${tname}'操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: `liuyan/set`,
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

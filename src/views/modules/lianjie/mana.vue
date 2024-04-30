<template>
  <div class="dy-admin-router-view-div">
    <template v-if="showFlag">
      <!--搜索表单区域-->
      <el-form :inline="true" :model="searchForm" class="dy-list-search-el-form">
        <el-row class="dy-list-search-el-form-row">
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">名称</label>
            <el-input style="width: auto;" suffix-icon="el-icon-search" v-model="searchForm.name" placeholder="请输入名称" clearable></el-input>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">链接地址</label>
            <el-input style="width: auto;" suffix-icon="el-icon-search" v-model="searchForm.url" placeholder="请输入链接地址" clearable></el-input>
          </div>

          <el-button class="dy-list-search-button" icon="el-icon-search" type="success" @click="search">查{{ '\u3000' }}询</el-button>
        </el-row>
        <el-row class="dy-list-search-el-form-row-2">
          <el-button class="dy-list-batchdelete-button" :disabled="dataListSelections.length <= 0" type="danger" icon="el-icon-delete" @click="lianjieDeleteHandler()">批量删除</el-button>
          <!--将数据导出Excel文件-->
          <el-button type="info" icon="el-icon-download" @click="exportExcel" v-show="false">Excel 导出</el-button>
            <!--上传Excel文件批量导入-->
            <excel-file-upload action="lianjie/excelImport" :limit="1" :multiple="true" style="margin-left: 20px;" v-show="false"></excel-file-upload>
        </el-row>
      </el-form>
      <!--数据列表区域-->
      <el-table class="dy-list-el-table" :stripe='true' :data="dataList" v-loading="dataListLoading"
      @selection-change="selectionChangeHandler" :border="true">
        <el-table-column v-if="true" type="selection" width="60"></el-table-column>
        <el-table-column label="序号" v-if="true" type="index" width="70" />
          <el-table-column label="名称">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column label="链接地址">
            <template slot-scope="scope">
              {{ scope.row.url }}
            </template>
          </el-table-column>

        <el-table-column width="350" label="操作">
          <template slot-scope="scope">

            <el-button v-show="true" class="dy-list-detail-button" type="success" icon="el-icon-info" size="mini" @click="lianjieDetailHandler(scope.row.id)">详情</el-button>
            <el-button v-show="true" class="dy-list-update-button" type="primary" icon="el-icon-edit" size="mini" @click="lianjieSetHandler(scope.row.id)">修改</el-button>
            <el-button v-show="true" class="dy-list-delete-button" type="danger" icon="el-icon-delete" size="mini" @click="lianjieDeleteHandler(scope.row.id)">删除</el-button>

          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <el-pagination class="dy-list-el-pagination" :layout="layouts.join()" @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[8, 10, 20, 30, 50]"
      :page-size="pageSize" :total="totalPage" prev-text="<上一页" next-text="下一页>"></el-pagination>
    </template>
    <!-- 友情链接修改-->
    <lianjie-set v-if="lianjieSetFlag" :parent="this" ref="lianjieSet"></lianjie-set>
    <!-- 友情链接详情-->
    <lianjie-detail v-if="lianjieDetailFlag" :parent="this" ref="lianjieDetail"></lianjie-detail>

  </div>
</template>
<script>
import LianjieSet from "./lianjie-set"
import LianjieDetail from "./lianjie-detail"

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
      lianjieSetFlag: false,
      lianjieDetailFlag: false,

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
    LianjieSet,
    LianjieDetail,

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

    // 获取友情链接分页数据列表
    getDataList() {
      this.dataListLoading = true;
      let params = {
        pageNo: this.pageIndex, //页码
        pageSize: this.pageSize, //页大小
        sortProperty: 'id',      //排序列
      }
      //搜索表单数据组装
      if (this.searchForm.name != '' && this.searchForm.name != undefined) {
        params['name'] = this.searchForm.name
      }
      if (this.searchForm.url != '' && this.searchForm.url != undefined) {
        params['url'] = this.searchForm.url
      }

      this.$http({
        url: "lianjie/mana",
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

    // 删除或批量删除友情链接方法
    lianjieDeleteHandler(id) {
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
          url: "lianjie/delete",
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

    //跳转到友情链接详情页面
    lianjieDetailHandler(id) {
      this.showFlag = false;
      this.lianjieDetailFlag = true;
      this.$nextTick(() => {
        this.$refs.lianjieDetail.init(id);
      });

    },

    //跳转到友情链接修改页面
    lianjieSetHandler(id) {
      this.showFlag = false;
      this.lianjieSetFlag = true;
      this.$nextTick(() => {
        this.$refs.lianjieSet.init(id);
      });
    },

    //更新友情链接信息操作方法
    lianjieSet(tid,tname,property,value) {
      let params = {};
      params['id'] = tid;
      params[property] = value;

      this.$confirm(`确定'${tname}'操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: `lianjie/set`,
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
    //excel导出
    exportExcel() {
      let url = this.$base.url + "/lianjie/exportExcel";
      window.open(url);
    },




 
  }

};
</script>
<style lang="scss" scoped>

</style>


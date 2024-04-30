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

          <el-button class="dy-list-search-button" icon="el-icon-search" type="success" @click="search">查{{ '\u3000' }}询</el-button>
        </el-row>
        <el-row class="dy-list-search-el-form-row-2">
          <el-button class="dy-list-batchdelete-button" :disabled="dataListSelections.length <= 0" type="danger" icon="el-icon-delete" @click="gonggaoDeleteHandler()">批量删除</el-button>
          <!--将数据导出Excel文件-->
          <el-button type="info" icon="el-icon-download" @click="exportExcel" v-show="false">Excel 导出</el-button>
            <!--上传Excel文件批量导入-->
            <excel-file-upload action="gonggao/excelImport" :limit="1" :multiple="true" style="margin-left: 20px;" v-show="false"></excel-file-upload>
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
          <el-table-column label="图片">
            <template slot-scope="scope">
              <div v-if="scope.row.tupian">
                <img :src="getFileSrc(scope.row.tupian)" width="80" height="80">
              </div>
              <div v-else>暂无图片</div>
            </template>
          </el-table-column>
          <el-table-column label="时间">
            <template slot-scope="scope">
              {{ scope.row.shijian }}
            </template>
          </el-table-column>

        <el-table-column width="350" label="操作">
          <template slot-scope="scope">

            <el-button v-show="true" class="dy-list-detail-button" type="success" icon="el-icon-info" size="mini" @click="gonggaoDetailHandler(scope.row.id)">详情</el-button>
            <el-button v-show="true" class="dy-list-update-button" type="primary" icon="el-icon-edit" size="mini" @click="gonggaoSetHandler(scope.row.id)">修改</el-button>
            <el-button v-show="true" class="dy-list-delete-button" type="danger" icon="el-icon-delete" size="mini" @click="gonggaoDeleteHandler(scope.row.id)">删除</el-button>

          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <el-pagination class="dy-list-el-pagination" :layout="layouts.join()" @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[8, 10, 20, 30, 50]"
      :page-size="pageSize" :total="totalPage" prev-text="<上一页" next-text="下一页>"></el-pagination>
    </template>
    <!-- 公告修改-->
    <gonggao-set v-if="gonggaoSetFlag" :parent="this" ref="gonggaoSet"></gonggao-set>
    <!-- 公告详情-->
    <gonggao-detail v-if="gonggaoDetailFlag" :parent="this" ref="gonggaoDetail"></gonggao-detail>

  </div>
</template>
<script>
import GonggaoSet from "./gonggao-set"
import GonggaoDetail from "./gonggao-detail"

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
      gonggaoSetFlag: false,
      gonggaoDetailFlag: false,

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
    GonggaoSet,
    GonggaoDetail,

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

    // 获取公告分页数据列表
    getDataList() {
      this.dataListLoading = true;
      let params = {
        pageNo: this.pageIndex, //页码
        pageSize: this.pageSize, //页大小
        sortProperty: 'id',      //排序列
      }
      //搜索表单数据组装
      if (this.searchForm.biaoti != '' && this.searchForm.biaoti != undefined) {
        params['biaoti'] = this.searchForm.biaoti
      }

      this.$http({
        url: "gonggao/mana",
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

    // 删除或批量删除公告方法
    gonggaoDeleteHandler(id) {
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
          url: "gonggao/delete",
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

    //跳转到公告详情页面
    gonggaoDetailHandler(id) {
      this.showFlag = false;
      this.gonggaoDetailFlag = true;
      this.$nextTick(() => {
        this.$refs.gonggaoDetail.init(id);
      });

    },

    //跳转到公告修改页面
    gonggaoSetHandler(id) {
      this.showFlag = false;
      this.gonggaoSetFlag = true;
      this.$nextTick(() => {
        this.$refs.gonggaoSet.init(id);
      });
    },

    //更新公告信息操作方法
    gonggaoSet(tid,tname,property,value) {
      let params = {};
      params['id'] = tid;
      params[property] = value;

      this.$confirm(`确定'${tname}'操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: `gonggao/set`,
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
      let url = this.$base.url + "/gonggao/exportExcel";
      window.open(url);
    },




 
  }

};
</script>
<style lang="scss" scoped>

</style>


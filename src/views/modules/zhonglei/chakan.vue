<template>
  <div class="dy-admin-router-view-div">
    <template v-if="showFlag">
      <!--搜索表单区域-->
      <el-form :inline="true" :model="searchForm" class="dy-list-search-el-form">
        <el-row class="dy-list-search-el-form-row">
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">名称</label>
            <el-input style="width: auto;" suffix-icon="el-icon-search" v-model="searchForm.mingcheng" placeholder="请输入名称" clearable></el-input>
          </div>

          <el-button class="dy-list-search-button" icon="el-icon-search" type="success" @click="search">查{{ '\u3000' }}询</el-button>
        </el-row>
        <!-- <el-row class="dy-list-search-el-form-row-2"'>
            <el-button class="dy-list-batchdelete-button" :disabled="dataListSelections.length <= 0" type="danger" icon="el-icon-delete" @click="zhongleiDeleteHandler()">批量删除</el-button>
        </el-row> -->
      </el-form>
      <!--数据列表区域-->
      <el-table class="dy-list-el-table" :stripe='true' :data="dataList" v-loading="dataListLoading"
      @selection-change="selectionChangeHandler" :border="true">
        <el-table-column v-if="false" type="selection" width="60"></el-table-column>
        <el-table-column label="序号" v-if="true" type="index" width="70" />
          <el-table-column label="名称">
            <template slot-scope="scope">
              {{ scope.row.mingcheng }}
            </template>
          </el-table-column>

        <el-table-column width="350" label="操作">
          <template slot-scope="scope">

            <el-button class="dy-list-detail-button" type="success" icon="el-icon-info" size="mini" @click="zhongleiDetailHandler(scope.row.id)">详情</el-button>
            <!-- <el-button class="dy-list-update-button" type="primary" icon="el-icon-edit" size="mini" @click="zhongleiSetHandler(scope.row.id)">修改</el-button> -->
            <!-- <el-button class="dy-list-delete-button" type="danger" icon="el-icon-delete" size="mini" @click="zhongleiDeleteHandler(scope.row.id)">删除</el-button> -->
              <!-- <el-button class="dy-list-chakan-button" type="success" icon="el-icon-tickets" size="mini" @click="shangpinChakanHandler(scope.row.id)">商品查看</el-button> -->
              <!-- <el-button class="dy-list-add-button" type="success" icon="el-icon-circle-plus" size="mini" @click="shangpinAddHandler(scope.row.id, scope.row.mingcheng)">商品添加</el-button> -->

          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <el-pagination class="dy-list-el-pagination" :layout="layouts.join()" @size-change="sizeChangeHandle" @current-change="currentChangeHandle"
      :current-page="pageIndex" :page-sizes="[8, 10, 20, 30, 50]" :page-size="pageSize" :total="totalPage" prev-text="<上一页" next-text="下一页>"></el-pagination>
    </template>
    <!-- 分类修改-->
    <zhonglei-set v-if="zhongleiSetFlag" :parent="this" ref="zhongleiSet"></zhonglei-set>
    <!-- 分类详情-->
    <zhonglei-detail v-if="zhongleiDetailFlag" :parent="this" ref="zhongleiDetail"></zhonglei-detail>
    <!-- 分类商品查看-->
    <zhonglei-shangpin-chakan v-if="zhongleiShangpinChakanFlag" :parent="this" ref="zhongleiShangpinChakan"></zhonglei-shangpin-chakan>
    <!-- 分类商品添加-->
    <zhonglei-shangpin-add v-if="zhongleiShangpinAddFlag" :parent="this" ref="zhongleiShangpinAdd"></zhonglei-shangpin-add>

  </div>
</template>
<script>
import ZhongleiSet from "./zhonglei-set"
import ZhongleiDetail from "./zhonglei-detail"
import ZhongleiShangpinChakan from './zhonglei-shangpin-chakan'
import ZhongleiShangpinAdd from './zhonglei-shangpin-add'

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
      zhongleiSetFlag: false,
      zhongleiDetailFlag: false,
      zhongleiShangpinChakanFlag: false,
      zhongleiShangpinAddFlag: false,

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
    ZhongleiSet,
    ZhongleiDetail,
    ZhongleiShangpinChakan,
    ZhongleiShangpinAdd,

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

    // 获取分类分页数据列表
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
        url: "zhonglei/chakan",
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

    // 删除或批量删除分类方法
    zhongleiDeleteHandler(id) {
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
          url: "zhonglei/delete",
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

    //跳转到分类详情页面
    zhongleiDetailHandler(id) {
      this.showFlag = false;
      this.zhongleiDetailFlag = true;
      this.$nextTick(() => {
        this.$refs.zhongleiDetail.init(id);
      });

    },

    //跳转到分类修改页面
    zhongleiSetHandler(id) {
      this.showFlag = false;
      this.zhongleiSetFlag = true;
      this.$nextTick(() => {
        this.$refs.zhongleiSet.init(id);
      });
    },

    //更新分类信息操作方法
    zhongleiSet(tid,tname,property,value) {
      let params = {};
      params['id'] = tid;
      params[property] = value;

      this.$confirm(`确定'${tname}'操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: `zhonglei/set`,
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


    //跳转到分类商品添加页面
    shangpinAddHandler(id, mingcheng) {
      this.showFlag = false;
      this.zhongleiShangpinAddFlag = true;
      this.$nextTick(() => {
        this.$refs.zhongleiShangpinAdd.init(id, mingcheng);
      });
    },

    //跳转到分类商品查看页面
    shangpinChakanHandler(id) {
      this.showFlag = false;
      this.zhongleiShangpinChakanFlag = true;
      this.$nextTick(() => {
        this.$refs.zhongleiShangpinChakan.init(id);
      });
    },


 
  }

};
</script>
<style lang="scss" scoped>

</style>

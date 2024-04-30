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
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">编号</label>
            <el-input style="width: auto;" suffix-icon="el-icon-search" v-model="searchForm.bianhao" placeholder="请输入编号" clearable></el-input>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">分类</label>
            <el-select v-model="searchForm.zhongleiid" placeholder="请选择分类" clearable>
              <el-option label="全部" value=""></el-option>
              <el-option v-for="(item, index) in zhongleiOptions" v-bind:key="item.id" :label="item.mingcheng" :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">单位</label>
            <el-input style="width: auto;" suffix-icon="el-icon-search" v-model="searchForm.danwei" placeholder="请输入单位" clearable></el-input>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">是否特价</label>
            <el-select v-model="searchForm.shenhe" placeholder="请选择是否特价" clearable>
              <el-option label="全部" value=""></el-option>
              <el-option v-for="(item, index) in shenheOptions" v-bind:key="item" :label="item" :value="item">
              </el-option>
            </el-select>
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
          <el-button class="dy-list-batchdelete-button" :disabled="dataListSelections.length <= 0" type="danger" icon="el-icon-delete" @click="shangpinDeleteHandler()">批量删除</el-button>
          <!--将数据导出Excel文件-->
          <el-button type="info" icon="el-icon-download" @click="exportExcel" v-show="false">Excel 导出</el-button>
            <!--上传Excel文件批量导入-->
            <excel-file-upload action="shangpin/excelImport" :limit="1" :multiple="true" style="margin-left: 20px;" v-show="false"></excel-file-upload>
        </el-row>
      </el-form>
      <!--数据列表区域-->
      <el-table class="dy-list-el-table" :stripe='true' :data="dataList" v-loading="dataListLoading"
      @selection-change="selectionChangeHandler" :border="true">
        <el-table-column v-if="true" type="selection" width="60"></el-table-column>
        <el-table-column label="序号" v-if="true" type="index" width="70" />
          <el-table-column label="名称">
            <template slot-scope="scope">
              {{ scope.row.mingcheng }}
            </template>
          </el-table-column>
          <el-table-column label="编号">
            <template slot-scope="scope">
              {{ scope.row.bianhao }}
            </template>
          </el-table-column>
          <el-table-column label="分类">
            <template slot-scope="scope">
              <div v-if="scope.row.zhonglei && scope.row.zhonglei.mingcheng">{{ scope.row.zhonglei.mingcheng }}</div>
              <div v-else>--</div>
            </template>
          </el-table-column>
          <el-table-column label="图片">
            <template slot-scope="scope">
              <div v-if="scope.row.image">
                <img :src="getFileSrc(scope.row.image)" width="80" height="80">
              </div>
              <div v-else>暂无图片</div>
            </template>
          </el-table-column>
          <el-table-column label="原价">
            <template slot-scope="scope">
              {{ scope.row.yuanshijiage }}
            </template>
          </el-table-column>
          <el-table-column label="现价">
            <template slot-scope="scope">
              {{ scope.row.jiage }}
            </template>
          </el-table-column>
          <el-table-column label="单位">
            <template slot-scope="scope">
              {{ scope.row.danwei }}
            </template>
          </el-table-column>
          <el-table-column label="是否特价">
            <template slot-scope="scope">
              {{ scope.row.shenhe }}
            </template>
          </el-table-column>
          <el-table-column label="库存数量">
            <template slot-scope="scope">
              {{ scope.row.kucunshuliang }}
            </template>
          </el-table-column>
          <el-table-column label="销售数量">
            <template slot-scope="scope">
              {{ scope.row.xiaoshoushuliang }}
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
              <el-button v-show="scope.row.shenhe == 'no'" class="dy-list-shehe-button" type="primary" icon="el-icon-edit-outline" size="mini" @click="shangpinSet(scope.row.id,'是否特价','shenhe', 'yes')">是否特价</el-button>
              <el-button v-show="scope.row.shenhe == 'yes'" class="dy-list-shehe-button" type="primary" icon="el-icon-edit-outline" size="mini" @click="shangpinSet(scope.row.id,'取消是否特价','shenhe', 'no')">取消是否特价</el-button>

            <el-button v-show="true" class="dy-list-detail-button" type="success" icon="el-icon-info" size="mini" @click="shangpinDetailHandler(scope.row.id)">详情</el-button>
            <el-button v-show="true" class="dy-list-update-button" type="primary" icon="el-icon-edit" size="mini" @click="shangpinSetHandler(scope.row.id)">修改</el-button>
            <el-button v-show="true" class="dy-list-delete-button" type="danger" icon="el-icon-delete" size="mini" @click="shangpinDeleteHandler(scope.row.id)">删除</el-button>
              <!-- <el-button class="dy-list-chakan-button" type="success" icon="el-icon-tickets" size="mini" @click="chanpinpingjiaChakanHandler(scope.row.id)">商品评价查看</el-button> -->
              <!-- <el-button class="dy-list-add-button" type="success" icon="el-icon-circle-plus" size="mini" @click="chanpinpingjiaAddHandler(scope.row.id, scope.row.mingcheng)">商品评价添加</el-button> -->
              <!-- <el-button class="dy-list-chakan-button" type="success" icon="el-icon-tickets" size="mini" @click="dingdanxiangChakanHandler(scope.row.id)">订单项查看</el-button> -->
              <!-- <el-button class="dy-list-add-button" type="success" icon="el-icon-circle-plus" size="mini" @click="dingdanxiangAddHandler(scope.row.id, scope.row.mingcheng)">订单项添加</el-button> -->
              <!-- <el-button class="dy-list-chakan-button" type="success" icon="el-icon-tickets" size="mini" @click="gouwucheChakanHandler(scope.row.id)">购物车查看</el-button> -->
              <!-- <el-button class="dy-list-add-button" type="success" icon="el-icon-circle-plus" size="mini" @click="gouwucheAddHandler(scope.row.id, scope.row.mingcheng)">购物车添加</el-button> -->
              <!-- <el-button class="dy-list-chakan-button" type="success" icon="el-icon-tickets" size="mini" @click="shoucangChakanHandler(scope.row.id)">商品收藏查看</el-button> -->
              <!-- <el-button class="dy-list-add-button" type="success" icon="el-icon-circle-plus" size="mini" @click="shoucangAddHandler(scope.row.id, scope.row.mingcheng)">商品收藏添加</el-button> -->

          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <el-pagination class="dy-list-el-pagination" :layout="layouts.join()" @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[8, 10, 20, 30, 50]"
      :page-size="pageSize" :total="totalPage" prev-text="<上一页" next-text="下一页>"></el-pagination>
    </template>
    <!-- 商品修改-->
    <shangpin-set v-if="shangpinSetFlag" :parent="this" ref="shangpinSet"></shangpin-set>
    <!-- 商品详情-->
    <shangpin-detail v-if="shangpinDetailFlag" :parent="this" ref="shangpinDetail"></shangpin-detail>
    <!-- 商品商品评价查看-->
    <shangpin-chanpinpingjia-chakan v-if="shangpinChanpinpingjiaChakanFlag" :parent="this" ref="shangpinChanpinpingjiaChakan"></shangpin-chanpinpingjia-chakan>
    <!-- 商品商品评价添加-->
    <shangpin-chanpinpingjia-add v-if="shangpinChanpinpingjiaAddFlag" :parent="this" ref="shangpinChanpinpingjiaAdd"></shangpin-chanpinpingjia-add>
    <!-- 商品订单项查看-->
    <shangpin-dingdanxiang-chakan v-if="shangpinDingdanxiangChakanFlag" :parent="this" ref="shangpinDingdanxiangChakan"></shangpin-dingdanxiang-chakan>
    <!-- 商品订单项添加-->
    <shangpin-dingdanxiang-add v-if="shangpinDingdanxiangAddFlag" :parent="this" ref="shangpinDingdanxiangAdd"></shangpin-dingdanxiang-add>
    <!-- 商品购物车查看-->
    <shangpin-gouwuche-chakan v-if="shangpinGouwucheChakanFlag" :parent="this" ref="shangpinGouwucheChakan"></shangpin-gouwuche-chakan>
    <!-- 商品购物车添加-->
    <shangpin-gouwuche-add v-if="shangpinGouwucheAddFlag" :parent="this" ref="shangpinGouwucheAdd"></shangpin-gouwuche-add>
    <!-- 商品商品收藏查看-->
    <shangpin-shoucang-chakan v-if="shangpinShoucangChakanFlag" :parent="this" ref="shangpinShoucangChakan"></shangpin-shoucang-chakan>
    <!-- 商品商品收藏添加-->
    <shangpin-shoucang-add v-if="shangpinShoucangAddFlag" :parent="this" ref="shangpinShoucangAdd"></shangpin-shoucang-add>

  </div>
</template>
<script>
import ShangpinSet from "./shangpin-set"
import ShangpinDetail from "./shangpin-detail"
import ShangpinChanpinpingjiaChakan from './shangpin-chanpinpingjia-chakan'
import ShangpinChanpinpingjiaAdd from './shangpin-chanpinpingjia-add'
import ShangpinDingdanxiangChakan from './shangpin-dingdanxiang-chakan'
import ShangpinDingdanxiangAdd from './shangpin-dingdanxiang-add'
import ShangpinGouwucheChakan from './shangpin-gouwuche-chakan'
import ShangpinGouwucheAdd from './shangpin-gouwuche-add'
import ShangpinShoucangChakan from './shangpin-shoucang-chakan'
import ShangpinShoucangAdd from './shangpin-shoucang-add'

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
      shangpinSetFlag: false,
      shangpinDetailFlag: false,
      shangpinChanpinpingjiaChakanFlag: false,
      shangpinChanpinpingjiaAddFlag: false,
      shangpinDingdanxiangChakanFlag: false,
      shangpinDingdanxiangAddFlag: false,
      shangpinGouwucheChakanFlag: false,
      shangpinGouwucheAddFlag: false,
      shangpinShoucangChakanFlag: false,
      shangpinShoucangAddFlag: false,

      layouts: ["total", "prev", "pager", "next", "sizes", "jumper"],
      xingbieOptions: [],
      typeOptions: [],
      shenheOptions: [],
      zhongleiOptions: [],
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
    ShangpinSet,
    ShangpinDetail,
    ShangpinChanpinpingjiaChakan,
    ShangpinChanpinpingjiaAdd,
    ShangpinDingdanxiangChakan,
    ShangpinDingdanxiangAdd,
    ShangpinGouwucheChakan,
    ShangpinGouwucheAdd,
    ShangpinShoucangChakan,
    ShangpinShoucangAdd,

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
      this.getZhongleiList();
      this.getUsersList();

    },

    //点击搜索按钮方法
    search() {
      this.pageIndex = 1;
      this.getDataList();
    },

    // 获取商品分页数据列表
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
      if (this.searchForm.bianhao != '' && this.searchForm.bianhao != undefined) {
        params['bianhao'] = this.searchForm.bianhao
      }
      if (this.searchForm.zhongleiid != '' && this.searchForm.zhongleiid != undefined) {
        params['zhongleiid'] = this.searchForm.zhongleiid
      }
      if (this.searchForm.danwei != '' && this.searchForm.danwei != undefined) {
        params['danwei'] = this.searchForm.danwei
      }
      if (this.searchForm.shenhe != '' && this.searchForm.shenhe != undefined) {
        params['shenhe'] = this.searchForm.shenhe
      }
      if (this.searchForm.usersid != '' && this.searchForm.usersid != undefined) {
        params['usersid'] = this.searchForm.usersid
      }

      this.$http({
        url: "shangpin/mana",
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

    // 删除或批量删除商品方法
    shangpinDeleteHandler(id) {
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
          url: "shangpin/delete",
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

    //跳转到商品详情页面
    shangpinDetailHandler(id) {
      this.showFlag = false;
      this.shangpinDetailFlag = true;
      this.$nextTick(() => {
        this.$refs.shangpinDetail.init(id);
      });

    },

    //跳转到商品修改页面
    shangpinSetHandler(id) {
      this.showFlag = false;
      this.shangpinSetFlag = true;
      this.$nextTick(() => {
        this.$refs.shangpinSet.init(id);
      });
    },

    //更新商品信息操作方法
    shangpinSet(tid,tname,property,value) {
      let params = {};
      params['id'] = tid;
      params[property] = value;

      this.$confirm(`确定'${tname}'操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: `shangpin/set`,
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
      let url = this.$base.url + "/shangpin/exportExcel";
      window.open(url);
    },


    //跳转到商品商品评价添加页面
    chanpinpingjiaAddHandler(id, mingcheng) {
      this.showFlag = false;
      this.shangpinChanpinpingjiaAddFlag = true;
      this.$nextTick(() => {
        this.$refs.shangpinChanpinpingjiaAdd.init(id, mingcheng);
      });
    },

    //跳转到商品商品评价查看页面
    chanpinpingjiaChakanHandler(id) {
      this.showFlag = false;
      this.shangpinChanpinpingjiaChakanFlag = true;
      this.$nextTick(() => {
        this.$refs.shangpinChanpinpingjiaChakan.init(id);
      });
    },
    //跳转到商品订单项添加页面
    dingdanxiangAddHandler(id, mingcheng) {
      this.showFlag = false;
      this.shangpinDingdanxiangAddFlag = true;
      this.$nextTick(() => {
        this.$refs.shangpinDingdanxiangAdd.init(id, mingcheng);
      });
    },

    //跳转到商品订单项查看页面
    dingdanxiangChakanHandler(id) {
      this.showFlag = false;
      this.shangpinDingdanxiangChakanFlag = true;
      this.$nextTick(() => {
        this.$refs.shangpinDingdanxiangChakan.init(id);
      });
    },
    //跳转到商品购物车添加页面
    gouwucheAddHandler(id, mingcheng) {
      this.showFlag = false;
      this.shangpinGouwucheAddFlag = true;
      this.$nextTick(() => {
        this.$refs.shangpinGouwucheAdd.init(id, mingcheng);
      });
    },

    //跳转到商品购物车查看页面
    gouwucheChakanHandler(id) {
      this.showFlag = false;
      this.shangpinGouwucheChakanFlag = true;
      this.$nextTick(() => {
        this.$refs.shangpinGouwucheChakan.init(id);
      });
    },
    //跳转到商品商品收藏添加页面
    shoucangAddHandler(id, mingcheng) {
      this.showFlag = false;
      this.shangpinShoucangAddFlag = true;
      this.$nextTick(() => {
        this.$refs.shangpinShoucangAdd.init(id, mingcheng);
      });
    },

    //跳转到商品商品收藏查看页面
    shoucangChakanHandler(id) {
      this.showFlag = false;
      this.shangpinShoucangChakanFlag = true;
      this.$nextTick(() => {
        this.$refs.shangpinShoucangChakan.init(id);
      });
    },


    //获取所有分类
    getZhongleiList() {
      this.$http({
        url: "zhonglei/all",
        method: "get",
        params: null
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.zhongleiOptions = data.data;
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


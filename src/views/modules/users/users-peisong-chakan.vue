<template>
  <div>
    <template v-if="this.parent.usersPeisongChakanFlag && showFlag">
      <!--搜索表单区域-->
      <el-form :inline="true" :model="searchForm" class="dy-list-search-el-form" v-if="false">
        <el-row class="dy-list-search-el-form-row">
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">客户姓名</label>
            <el-input style="width: auto;" suffix-icon="el-icon-search" v-model="searchForm.xingming" placeholder="请输入客户姓名" clearable></el-input>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">订单</label>
            <el-select v-model="searchForm.dingdanid" placeholder="请选择订单" clearable>
              <el-option label="全部" value=""></el-option>
              <el-option v-for="(item, index) in dingdanOptions" v-bind:key="item.id" :label="item.bianhao" :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">电话</label>
            <el-input style="width: auto;" suffix-icon="el-icon-search" v-model="searchForm.dianhua" placeholder="请输入电话" clearable></el-input>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">地址</label>
            <el-input style="width: auto;" suffix-icon="el-icon-search" v-model="searchForm.dizhi" placeholder="请输入地址" clearable></el-input>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">是否接单</label>
            <el-select v-model="searchForm.songshenhe" placeholder="请选择是否接单" clearable>
              <el-option label="全部" value=""></el-option>
              <el-option v-for="(item, index) in shenheOptions" v-bind:key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">配送员姓名</label>
            <el-input style="width: auto;" suffix-icon="el-icon-search" v-model="searchForm.psxingming" placeholder="请输入配送员姓名" clearable></el-input>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">配送员电话</label>
            <el-input style="width: auto;" suffix-icon="el-icon-search" v-model="searchForm.psdianhua" placeholder="请输入配送员电话" clearable></el-input>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">用户</label>
            <el-select v-model="searchForm.usersslid" placeholder="请选择用户" clearable>
              <el-option label="全部" value=""></el-option>
              <el-option v-for="(item, index) in usersOptions" v-bind:key="item.id" :label="item.loginname" :value="item.id">
              </el-option>
            </el-select>
          </div>

          <el-button class="dy-list-search-button" icon="el-icon-search" type="success" @click="search">查{{ '\u3000' }}询</el-button>
        </el-row>
        <!-- <el-row class="dy-list-search-el-form-row-2">
            <el-button class="dy-list-batchdelete-button" :disabled="dataListSelections.length <= 0" type="danger" icon="el-icon-delete" @click="peisongDeleteHandler()">批量删除</el-button>
        </el-row> -->
      </el-form>
      <!--数据列表区域-->
      <el-table class="dy-list-el-table" :stripe='true' :data="dataList" v-loading="dataListLoading"
      @selection-change="selectionChangeHandler" :border="true">
        <el-table-column v-if="false" type="selection" width="60"></el-table-column>
        <el-table-column label="序号" v-if="true" type="index" width="70" />
        <el-table-column label="客户姓名">
          <template slot-scope="scope">
            {{ scope.row.xingming }}
          </template>
        </el-table-column>
        <el-table-column label="订单">
          <template slot-scope="scope">
            <div v-if="scope.row.dingdan && scope.row.dingdan.bianhao">{{ scope.row.dingdan.bianhao }}</div>
            <div v-else>--</div>
          </template>
        </el-table-column>
        <el-table-column label="电话">
          <template slot-scope="scope">
            {{ scope.row.dianhua }}
          </template>
        </el-table-column>
        <el-table-column label="地址">
          <template slot-scope="scope">
            {{ scope.row.dizhi }}
          </template>
        </el-table-column>
        <el-table-column label="时间">
          <template slot-scope="scope">
            {{ scope.row.shijian }}
          </template>
        </el-table-column>
        <el-table-column label="是否接单">
          <template slot-scope="scope">
            {{ scope.row.songshenhe }}
          </template>
        </el-table-column>
        <el-table-column label="配送员姓名">
          <template slot-scope="scope">
            {{ scope.row.psxingming }}
          </template>
        </el-table-column>
        <el-table-column label="配送员电话">
          <template slot-scope="scope">
            {{ scope.row.psdianhua }}
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
              <!-- <el-button class="dy-list-shehe-button" type="primary" icon="el-icon-edit-outline" size="mini" @click="peisongSet(scope.row.id,scope.row.songshenhe == 'no' ? '是否接单' : '取消是否接单','songshenhe',scope.row.songshenhe == 'no' ? 'yes' : 'no')">{{scope.row.songshenhe == 'no' ? '是否接单' : '取消是否接单' }}</el-button> -->


            <el-button class="dy-list-detail-button" type="success" icon="el-icon-info" size="mini" @click="peisongDetailHandler(scope.row.id)">详情</el-button>
            <!-- <el-button class="dy-list-update-button" type="primary" icon="el-icon-edit" size="mini" @click="peisongSetHandler(scope.row.id)">修改</el-button> -->
            <!-- <el-button class="dy-list-delete-button" type="danger" icon="el-icon-delete" size="mini" @click="peisongDeleteHandler(scope.row.id)">删除</el-button> -->
              <!-- <el-button class="dy-list-chakan-button" type="success" icon="el-icon-tickets" size="mini" @click="pingjiaChakanHandler(scope.row.id)">评价查看</el-button> -->
              <!-- <el-button class="dy-list-add-button" type="success" icon="el-icon-circle-plus" size="mini" @click="pingjiaAddHandler(scope.row.id, scope.row.xingming)">评价添加</el-button> -->

          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <el-pagination class="dy-list-el-pagination" :layout="layouts.join()" @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[8, 10, 20, 30, 50]"
      :page-size="pageSize" :total="totalPage" prev-text="<上一页" next-text="下一页>"></el-pagination>
      <el-button class="dy-back-button" style="margin: 10px 44% !important;" @click="back">返回</el-button>
    </template>
    <!-- 配送修改-->
    <peisong-set v-if="peisongSetFlag" :parent="this" ref="peisongSet"></peisong-set>
    <!-- 配送详情-->
    <peisong-detail v-if="peisongDetailFlag" :parent="this" ref="peisongDetail"></peisong-detail>
    <!-- 配送评价查看-->
    <peisong-pingjia-chakan v-if="peisongPingjiaChakanFlag" :parent="this" ref="peisongPingjiaChakan"></peisong-pingjia-chakan>
    <!-- 配送评价添加-->
    <peisong-pingjia-add v-if="peisongPingjiaAddFlag" :parent="this" ref="peisongPingjiaAdd"></peisong-pingjia-add>

  </div>
</template>
<script>
import PeisongSet from "../peisong/peisong-set"
import PeisongDetail from "../peisong/peisong-detail"
import PeisongPingjiaChakan from '../peisong/peisong-pingjia-chakan'
import PeisongPingjiaAdd from '../peisong/peisong-pingjia-add'

export default {
  data() {
    return {
      searchForm: {
        key: ""
      },
      usersid: 0,
      dataList: [],
      pageIndex: 1,
      pageSize: 8,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      showFlag: true,
      peisongSetFlag: false,
      peisongDetailFlag: false,
      peisongPingjiaChakanFlag: false,
      peisongPingjiaAddFlag: false,

      layouts: ["total", "prev", "pager", "next", "sizes", "jumper"],
      xingbieOptions: [],
      typeOptions: [],
      shenheOptions: [],
      dingdanOptions: [],
      usersOptions: [],

    };
  },
  props: ["parent"],
  created() {
  },
  mounted() {
  },
  filters: {
    htmlfilter: function (val) {
      return val.replace(/<[^>]*>/g).replace(/undefined/g, '');
    }
  },
  components: {
    PeisongSet,
    PeisongDetail,
    PeisongPingjiaChakan,
    PeisongPingjiaAdd,

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
    // 返回按钮事件
    back() {
      if (this.parent) {
        this.parent.showFlag = true;
        this.parent.usersPeisongChakanFlag = false;
      } else {
        this.$router.push('/');
      }
    },
    //页面初始化
    init(id) {
      this.shenheOptions = "yes,no".split(',');
      this.xingbieOptions = "男,女".split(',');
      this.typeOptions = this.$userstypes
      if (id) {
        this.usersid = id;
      }
      this.getDataList();
      this.getDingdanList();
      this.getUsersList();

    },

    //点击搜索按钮方法
    search() {
      this.pageIndex = 1;
      this.getDataList();
    },

    // 获取配送分页数据列表
    getDataList() {
      this.dataListLoading = true;
      let params = {
        pageNo: this.pageIndex, //页码
        pageSize: this.pageSize, //页大小
        sortProperty: 'id',      //排序列
        usersid: this.usersid,
      }
      //搜索表单数据组装
      if (this.searchForm.xingming != '' && this.searchForm.xingming != undefined) {
        params['xingming'] = this.searchForm.xingming
      }
      if (this.searchForm.dingdanid != '' && this.searchForm.dingdanid != undefined) {
        params['dingdanid'] = this.searchForm.dingdanid
      }
      if (this.searchForm.dianhua != '' && this.searchForm.dianhua != undefined) {
        params['dianhua'] = this.searchForm.dianhua
      }
      if (this.searchForm.dizhi != '' && this.searchForm.dizhi != undefined) {
        params['dizhi'] = this.searchForm.dizhi
      }
      if (this.searchForm.songshenhe != '' && this.searchForm.songshenhe != undefined) {
        params['songshenhe'] = this.searchForm.songshenhe
      }
      if (this.searchForm.psxingming != '' && this.searchForm.psxingming != undefined) {
        params['psxingming'] = this.searchForm.psxingming
      }
      if (this.searchForm.psdianhua != '' && this.searchForm.psdianhua != undefined) {
        params['psdianhua'] = this.searchForm.psdianhua
      }
      if (this.searchForm.usersslid != '' && this.searchForm.usersslid != undefined) {
        params['usersslid'] = this.searchForm.usersslid
      }

      this.$http({
        url: "peisong/chakan",
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

    // 删除或批量删除配送方法
    peisongDeleteHandler(id) {
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
          url: "peisong/delete",
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

    //跳转到配送详情页面
    peisongDetailHandler(id) {
      this.showFlag = false;
      this.peisongDetailFlag = true;
      this.$nextTick(() => {
        this.$refs.peisongDetail.init(id);
      });

    },

    //跳转到配送修改页面
    peisongSetHandler(id) {
      this.showFlag = false;
      this.peisongSetFlag = true;
      this.$nextTick(() => {
        this.$refs.peisongSet.init(id);
      });
    },

    //更新配送信息操作方法
    peisongSet(tid,tname,property,value) {
      let params = {};
      params['id'] = tid;
      params[property] = value;

      this.$confirm(`确定'${tname}'操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: `peisong/set`,
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


    //跳转到配送评价添加页面
    pingjiaAddHandler(id, mingcheng) {
      this.showFlag = false;
      this.peisongPingjiaAddFlag = true;
      this.$nextTick(() => {
        this.$refs.peisongPingjiaAdd.init(id, xingming);
      });
    },

    //跳转到配送评价查看页面
    pingjiaChakanHandler(id) {
      this.showFlag = false;
      this.peisongPingjiaChakanFlag = true;
      this.$nextTick(() => {
        this.$refs.peisongPingjiaChakan.init(id);
      });
    },


    //获取所有订单
    getDingdanList() {
      this.$http({
        url: "dingdan/all",
        method: "get",
        params: null
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dingdanOptions = data.data;
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

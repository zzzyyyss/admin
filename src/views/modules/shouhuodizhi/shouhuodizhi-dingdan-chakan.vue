<template>
  <div>
    <template v-if="this.parent.shouhuodizhiDingdanChakanFlag && showFlag">
      <!--搜索表单区域-->
      <el-form :inline="true" :model="searchForm" class="dy-list-search-el-form" v-if="false">
        <el-row class="dy-list-search-el-form-row">
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">编号</label>
            <el-input style="width: auto;" suffix-icon="el-icon-search" v-model="searchForm.bianhao" placeholder="请输入编号" clearable></el-input>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">是否支付</label>
            <el-select v-model="searchForm.zhifushenhe" placeholder="请选择是否支付" clearable>
              <el-option label="全部" value=""></el-option>
              <el-option v-for="(item, index) in shenheOptions" v-bind:key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">是否发货</label>
            <el-select v-model="searchForm.fahuoshenhe" placeholder="请选择是否发货" clearable>
              <el-option label="全部" value=""></el-option>
              <el-option v-for="(item, index) in shenheOptions" v-bind:key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">是否收货</label>
            <el-select v-model="searchForm.shouhuoshenhe" placeholder="请选择是否收货" clearable>
              <el-option label="全部" value=""></el-option>
              <el-option v-for="(item, index) in shenheOptions" v-bind:key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">付款方式</label>
            <el-select v-model="searchForm.fukuanfangshiid" placeholder="请选择付款方式" clearable>
              <el-option label="全部" value=""></el-option>
              <el-option v-for="(item, index) in fukuanfangshiOptions" v-bind:key="item.id" :label="item.mingcheng" :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">收货地址</label>
            <el-select v-model="searchForm.shouhuodizhiid" placeholder="请选择收货地址" clearable>
              <el-option label="全部" value=""></el-option>
              <el-option v-for="(item, index) in shouhuodizhiOptions" v-bind:key="item.id" :label="item.xingming" :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="dy-list-search-el-form-row-div">
            <label class="dy-list-search-el-form-row-div-label">商家ID</label>
            <el-input style="width: auto;" suffix-icon="el-icon-search" v-model="searchForm.shangjia" placeholder="请输入商家ID" clearable></el-input>
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
            <label class="dy-list-search-el-form-row-div-label">备注</label>
            <el-input style="width: auto;" suffix-icon="el-icon-search" v-model="searchForm.beizhu" placeholder="请输入备注" clearable></el-input>
          </div>

          <el-button class="dy-list-search-button" icon="el-icon-search" type="success" @click="search">查{{ '\u3000' }}询</el-button>
        </el-row>
        <!-- <el-row class="dy-list-search-el-form-row-2">
            <el-button class="dy-list-batchdelete-button" :disabled="dataListSelections.length <= 0" type="danger" icon="el-icon-delete" @click="dingdanDeleteHandler()">批量删除</el-button>
        </el-row> -->
      </el-form>
      <!--数据列表区域-->
      <el-table class="dy-list-el-table" :stripe='true' :data="dataList" v-loading="dataListLoading"
      @selection-change="selectionChangeHandler" :border="true">
        <el-table-column v-if="false" type="selection" width="60"></el-table-column>
        <el-table-column label="序号" v-if="true" type="index" width="70" />>
        <el-table-column label="编号">
          <template slot-scope="scope">
            {{ scope.row.bianhao }}
          </template>
        </el-table-column>
        <el-table-column label="订单金额">
          <template slot-scope="scope">
            {{ scope.row.jine }}
          </template>
        </el-table-column>
        <el-table-column label="是否支付">
          <template slot-scope="scope">
            {{ scope.row.zhifushenhe }}
          </template>
        </el-table-column>
        <el-table-column label="是否发货">
          <template slot-scope="scope">
            {{ scope.row.fahuoshenhe }}
          </template>
        </el-table-column>
        <el-table-column label="是否收货">
          <template slot-scope="scope">
            {{ scope.row.shouhuoshenhe }}
          </template>
        </el-table-column>
        <el-table-column label="付款方式">
          <template slot-scope="scope">
            <div v-if="scope.row.fukuanfangshi && scope.row.fukuanfangshi.mingcheng">{{ scope.row.fukuanfangshi.mingcheng }}</div>
            <div v-else>--</div>
          </template>
        </el-table-column>
        <el-table-column label="收货地址">
          <template slot-scope="scope">
            <div v-if="scope.row.shouhuodizhi && scope.row.shouhuodizhi.xingming">{{ scope.row.shouhuodizhi.xingming }}</div>
            <div v-else>--</div>
          </template>
        </el-table-column>
        <el-table-column label="商家ID">
          <template slot-scope="scope">
            {{ scope.row.shangjia }}
          </template>
        </el-table-column>
        <el-table-column label="用户">
          <template slot-scope="scope">
            <div v-if="scope.row.users && scope.row.users.loginname">{{ scope.row.users.loginname }}</div>
            <div v-else>--</div>
          </template>
        </el-table-column>
        <el-table-column label="时间">
          <template slot-scope="scope">
            {{ scope.row.shijian }}
          </template>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope">
            {{ scope.row.beizhu }}
          </template>
        </el-table-column>

        <el-table-column width="350" label="操作">
          <template slot-scope="scope">
              <!-- <el-button class="dy-list-shehe-button" type="primary" icon="el-icon-edit-outline" size="mini" @click="dingdanSet(scope.row.id,scope.row.fahuoshenhe == 'no' ? '发货' : '取消发货','fahuoshenhe',scope.row.fahuoshenhe == 'no' ? 'yes' : 'no')">{{scope.row.fahuoshenhe == 'no' ? '发货' : '取消发货' }}</el-button> -->


            <el-button class="dy-list-detail-button" type="success" icon="el-icon-info" size="mini" @click="dingdanDetailHandler(scope.row.id)">详情</el-button>
            <!-- <el-button class="dy-list-update-button" type="primary" icon="el-icon-edit" size="mini" @click="dingdanSetHandler(scope.row.id)">修改</el-button> -->
            <!-- <el-button class="dy-list-delete-button" type="danger" icon="el-icon-delete" size="mini" @click="dingdanDeleteHandler(scope.row.id)">删除</el-button> -->
              <!-- <el-button class="dy-list-chakan-button" type="success" icon="el-icon-tickets" size="mini" @click="dingdanxiangChakanHandler(scope.row.id)">订单项查看</el-button> -->
              <!-- <el-button class="dy-list-add-button" type="success" icon="el-icon-circle-plus" size="mini" @click="dingdanxiangAddHandler(scope.row.id, scope.row.bianhao)">订单项添加</el-button> -->
              <!-- <el-button class="dy-list-chakan-button" type="success" icon="el-icon-tickets" size="mini" @click="peisongChakanHandler(scope.row.id)">配送查看</el-button> -->
              <!-- <el-button class="dy-list-add-button" type="success" icon="el-icon-circle-plus" size="mini" @click="peisongAddHandler(scope.row.id, scope.row.bianhao)">配送添加</el-button> -->

          </template>
        </el-table-column>
      </el-table>
      <div v-if="totalAmount > 0" class="dy-list-dingdan-totalamount-div"> 总金额：{{totalAmount}}元</div>
      <!--分页组件-->
      <el-pagination class="dy-list-el-pagination" :layout="layouts.join()" @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[8, 10, 20, 30, 50]"
      :page-size="pageSize" :total="totalPage" prev-text="<上一页" next-text="下一页>"></el-pagination>
      <el-button class="dy-back-button" style="margin: 10px 44% !important;" @click="back">返回</el-button>
    </template>
    <!-- 订单修改-->
    <dingdan-set v-if="dingdanSetFlag" :parent="this" ref="dingdanSet"></dingdan-set>
    <!-- 订单详情-->
    <dingdan-detail v-if="dingdanDetailFlag" :parent="this" ref="dingdanDetail"></dingdan-detail>
    <!-- 订单订单项查看-->
    <dingdan-dingdanxiang-chakan v-if="dingdanDingdanxiangChakanFlag" :parent="this" ref="dingdanDingdanxiangChakan"></dingdan-dingdanxiang-chakan>
    <!-- 订单订单项添加-->
    <dingdan-dingdanxiang-add v-if="dingdanDingdanxiangAddFlag" :parent="this" ref="dingdanDingdanxiangAdd"></dingdan-dingdanxiang-add>
    <!-- 订单配送查看-->
    <dingdan-peisong-chakan v-if="dingdanPeisongChakanFlag" :parent="this" ref="dingdanPeisongChakan"></dingdan-peisong-chakan>
    <!-- 订单配送添加-->
    <dingdan-peisong-add v-if="dingdanPeisongAddFlag" :parent="this" ref="dingdanPeisongAdd"></dingdan-peisong-add>

  </div>
</template>
<script>
import DingdanSet from "../dingdan/dingdan-set"
import DingdanDetail from "../dingdan/dingdan-detail"
import DingdanDingdanxiangChakan from '../dingdan/dingdan-dingdanxiang-chakan'
import DingdanDingdanxiangAdd from '../dingdan/dingdan-dingdanxiang-add'
import DingdanPeisongChakan from '../dingdan/dingdan-peisong-chakan'
import DingdanPeisongAdd from '../dingdan/dingdan-peisong-add'

export default {
  data() {
    return {
      searchForm: {
        key: ""
      },
      totalAmount: 0,
      shouhuodizhiid: 0,
      dataList: [],
      pageIndex: 1,
      pageSize: 8,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      showFlag: true,
      dingdanSetFlag: false,
      dingdanDetailFlag: false,
      dingdanDingdanxiangChakanFlag: false,
      dingdanDingdanxiangAddFlag: false,
      dingdanPeisongChakanFlag: false,
      dingdanPeisongAddFlag: false,

      layouts: ["total", "prev", "pager", "next", "sizes", "jumper"],
      xingbieOptions: [],
      typeOptions: [],
      shenheOptions: [],
      fukuanfangshiOptions: [],
      shouhuodizhiOptions: [],
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
    DingdanSet,
    DingdanDetail,
    DingdanDingdanxiangChakan,
    DingdanDingdanxiangAdd,
    DingdanPeisongChakan,
    DingdanPeisongAdd,

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
        this.parent.shouhuodizhiDingdanChakanFlag = false;
      } else {
        this.$router.push('/');
      }
    },
    //页面初始化
    init(id) {
      this.shenheOptions = "yes,no".split(',');
      this.xingbieOptions = "男,女".split(',');
      this.typeOptions = this.$userstypes;
      if (id) {
        this.shouhuodizhiid = id;
      }
      this.getDataList();
      this.getFukuanfangshiList();
      this.getShouhuodizhiList();
      this.getUsersList();

    },

    //点击搜索按钮方法
    search() {
      this.pageIndex = 1;
      this.getDataList();
    },

    // 获取订单分页数据列表
    getDataList() {
      this.dataListLoading = true;
      let params = {
        pageNo: this.pageIndex, //页码
        pageSize: this.pageSize, //页大小
        sortProperty: 'id',      //排序列
        shouhuodizhiid: this.shouhuodizhiid,
      }
      //搜索表单数据组装
      if (this.searchForm.bianhao != '' && this.searchForm.bianhao != undefined) {
        params['bianhao'] = this.searchForm.bianhao
      }
      if (this.searchForm.jine != '' && this.searchForm.jine != undefined) {
        params['jine'] = this.searchForm.jine
      }
      if (this.searchForm.zhifushenhe != '' && this.searchForm.zhifushenhe != undefined) {
        params['zhifushenhe'] = this.searchForm.zhifushenhe
      }
      if (this.searchForm.fahuoshenhe != '' && this.searchForm.fahuoshenhe != undefined) {
        params['fahuoshenhe'] = this.searchForm.fahuoshenhe
      }
      if (this.searchForm.shouhuoshenhe != '' && this.searchForm.shouhuoshenhe != undefined) {
        params['shouhuoshenhe'] = this.searchForm.shouhuoshenhe
      }
      if (this.searchForm.fukuanfangshiid != '' && this.searchForm.fukuanfangshiid != undefined) {
        params['fukuanfangshiid'] = this.searchForm.fukuanfangshiid
      }
      if (this.searchForm.shouhuodizhiid != '' && this.searchForm.shouhuodizhiid != undefined) {
        params['shouhuodizhiid'] = this.searchForm.shouhuodizhiid
      }
      if (this.searchForm.shangjia != '' && this.searchForm.shangjia != undefined) {
        params['shangjia'] = this.searchForm.shangjia
      }
      if (this.searchForm.usersid != '' && this.searchForm.usersid != undefined) {
        params['usersid'] = this.searchForm.usersid
      }
      if (this.searchForm.beizhu != '' && this.searchForm.beizhu != undefined) {
        params['beizhu'] = this.searchForm.beizhu
      }

      this.$http({
        url: "dingdan/chakan",
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
      this.$http({
        url: "dingdan/totalamount",
        method: "get",
        params: params
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.totalAmount = data.data;
        } 
      });
    },

    // 删除或批量删除订单方法
    dingdanDeleteHandler(id) {
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
          url: "dingdan/delete",
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

    //跳转到订单详情页面
    dingdanDetailHandler(id) {
      this.showFlag = false;
      this.dingdanDetailFlag = true;
      this.$nextTick(() => {
        this.$refs.dingdanDetail.init(id);
      });

    },

    //跳转到订单修改页面
    dingdanSetHandler(id) {
      this.showFlag = false;
      this.dingdanSetFlag = true;
      this.$nextTick(() => {
        this.$refs.dingdanSet.init(id);
      });
    },

    //更新订单信息操作方法
    dingdanSet(tid,tname,property,value) {
      let params = {};
      params['id'] = tid;
      params[property] = value;

      this.$confirm(`确定'${tname}'操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: `dingdan/set`,
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


    //跳转到订单订单项添加页面
    dingdanxiangAddHandler(id, mingcheng) {
      this.showFlag = false;
      this.dingdanDingdanxiangAddFlag = true;
      this.$nextTick(() => {
        this.$refs.dingdanDingdanxiangAdd.init(id, bianhao);
      });
    },

    //跳转到订单订单项查看页面
    dingdanxiangChakanHandler(id) {
      this.showFlag = false;
      this.dingdanDingdanxiangChakanFlag = true;
      this.$nextTick(() => {
        this.$refs.dingdanDingdanxiangChakan.init(id);
      });
    },
    //跳转到订单配送添加页面
    peisongAddHandler(id, mingcheng) {
      this.showFlag = false;
      this.dingdanPeisongAddFlag = true;
      this.$nextTick(() => {
        this.$refs.dingdanPeisongAdd.init(id, bianhao);
      });
    },

    //跳转到订单配送查看页面
    peisongChakanHandler(id) {
      this.showFlag = false;
      this.dingdanPeisongChakanFlag = true;
      this.$nextTick(() => {
        this.$refs.dingdanPeisongChakan.init(id);
      });
    },


    //获取所有付款方式
    getFukuanfangshiList() {
      this.$http({
        url: "fukuanfangshi/all",
        method: "get",
        params: null
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.fukuanfangshiOptions = data.data;
        }
      });
    },
    //获取所有收货地址
    getShouhuodizhiList() {
      this.$http({
        url: "shouhuodizhi/all",
        method: "get",
        params: null
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.shouhuodizhiOptions = data.data;
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

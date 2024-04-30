<template>
  <div v-if="this.parent.shangpinDetailFlag">
    <el-form class="dy-add-set-detail-el-form" ref="ruleForm" :model="ruleForm" label-width="110px">
      <el-form-item class="dy-add-set-detail-el-form-item" label="名称:">
        <el-input v-model="ruleForm.mingcheng" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="编号:">
        <el-input v-model="ruleForm.bianhao" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="分类:">
        <el-input v-if="ruleForm.zhonglei && ruleForm.zhonglei.mingcheng" v-model="ruleForm.zhonglei.mingcheng" readonly></el-input>
        <div v-else>--</div>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="内容介绍:">
        <el-input style="min-width: 200px; max-width: 600px;" type="textarea" :rows="8" v-model="ruleForm.neirong" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="图片:">
        <div v-if="ruleForm.image">
          <img :src="getFileSrc(ruleForm.image)" style="margin-right:20px;" width="300" height="200">
          <el-button class="el-icon-download" type="text" @click="download(ruleForm.image)">下载</el-button>
        </div>
        <div v-else>暂无图片</div>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="原价:">
        <el-input v-model="ruleForm.yuanshijiage" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="现价:">
        <el-input v-model="ruleForm.jiage" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="单位:">
        <el-input v-model="ruleForm.danwei" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="是否特价:">
        <el-input v-model="ruleForm.shenhe" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="库存数量:">
        <el-input v-model="ruleForm.kucunshuliang" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="销售数量:">
        <el-input v-model="ruleForm.xiaoshoushuliang" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="用户:">
        <el-input v-if="ruleForm.users && ruleForm.users.loginname" v-model="ruleForm.users.loginname" readonly></el-input>
        <div v-else>--</div>
      </el-form-item>

      <el-form-item class="dy-add-set-detail-el-form-item-2">
        <!-- <el-button class="dy-detail-add-button" @click="chanpinpingjiaAddHandler">商品评价添加</el-button> -->
        <!-- <el-button class="dy-detail-chakan-button" @click="chanpinpingjiaChakanHandler">商品评价查看</el-button> -->
        <!-- <el-button class="dy-detail-add-button" @click="dingdanxiangAddHandler">订单项添加</el-button> -->
        <!-- <el-button class="dy-detail-chakan-button" @click="dingdanxiangChakanHandler">订单项查看</el-button> -->
        <!-- <el-button class="dy-detail-add-button" @click="gouwucheAddHandler">购物车添加</el-button> -->
        <!-- <el-button class="dy-detail-chakan-button" @click="gouwucheChakanHandler">购物车查看</el-button> -->
        <!-- <el-button class="dy-detail-add-button" @click="shoucangAddHandler">商品收藏添加</el-button> -->
        <!-- <el-button class="dy-detail-chakan-button" @click="shoucangChakanHandler">商品收藏查看</el-button> -->

        <el-button class="dy-back-button" @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    let self = this;
    return {
      id: '',
      ruleForm: {
        mingcheng: '',
        bianhao: '',
        zhonglei: { mingcheng: '' },
        neirong: '',
        image: '',
        yuanshijiage: '',
        jiage: '',
        danwei: '',
        shenhe: '',
        kucunshuliang: '',
        xiaoshoushuliang: '',
        users: { loginname: '' },

      },
    };
  },
  props: ["parent"],
  computed: {
  },
  created() {
  },
  methods: {

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
    // 初始化
    init(id) {
      if (id) {
        this.id = id;
        this.info(id);
      }
    },
    // 返回按钮事件
    back() {
      this.parent.showFlag = true;
      this.parent.shangpinSetFlag = false;
      this.parent.shangpinDetailFlag = false;
      this.parent.shangpinChanpinpingjiaChakanFlag = false;
      this.parent.shangpinChanpinpingjiaAddFlag = false;
      this.parent.shangpinDingdanxiangChakanFlag = false;
      this.parent.shangpinDingdanxiangAddFlag = false;
      this.parent.shangpinGouwucheChakanFlag = false;
      this.parent.shangpinGouwucheAddFlag = false;
      this.parent.shangpinShoucangChakanFlag = false;
      this.parent.shangpinShoucangAddFlag = false;

    },

    // 获取商品详情数据
    info(id) {
      this.$http({
        url: `shangpin/info/${id}`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.ruleForm = data.data;
        } else {
          this.$message.error(data.message);
        }
      });
    },
    //跳转到商品商品评价查看页面
    chanpinpingjiaChakanHandler() {
      this.parent.showFlag = false;
      this.parent.shangpinDetailFlag = false;
      this.parent.shangpinChanpinpingjiaChakanFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.shangpinChanpinpingjiaChakan.init(this.id);
      });
    },

    //跳转到商品商品评价添加页面
    chanpinpingjiaAddHandler() {
      this.parent.showFlag = false;
      this.parent.shangpinDetailFlag = false;
      this.parent.shangpinChanpinpingjiaAddFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.shangpinChanpinpingjiaAdd.init(this.id, this.ruleForm.mingcheng);
      });
    },

    //跳转到商品订单项查看页面
    dingdanxiangChakanHandler() {
      this.parent.showFlag = false;
      this.parent.shangpinDetailFlag = false;
      this.parent.shangpinDingdanxiangChakanFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.shangpinDingdanxiangChakan.init(this.id);
      });
    },

    //跳转到商品订单项添加页面
    dingdanxiangAddHandler() {
      this.parent.showFlag = false;
      this.parent.shangpinDetailFlag = false;
      this.parent.shangpinDingdanxiangAddFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.shangpinDingdanxiangAdd.init(this.id, this.ruleForm.mingcheng);
      });
    },

    //跳转到商品购物车查看页面
    gouwucheChakanHandler() {
      this.parent.showFlag = false;
      this.parent.shangpinDetailFlag = false;
      this.parent.shangpinGouwucheChakanFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.shangpinGouwucheChakan.init(this.id);
      });
    },

    //跳转到商品购物车添加页面
    gouwucheAddHandler() {
      this.parent.showFlag = false;
      this.parent.shangpinDetailFlag = false;
      this.parent.shangpinGouwucheAddFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.shangpinGouwucheAdd.init(this.id, this.ruleForm.mingcheng);
      });
    },

    //跳转到商品商品收藏查看页面
    shoucangChakanHandler() {
      this.parent.showFlag = false;
      this.parent.shangpinDetailFlag = false;
      this.parent.shangpinShoucangChakanFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.shangpinShoucangChakan.init(this.id);
      });
    },

    //跳转到商品商品收藏添加页面
    shoucangAddHandler() {
      this.parent.showFlag = false;
      this.parent.shangpinDetailFlag = false;
      this.parent.shangpinShoucangAddFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.shangpinShoucangAdd.init(this.id, this.ruleForm.mingcheng);
      });
    },


  }
};
</script>
<style lang="scss" scoped>
.amap-wrapper {
  width: 100%;
  height: 500px;
}

.search-box {
  position: absolute;
}

.el-date-editor.el-input {
  width: auto;
}
</style>

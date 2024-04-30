<template>
  <div v-if="this.parent.dingdanDetailFlag">
    <el-form class="dy-add-set-detail-el-form" ref="ruleForm" :model="ruleForm" label-width="110px">
      <el-form-item class="dy-add-set-detail-el-form-item" label="编号:">
        <el-input v-model="ruleForm.bianhao" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="订单金额:">
        <el-input v-model="ruleForm.jine" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="是否支付:">
        <el-input v-model="ruleForm.zhifushenhe" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="是否发货:">
        <el-input v-model="ruleForm.fahuoshenhe" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="是否收货:">
        <el-input v-model="ruleForm.shouhuoshenhe" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="付款方式:">
        <el-input v-if="ruleForm.fukuanfangshi && ruleForm.fukuanfangshi.mingcheng" v-model="ruleForm.fukuanfangshi.mingcheng" readonly></el-input>
        <div v-else>--</div>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="收货地址:">
        <!-- <el-input v-if="ruleForm.shouhuodizhi && ruleForm.shouhuodizhi.xingming" v-model="ruleForm.shouhuodizhi.xingming" readonly></el-input> -->
        <el-input  v-model="ruleForm.shouhuodizhi.xingming" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="商家ID:">
        <el-input v-model="ruleForm.shangjia" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="用户:">
        <el-input v-if="ruleForm.users && ruleForm.users.loginname" v-model="ruleForm.users.loginname" readonly></el-input>
        <div v-else>--</div>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="时间:">
        <el-input v-model="ruleForm.shijian" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="备注:">
        <el-input v-model="ruleForm.beizhu" readonly></el-input>
      </el-form-item>

      <el-form-item class="dy-add-set-detail-el-form-item-2">
        <!-- <el-button class="dy-detail-add-button" @click="dingdanxiangAddHandler">订单项添加</el-button> -->
        <!-- <el-button class="dy-detail-chakan-button" @click="dingdanxiangChakanHandler">订单项查看</el-button> -->
        <!-- <el-button class="dy-detail-add-button" @click="peisongAddHandler">配送添加</el-button> -->
        <!-- <el-button class="dy-detail-chakan-button" @click="peisongChakanHandler">配送查看</el-button> -->

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
        bianhao: '',
        jine: '',
        zhifushenhe: '',
        fahuoshenhe: '',
        shouhuoshenhe: '',
        fukuanfangshi: { mingcheng: '' },
        shouhuodizhi: { xingming: '' },
        shangjia: '',
        users: { loginname: '' },
        shijian: '',
        beizhu: '',

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
      this.parent.dingdanSetFlag = false;
      this.parent.dingdanDetailFlag = false;
      this.parent.dingdanDingdanxiangChakanFlag = false;
      this.parent.dingdanDingdanxiangAddFlag = false;
      this.parent.dingdanPeisongChakanFlag = false;
      this.parent.dingdanPeisongAddFlag = false;

    },

    // 获取订单详情数据
    info(id) {
      this.$http({
        url: `dingdan/info/${id}`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.ruleForm = data.data;
          this.ruleForm.shouhuodizhi.xingming=data.data.shouhuodizhi.xingming+' '+data.data.shouhuodizhi.dianhua+' '+data.data.shouhuodizhi.dizhi;
        } else {
          this.$message.error(data.message);
        }
      });
    },
    //跳转到订单订单项查看页面
    dingdanxiangChakanHandler() {
      this.parent.showFlag = false;
      this.parent.dingdanDetailFlag = false;
      this.parent.dingdanDingdanxiangChakanFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.dingdanDingdanxiangChakan.init(this.id);
      });
    },

    //跳转到订单订单项添加页面
    dingdanxiangAddHandler() {
      this.parent.showFlag = false;
      this.parent.dingdanDetailFlag = false;
      this.parent.dingdanDingdanxiangAddFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.dingdanDingdanxiangAdd.init(this.id, this.ruleForm.bianhao);
      });
    },

    //跳转到订单配送查看页面
    peisongChakanHandler() {
      this.parent.showFlag = false;
      this.parent.dingdanDetailFlag = false;
      this.parent.dingdanPeisongChakanFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.dingdanPeisongChakan.init(this.id);
      });
    },

    //跳转到订单配送添加页面
    peisongAddHandler() {
      this.parent.showFlag = false;
      this.parent.dingdanDetailFlag = false;
      this.parent.dingdanPeisongAddFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.dingdanPeisongAdd.init(this.id, this.ruleForm.bianhao);
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

<template>
  <div v-if="this.parent.shouhuodizhiDetailFlag">
    <el-form class="dy-add-set-detail-el-form" ref="ruleForm" :model="ruleForm" label-width="110px">
      <el-form-item class="dy-add-set-detail-el-form-item" label="收货人:">
        <el-input v-model="ruleForm.xingming" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="手机号码:">
        <el-input v-model="ruleForm.dianhua" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="详情地址:">
        <el-input v-model="ruleForm.dizhi" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="是否默认:">
        <el-input v-model="ruleForm.shenhe" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="用户:">
        <el-input v-if="ruleForm.users && ruleForm.users.loginname" v-model="ruleForm.users.loginname" readonly></el-input>
        <div v-else>--</div>
      </el-form-item>

      <el-form-item class="dy-add-set-detail-el-form-item-2">
        <!-- <el-button class="dy-detail-add-button" @click="dingdanAddHandler">订单添加</el-button> -->
        <!-- <el-button class="dy-detail-chakan-button" @click="dingdanChakanHandler">订单查看</el-button> -->

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
        xingming: '',
        dianhua: '',
        dizhi: '',
        shenhe: '',
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
      this.parent.shouhuodizhiSetFlag = false;
      this.parent.shouhuodizhiDetailFlag = false;
      this.parent.shouhuodizhiDingdanChakanFlag = false;
      this.parent.shouhuodizhiDingdanAddFlag = false;

    },

    // 获取收货地址详情数据
    info(id) {
      this.$http({
        url: `shouhuodizhi/info/${id}`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.ruleForm = data.data;
        } else {
          this.$message.error(data.message);
        }
      });
    },
    //跳转到收货地址订单查看页面
    dingdanChakanHandler() {
      this.parent.showFlag = false;
      this.parent.shouhuodizhiDetailFlag = false;
      this.parent.shouhuodizhiDingdanChakanFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.shouhuodizhiDingdanChakan.init(this.id);
      });
    },

    //跳转到收货地址订单添加页面
    dingdanAddHandler() {
      this.parent.showFlag = false;
      this.parent.shouhuodizhiDetailFlag = false;
      this.parent.shouhuodizhiDingdanAddFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.shouhuodizhiDingdanAdd.init(this.id, this.ruleForm.xingming);
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

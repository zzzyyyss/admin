<template>
  <div v-if="this.parent.fukuanfangshiDetailFlag">
    <el-form class="dy-add-set-detail-el-form" ref="ruleForm" :model="ruleForm" label-width="110px">
      <el-form-item class="dy-add-set-detail-el-form-item" label="支付方式:">
        <el-input v-model="ruleForm.mingcheng" readonly></el-input>
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
        mingcheng: '',

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
      this.parent.fukuanfangshiSetFlag = false;
      this.parent.fukuanfangshiDetailFlag = false;
      this.parent.fukuanfangshiDingdanChakanFlag = false;
      this.parent.fukuanfangshiDingdanAddFlag = false;

    },

    // 获取付款方式详情数据
    info(id) {
      this.$http({
        url: `fukuanfangshi/info/${id}`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.ruleForm = data.data;
        } else {
          this.$message.error(data.message);
        }
      });
    },
    //跳转到付款方式订单查看页面
    dingdanChakanHandler() {
      this.parent.showFlag = false;
      this.parent.fukuanfangshiDetailFlag = false;
      this.parent.fukuanfangshiDingdanChakanFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.fukuanfangshiDingdanChakan.init(this.id);
      });
    },

    //跳转到付款方式订单添加页面
    dingdanAddHandler() {
      this.parent.showFlag = false;
      this.parent.fukuanfangshiDetailFlag = false;
      this.parent.fukuanfangshiDingdanAddFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.fukuanfangshiDingdanAdd.init(this.id, this.ruleForm.mingcheng);
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

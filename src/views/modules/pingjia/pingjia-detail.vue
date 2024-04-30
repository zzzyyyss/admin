<template>
  <div v-if="this.parent.pingjiaDetailFlag">
    <el-form class="dy-add-set-detail-el-form" ref="ruleForm" :model="ruleForm" label-width="110px">
      <el-form-item class="dy-add-set-detail-el-form-item" label="评语:">
        <el-input v-model="ruleForm.biaoti" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="分数（范围1-5）:">
        <!-- <el-input v-model="ruleForm.fenshu" readonly></el-input> -->
        <div :style='{ "bottom": "10px", "position": "absolute" }'>
          <el-rate :value="Number(ruleForm.fenshu)" disabled text-color="#000000" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" show-text :texts="['极差', '失望', '一般', '满意', '惊喜']"></el-rate>
        </div>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="评价时间:">
        <el-input v-model="ruleForm.shijian" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="配送:">
        <el-input v-if="ruleForm.peisong && ruleForm.peisong.xingming" v-model="ruleForm.peisong.xingming" readonly></el-input>
        <div v-else>--</div>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="用户:">
        <el-input v-if="ruleForm.users && ruleForm.users.loginname" v-model="ruleForm.users.loginname" readonly></el-input>
        <div v-else>--</div>
      </el-form-item>

      <el-form-item class="dy-add-set-detail-el-form-item-2">

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
        biaoti: '',
        fenshu: '',
        shijian: '',
        peisong: { xingming: '' },
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
      this.parent.pingjiaSetFlag = false;
      this.parent.pingjiaDetailFlag = false;

    },

    // 获取评价详情数据
    info(id) {
      this.$http({
        url: `pingjia/info/${id}`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.ruleForm = data.data;
        } else {
          this.$message.error(data.message);
        }
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

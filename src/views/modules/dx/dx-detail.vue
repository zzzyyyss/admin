<template>
  <div v-if="this.parent.dxDetailFlag">
    <el-form class="dy-add-set-detail-el-form" ref="ruleForm" :model="ruleForm" label-width="110px">
      <el-form-item class="dy-add-set-detail-el-form-item" label="类别:">
        <el-input v-model="ruleForm.leibie" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="内容:">
        <el-input style="min-width: 200px; max-width: 600px;" type="textarea" :rows="8" v-model="ruleForm.content" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="时间:">
        <el-input v-model="ruleForm.addtime" readonly></el-input>
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
        leibie: '',
        content: '',
        addtime: '',

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
      this.parent.dxSetFlag = false;
      this.parent.dxDetailFlag = false;

    },

    // 获取信息介绍详情数据
    info(id) {
      this.$http({
        url: `dx/info/${id}`,
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

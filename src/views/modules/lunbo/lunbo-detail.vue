<template>
  <div v-if="this.parent.lunboDetailFlag">
    <el-form class="dy-add-set-detail-el-form" ref="ruleForm" :model="ruleForm" label-width="110px">
      <el-form-item class="dy-add-set-detail-el-form-item" label="标题:">
        <el-input v-model="ruleForm.biaoti" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="图片:">
        <div v-if="ruleForm.image">
          <img :src="getFileSrc(ruleForm.image)" style="margin-right:20px;" width="300" height="200">
          <el-button class="el-icon-download" type="text" @click="download(ruleForm.image)">下载</el-button>
        </div>
        <div v-else>暂无图片</div>
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
        image: '',

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
      this.parent.lunboSetFlag = false;
      this.parent.lunboDetailFlag = false;

    },

    // 获取轮播图详情数据
    info(id) {
      this.$http({
        url: `lunbo/info/${id}`,
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

<template>
  <div v-if="this.parent.zhongleiDetailFlag">
    <el-form class="dy-add-set-detail-el-form" ref="ruleForm" :model="ruleForm" label-width="110px">
      <el-form-item class="dy-add-set-detail-el-form-item" label="名称:">
        <el-input v-model="ruleForm.mingcheng" readonly></el-input>
      </el-form-item>

      <el-form-item class="dy-add-set-detail-el-form-item-2">
        <!-- <el-button class="dy-detail-add-button" @click="shangpinAddHandler">商品添加</el-button> -->
        <!-- <el-button class="dy-detail-chakan-button" @click="shangpinChakanHandler">商品查看</el-button> -->

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
      this.parent.zhongleiSetFlag = false;
      this.parent.zhongleiDetailFlag = false;
      this.parent.zhongleiShangpinChakanFlag = false;
      this.parent.zhongleiShangpinAddFlag = false;

    },

    // 获取分类详情数据
    info(id) {
      this.$http({
        url: `zhonglei/info/${id}`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.ruleForm = data.data;
        } else {
          this.$message.error(data.message);
        }
      });
    },
    //跳转到分类商品查看页面
    shangpinChakanHandler() {
      this.parent.showFlag = false;
      this.parent.zhongleiDetailFlag = false;
      this.parent.zhongleiShangpinChakanFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.zhongleiShangpinChakan.init(this.id);
      });
    },

    //跳转到分类商品添加页面
    shangpinAddHandler() {
      this.parent.showFlag = false;
      this.parent.zhongleiDetailFlag = false;
      this.parent.zhongleiShangpinAddFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.zhongleiShangpinAdd.init(this.id, this.ruleForm.mingcheng);
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
